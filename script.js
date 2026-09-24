const ENTRIES = [
  { type: "cover" },
  {
    image: "images/13_analysis_paralysis.jpg", name: "Analysis Paralysis",
    why: "Consciously monitoring a skill the body already knows disrupts automatic execution.", whyEvidence: "caution",
    fix: "A short, fixed pre-shot routine, performed identically every time.",
    tool: "$0 — the routine itself.",
    note: "The hard case: no swing to fix, no product to sell. Included on purpose."
  },
  {
    image: "images/01_fat_shot.jpg", name: "The Fat Shot",
    why: "Club bottoms out before the ball, not at it.", whyEvidence: "check",
    fix: "Towel drill: lay a towel just behind the ball.",
    tool: "Low-point feedback board, if the towel isn't enough.",
    note: "Its mirror image is the Thin Shot — same low point, opposite direction."
  },
  {
    image: "images/02_thin_shot.jpg", name: "The Thin Shot",
    why: "Low point rises too early — often standing up out of posture.", whyEvidence: "check",
    fix: "Wall drill: hips lightly on a wall or your bag, swing without losing contact.",
    tool: "The same low-point board — it shows an early rise just as clearly.",
    note: "More common with long irons and fairway woods, where the shallower angle of attack leaves less margin for error."
  },
  {
    image: "images/03_slice.jpg", name: "The Slice",
    why: "Open clubface relative to path at impact.", whyEvidence: "check",
    fix: "Gate drill: two tees just outside the ball, swing through without clipping either.",
    tool: "Alignment sticks, or a launch monitor for face-to-path numbers.",
    note: "Widely cited as the single most common miss among recreational golfers."
  },
  {
    image: "images/04_duck_hook.jpg", name: "The Duck Hook",
    why: "Closed clubface relative to path, often with an overly in-to-out swing.", whyEvidence: "check",
    fix: "Same gate drill, aimed at closing the face rather than opening it.",
    tool: "Alignment sticks, or a launch monitor.",
    note: "Sometimes called the better player's miss — it takes more speed to produce than a slice."
  },
  {
    image: "images/05_chunked_chip.jpg", name: "The Chunked Chip",
    why: "Same low-point miss as the Fat Shot, on a shorter swing with less margin for error.", whyEvidence: "check",
    fix: "The towel drill, scaled down to a chip-length swing.",
    tool: "Impact tape or the low-point board.",
    note: "This is the shot “Chili Dip” actually refers to — not the full-swing Fat Shot."
  },
  {
    image: "images/06_skulled_chip.jpg", name: "The Skulled Chip",
    why: "Fear of chunking causes deceleration or a scoop, catching the ball's equator instead of the turf.", whyEvidence: "check",
    fix: "Match practice-swing speed to real-swing speed; commit to taking a small amount of turf every time.",
    tool: "Same impact tape or low-point board.",
    note: "Often follows a chunked shot in the same round — one overcorrection sets up the other."
  },
  {
    image: "images/07_leaving_in_bunker.jpg", name: "Leaving It in the Bunker",
    why: "Too much sand taken, or too little committed speed through the shot.", whyEvidence: "check",
    fix: "Splash drill: hit the sand an inch or two behind the ball, with a full finish.",
    tool: "A practice bunker mat.",
    note: "Its opposite is Skulling It Out of the Trap — same shot, a different amount of sand."
  },
  {
    image: "images/08_skulling_out_trap.jpg", name: "Skulling It Out of the Trap",
    why: "The club strikes the ball directly instead of the sand beneath it, usually out of fear.", whyEvidence: "check",
    fix: "Same splash drill: draw a line in the sand and hit through it, not stopping at it.",
    tool: "Same practice bunker mat, or a wedge with more bounce.",
    note: "Wedges with more “bounce” on the sole are built specifically to prevent this."
  },
  {
    image: "images/09_three_jack.jpg", name: "The Three-Jack",
    why: "Most three-putts start with bad speed on the first putt, not a bad read.", whyEvidence: "check",
    fix: "Ladder drill: putt to 10, 20, 30 feet until each stays inside a 3-foot circle.",
    tool: "A putting mat with distance markers.",
    note: "The only score that turns a good approach into a bogey without one bad shot."
  },
  {
    image: "images/10_lip_out.jpg", name: "The Lip-Out",
    why: "Real physics: a ball rolling faster than the ideal capture speed is more likely to spin out.", whyEvidence: "caution",
    fix: "Die it in at the slowest speed that still reaches the hole.",
    tool: "A putting gate or mirror, isolating speed as the only variable.",
    note: "Why “never up, never in” and “leave it short” can't both be right."
  },
  {
    image: "images/11_knee_knocker.jpg", name: "The Knee-Knocker",
    why: "Anxiety on a short, high-margin putt causes a small involuntary flinch through impact.", whyEvidence: "caution",
    fix: "Pressure practice: make 10 in a row before you're allowed to stop.",
    tool: "The same putting gate, used under manufactured pressure.",
    note: "Measurably real — pros make short putts less often under tournament pressure than in practice."
  },
  {
    image: "images/12_shank.jpg", name: "The Shank",
    why: "The ball strikes near the hosel instead of center face, often from standing too close.", whyEvidence: "check",
    fix: "Ball-off-the-toe drill: set the ball almost off the toe, and still find the face's middle.",
    tool: "Impact tape, to see exactly where the miss lands on the face.",
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

function evidenceTag(kind) {
  if (kind === "check") return `<span class="ev ev-check" title="Well-established mechanism">&#10003;</span>`;
  if (kind === "caution") return `<span class="ev ev-caution" title="Real, but not fully golf-specific verified">&#9888;</span>`;
  return "";
}

function renderMarkup(index) {
  const e = ENTRIES[index];
  if (e.type === "cover") {
    return `<div class="page-inner cover"><div class="cover-inner">
      <p class="cover-eyebrow">An Illustrated Field Guide</p>
      <h1 class="cover-title">The Golf Fault Atlas</h1>
      <p class="cover-sub">Know Your Faults</p>
      <p class="cover-desc">Thirteen mistakes every golfer recognizes — what causes each one, how it's fixed, and what tool actually helps.</p>
      <p class="cover-legend"><span class="ev ev-check">&#10003;</span> well-established mechanism &nbsp;&nbsp; <span class="ev ev-caution">&#9888;</span> real, not fully golf-specific verified</p>
      <button class="cover-cta" data-goto="1">Begin — Analysis Paralysis</button>
    </div></div>`;
  }
  return `<div class="page-inner">
    <div class="pane-art">
      <img class="art-fg" src="${e.image}" alt="${e.name}">
      <span class="art-tag">${index} / ${TOTAL_ENTRIES}</span>
    </div>
    <div class="pane-text">
      <p class="eyebrow">Known as</p>
      <h2 class="entry-name">${e.name}</h2>
      <dl class="facts">
        <div class="fact"><dt>Why</dt><dd>${e.why} ${evidenceTag(e.whyEvidence)}</dd></div>
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
