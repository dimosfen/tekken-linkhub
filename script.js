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
