const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;

// Scene durations
const SCENES = [
  { name: "hook", frames: 90 },
  { name: "problem", frames: 120 },
  { name: "story", frames: 180 },
  { name: "cta", frames: 120 },
];

const TOTAL_FRAMES = SCENES.reduce((s, sc) => s + sc.frames, 0);

const framesDir = path.join(__dirname, "out", "frames");
fs.mkdirSync(framesDir, { recursive: true });

// ─── helpers ─────────────────────────────────────────────────────────────────

function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function ease(frame, start, end) { return clamp((frame - start) / (end - start), 0, 1); }
function spring(t) {
  // Simple spring approximation
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -8 * t) * Math.cos(t * Math.PI * 2.5);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const totalHeight = lines.length * lineHeight;
  let startY = y - totalHeight / 2;
  lines.forEach((l) => {
    ctx.fillText(l, x, startY);
    startY += lineHeight;
  });
  return startY;
}

// ─── background ──────────────────────────────────────────────────────────────

function drawBackground(ctx, color1, color2) {
  const grad = ctx.createLinearGradient(0, 0, WIDTH * 0.6, HEIGHT);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawGlow(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

// ─── Scene 1: Hook ────────────────────────────────────────────────────────────

function drawScene1(ctx, frame) {
  drawBackground(ctx, "#0a0a0a", "#1a0a2e");
  drawGlow(ctx, WIDTH / 2, HEIGHT / 2, 600, "rgba(138,43,226,0.15)");

  const cx = WIDTH / 2;

  // Badge
  const badgeT = spring(clamp(frame / 20, 0, 1));
  if (badgeT > 0) {
    ctx.save();
    ctx.translate(cx, 580);
    ctx.scale(badgeT, badgeT);
    const bw = 380, bh = 90, br = 45;
    const grad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    grad.addColorStop(0, "#f59e0b");
    grad.addColorStop(1, "#ef4444");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(-bw / 2, -bh / 2, bw, bh, br);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("2026 ALERT", 0, 0);
    ctx.restore();
  }

  // "99%" - big
  const t1 = ease(frame, 0, 15);
  ctx.globalAlpha = t1;
  ctx.save();
  ctx.translate(0, lerp(40, 0, t1));
  ctx.fillStyle = "#f59e0b";
  ctx.font = "bold 180px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("99%", cx, 820);
  ctx.restore();
  ctx.globalAlpha = 1;

  // "of people are SLEEPING"
  const t2 = ease(frame, 20, 35);
  ctx.globalAlpha = t2;
  ctx.save();
  ctx.translate(0, lerp(40, 0, t2));
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 76px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("of people are SLEEPING", cx, 1020);
  ctx.restore();
  ctx.globalAlpha = 1;

  // "on the easiest AI money move"
  const t3 = ease(frame, 35, 50);
  ctx.globalAlpha = t3;
  ctx.save();
  ctx.translate(0, lerp(40, 0, t3));
  ctx.fillStyle = "#c4b5fd";
  ctx.font = "700 68px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("on the easiest", cx, 1160);
  ctx.fillText("AI money move", cx, 1250);
  ctx.restore();
  ctx.globalAlpha = 1;
}

// ─── Scene 2: Problem ─────────────────────────────────────────────────────────

function drawScene2(ctx, frame) {
  drawBackground(ctx, "#0d1b2a", "#1a0a2e");
  drawGlow(ctx, WIDTH * 0.3, HEIGHT * 0.4, 500, "rgba(239,68,68,0.08)");

  const cx = WIDTH / 2;

  // Label
  const t0 = ease(frame, 0, 12);
  ctx.globalAlpha = t0;
  ctx.fillStyle = "rgba(239,68,68,0.2)";
  ctx.beginPath();
  ctx.roundRect(cx - 220, 540, 440, 90, 10);
  ctx.fill();
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "3px";
  ctx.fillText("THE PROBLEM", cx, 587);
  ctx.globalAlpha = 1;

  const lines = [
    { text: "Everyone's chasing", size: 68, color: "#ffffff", y: 800, start: 15 },
    { text: "SaaS & apps.", size: 90, color: "#f59e0b", y: 960, start: 27 },
    { text: "The real money is", size: 62, color: "#ffffff", y: 1120, start: 40 },
    { text: "different.", size: 80, color: "#c4b5fd", y: 1220, start: 50 },
  ];

  for (const l of lines) {
    const t = ease(frame, l.start, l.start + 14);
    ctx.globalAlpha = t;
    ctx.fillStyle = l.color;
    ctx.font = `bold ${l.size}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(l.text, cx, l.y + lerp(30, 0, t));
  }
  ctx.globalAlpha = 1;
}

// ─── Scene 3: Story ───────────────────────────────────────────────────────────

function drawScene3(ctx, frame) {
  drawBackground(ctx, "#0a0a0a", "#0d1b2a");
  drawGlow(ctx, WIDTH * 0.7, HEIGHT * 0.3, 500, "rgba(138,43,226,0.1)");

  const cx = WIDTH / 2;

  // Header
  const t0 = ease(frame, 0, 15);
  ctx.globalAlpha = t0;
  ctx.fillStyle = "#c4b5fd";
  ctx.font = "700 56px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Here's what actually works:", cx, 420 + lerp(30, 0, t0));
  ctx.globalAlpha = 1;

  const bullets = [
    { icon: "📚", text: "Take your expertise", y: 640 },
    { icon: "🤖", text: "Structure it with AI", y: 880 },
    { icon: "💰", text: "Sell it on autopilot", y: 1120 },
    { icon: "🚫", text: "No tech degree needed", y: 1360 },
  ];

  bullets.forEach((b, i) => {
    const start = 12 + i * 22;
    const t = ease(frame, start, start + 14);
    const xOff = lerp(-60, 0, t);
    ctx.globalAlpha = t;

    // Card background
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.strokeStyle = "rgba(245,158,11,0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80 + xOff, b.y - 68, WIDTH - 160, 136, 16);
    ctx.fill();
    ctx.stroke();

    // Icon
    ctx.font = "64px serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(b.icon, 120 + xOff, b.y);

    // Text
    ctx.font = "bold 58px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(b.text, 220 + xOff, b.y);
    ctx.globalAlpha = 1;
  });
}

// ─── Scene 4: CTA ─────────────────────────────────────────────────────────────

function drawScene4(ctx, frame) {
  drawBackground(ctx, "#1a0a2e", "#0d1b2a");
  drawGlow(ctx, WIDTH / 2, HEIGHT * 0.6, 700, "rgba(245,158,11,0.1)");

  const cx = WIDTH / 2;

  // Warning text
  const t1 = ease(frame, 0, 15);
  ctx.globalAlpha = t1;
  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 84px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("You're leaving money", cx, 540 + lerp(40, 0, t1));
  ctx.fillText("on the table.", cx, 650 + lerp(40, 0, t1));
  ctx.globalAlpha = 1;

  // Sub text
  const t2 = ease(frame, 20, 35);
  ctx.globalAlpha = t2;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 68px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Got skills or expertise?", cx, 900 + lerp(30, 0, t2));
  ctx.fillStyle = "#c4b5fd";
  ctx.fillText("This is your move.", cx, 990 + lerp(30, 0, t2));
  ctx.globalAlpha = 1;

  // Button
  const btnT = spring(clamp((frame - 38) / 20, 0, 1));
  const btnOpacity = ease(frame, 38, 50);
  if (btnOpacity > 0) {
    const pulse = 1 + 0.03 * Math.sin((frame / FPS) * Math.PI * 2);
    ctx.globalAlpha = btnOpacity;
    ctx.save();
    ctx.translate(cx, 1280);
    ctx.scale(btnT * pulse, btnT * pulse);

    // Glow shadow
    ctx.shadowColor = "rgba(245,158,11,0.7)";
    ctx.shadowBlur = 50;

    const bw = 660, bh = 130, br = 65;
    const grad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    grad.addColorStop(0, "#f59e0b");
    grad.addColorStop(1, "#ef4444");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(-bw / 2, -bh / 2, bw, bh, br);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 56px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FOLLOW FOR MORE ↓", 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
}

// ─── Render all frames ────────────────────────────────────────────────────────

let globalFrame = 0;
let sceneStart = 0;

console.log(`Rendering ${TOTAL_FRAMES} frames...`);

for (const scene of SCENES) {
  for (let f = 0; f < scene.frames; f++) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    if (scene.name === "hook") drawScene1(ctx, f);
    else if (scene.name === "problem") drawScene2(ctx, f);
    else if (scene.name === "story") drawScene3(ctx, f);
    else if (scene.name === "cta") drawScene4(ctx, f);

    const framePath = path.join(framesDir, `frame_${String(globalFrame).padStart(5, "0")}.png`);
    fs.writeFileSync(framePath, canvas.toBuffer("image/png"));

    if (globalFrame % 30 === 0) process.stdout.write(`\r  Frame ${globalFrame}/${TOTAL_FRAMES}`);
    globalFrame++;
  }
  sceneStart += scene.frames;
}

console.log(`\nAll frames rendered. Stitching with FFmpeg...`);

const outFile = path.join(__dirname, "out", "ai-money-short.mp4");
execSync(
  `ffmpeg -y -framerate ${FPS} -i "${path.join(framesDir, "frame_%05d.png")}" ` +
    `-c:v libx264 -pix_fmt yuv420p -crf 18 -preset fast "${outFile}"`,
  { stdio: "inherit" }
);

console.log(`\n✓ Video saved: ${outFile}`);
