const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 90;
const STAR_COLORS = [
  [255, 204, 145],
  [255, 112, 72],
  [255, 168, 88]
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: STAR_COUNT }, createStar);
}

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.7 + 0.4,
    speed: Math.random() * 0.35 + 0.12,
    alpha: Math.random() * 0.6 + 0.15
  };
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.y -= star.speed;
    if (star.y < -star.r) {
      star.y = canvas.height + star.r;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

const serviceOrderButtons = Array.from(document.querySelectorAll(".service-order-btn"));
const selectedAmountEl = document.getElementById("selectedAmount");
const copyAmountBtn = document.getElementById("copyAmountBtn");
const donateChoiceSection = document.getElementById("donate-choice");
const donateRuBtn = document.getElementById("donateRuBtn");
const donateWorldBtn = document.getElementById("donateWorldBtn");

let selectedAmount = 500;
let selectedService = "Разбор реплеев (3 шт)";

function formatRub(amount) {
  return `${amount.toLocaleString("ru-RU")} ₽`;
}

function updateDonateLinks(amount, serviceName) {
  selectedAmount = amount;
  selectedService = serviceName;
  if (selectedAmountEl) {
    selectedAmountEl.textContent = formatRub(amount);
  }
  if (donateRuBtn) {
    const ruUrl = new URL("https://new.donatepay.ru/@1492824");
    ruUrl.searchParams.set("amount", String(amount));
    donateRuBtn.href = ruUrl.toString();
  }
  if (donateWorldBtn) {
    const worldUrl = new URL("https://www.donationalerts.com/r/umoral88");
    worldUrl.searchParams.set("amount", String(amount));
    donateWorldBtn.href = worldUrl.toString();
  }
}

serviceOrderButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const amount = Number.parseInt(btn.dataset.amount || "500", 10);
    const serviceName = btn.dataset.service || selectedService;
    updateDonateLinks(Number.isFinite(amount) ? amount : 500, serviceName);
    if (donateChoiceSection) {
      donateChoiceSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

if (copyAmountBtn) {
  copyAmountBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(String(selectedAmount));
      copyAmountBtn.textContent = "Скопировано!";
      setTimeout(() => {
        copyAmountBtn.textContent = "Копировать сумму";
      }, 900);
    } catch (error) {
      copyAmountBtn.textContent = "Ошибка";
      setTimeout(() => {
        copyAmountBtn.textContent = "Копировать сумму";
      }, 900);
    }
  });
}

updateDonateLinks(selectedAmount, selectedService);
