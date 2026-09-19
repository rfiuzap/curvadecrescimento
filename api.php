<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);
session_start();

function respond(mixed $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function requireUserId(): int {
    if (empty($_SESSION['user_id'])) respond(['error' => 'Não autenticado.'], 401);
    return (int) $_SESSION['user_id'];
}

function account(PDO $database, int $userId): array {
    $statement = $database->prepare('SELECT id, email FROM users WHERE id = :id');
    $statement->execute(['id' => $userId]);
    $user = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$user) respond(['error' => 'Sessão inválida.'], 401);
    return ['id' => (int) $user['id'], 'email' => $user['email']];
}

function userData(PDO $database, int $userId): array {
    $profileStatement = $database->prepare('SELECT id, name, birth_date, sex, active FROM profiles WHERE user_id = :user_id ORDER BY rowid');
    $profileStatement->execute(['user_id' => $userId]);
    $profiles = $profileStatement->fetchAll(PDO::FETCH_ASSOC);
    $measurementStatement = $database->prepare('SELECT measured_at, age_months, height, weight FROM measurements WHERE profile_id = :profile_id ORDER BY measured_at DESC');
    $resultProfiles = [];
    $activeId = null;
    foreach ($profiles as $profile) {
        $measurementStatement->execute(['profile_id' => $profile['id']]);
        $measurements = array_map(static fn(array $measurement): array => [
            'date' => $measurement['measured_at'],
            'age' => (int) $measurement['age_months'],
            'height' => (float) $measurement['height'],
            'weight' => (float) $measurement['weight'],
        ], $measurementStatement->fetchAll(PDO::FETCH_ASSOC));
        $resultProfiles[] = ['id' => $profile['id'], 'child' => ['name' => $profile['name'], 'birth' => $profile['birth_date'], 'sex' => $profile['sex']], 'measurements' => $measurements];
        if ((int) $profile['active'] === 1) $activeId = $profile['id'];
    }
    $activeId ??= $resultProfiles[0]['id'] ?? null;
    $activeProfile = current(array_filter($resultProfiles, static fn(array $profile): bool => $profile['id'] === $activeId));
    return ['activeId' => $activeId, 'profiles' => $resultProfiles, 'child' => $activeProfile['child'] ?? null, 'measurements' => $activeProfile['measurements'] ?? []];
}

function turnstileSecret(): string {
    $secret = getenv('TURNSTILE_SECRET') ?: null;
    $configPath = getenv('TURNSTILE_CONFIG_PATH') ?: null;
    if (!$configPath) {
        $directory = dirname(__DIR__);
        while ($directory !== dirname($directory)) {
            $candidate = $directory . DIRECTORY_SEPARATOR . 'segredo da curva de crescimento' . DIRECTORY_SEPARATOR . 'turnstile-config.php';
            if (is_file($candidate)) {
                $configPath = $candidate;
                break;
            }
            $directory = dirname($directory);
        }
    }
    $config = $configPath && is_file($configPath) ? require $configPath : null;
    $secret ??= is_string($config) ? $config : (is_array($config) ? ($config['turnstile_secret'] ?? null) : null);
    if (!is_string($secret) || trim($secret) === '') throw new RuntimeException('Configuração do Turnstile indisponível.');
    return $secret;
}

function validateTurnstile(string $token): void {
    if ($token === '' || strlen($token) > 2048) respond(['error' => 'Conclua a verificação de segurança.'], 403);
    $body = http_build_query(['secret' => turnstileSecret(), 'response' => $token, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '']);
    $context = stream_context_create(['http' => ['method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded\r\n", 'content' => $body, 'timeout' => 10, 'ignore_errors' => true]]);
    $response = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    $result = is_string($response) ? json_decode($response, true) : null;
    if (!is_array($result) || !$result['success'] || ($result['action'] ?? '') !== 'signup' || !in_array($result['hostname'] ?? '', ['localhost', '127.0.0.1', 'curvadecrescimento.renatofiuza.com.br'], true)) respond(['error' => 'A verificação de segurança falhou.'], 403);
}

try {
    $databaseDirectory = __DIR__ . DIRECTORY_SEPARATOR . 'data';
    if (!is_dir($databaseDirectory) && !mkdir($databaseDirectory, 0775, true) && !is_dir($databaseDirectory)) throw new RuntimeException('Não foi possível criar o diretório do banco de dados.');
    $database = new PDO('sqlite:' . $databaseDirectory . DIRECTORY_SEPARATOR . 'crescebem.sqlite');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->exec('PRAGMA foreign_keys = ON');
    $database->exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)');
    $database->exec('CREATE TABLE IF NOT EXISTS profiles (id TEXT PRIMARY KEY, user_id INTEGER, name TEXT NOT NULL, birth_date TEXT NOT NULL, sex TEXT NOT NULL CHECK (sex IN ("menina", "menino")), active INTEGER NOT NULL DEFAULT 0, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)');
    $profileColumns = $database->query('PRAGMA table_info(profiles)')->fetchAll(PDO::FETCH_COLUMN, 1);
    if (!in_array('user_id', $profileColumns, true)) $database->exec('ALTER TABLE profiles ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE');
    $database->exec('CREATE TABLE IF NOT EXISTS measurements (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id TEXT NOT NULL, measured_at TEXT NOT NULL, age_months INTEGER NOT NULL, height REAL NOT NULL, weight REAL NOT NULL, FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE)');

    $action = $_GET['action'] ?? 'data';
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'session') {
        if (empty($_SESSION['user_id'])) respond(['user' => null]);
        respond(['user' => account($database, (int) $_SESSION['user_id'])]);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'data') {
        $userId = requireUserId();
        respond(userData($database, $userId));
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Método não permitido.'], 405);
    $payload = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

    if ($action === 'register') {
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $password = (string) ($payload['password'] ?? '');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) respond(['error' => 'Informe um e-mail válido e uma senha de pelo menos 8 caracteres.'], 422);
        validateTurnstile((string) ($payload['cf-turnstile-response'] ?? ''));
        try {
            $statement = $database->prepare('INSERT INTO users (email, password_hash) VALUES (:email, :password_hash)');
            $statement->execute(['email' => $email, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)]);
        } catch (PDOException $error) {
            if ($error->getCode() === '23000') respond(['error' => 'Este e-mail já está cadastrado.'], 409);
            throw $error;
        }
        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $database->lastInsertId();
        respond(['user' => account($database, (int) $_SESSION['user_id']), 'data' => userData($database, (int) $_SESSION['user_id'])], 201);
    }

    if ($action === 'login') {
        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        $statement = $database->prepare('SELECT id, password_hash FROM users WHERE email = :email');
        $statement->execute(['email' => $email]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        if (!$user || !password_verify((string) ($payload['password'] ?? ''), $user['password_hash'])) respond(['error' => 'E-mail ou senha inválidos.'], 401);
        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $user['id'];
        respond(['user' => account($database, (int) $_SESSION['user_id']), 'data' => userData($database, (int) $_SESSION['user_id'])]);
    }

    if ($action === 'logout') {
        $_SESSION = [];
        session_destroy();
        respond(['ok' => true]);
    }

    if ($action !== 'data') respond(['error' => 'Ação inválida.'], 404);
    $userId = requireUserId();
    if (!is_array($payload) || !isset($payload['profiles']) || !is_array($payload['profiles'])) respond(['error' => 'Dados de perfis inválidos.'], 422);

    $database->beginTransaction();
    $ownedIdsStatement = $database->prepare('SELECT id FROM profiles WHERE user_id = :user_id');
    $ownedIdsStatement->execute(['user_id' => $userId]);
    $ownedIds = $ownedIdsStatement->fetchAll(PDO::FETCH_COLUMN);
    if ($ownedIds) {
        $placeholders = implode(',', array_fill(0, count($ownedIds), '?'));
        $database->prepare("DELETE FROM measurements WHERE profile_id IN ($placeholders)")->execute($ownedIds);
        $database->prepare("DELETE FROM profiles WHERE id IN ($placeholders)")->execute($ownedIds);
    }
    $profileStatement = $database->prepare('INSERT INTO profiles (id, user_id, name, birth_date, sex, active) VALUES (:id, :user_id, :name, :birth_date, :sex, :active)');
    $measurementStatement = $database->prepare('INSERT INTO measurements (profile_id, measured_at, age_months, height, weight) VALUES (:profile_id, :measured_at, :age_months, :height, :weight)');
    foreach ($payload['profiles'] as $profile) {
        $child = $profile['child'] ?? null;
        if (!is_array($child) || empty($profile['id']) || empty($child['name']) || empty($child['birth']) || !in_array($child['sex'] ?? '', ['menina', 'menino'], true)) throw new InvalidArgumentException('Perfil inválido.');
        $profileStatement->execute(['id' => (string) $profile['id'], 'user_id' => $userId, 'name' => (string) $child['name'], 'birth_date' => (string) $child['birth'], 'sex' => $child['sex'], 'active' => $profile['id'] === ($payload['activeId'] ?? null) ? 1 : 0]);
        foreach (($profile['measurements'] ?? []) as $measurement) $measurementStatement->execute(['profile_id' => (string) $profile['id'], 'measured_at' => (string) $measurement['date'], 'age_months' => (int) $measurement['age'], 'height' => (float) $measurement['height'], 'weight' => (float) $measurement['weight']]);
    }
    $database->commit();
    respond(['ok' => true]);
} catch (Throwable $error) {
    if (isset($database) && $database->inTransaction()) $database->rollBack();
    respond(['error' => 'Não foi possível concluir a solicitação.'], 500);
}
