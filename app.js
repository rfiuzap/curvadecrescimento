const KEY = "crescebem-data";
const GUEST_KEY = "crescebem-guest-data";
const tips = [
  "Cada centímetro a mais conta uma história de amor, cuidado e descobertas.",
  "Acompanhar o crescimento é transformar cada fase em uma memória inesquecível.",
  "O tempo passa rápido: celebre cada pequena grande conquista do seu pequeno.",
  "Cuidar de perto é o maior presente que você pode dar ao futuro do seu filho.",
  "Mais do que números na tela, o registro visível do amor de vocês florescendo.",
  "Crescer com saúde é crescer com confiança - monitore de perto cada etapa.",
  "Informação traz tranquilidade: saiba exatamente como o ritmo do seu filho está evoluindo.",
  "Prevenir é amar: acompanhar a curva ajuda a identificar necessidades antes que virem preocupações.",
  "O desenvolvimento infantil tem ritmo próprio; entender a curva traz paz de coração.",
  "Pequenos ajustes na rotina fazem grandes diferenças no futuro. Acompanhe!",
  "Você é o maior parceiro da saúde do seu filho - faça parte ativa de cada conquista.",
  "Um diário de saúde moderno para pais que valorizam o desenvolvimento pleno.",
  "Não compare seu filho com outros; compare-o consigo mesmo e celebre seu ritmo único.",
  "O crescimento é um reflexo do carinho e da dedicação do dia a dia.",
  "Estar presente em cada medição é mostrar que cada passo importa.",
  "Descubra a trajetória única do crescimento do seu filho em poucos cliques.",
  "Transforme medidas em tranquilidade: veja a curva do seu pequeno hoje.",
  "Monitore peso e altura com precisão e leve dados claros para as consultas pediátricas.",
  "Um clique para acompanhar, uma vida inteira de saúde pela frente.",
  "Veja a mágica do crescimento acontecer: trace a curva do seu pequeno agora mesmo.",
];
const ages = [0, 3, 6, 9, 12, 18, 24, 30, 36, 42, 48, 54, 60];
const annualHeightAges = Array.from(
  { length: 15 },
  (_, index) => (index + 5) * 12,
);
const heightAges = Array.from({ length: 169 }, (_, index) => index + 60);
const monthlyBoysMedianHeight = [
  110, 110.6, 111.1, 111.7, 112.2, 112.8, 113.3, 113.9, 114.4, 115, 115.5,
  116.1, 116.6, 117.1, 117.7, 118.2, 118.8, 119.3, 119.9, 120.4, 120.9, 121.5,
  122, 122.6, 123.1, 123.6, 124.1, 124.6, 125.1, 125.6, 126.2, 126.7, 127.2,
  127.7, 128.2, 128.7, 129.2, 129.7, 130.2, 130.7, 131.1, 131.6, 132.1, 132.6,
  133.1, 133.6, 134, 134.5, 135, 135.5, 136, 136.4, 136.9, 137.4, 137.9, 138.3,
  138.8, 139.3, 139.8, 140.2, 140.7, 141.2, 141.7, 142.1, 142.6, 143.1, 143.6,
  144, 144.5, 145, 145.5, 145.9, 146.4, 146.9, 147.4, 147.9, 148.4, 148.9,
  149.5, 150, 150.5, 151, 151.5, 152, 152.5, 153.1, 153.7, 154.3, 154.8, 155.4,
  156, 156.6, 157.2, 157.8, 158.3, 158.9, 159.5, 160.1, 160.7, 161.3, 161.9,
  162.5, 163.1, 163.7, 164.3, 164.9, 165.5, 166.1, 166.7, 167.1, 167.6, 168,
  168.4, 168.9, 169.3, 169.7, 170.2, 170.6, 171, 171.5, 171.9, 172.1, 172.4,
  172.6, 172.8, 173, 173.3, 173.5, 173.7, 173.9, 174.2, 174.4, 174.6, 174.7,
  174.8, 174.9, 175, 175.1, 175.2, 175.3, 175.4, 175.5, 175.6, 175.7, 175.8,
  175.8, 175.9, 175.9, 176, 176, 176.1, 176.1, 176.1, 176.2, 176.2, 176.3,
  176.3, 176.3, 176.3, 176.4, 176.4, 176.4, 176.4, 176.4, 176.4, 176.5, 176.5,
  176.5, 176.5,
];
const monthlyGirlsMedianHeight = [
  109.4, 109.9, 110.5, 111, 111.5, 112, 112.6, 113.1, 113.6, 114.1, 114.7,
  115.2, 115.7, 116.2, 116.7, 117.2, 117.7, 118.2, 118.8, 119.3, 119.8, 120.3,
  120.8, 121.3, 121.8, 122.3, 122.8, 123.3, 123.8, 124.3, 124.8, 125.2, 125.7,
  126.2, 126.7, 127.2, 127.7, 128.2, 128.6, 129.1, 129.6, 130, 130.5, 131,
  131.4, 131.9, 132.4, 132.8, 133.3, 133.8, 134.3, 134.7, 135.2, 135.7, 136.2,
  136.6, 137.1, 137.6, 138.1, 138.5, 139, 139.5, 140, 140.5, 140.9, 141.4,
  141.9, 142.4, 142.9, 143.4, 143.8, 144.3, 144.8, 145.3, 145.8, 146.3, 146.8,
  147.3, 147.8, 148.2, 148.7, 149.2, 149.7, 150.2, 150.7, 151.1, 151.6, 152,
  152.4, 152.8, 153.3, 153.7, 154.1, 154.5, 155, 155.4, 155.8, 156.1, 156.4,
  156.7, 156.9, 157.2, 157.5, 157.8, 158.1, 158.4, 158.6, 158.9, 159.2, 159.4,
  159.5, 159.7, 159.8, 160, 160.2, 160.3, 160.5, 160.6, 160.8, 160.9, 161.1,
  161.2, 161.3, 161.4, 161.4, 161.5, 161.6, 161.7, 161.8, 161.9, 161.9, 162,
  162.1, 162.1, 162.2, 162.2, 162.3, 162.3, 162.4, 162.4, 162.4, 162.5, 162.5,
  162.6, 162.6, 162.6, 162.7, 162.7, 162.7, 162.7, 162.8, 162.8, 162.8, 162.8,
  162.9, 162.9, 162.9, 162.9, 163, 163, 163, 163, 163.1, 163.1, 163.1, 163.1,
  163.2, 163.2, 163.2,
];
const monthlyBoysMedianWeight = [18.5,18.7,18.9,19.1,19.3,19.5,19.7,19.8,20,20.2,20.4,20.6,20.8,21,21.3,21.5,21.7,21.9,22.2,22.4,22.6,22.8,23.1,23.3,23.5,23.7,24,24.2,24.4,24.6,24.9,25.1,25.3,25.5,25.8,26,26.2,26.5,26.7,27,27.2,27.5,27.8,28,28.3,28.5,28.8,29,29.3,29.6,29.9,30.2,30.5,30.8,31.1,31.4,31.7,32,32.3,32.6,32.9,33.2,33.6,33.9,34.2,34.6,34.9,35.2,35.6,35.9,36.2,36.6,36.9,37.3,37.7,38,38.4,38.8,39.2,39.5,39.9,40.3,40.7,41,41.4,41.9,42.4,42.8,43.3,43.8,44.3,44.7,45.2,45.7,46.2,46.6,47.1,47.6,48.2,48.7,49.3,49.8,50.4,50.9,51.4,52,52.5,53.1,53.6,54,54.5,54.9,55.3,55.8,56.2,56.6,57.1,57.5,57.9,58.4,58.8,59.1,59.4,59.7,60,60.3,60.7,61,61.3,61.6,61.9,62.2,62.5,62.7,62.9,63,63.2,63.4,63.6,63.7,63.9,64.1,64.3,64.4,64.6,64.7,64.8,64.9,65,65.1,65.3,65.4,65.5,65.6,65.7,65.8,65.9,66,66,66.1,66.2,66.2,66.3,66.4,66.4,66.5,66.6,66.6,66.7];
const monthlyGirlsMedianWeight = [18.3,18.5,18.7,18.8,19,19.2,19.4,19.5,19.7,19.9,20.1,20.2,20.4,20.6,20.8,21,21.2,21.4,21.7,21.9,22.1,22.3,22.5,22.7,22.9,23.1,23.4,23.6,23.8,24,24.3,24.5,24.7,24.9,25.2,25.4,25.6,25.8,26.1,26.3,26.6,26.8,27.1,27.3,27.5,27.8,28,28.3,28.5,28.8,29.1,29.4,29.7,30,30.3,30.5,30.8,31.1,31.4,31.7,32,32.3,32.7,33,33.4,33.7,34.1,34.4,34.7,35.1,35.4,35.8,36.1,36.5,36.9,37.3,37.7,38.1,38.5,38.8,39.2,39.6,40,40.4,40.8,41.2,41.6,42,42.4,42.8,43.2,43.6,44,44.4,44.8,45.2,45.6,45.9,46.3,46.6,46.9,47.3,47.6,47.9,48.3,48.6,48.9,49.3,49.6,49.8,50.1,50.3,50.6,50.8,51.1,51.3,51.5,51.8,52,52.3,52.5,52.7,52.8,53,53.1,53.3,53.4,53.6,53.7,53.9,54,54.2,54.3,54.4,54.5,54.6,54.7,54.8,54.9,54.9,55,55.1,55.2,55.3,55.4,55.5,55.6,55.6,55.7,55.8,55.9,55.9,56,56.1,56.2,56.2,56.3,56.4,56.4,56.5,56.5,56.6,56.7,56.7,56.8,56.8,56.9,56.9,57];
const refs = {
  menina: {
    altura: {
      low: [46, 56, 63, 68, 72, 77, 82, 87, 91, 95, 99, 102, 105],
      mid: [49, 61, 67, 72, 76, 82, 87, 92, 96, 100, 104, 108, 112],
      high: [53, 65, 71, 76, 80, 87, 92, 97, 101, 105, 109, 113, 117],
    },
    peso: {
      low: [2.4, 4.2, 5.7, 6.5, 7, 8.1, 9, 9.8, 10.8, 11.5, 12.3, 13.1, 13.9],
      mid: [
        3.2, 5.1, 6.7, 8.2, 8.9, 10.2, 11.5, 12.7, 13.9, 15, 16.1, 17.2, 18.2,
      ],
      high: [
        4.2, 6.5, 8.4, 10.3, 11.3, 12.8, 14.4, 16, 17.6, 19, 20.5, 21.9, 23.4,
      ],
    },
  },
  menino: {
    altura: {
      low: [46, 57, 64, 69, 73, 78, 83, 88, 92, 96, 100, 104, 107],
      mid: [50, 62, 69, 74, 78, 84, 89, 94, 98, 102, 106, 110, 114],
      high: [54, 67, 74, 79, 83, 89, 95, 100, 104, 108, 112, 116, 120],
    },
    peso: {
      low: [
        2.5, 4.6, 6.2, 7.1, 7.7, 8.8, 9.8, 10.8, 11.8, 12.7, 13.7, 14.6, 15.7,
      ],
      mid: [
        3.3, 5.6, 7.4, 8.9, 9.6, 10.9, 12.2, 13.7, 15, 16.3, 17.6, 18.9, 20,
      ],
      high: [
        4.4, 7.2, 9.5, 11.3, 12.4, 14, 15.7, 17.5, 19.1, 20.8, 22.6, 24.4, 26,
      ],
    },
  },
};
const omsHeightReferences = {
  menina: {
    low: [
      99.9, 105.8, 111.3, 116.5, 121.6, 126.6, 131.7, 137, 142, 145.7, 147.9,
      149, 149.6, 149.9, 150.1,
    ],
    p15: [
      104.2, 110.3, 116, 121.5, 126.9, 132.2, 137.7, 143.3, 148.4, 151.9, 154,
      155, 155.5, 155.8, 156,
    ],
    mid: [
      109.4, 115.7, 121.8, 127.7, 133.3, 139, 144.8, 150.7, 155.8, 159.2, 161.1,
      162.1, 162.6, 162.9, 163.2,
    ],
    p85: [
      114.6, 121.2, 127.5, 133.8, 139.9, 145.9, 152, 158.1, 163.2, 166.4, 168.1,
      169, 169.4, 169.7, 170,
    ],
    high: [
      118.9, 125.7, 132.3, 138.8, 145.2, 151.4, 157.9, 164.2, 169.2, 172.3,
      173.9, 174.7, 175.1, 175.4, 175.7,
    ],
  },
  menino: {
    low: [
      100.7, 107, 113, 118.6, 123.8, 128.8, 133.6, 138.6, 144.4, 151, 156.8,
      160.4, 162.2, 162.9, 163.4,
    ],
    p15: [
      104.9, 111.4, 117.6, 123.4, 128.9, 134.2, 139.4, 144.9, 151.3, 158.3,
      163.9, 167.1, 168.6, 169.1, 169.3,
    ],
    mid: [
      110, 116.6, 123.1, 129.2, 135, 140.7, 146.4, 152.5, 159.5, 166.7, 171.9,
      174.6, 175.8, 176.3, 176.5,
    ],
    p85: [
      115.1, 122, 128.8, 135.2, 141.3, 147.3, 153.5, 160.1, 167.6, 174.9, 179.8,
      182.2, 183.2, 183.6, 183.8,
    ],
    high: [
      119.2, 126.3, 133.3, 140, 146.5, 152.9, 159.5, 166.7, 174.6, 181.9, 186.4,
      188.4, 189.3, 189.6, 189.7,
    ],
  },
};
Object.entries(omsHeightReferences).forEach(([sex, reference]) => {
  refs[sex].altura = reference;
});
refs.menina.altura.mid = monthlyGirlsMedianHeight;
refs.menino.altura.mid = monthlyBoysMedianHeight;
refs.menina.peso.mid = monthlyGirlsMedianWeight;
refs.menino.peso.mid = monthlyBoysMedianWeight;
const initial = {
  child: { name: "Lia Martins", birth: "2022-01-15", sex: "menina" },
  measurements: [
    { date: "2025-05-18", age: 40, height: 101, weight: 15.2 },
    { date: "2025-01-12", age: 36, height: 96, weight: 14.4 },
    { date: "2024-09-10", age: 32, height: 92, weight: 13.5 },
  ],
};
const eduardoProfile = {
  id: "eduardo-1",
  child: { name: "Eduardo", birth: "2014-01-15", sex: "menino" },
  measurements: [
    { date: "2019-01-15", age: 60, height: 110, weight: 18.5 },
    { date: "2019-05-15", age: 64, height: 112, weight: 19.3 },
    { date: "2019-09-15", age: 68, height: 114.2, weight: 20.1 },
    { date: "2020-01-15", age: 72, height: 116, weight: 20.8 },
    { date: "2020-05-15", age: 76, height: 118.1, weight: 21.7 },
    { date: "2020-09-15", age: 80, height: 120.2, weight: 22.6 },
    { date: "2021-01-15", age: 84, height: 122, weight: 23.4 },
    { date: "2021-06-15", age: 89, height: 124.3, weight: 24.5 },
    { date: "2021-11-15", age: 94, height: 126.5, weight: 25.8 },
    { date: "2022-03-15", age: 98, height: 128.4, weight: 26.9 },
    { date: "2022-08-15", age: 103, height: 130.8, weight: 28.3 },
    { date: "2023-01-15", age: 108, height: 133.5, weight: 29.8 },
    { date: "2023-06-15", age: 113, height: 135.7, weight: 31.3 },
    { date: "2023-11-15", age: 118, height: 138, weight: 33 },
    { date: "2024-03-15", age: 122, height: 140.2, weight: 34.7 },
    { date: "2024-08-15", age: 127, height: 142.6, weight: 36.5 },
    { date: "2025-01-15", age: 132, height: 144.8, weight: 38.4 },
    { date: "2025-06-15", age: 137, height: 147.3, weight: 40.6 },
    { date: "2025-10-15", age: 141, height: 149.5, weight: 42.8 },
    { date: "2026-01-15", age: 144, height: 151.5, weight: 45 },
  ],
};
const larissaProfile = {
  id: "larissa-1",
  child: { name: "Larissa", birth: "2017-02-10", sex: "menina" },
  measurements: [
    { date: "2022-02-10", age: 60, height: 109.2, weight: 18 },
    { date: "2022-05-10", age: 63, height: 110.8, weight: 18.6 },
    { date: "2022-07-10", age: 65, height: 112, weight: 19.1 },
    { date: "2022-10-10", age: 68, height: 113.6, weight: 19.8 },
    { date: "2022-12-10", age: 70, height: 114.7, weight: 20.3 },
    { date: "2023-02-10", age: 72, height: 115.8, weight: 20.8 },
    { date: "2023-05-10", age: 75, height: 117.3, weight: 21.5 },
    { date: "2023-07-10", age: 77, height: 118.5, weight: 22.1 },
    { date: "2023-10-10", age: 80, height: 120, weight: 22.8 },
    { date: "2023-12-10", age: 82, height: 121.2, weight: 23.5 },
    { date: "2024-02-10", age: 84, height: 122.4, weight: 24.1 },
    { date: "2024-05-10", age: 87, height: 124, weight: 24.9 },
    { date: "2024-07-10", age: 89, height: 125.2, weight: 25.6 },
    { date: "2024-10-10", age: 92, height: 126.8, weight: 26.4 },
    { date: "2024-12-10", age: 94, height: 128, weight: 27.2 },
    { date: "2025-02-10", age: 96, height: 129.3, weight: 28 },
    { date: "2025-05-10", age: 99, height: 131, weight: 29 },
    { date: "2025-08-10", age: 102, height: 132.6, weight: 30 },
    { date: "2025-11-10", age: 105, height: 134.2, weight: 31.1 },
    { date: "2026-02-10", age: 108, height: 135.8, weight: 32.2 },
  ],
};
const emptyGuestData = { activeId: null, profiles: [], child: null, measurements: [] };
let data = JSON.parse(localStorage.getItem(GUEST_KEY) || "null") || structuredClone(emptyGuestData);
if (!Array.isArray(data.profiles)) data = structuredClone(emptyGuestData);
const ensureSampleProfiles = () => {
  [eduardoProfile, larissaProfile].forEach((profile) => {
    if (!data.profiles.some((profileData) => profileData.id === profile.id)) {
      data.profiles.push(structuredClone(profile));
    }
  });
};
const activeProfile = () =>
  data.profiles.find((profileData) => profileData.id === data.activeId) ||
  data.profiles[0];
const syncActiveProfile = () => {
  const current = activeProfile();
  if (!current) return;
  current.child = data.child;
  current.measurements = data.measurements;
};
let view = "overview";
let metric = "altura";
let currentUser = null;
let sessionChecked = false;
let turnstileWidgetId = null;
const app = document.querySelector("#app");
document.querySelector("#tipText").textContent = tips[Math.floor(Math.random() * tips.length)];
const omsHeightReferencesLoaded = true;
const referenceAges = () => heightAges;
const save = () => {
  syncActiveProfile();
  if (!currentUser) {
    localStorage.setItem(GUEST_KEY, JSON.stringify(data));
    return;
  }
  if (location.protocol.startsWith("http"))
    fetch("api.php?action=data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((error) =>
      console.error("Não foi possível salvar no banco de dados.", error),
    );
};
function showAuth(message = "") {
  document.querySelector(".app-shell").classList.add("auth-mode");
  document.querySelector(".topbar").style.display = "none";
  turnstileWidgetId = null;
  app.innerHTML = `<div class="auth-page"><section class="auth-card"><div class="eyebrow"></div><h1>Curva de Crescimento</h1><p class="intro"></p>${message ? `<p class="auth-error">${message}</p>` : ""}<form id="authForm"><div class="field"><label for="authEmail">E-mail</label><input id="authEmail" type="email" autocomplete="email" required></div><div class="field"><label for="authPassword">Senha</label><input id="authPassword" type="password" autocomplete="current-password" minlength="8" required></div><div id="turnstile-widget" hidden></div><div class="form-actions"><button class="button secondary" type="button" id="register">Criar conta</button><button class="button" type="submit">Entrar</button></div></form></section></div>`;
  const renderTurnstile = () => {
    if (!window.turnstile || turnstileWidgetId !== null) return;
    const container = document.querySelector("#turnstile-widget");
    container.hidden = false;
    turnstileWidgetId = window.turnstile.render(container, { sitekey: "0x4AAAAAAE5J5H2B7z4zREFk", action: "signup" });
  };
  renderTurnstile();
  window.addEventListener("turnstile-ready", renderTurnstile, { once: true });
  const submit = async (action) => {
    const guestData = action === "register" ? structuredClone(data) : null;
    const email = document.querySelector("#authEmail").value.trim();
    const password = document.querySelector("#authPassword").value;
    try {
      const token = action === "register" ? window.turnstile?.getResponse(turnstileWidgetId) : null;
      if (action === "register" && !token) throw new Error("Conclua a verificação de segurança.");
      const response = await fetch(`api.php?action=${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, "cf-turnstile-response": token }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível concluir a solicitação.");
      currentUser = result.user;
      data = action === "register" && guestData.profiles.length ? guestData : result.data;
      if (action === "register" && guestData.profiles.length) {
        save();
        localStorage.removeItem(GUEST_KEY);
      }
      render();
    } catch (error) {
      if (turnstileWidgetId !== null) window.turnstile?.reset(turnstileWidgetId);
      showAuth(error.message);
    }
  };
  document.querySelector("#authForm").onsubmit = (event) => { event.preventDefault(); submit("login"); };
  document.querySelector("#register").onclick = () => submit("register");
}
async function migrateToDatabase() {
  if (!location.protocol.startsWith("http")) return;
  try {
    const sessionResponse = await fetch("api.php?action=session", { cache: "no-store" });
    const session = await sessionResponse.json();
    sessionChecked = true;
    if (!session.user) {
      data = JSON.parse(localStorage.getItem(GUEST_KEY) || "null") || structuredClone(emptyGuestData);
      view = data.profiles.length ? "overview" : "child";
      return render();
    }
    currentUser = session.user;
    const response = await fetch("api.php?action=data", { cache: "no-store" });
    if (!response.ok) throw new Error("Não foi possível carregar o banco de dados.");
    data = await response.json();
    render();
  } catch (error) {
    sessionChecked = true;
    showAuth("Não foi possível conectar ao banco de dados.");
  }
}
const months = (date) =>
  Math.max(
    0,
    Math.floor((Date.now() - new Date(`${date}T12:00:00`)) / 2629800000),
  );
const ageLabel = () => {
  const m = months(data.child.birth);
  return m < 12 ? `${m} meses` : `${Math.floor(m / 12)} anos e ${m % 12} meses`;
};
const dateLabel = (value) =>
  new Date(`${value}T12:00:00`)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/");
const valueAt = (values, age, kind) => {
  const reference =
    kind === "altura" && values.length === annualHeightAges.length
      ? annualHeightAges
      : referenceAges(kind);
  if (age <= reference[0]) return values[0];
  if (age >= reference[reference.length - 1]) return values[values.length - 1];
  const index = reference.findIndex((value) => value > age) - 1;
  const ratio =
    (age - reference[index]) / (reference[index + 1] - reference[index]);
  return values[index] + (values[index + 1] - values[index]) * ratio;
};
const percentile = (value, age, kind) => {
  const ref = refs[data.child.sex][kind];
  const low = valueAt(ref.low, age, kind);
  const mid = valueAt(ref.mid, age, kind);
  const high = valueAt(ref.high, age, kind);
  return value <= mid
    ? Math.max(3, Math.round(3 + (47 * (value - low)) / (mid - low)))
    : Math.min(97, Math.round(50 + (47 * (value - mid)) / (high - mid)));
};

function profile() {
  if (!data.child) {
    document.querySelector("#sidebarName").textContent = "Nova conta";
    document.querySelector("#sidebarAge").textContent = "Cadastre uma criança";
    document.querySelector("#sidebarAvatar").textContent = "+";
    document.querySelector("#profileToggle").hidden = true;
    document.querySelector("#profileMenu").hidden = true;
    return;
  }
  document.querySelector("#profileToggle").hidden = false;
  document.querySelector("#sidebarName").textContent = data.child.name;
  document.querySelector("#sidebarAge").textContent = ageLabel();
  document.querySelector("#sidebarAvatar").textContent = data.child.name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const menu = document.querySelector("#profileMenu");
  menu.innerHTML = `${data.profiles.map((profileData) => `<button class="profile-option ${profileData.id === data.activeId ? "active-profile" : ""}" data-profile-id="${profileData.id}">${profileData.child.name}<small>${profileData.child.sex === "menina" ? "Menina" : "Menino"}</small></button>`).join("")}<button class="profile-option new" data-new-child>＋ Cadastrar nova criança</button>`;
  document.querySelector("#profileToggle").onclick = () => {
    menu.hidden = !menu.hidden;
  };
  menu
    .querySelectorAll("[data-profile-id]")
    .forEach(
      (button) =>
        (button.onclick = () => switchProfile(button.dataset.profileId)),
    );
  menu.querySelector("[data-new-child]").onclick = () => {
    menu.hidden = true;
    childForm(true);
  };
}
function switchProfile(id) {
  if (id === data.activeId) return;
  save();
  const next = data.profiles.find((profileData) => profileData.id === id);
  if (!next) return;
  data.activeId = next.id;
  data.child = next.child;
  data.measurements = next.measurements;
  metric = "altura";
  view = "overview";
  save();
  render();
}
function shell(content) {
  document.querySelector(".app-shell").classList.remove("auth-mode");
  document.querySelector(".topbar").style.display = "";
  const guestTopbar = document.querySelector("#guestTopbar");
  guestTopbar.hidden = Boolean(currentUser);
  const userTopbar = document.querySelector("#userTopbar");
  userTopbar.hidden = !currentUser;
  if (currentUser) document.querySelector("#userEmail").textContent = currentUser.email;
  if (!currentUser) {
    document.querySelector("#guestAuthForm").onsubmit = async (event) => {
      event.preventDefault();
      const response = await fetch("api.php?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: document.querySelector("#guestEmail").value.trim(), password: document.querySelector("#guestPassword").value }),
      });
      const result = await response.json();
      if (!response.ok) return showAuth(result.error || "Não foi possível entrar.");
      currentUser = result.user;
      data = result.data;
      render();
    };
    document.querySelector("#guestRegister").onclick = () => showAuth();
  } else {
    document.querySelector("#topbarLogout").onclick = () => document.querySelector("#logout").click();
  }
  app.innerHTML = `<div class="page">${content}</div>`;
  document
    .querySelectorAll(".nav-item[data-view]")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.view === view),
    );
  profile();
  document.querySelectorAll("[data-view]").forEach(
    (button) =>
      (button.onclick = () => {
        view = button.dataset.view;
        render();
      }),
  );
  document
    .querySelectorAll("[data-new-child]")
    .forEach((button) => (button.onclick = () => childForm(true)));
  const accountButton = document.querySelector("#logout");
  if (!currentUser) {
    accountButton.innerHTML = "<span>↪</span> Entrar / Criar conta";
    accountButton.onclick = () => showAuth();
  } else {
    accountButton.innerHTML = "<span>↪</span> Sair";
    accountButton.onclick = async () => {
      await fetch("api.php?action=logout", { method: "POST" });
      currentUser = null;
      data = JSON.parse(localStorage.getItem(GUEST_KEY) || "null") || structuredClone(emptyGuestData);
      view = data.profiles.length ? "overview" : "child";
      render();
    };
  }
}
function graph(kind = metric) {
  const ref = refs[data.child.sex][metric];
  const w = 760;
  const h = 280;
  const min = metric === "altura" ? 40 : 0;
  const max = metric === "altura" ? 130 : 28;
  const x = (age) => 43 + (age / 60) * (w - 58);
  const y = (value) => h - 32 - ((value - min) / (max - min)) * (h - 46);
  const line = (key) =>
    ages
      .map(
        (age, i) =>
          `${i ? "L" : "M"}${x(age).toFixed(1)},${y(ref[key][i]).toFixed(1)}`,
      )
      .join(" ");
  const area =
    ages.map((age, i) => `${x(age)},${y(ref.high[i])}`).join(" ") +
    " " +
    ages
      .slice()
      .reverse()
      .map((age, i) => `${x(age)},${y(ref.low[ages.length - i - 1])}`)
      .join(" ");
  const grid = [0, 20, 40, 60, 80, 100, 120].filter(
    (n) => n >= min && n <= max,
  );
  const dots = data.measurements
    .slice()
    .reverse()
    .map(
      (item) =>
        `<circle cx="${x(item.age)}" cy="${y(metric === "altura" ? item.height : item.weight)}" r="5" fill="#ee8f76" stroke="#fff" stroke-width="3"/>`,
    )
    .join("");
  return `<div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Gráfico de ${metric}"><polygon points="${area}" fill="#d9f0e5" opacity=".7"/>${grid.map((n) => `<line x1="43" y1="${y(n)}" x2="745" y2="${y(n)}" stroke="#e8efed"/><text x="33" y="${y(n) + 4}" text-anchor="end" font-size="10" fill="#8b9997">${n}</text>`).join("")}<path d="${line("mid")}" fill="none" stroke="#126a61" stroke-width="3" stroke-linecap="round"/>${ages.map((age) => `<text x="${x(age)}" y="271" text-anchor="middle" font-size="10" fill="#8b9997">${age}</text>`).join("")}<text x="748" y="271" text-anchor="end" font-size="10" fill="#8b9997">meses</text>${dots}</svg></div>`;
}
function overview() {
  const latest = data.measurements[0];
  const height = latest?.height || 0;
  const weight = latest?.weight || 0;
  const childMonths = months(data.child.birth);
  const latestAge = latest ? ageAtDate(data.child.birth, latest.date) : null;
  const medianHeight = latest
    ? valueAt(refs[data.child.sex].altura.mid, latestAge, "altura")
    : null;
  const heightDifference = latest
    ? ((height - medianHeight) / medianHeight) * 100
    : null;
  const medianWeight = latest
    ? valueAt(refs[data.child.sex].peso.mid, latestAge, "peso")
    : null;
  const weightDifference = latest
    ? ((weight - medianWeight) / medianWeight) * 100
    : null;
  const heightStatus =
    heightDifference === null
      ? ""
      : `${Math.abs(heightDifference).toFixed(1).replace(".", ",")}% ${heightDifference >= 0 ? "acima" : "abaixo"} da curva`;
  const weightStatus =
    weightDifference === null
      ? ""
      : `${Math.abs(weightDifference).toFixed(1).replace(".", ",")}% ${weightDifference >= 0 ? "acima" : "abaixo"} da curva`;
  shell(
    `<div class="page-heading"><div><div class="eyebrow">Acompanhamento de crescimento</div><h1>Olá, ${data.child.name.split(" ")[0]}!</h1><p class="intro">Veja como está o desenvolvimento de ${data.child.name.split(" ")[0]}.</p></div><span class="date-label">Atualizado hoje</span></div><div class="stats"><div class="stat"><div class="stat-top">Idade <span class="stat-icon">◷</span></div><div class="stat-value">${ageLabel()}</div><div class="trend">${childMonths} meses</div></div><div class="stat"><div class="stat-top">Altura <span class="stat-icon">↕</span></div><div class="stat-value">${height || "—"} <small>cm</small></div><div class="trend">${latest ? `Última medição · ${heightStatus}` : ""}</div></div><div class="stat"><div class="stat-top">Peso <span class="stat-icon">◒</span></div><div class="stat-value">${weight || "—"} <small>kg</small></div><div class="trend">${latest ? "Última medição" : ""}</div></div></div><section class="chart-card"><div class="card-head"><div><div class="eyebrow">Acompanhamento de crescimento</div><h1>Olá, ${data.child.name.split(" ")[0]}!</h1><p class="intro">Veja como está o desenvolvimento de ${data.child.name.split(" ")[0]}.</p></div><span class="date-label">Atualizado hoje</span></div><div class="stats"><div class="stat"><div class="stat-top">Idade <span class="stat-icon">◷</span></div><div class="stat-value">${ageLabel()}</div><div class="trend neutral">${childMonths} meses</div></div><div class="stat"><div class="stat-top">Altura <span class="stat-icon">↕</span></div><div class="stat-value">${height || "—"} <small>cm</small></div><div class="trend">${latest ? `Última medição · ${heightStatus}` : ""}</div></div><div class="stat"><div class="stat-top">Peso <span class="stat-icon">◒</span></div><div class="stat-value">${weight || "—"} <small>kg</small></div><div class="trend">${latest ? "Última medição" : ""}</div></div></div><section class="chart-card"><div class="card-head"><div><h2>Curva de crescimento</h2><p>Comparação com os padrões de crescimento da OMS</p></div><div class="segmented"><button class="metric-btn ${metric === "altura" ? "active" : ""}" data-metric="altura">Altura</button><button class="metric-btn ${metric === "peso" ? "active" : ""}" data-metric="peso">Peso</button></div></div>${graph()}<div class="chart-legend"><span><i class="legend-line green"></i>Mediana OMS</span><span><i class="legend-line band"></i>Faixa de referência</span><span><i class="legend-line dot"></i>${data.child.name.split(" ")[0]}</span></div></section><div class="bottom-grid"><section class="list-card"><h2>Últimas medições <button class="button secondary" style="float:right;padding:7px 10px" data-view="measurements">Ver todas</button></h2>${data.measurements
      .slice(0, 3)
      .map(
        (item) =>
          `<div class="measurement-row"><div><strong>${dateLabel(item.date)}</strong><small>${item.age} meses de idade</small></div><div style="text-align:right"><strong>${item.height} cm · ${item.weight} kg</strong></div></div>`,
      )
      .join(
        "",
      )}</section><section class="list-card"><h2>Registro rápido</h2><p class="intro">Adicione uma nova medição para acompanhar a evolução.</p><button class="button" data-view="measurements" style="margin-top:18px">＋ Nova medição</button><p class="disclaimer">As curvas são referências baseadas nos padrões da Organização Mundial da Saúde e não substituem a avaliação do pediatra.</p></section></div>`,
  );
  document.querySelector(".chart-card").outerHTML = `<section class="chart-card"><div class="card-head"><h2>Altura</h2></div>${graph("altura")}</section><section class="chart-card"><div class="card-head"><h2>Peso</h2></div>${graph("peso")}</section>`;
  const quickMeasurement = document.createElement("section");
  quickMeasurement.className = "quick-measurement";
  quickMeasurement.innerHTML = `<div><h2>Nova medição</h2><p>Registre os dados mais recentes.</p></div><div class="quick-measurement-fields"><div class="field"><label for="quickMeasureDate">Data</label><input id="quickMeasureDate" type="date" value="${new Date().toISOString().slice(0, 10)}"></div><div class="field"><label for="quickMeasureHeight">Altura (cm)</label><input id="quickMeasureHeight" type="number" step="0.1" min="30" max="200"></div><div class="field"><label for="quickMeasureWeight">Peso (kg)</label><input id="quickMeasureWeight" type="number" step="0.1" min="1" max="100"></div><button class="button" id="saveQuickMeasurement">Salvar</button></div>`;
  document.querySelector(".page-heading").after(quickMeasurement);
  document.querySelector("#saveQuickMeasurement").onclick = () => {
    const height = Number(document.querySelector("#quickMeasureHeight").value);
    const weight = Number(document.querySelector("#quickMeasureWeight").value);
    if (!height || !weight) return alert("Preencha altura e peso para salvar a medição.");
    const date = document.querySelector("#quickMeasureDate").value;
    data.measurements.unshift({ date, age: ageAtDate(data.child.birth, date), height, weight });
    data.measurements.sort((first, second) => new Date(second.date) - new Date(first.date));
    save();
    render();
  };
  document.querySelectorAll(".metric-btn").forEach(
    (button) =>
      (button.onclick = () => {
        metric = button.dataset.metric;
        overview();
      }),
  );
}
overview = function () {
  const sortedMeasurements = [...data.measurements].sort(
    (first, second) => new Date(second.date) - new Date(first.date),
  );
  const latest = sortedMeasurements[0];
  const height = latest?.height || 0;
  const weight = latest?.weight || 0;
  const latestAge = latest ? ageAtDate(data.child.birth, latest.date) : null;
  const medianHeight = latest
    ? valueAt(refs[data.child.sex].altura.mid, latestAge, "altura")
    : null;
  const heightDifference = latest
    ? ((height - medianHeight) / medianHeight) * 100
    : null;
  const medianWeight = latest
    ? valueAt(refs[data.child.sex].peso.mid, latestAge, "peso")
    : null;
  const weightDifference = latest
    ? ((weight - medianWeight) / medianWeight) * 100
    : null;
  const heightStatus =
    heightDifference === null
      ? ""
      : `${Math.abs(heightDifference).toFixed(1).replace(".", ",")}% ${heightDifference >= 0 ? "acima" : "abaixo"} da curva`;
  const weightStatus =
    weightDifference === null
      ? ""
      : `${Math.abs(weightDifference).toFixed(1).replace(".", ",")}% ${weightDifference >= 0 ? "acima" : "abaixo"} da curva`;
  shell(
    `<div class="page-heading"><div><div class="eyebrow">Acompanhamento de crescimento</div><h1>Olá, ${data.child.name.split(" ")[0]}!</h1><p class="intro">Veja como está o desenvolvimento de ${data.child.name.split(" ")[0]}.</p></div><span class="date-label">Atualizado hoje</span></div><div class="stats"><div class="stat"><div class="stat-top">Idade <span class="stat-icon">◷</span></div><div class="stat-value">${ageLabel()}</div><div class="trend">${months(data.child.birth)} meses</div></div><div class="stat"><div class="stat-top">Altura <span class="stat-icon">↕</span></div><div class="stat-value">${height || "—"} <small>cm</small></div><div class="trend">${latest ? heightStatus : ""}</div></div><div class="stat"><div class="stat-top">Peso <span class="stat-icon">◒</span></div><div class="stat-value">${weight || "—"} <small>kg</small></div><div class="trend">${latest ? weightStatus : ""}</div></div></div><section class="chart-card"><div class="card-head"><div><h2>Curva de crescimento</h2></div><div class="segmented"><button class="metric-btn ${metric === "altura" ? "active" : ""}" data-metric="altura">Altura</button><button class="metric-btn ${metric === "peso" ? "active" : ""}" data-metric="peso">Peso</button></div></div>${graph()}<div class="chart-legend"><span><i class="legend-line green"></i>Mediana OMS</span><span><i class="legend-line band"></i>Faixa de referência</span><span><i class="legend-line dot"></i>${data.child.name.split(" ")[0]}</span></div></section><div class="bottom-grid"><section class="list-card"><h2>Últimas medições <button class="button secondary" style="float:right;padding:7px 10px" data-view="measurements">Ver todas</button></h2>${sortedMeasurements
      .slice(0, 3)
      .map(
        (item) =>
          `<div class="measurement-row"><div><strong>${dateLabel(item.date)}</strong><small>${item.age} meses de idade</small></div><div style="text-align:right"><strong>${item.height} cm · ${item.weight} kg</strong></div></div>`,
      )
      .join(
        "",
      )}</section><section class="list-card"><h2>Registro rápido</h2><p class="intro">Adicione uma nova medição para acompanhar a evolução.</p><button class="button" data-view="measurements" style="margin-top:18px">＋ Nova medição</button><p class="disclaimer">As curvas são referências baseadas nos padrões da Organização Mundial da Saúde e não substituem a avaliação do pediatra.</p></section></div>`,
  );
  const quickMeasurement = document.createElement("section");
  quickMeasurement.className = "quick-measurement";
  quickMeasurement.innerHTML = `<div><h2>Nova medição</h2><p>Registre os dados mais recentes.</p></div><div class="quick-measurement-fields"><div class="field"><label for="quickMeasureDate">Data</label><input id="quickMeasureDate" type="date" value="${new Date().toISOString().slice(0, 10)}"></div><div class="field"><label for="quickMeasureHeight">Altura (cm)</label><input id="quickMeasureHeight" type="number" step="0.1" min="30" max="200"></div><div class="field"><label for="quickMeasureWeight">Peso (kg)</label><input id="quickMeasureWeight" type="number" step="0.1" min="1" max="100"></div><button class="button" id="saveQuickMeasurement">Salvar</button></div>`;
  document.querySelector(".page-heading").after(quickMeasurement);
  document.querySelector("#saveQuickMeasurement").onclick = () => {
    const height = Number(document.querySelector("#quickMeasureHeight").value);
    const weight = Number(document.querySelector("#quickMeasureWeight").value);
    if (!height || !weight) return alert("Preencha altura e peso para salvar a medição.");
    const date = document.querySelector("#quickMeasureDate").value;
    data.measurements.unshift({ date, age: ageAtDate(data.child.birth, date), height, weight });
    data.measurements.sort((first, second) => new Date(second.date) - new Date(first.date));
    save();
    render();
  };
  document.querySelectorAll(".metric-btn").forEach(
    (button) =>
      (button.onclick = () => {
        metric = button.dataset.metric;
        overview();
      }),
  );
};

function measurements() {
  const sortedMeasurements = data.measurements
    .map((item, index) => ({ item, index }))
    .sort((first, second) => new Date(second.item.date) - new Date(first.item.date));
  const comparison = (value, item, kind) => {
    const age = ageAtDate(data.child.birth, item.date);
    const median = valueAt(refs[data.child.sex][kind].mid, age, kind);
    const difference = ((value - median) / median) * 100;
    return `${Math.abs(difference).toFixed(1).replace(".", ",")}% ${difference >= 0 ? "acima" : "abaixo"}`;
  };
  shell(
    `<div class="page-heading"><div><div class="eyebrow">Histórico</div><h1>Medições</h1><p class="intro">Registre o crescimento de ${data.child.name.split(" ")[0]} ao longo do tempo.</p></div><button class="button" id="newMeasurement">＋ Nova medição</button></div><section class="list-card measurement-table-wrap">${sortedMeasurements.length ? `<table class="measurement-table"><thead><tr><th>Data</th><th>Mês</th><th>Altura</th><th>% Altura</th><th>Peso</th><th>% Peso</th><th aria-label="Ações"></th></tr></thead><tbody>${sortedMeasurements.map(({ item, index }) => `<tr><td>${dateLabel(item.date)}</td><td>${ageAtDate(data.child.birth, item.date)}</td><td>${item.height} cm</td><td>${comparison(item.height, item, "altura")}</td><td>${item.weight} kg</td><td>${comparison(item.weight, item, "peso")}</td><td><button class="button secondary edit-button" data-edit="${index}">Editar</button></td></tr>`).join("")}</tbody></table>` : '<div class="empty">Você ainda não adicionou medições.</div>'}</section><p class="disclaimer">Converse com o pediatra para interpretar os dados de forma adequada.</p>`,
  );
  document.querySelector("#newMeasurement").onclick = measurementForm;
}
function measurementForm() {
  shell(
    `<div class="page-heading"><div><div class="eyebrow">Novo registro</div><h1>Adicionar medição</h1><p class="intro">Informe os dados anotados na consulta ou em casa.</p></div></div><section class="form-card"><div class="form-grid"><div class="field"><label for="measureDate">Data da medição</label><input id="measureDate" type="date" value="${new Date().toISOString().slice(0, 10)}"></div><div class="field measurement-age-field"><label for="measureAge">Idade em meses</label><input id="measureAge" type="number" min="0" max="228" value="${months(data.child.birth)}"></div><div class="field"><label for="measureHeight">Altura (cm)</label><input id="measureHeight" type="number" step="0.1" min="30" max="200" placeholder="Ex.: 101,5"></div><div class="field"><label for="measureWeight">Peso (kg)</label><input id="measureWeight" type="number" step="0.1" min="1" max="100" placeholder="Ex.: 15,2"></div></div><div class="form-actions"><button class="button secondary" id="cancel">Cancelar</button><button class="button" id="saveMeasurement">Salvar medição</button></div></section>`,
  );
  document.querySelector("#cancel").onclick = measurements;
  document.querySelector("#saveMeasurement").onclick = () => {
    const height = Number(document.querySelector("#measureHeight").value);
    const weight = Number(document.querySelector("#measureWeight").value);
    if (!height || !weight)
      return alert("Preencha altura e peso para salvar a medição.");
    data.measurements.unshift({
      date: document.querySelector("#measureDate").value,
      age: Number(document.querySelector("#measureAge").value),
      height,
      weight,
    });
    data.measurements.sort((a, b) => new Date(b.date) - new Date(a.date));
    save();
    view = "overview";
    render();
  };
}
function childForm(isNew = false) {
  const child = isNew ? { name: "", birth: "", sex: "menino" } : data.child;
  shell(
    `<div class="page-heading"><div><div class="eyebrow">${isNew ? "Novo cadastro" : "Perfil"}</div><h1>${isNew ? "Cadastrar criança" : "Dados da criança"}</h1><p class="intro">Essas informações ajudam a contextualizar as curvas de referência.</p></div>${!isNew ? '<button class="button" data-new-child>＋ Cadastrar outra criança</button>' : ""}</div><section class="form-card child-form"><div class="form-grid"><div class="field"><label for="childName">Nome da criança</label><input id="childName" value="${child.name}" placeholder="Ex.: Sofia Martins"></div><div class="field"><label for="childBirth">Data de nascimento</label><input id="childBirth" type="date" value="${child.birth}"></div><div class="field"><span class="field-label">Sexo</span><div class="sex-toggle" role="radiogroup" aria-label="Sexo"><input id="childSexBoy" name="childSex" type="radio" value="menino" ${child.sex === "menino" ? "checked" : ""}><label for="childSexBoy">Menino</label><input id="childSexGirl" name="childSex" type="radio" value="menina" ${child.sex === "menina" ? "checked" : ""}><label for="childSexGirl">Menina</label></div></div></div><div class="form-actions"><button class="button secondary" id="cancelChild">Cancelar</button><button class="button" id="saveChild">${isNew ? "Cadastrar criança" : "Salvar dados"}</button></div></section>`,
  );
  document.querySelector("#cancelChild").onclick = () => {
    view = "overview";
    render();
  };
  document.querySelector("#saveChild").onclick = () => {
    const newChild = {
      name: document.querySelector("#childName").value.trim() || "Nova criança",
      birth: document.querySelector("#childBirth").value,
      sex: document.querySelector('input[name="childSex"]:checked').value,
    };
    if (!newChild.birth) return alert("Informe a data de nascimento.");
    if (isNew) {
      const id = `child-${Date.now()}`;
      data.profiles.push({ id, child: newChild, measurements: [] });
      data.activeId = id;
      data.child = newChild;
      data.measurements = [];
    } else {
      data.child = newChild;
    }
    save();
    view = "overview";
    render();
  };
}
function editMeasurement(index) {
  const item = data.measurements[index];
  shell(
    `<div class="page-heading"><div><div class="eyebrow">Histórico</div><h1>Editar medição</h1><p class="intro">Atualize os dados registrados para esta data.</p></div></div><section class="form-card edit-measurement-form"><div class="form-grid"><div class="field"><label for="measureDate">Data da medição</label><input id="measureDate" type="date" value="${item.date}"></div><div class="field measurement-age-field"><label for="measureAge">Idade em meses</label><input id="measureAge" type="number" min="0" max="228" value="${item.age}"></div><div class="field"><label for="measureHeight">Altura (cm)</label><input id="measureHeight" type="number" step="0.1" min="30" max="200" value="${item.height}"></div><div class="field"><label for="measureWeight">Peso (kg)</label><input id="measureWeight" type="number" step="0.1" min="1" max="100" value="${item.weight}"></div></div><div class="form-actions"><button class="button secondary" id="cancelEdit">Cancelar</button><button class="button" id="saveEdit">Salvar alterações</button></div></section>`,
  );
  document.querySelector("#cancelEdit").onclick = measurements;
  document.querySelector("#saveEdit").onclick = () => {
    const height = Number(document.querySelector("#measureHeight").value);
    const weight = Number(document.querySelector("#measureWeight").value);
    if (!height || !weight)
      return alert("Preencha altura e peso para salvar a medição.");
    data.measurements[index] = {
      date: document.querySelector("#measureDate").value,
      age: Number(document.querySelector("#measureAge").value),
      height,
      weight,
    };
    data.measurements.sort((a, b) => new Date(b.date) - new Date(a.date));
    save();
    view = "overview";
    render();
  };
}

function measurements() {
  const sortedMeasurements = data.measurements
    .map((item, index) => ({ item, index }))
    .sort((first, second) => new Date(second.item.date) - new Date(first.item.date));
  const comparison = (value, item, kind) => {
    const age = ageAtDate(data.child.birth, item.date);
    const median = valueAt(refs[data.child.sex][kind].mid, age, kind);
    const difference = ((value - median) / median) * 100;
    return `${Math.abs(difference).toFixed(1).replace(".", ",")}% ${difference >= 0 ? "acima" : "abaixo"}`;
  };
  shell(
    `<div class="page-heading"><div><div class="eyebrow">Histórico</div><h1>Medições</h1><p class="intro">Registre o crescimento de ${data.child.name.split(" ")[0]} ao longo do tempo.</p></div><button class="button" id="newMeasurement">＋ Nova medição</button></div><section class="list-card measurement-table-wrap">${sortedMeasurements.length ? `<table class="measurement-table"><thead><tr><th>Data</th><th>Mês</th><th>Altura</th><th>% Altura</th><th>Peso</th><th>% Peso</th><th aria-label="Ações"></th></tr></thead><tbody>${sortedMeasurements.map(({ item, index }) => `<tr><td>${dateLabel(item.date)}</td><td>${ageAtDate(data.child.birth, item.date)}</td><td>${item.height} cm</td><td>${comparison(item.height, item, "altura")}</td><td>${item.weight} kg</td><td>${comparison(item.weight, item, "peso")}</td><td><button class="button secondary edit-button" data-edit="${index}">Editar</button></td></tr>`).join("")}</tbody></table>` : '<div class="empty">Você ainda não adicionou medições.</div>'}</section><p class="disclaimer">Converse com o pediatra para interpretar os dados de forma adequada.</p>`,
  );
  document.querySelector("#newMeasurement").onclick = measurementForm;
  document
    .querySelectorAll("[data-edit]")
    .forEach(
      (button) =>
        (button.onclick = () => editMeasurement(Number(button.dataset.edit))),
    );
}

function removeMeasurement(index) {
  const item = data.measurements[index];
  const confirmed = confirm(
    `Tem certeza que deseja excluir a medição de ${dateLabel(item.date)}? Essa ação não pode ser desfeita.`,
  );
  if (!confirmed) return;
  data.measurements.splice(index, 1);
  save();
  render();
}

function render() {
  if (!sessionChecked && location.protocol.startsWith("http")) {
    app.innerHTML = '<div class="auth-page"><div class="empty">Carregando...</div></div>';
    return;
  }
  if (!data.profiles.length) return childForm(true);
  if (view === "overview") overview();
  else if (view === "measurements") measurements();
  else childForm();
  if (view !== "measurements") return;
  document.querySelectorAll(".measurement-row").forEach((row, index) => {
    const button = document.createElement("button");
    button.className = "button secondary delete-button";
    button.textContent = "Excluir";
    button.onclick = () => removeMeasurement(index);
    row.lastElementChild.appendChild(button);
  });
}

function graph(kind = metric) {
  const ref = refs[data.child.sex][kind];
  const isHeight = kind === "altura";
  if (isHeight && !omsHeightReferencesLoaded)
    return '<div class="chart-wrap empty">Carregando curva OMS...</div>';
  const chartAges = referenceAges(kind);
  const measurementAge = (item) => ageAtDate(data.child.birth, item.date);
  const minAge = chartAges[0];
  const maxAge = chartAges[chartAges.length - 1];
  const width = 760;
  const height = 280;
  const minValue = isHeight ? 100 : 15;
  const maxValue = isHeight ? 190 : 70;
  const plotLeft = 60;
  const plotRight = 745;
  const x = (age) =>
    plotLeft + ((age - minAge) / (maxAge - minAge)) * (plotRight - plotLeft);
  const y = (value) =>
    height - 32 - ((value - minValue) / (maxValue - minValue)) * (height - 46);
  const interpolateCurve = (values) =>
    values.length === chartAges.length
      ? values
      : chartAges.map((age) => valueAt(values, age, kind));
  const mid = interpolateCurve(ref.mid);
  const low = isHeight
    ? interpolateCurve(ref.low).map(
        (value, index) => mid[index] - (mid[index] - value) * 0.5,
      )
    : mid.map((value) => value * 0.9);
  const high = isHeight
    ? interpolateCurve(ref.high).map(
        (value, index) => mid[index] + (value - mid[index]) * 0.5,
      )
    : mid.map((value) => value * 1.1);
  const line = (values) =>
    chartAges
      .map(
        (age, index) =>
          `${index ? "L" : "M"}${x(age).toFixed(1)},${y(values[index]).toFixed(1)}`,
      )
      .join(" ");
  const area =
    chartAges.map((age, index) => `${x(age)},${y(high[index])}`).join(" ") +
    " " +
    chartAges
      .slice()
      .reverse()
      .map((age, index) => `${x(age)},${y(low[chartAges.length - index - 1])}`)
      .join(" ");
  const grid = isHeight
    ? [100, 110, 120, 130, 140, 150, 160, 170, 180, 190]
    : [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
  const labels = annualHeightAges.map((age, index) => ({ age, label: index + 5 }));
  const unit = isHeight ? "cm" : "kg";
  const curveColor = data.child.sex === "menino" ? "#2589c5" : "#d96b9b";
  const bandColor = data.child.sex === "menino" ? "#cfeaf8" : "#f7d5e3";
  const chartMeasurements = data.measurements
    .filter(
      (item) =>
        measurementAge(item) >= minAge && measurementAge(item) <= maxAge,
    )
    .slice()
    .sort((first, second) => new Date(first.date) - new Date(second.date));
  const measurementLine = chartMeasurements.length > 1
    ? `<path d="${chartMeasurements.map((item, index) => `${index ? "L" : "M"}${x(measurementAge(item)).toFixed(1)},${y(isHeight ? item.height : item.weight).toFixed(1)}`).join(" ")}" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>`
    : "";
  const latestMeasurement = chartMeasurements.at(-1);
  const point = latestMeasurement
    ? (() => {
        const value = isHeight ? latestMeasurement.height : latestMeasurement.weight;
        const age = measurementAge(latestMeasurement);
        return `<circle cx="${x(age)}" cy="${y(value)}" r="5" fill="none" stroke="red" stroke-opacity="0.4" stroke-width="2"><title>${value} ${unit} aos ${age} meses</title></circle>`;
      })()
    : "";
  const verticalGrid = labels.map(({ age }) => `<line x1="${x(age)}" y1="32" x2="${x(age)}" y2="248" stroke="#e8efed"/>`).join("");
  return `<div class="chart-wrap" style="--curve-color:${curveColor};--band-color:${bandColor}"><svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Gráfico de ${isHeight ? "altura por idade" : "peso por idade"}"><polygon points="${area}" fill="${bandColor}" opacity=".7"/>${verticalGrid}${grid.map((value) => `<line x1="${plotLeft}" y1="${y(value)}" x2="${plotRight}" y2="${y(value)}" stroke="#e8efed"/><text x="52" y="${y(value) + 4}" text-anchor="end" font-size="10" fill="#8b9997">${value}</text>`).join("")}<text x="15" y="${height / 2}" transform="rotate(-90 15 ${height / 2})" text-anchor="middle" font-size="10" fill="#8b9997">${isHeight ? "Altura (cm)" : "Peso (kg)"}</text><path d="${line(mid)}" fill="none" stroke="${curveColor}" stroke-width="3" stroke-linecap="round"/>${measurementLine}${labels.map(({ age, label }) => `<text x="${x(age)}" y="255" text-anchor="middle" font-size="10" fill="#8b9997">${label}</text>`).join("")}<text x="402" y="278" text-anchor="middle" font-size="10" fill="#8b9997">Idade (anos)</text>${point}</svg></div>`;
}

function ageAtDate(birth, measured) {
  const birthDate = new Date(`${birth}T12:00:00`);
  const measuredDate = new Date(`${measured}T12:00:00`);
  let age = (measuredDate.getFullYear() - birthDate.getFullYear()) * 12;
  age += measuredDate.getMonth() - birthDate.getMonth();
  if (measuredDate.getDate() < birthDate.getDate()) age -= 1;
  return Math.max(0, Math.min(228, age));
}

function syncMeasurementAge() {
  const dateField = document.querySelector("#measureDate");
  const ageField = document.querySelector("#measureAge");
  if (!dateField || !ageField || !dateField.value) return;
  ageField.value = ageAtDate(data.child.birth, dateField.value);
  ageField.readOnly = true;
}

document.addEventListener("change", (event) => {
  if (event.target.id === "measureDate") syncMeasurementAge();
});
document.addEventListener("click", (event) => {
  if (event.target.id === "saveQuickMeasurement") {
    const height = document.querySelector("#quickMeasureHeight");
    const weight = document.querySelector("#quickMeasureWeight");
    if (!height.value || !weight.value) {
      document.querySelector(".quick-measurement")?.classList.add("has-validation-error");
    }
  }
  if (
    event.target.id === "newMeasurement" ||
    event.target.matches("[data-edit]")
  ) {
    setTimeout(syncMeasurementAge, 0);
  }
});
document.addEventListener("input", (event) => {
  if (event.target.id === "quickMeasureHeight" || event.target.id === "quickMeasureWeight") {
    const quickMeasurement = document.querySelector(".quick-measurement");
    const height = document.querySelector("#quickMeasureHeight");
    const weight = document.querySelector("#quickMeasureWeight");
    quickMeasurement?.classList.toggle("has-validation-error", !height.value || !weight.value);
  }
});

const fitChart = () =>
  document
    .querySelectorAll(".who-chart svg")
    .forEach((svg) => svg.setAttribute("preserveAspectRatio", "none"));
const chartObserver = new MutationObserver(fitChart);
chartObserver.observe(app, { childList: true, subtree: true });
const baseOverview = overview;
overview = function () {
  baseOverview();
  const chartCard = document.querySelector(".chart-card");
  if (!chartCard) return;
  chartCard.outerHTML = `<section class="chart-card"><div class="card-head"><h2>Altura</h2></div>${graph("altura")}</section><section class="chart-card"><div class="card-head"><h2>Peso</h2></div>${graph("peso")}</section>`;
  document.querySelector(".quick-measurement")?.classList.add("has-validation-error");
  document.querySelector(".bottom-grid")?.remove();
};
render();
migrateToDatabase();
