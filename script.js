const ENTRIES = [
  { type: "cover" },
  {
    image: "images/13_analysis_paralysis.jpg", name: "Analysis Paralysis",
    why: "Consciously monitoring a skill the body already knows disrupts automatic execution.",
    fix: "A short, fixed pre-shot routine, performed identically every time.",
    tool: "$0 — the routine itself.",
    note: "The hard case: no swing to fix, no product to sell. Included on purpose."
  },
  {
    image: "images/01_fat_shot.jpg", name: "The Fat Shot",
    why: "Club bottoms out before the ball, not at it.",
    fix: "Towel drill: lay a towel just behind the ball.",
    tool: "Low-point feedback board, if the towel isn't enough."
  },
  {
    image: "images/02_thin_shot.jpg", name: "The Thin Shot",
    why: "Low point rises too early — often standing up out of posture.",
    fix: "Wall drill: hips lightly on a wall or your bag, swing without losing contact.",
    tool: "The same low-point board — it shows an early rise as clearly as an early strike."
  },
  {
    image: "images/03_slice.jpg", name: "The Slice",
    why: "Open clubface relative to path at impact.",
    fix: "Gate drill: two tees just outside the ball, swing through without clipping either.",
    tool: "Alignment sticks, or a launch monitor for face-to-path numbers."
  },
  {
    image: "images/04_duck_hook.jpg", name: "The Duck Hook",
    why: "Closed clubface relative to path, often with an overly in-to-out swing.",
    fix: "Same gate drill, aimed at closing the face rather than opening it.",
    tool: "Alignment sticks, or a launch monitor."
  },
  {
    image: "images/05_chunked_chip.jpg", name: "The Chunked Chip",
    why: "Same low-point miss as the Fat Shot, scaled to a shorter swing with less margin for error.",
    fix: "The towel drill, scaled down to a chip-length swing.",
    tool: "Impact tape or the low-point board."
  },
  {
    image: "images/06_skulled_chip.jpg", name: "The Skulled Chip",
    why: "Fear of chunking causes deceleration or a scoop, catching the ball's equator instead of sliding under it.",
    fix: "Match practice-swing speed to real-swing speed; commit to taking a small amount of turf every time.",
    tool: "Same impact tape or low-point board."
  },
  {
    image: "images/07_leaving_in_bunker.jpg", name: "Leaving It in the Bunker",
    why: "Too much sand taken, or too little committed speed through the shot.",
    fix: "Splash drill: hit the sand an inch or two behind the ball with a full, accelerating finish.",
    tool: "A practice bunker mat."
  },
  {
    image: "images/08_skulling_out_trap.jpg", name: "Skulling It Out of the Trap",
    why: "The club strikes the ball directly instead of the sand beneath it, usually from decelerating out of fear.",
    fix: "Same splash drill, drawing a line in the sand and hitting through it, not stopping at it.",
    tool: "Same practice bunker mat, or more bounce on your wedge if it's a repeated pattern."
  },
  {
    image: "images/09_three_jack.jpg", name: "The Three-Jack",
    why: "Most three-putts start with bad speed on the first putt, not a bad read.",
    fix: "Ladder drill: putt to 10, 20, 30 feet until each stays inside a 3-foot circle.",
    tool: "A putting mat with distance markers."
  },
  {
    image: "images/10_lip_out.jpg", name: "The Lip-Out",
    why: "Real physics: a ball rolling faster than ideal capture speed is more likely to spin out than drop.",
    fix: "Die it in at the slowest speed that still reaches the hole.",
    tool: "A putting gate or mirror, to isolate speed as the only variable."
  },
  {
    image: "images/11_knee_knocker.jpg", name: "The Knee-Knocker",
    why: "Anxiety on a short, high-margin putt causes a small involuntary flinch through impact.",
    fix: "Pressure practice: make 10 in a row before you're allowed to stop.",
    tool: "Same putting gate."
  },
  {
    image: "images/12_shank.jpg", name: "The Shank",
    why: "The ball strikes near the hosel instead of the center of the face — often from standing too close, or the low point drifting toward the toe.",
    fix: "Ball-off-the-toe drill: set up with the ball almost falling off the toe of the club, and still find the middle of the face.",
    tool: "Impact tape, to see exactly where on the face the miss is happening.",
    note: "The one word some golfers won't say out loud on the course."
  }
];

const TOTAL_ENTRIES = ENTRIES.length - 1;

const leafFront = document.getElementById("leafFront");
const leafBack = document.getElementById("leafBack");
const progressBar = document.getElementById("progressBar");
const pageCount = document.getElementById("pageCount");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const zonePrev = document.getElementById("zonePrev");
const zoneNext = document.getElementById("zoneNext");

let current = 0;
let animating = false;
let pendingIndex = 0;

function renderMarkup(index) {
  const e = ENTRIES[index];
  if (e.type === "cover") {
    return `<div class="page-inner cover"><div class="cover-inner">
      <p class="cover-eyebrow">An Illustrated Field Guide</p>
      <h1 class="cover-title">The Golf Fault Atlas</h1>
      <p class="cover-sub">Know Your Faults</p>
      <p class="cover-desc">Thirteen mistakes every golfer recognizes — what causes each one, how it's fixed, and what tool actually helps.</p>
      <button class="cover-cta" data-goto="1">Begin — Analysis Paralysis</button>
    </div></div>`;
  }
  return `<div class="page-inner">
    <div class="pane-art">
      <img class="art-bg" src="${e.image}" alt="" aria-hidden="true">
      <img class="art-fg" src="${e.image}" alt="${e.name}">
      <span class="art-tag">${index} / ${TOTAL_ENTRIES}</span>
    </div>
    <div class="pane-text">
      <p class="eyebrow">Known as</p>
      <h2 class="entry-name">${e.name}</h2>
      <dl class="facts">
        <div class="fact"><dt>Why</dt><dd>${e.why}</dd></div>
        <div class="fact"><dt>Fix</dt><dd>${e.fix}</dd></div>
        <div class="fact"><dt>Tool</dt><dd>${e.tool}</dd></div>
      </dl>
      ${e.note ? `<p class="note">${e.note}</p>` : ""}
    </div>
  </div>`;
}

function updateChrome() {
  progressBar.style.width = (current / TOTAL_ENTRIES) * 100 + "%";
  pageCount.textContent = current === 0 ? "Cover" : `${current} / ${TOTAL_ENTRIES} — ${ENTRIES[current].name}`;
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === TOTAL_ENTRIES;
}

function goTo(newIndex) {
  if (animating || newIndex < 0 || newIndex > TOTAL_ENTRIES || newIndex === current) return;
  const direction = newIndex > current ? "next" : "prev";
  animating = true;
  pendingIndex = newIndex;

  leafBack.innerHTML = renderMarkup(newIndex);
  leafBack.style.zIndex = "1";
  leafFront.style.zIndex = "2";

  requestAnimationFrame(() => {
    leafFront.classList.add(direction === "next" ? "flip-next" : "flip-prev");
  });
}

leafFront.addEventListener("transitionend", (ev) => {
  if (!animating || ev.propertyName !== "transform") return;
  leafFront.style.transition = "none";
  leafFront.classList.remove("flip-next", "flip-prev");
  leafFront.innerHTML = leafBack.innerHTML;
  void leafFront.offsetWidth;
  leafFront.style.transition = "";
  current = pendingIndex;
  animating = false;
  updateChrome();
});

leafFront.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-goto]");
  if (btn) goTo(parseInt(btn.dataset.goto, 10));
});

btnPrev.addEventListener("click", () => goTo(current - 1));
btnNext.addEventListener("click", () => goTo(current + 1));
zonePrev.addEventListener("click", () => goTo(current - 1));
zoneNext.addEventListener("click", () => goTo(current + 1));

document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowRight") goTo(current + 1);
  if (ev.key === "ArrowLeft") goTo(current - 1);
});

let touchStartX = null;
document.addEventListener("touchstart", (ev) => { touchStartX = ev.touches[0].clientX; }, { passive: true });
document.addEventListener("touchend", (ev) => {
  if (touchStartX === null) return;
  const dx = ev.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  touchStartX = null;
}, { passive: true });

leafFront.innerHTML = renderMarkup(0);
updateChrome();
