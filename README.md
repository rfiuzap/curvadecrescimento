# Renato Fiuza v1.03 — Curva de Crescimento Infantil

🌐 Em produção: **[curvadecrescimento.renatofiuza.com.br](https://curvadecrescimento.renatofiuza.com.br/)**

[🇧🇷 Português](#português) · [🇺🇸 English](#english)

---

## Português

Acompanhamento de crescimento infantil (peso e altura) com curvas de percentil da Organização Mundial da Saúde (OMS). Cadastre múltiplos perfis de criança, registre medições ao longo do tempo e visualize a evolução em gráficos comparados aos padrões da OMS.

### Funcionalidades

- Curvas de percentil de altura da OMS, por sexo (menino/menina)
- Múltiplos perfis de criança por conta, com troca rápida entre eles
- Registro de medições (peso, altura, idade em meses) com histórico
- Modo convidado: usar sem criar conta, com dados salvos só no navegador (`localStorage`)
- Cadastro e login com sessão PHP e senha com hash (`password_hash`)
- Proteção contra bots no cadastro via Cloudflare Turnstile

### Tecnologias

PHP 8.x · SQLite (PDO) · JavaScript puro (sem framework) · Cloudflare Turnstile

### Estrutura do projeto

- `index.html`, `style.css`, `app.js`: interface e lógica do app (SPA)
- `api.php`: backend — autenticação, perfis e medições
- `data/`: banco SQLite, criado automaticamente na primeira execução (não versionado)
- `excel/`: planilha de referência das curvas de crescimento da OMS

### Rodando localmente

1. Sirva a pasta com PHP (ex: XAMPP, ou `php -S localhost:8000`).
2. Configure o segredo do Cloudflare Turnstile por variável de ambiente:
   ```bash
   TURNSTILE_SECRET=sua_chave_secreta
   ```
   (veja `turnstileSecret()` em `api.php` para outras formas de configurar)
3. Acesse `index.html` pelo navegador.

O banco SQLite é criado automaticamente em `data/crescebem.sqlite` na primeira requisição.

### Licença

MIT — desenvolvido por **Renato Fiuza**.

---

## English

Child growth tracking (weight and height) using World Health Organization (WHO) percentile curves. Create multiple child profiles, log measurements over time, and visualize growth against WHO standards.

### Features

- WHO height percentile curves, by sex (boy/girl)
- Multiple child profiles per account, with quick switching
- Measurement logging (weight, height, age in months) with history
- Guest mode: use without an account, with data stored only in the browser (`localStorage`)
- Email/password sign-up and login with PHP sessions and hashed passwords (`password_hash`)
- Bot protection on sign-up via Cloudflare Turnstile

### Tech stack

PHP 8.x · SQLite (PDO) · Vanilla JavaScript (no framework) · Cloudflare Turnstile

### Project structure

- `index.html`, `style.css`, `app.js`: app UI and logic (SPA)
- `api.php`: backend — authentication, profiles and measurements
- `data/`: SQLite database, created automatically on first run (not version-controlled)
- `excel/`: WHO growth curve reference spreadsheet

### Running locally

1. Serve the folder with PHP (e.g. XAMPP, or `php -S localhost:8000`).
2. Set the Cloudflare Turnstile secret as an environment variable:
   ```bash
   TURNSTILE_SECRET=your_secret_key
   ```
   (see `turnstileSecret()` in `api.php` for other configuration options)
3. Open `index.html` in your browser.

The SQLite database is created automatically at `data/crescebem.sqlite` on first request.

### License

MIT — built by **Renato Fiuza**.
