const MAP_URL = "https://www.google.com/maps/search/?api=1&query=The+Oberoi+Udaivilas+Udaipur+Rajasthan";
const EVENTS = [{
  id: "mehendi",
  icon: "assets/event/pn-evt-ico-mehendi-x-v01.webp",
  name: "Mehendi",
  date: "11 Dec 2026",
  time: "4:00 PM",
  venue: "Lotus Courtyard",
  note: "Greens & florals encouraged",
  map: MAP_URL
}, {
  id: "haldi",
  icon: "assets/event/pn-evt-ico-haldi-x-v01.webp",
  name: "Haldi",
  date: "12 Dec 2026",
  time: "10:00 AM",
  venue: "Poolside Courtyard",
  note: "Yellow / ivory tones",
  map: MAP_URL
}, {
  id: "sangeet",
  icon: "assets/event/pn-evt-ico-sangeet-x-v01.webp",
  name: "Sangeet",
  date: "12 Dec 2026",
  time: "7:30 PM",
  venue: "Royal Ballroom",
  note: "An evening of music and performances",
  map: MAP_URL
}, {
  id: "shaadi",
  icon: "assets/event/pn-evt-ico-shaadi-x-v01.webp",
  name: "Shaadi",
  date: "13 Dec 2026",
  time: "9:30 AM",
  venue: "Lake Mandap",
  note: "Traditional Indian attire",
  map: MAP_URL
}, {
  id: "reception",
  icon: "assets/event/pn-evt-ico-reception-x-v01.webp",
  name: "Reception",
  date: "13 Dec 2026",
  time: "7:30 PM",
  venue: "Palace Lawns",
  note: "Candlelit dinner and celebration",
  map: MAP_URL
}, {
  id: "vidaai",
  icon: "assets/event/pn-evt-ico-vidaai-x-v01.webp",
  name: "Vidaai",
  date: "14 Dec 2026",
  time: "9:00 AM",
  venue: "Main Courtyard",
  note: "A quiet farewell with blessings",
  map: MAP_URL
}];
const A = {
  darkBg: "assets/hero/pn-hro-bg-courtyard-dark-m-v03.webp",
  litBg: "assets/hero/pn-hro-bg-courtyard-lit-m-v03.webp",
  darkBgDesktop: "assets/hero/pn-hro-bg-courtyard-dark-m-v03.webp",
  litBgDesktop: "assets/hero/pn-hro-bg-courtyard-lit-m-v03.webp",
  rope: "assets/hero/pn-hro-el-rope-hemp-pull-x-v01.webp",
  lotusClosed: "assets/hero/pn-rvl-btn-lotus-closed-x-v01.webp",
  lotusOpen: "assets/hero/pn-rvl-btn-lotus-open-x-v01.webp",
  lotusGlow: "assets/hero/pn-fx-ovl-lotus-glow-burst-x-v01.webp",
  jhoomer: "assets/shared/pn-shr-mot-jhoomer-hanging-x-v01.webp",
  floralBush: "assets/hero/pn-shr-mot-floral-bush-cluster-x-v01.webp",
  diya: "assets/hero/pn-shr-mot-diya-glow-x-v01.webp"
};
const PULL_THRESHOLD = Math.min(112, Math.max(84, Math.round(window.innerHeight * .11)));
function getHeroBackgrounds() {
  const e = window.matchMedia("(min-width: 768px)").matches;
  return {
    dark: e ? A.darkBgDesktop : A.darkBg,
    lit: e ? A.litBgDesktop : A.litBg
  }
}
const Sound = {
  _ctx: null,
  get ctx() {
    if (!this._ctx) {
      try {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)
      } catch (e) { }
    }
    return this._ctx
  },
  _play(e) {
    if (rmq)
      return;
    try {
      const n = this.ctx;
      if (!n)
        return;
      if (n.state === "suspended") {
        n.resume().then(e).catch(() => { }
        )
      } else {
        e()
      }
    } catch (n) { }
  },
  bell() {
    this._play(() => {
      const e = this.ctx;
      const n = e.currentTime;
      [[528, .3, 2], [1056, .14, 1.4], [792, .1, 1.7]].forEach(([t, a, r]) => {
        const l = e.createOscillator();
        const i = e.createGain();
        l.connect(i);
        i.connect(e.destination);
        l.type = "sine";
        l.frequency.value = t;
        i.gain.setValueAtTime(a, n);
        i.gain.exponentialRampToValueAtTime(1e-4, n + r);
        l.start(n);
        l.stop(n + r + .05)
      }
      )
    }
    )
  },
  ambient() {
    this._play(() => {
      const e = this.ctx;
      const n = e.currentTime;
      [[220, .055, 4], [330, .04, 3.5], [440, .048, 4.8], [660, .028, 3.2]].forEach(([t, a, r], l) => {
        const i = e.createOscillator();
        const c = e.createGain();
        i.connect(c);
        c.connect(e.destination);
        i.type = "sine";
        i.frequency.value = t;
        const s = n + l * .18;
        c.gain.setValueAtTime(0, s);
        c.gain.linearRampToValueAtTime(a, s + .55);
        c.gain.exponentialRampToValueAtTime(1e-4, s + r);
        i.start(s);
        i.stop(s + r + .1)
      }
      )
    }
    )
  },
  lotus() {
    this._play(() => {
      const e = this.ctx;
      const n = e.currentTime;
      [[396, .2, 1.6], [528, .15, 1.4], [792, .09, 1.1]].forEach(([t, a, r], l) => {
        const i = e.createOscillator();
        const c = e.createGain();
        i.connect(c);
        c.connect(e.destination);
        i.type = "sine";
        const s = n + l * .1;
        i.frequency.setValueAtTime(t * .88, s);
        i.frequency.exponentialRampToValueAtTime(t, s + .28);
        c.gain.setValueAtTime(0, s);
        c.gain.linearRampToValueAtTime(a, s + .18);
        c.gain.exponentialRampToValueAtTime(1e-4, s + r);
        i.start(s);
        i.stop(s + r + .1)
      }
      )
    }
    )
  },
  init() { }
};
const introEl = document.getElementById("intro");
const ropeButton = document.getElementById("ropeButton");
const ropeImg = document.getElementById("ropeImg");
const ropeHalo = ropeButton.querySelector(".rope-halo");
const pullFeedback = document.getElementById("pullFeedback");
const lotusButton = document.getElementById("lotusButton");
const lotusIconImg = document.getElementById("lotusIconImg");
const lotusGlow = document.getElementById("lotusGlowBurst");
const skipBtn = document.getElementById("skipIntro");
const floatingMenu = document.getElementById("floatingMenu");
const menuToggle = document.getElementById("menuToggle");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const rmq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function setBgMusicState(e) {
  musicToggle.classList.toggle("is-playing", e);
  musicToggle.setAttribute("aria-pressed", e ? "true" : "false");
  musicToggle.setAttribute("aria-label", e ? "Pause music" : "Play music")
}
function syncBgMusicState() {
  setBgMusicState(!bgMusic.paused && !bgMusic.ended)
}
function playBgMusic() {
  bgMusic.muted = false;
  bgMusic.volume = 1;
  return bgMusic.play().then(syncBgMusicState)
}
function pauseBgMusic() {
  bgMusic.pause();
  syncBgMusicState()
}
let _musicUnlocked = false;
function _unlockMusic() {
  if (_musicUnlocked)
    return;
  bgMusic.volume = 0;
  bgMusic.play().then(() => {
    _musicUnlocked = true;
    if (triggered) {
      bgMusic.volume = 1;
      syncBgMusicState()
    } else {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.volume = 1;
      syncBgMusicState()
    }
  }
  ).catch(() => {
    bgMusic.volume = 1
  }
  )
}
musicToggle.addEventListener("click", e => {
  e.stopPropagation();
  if (bgMusic.paused) {
    playBgMusic().catch(syncBgMusicState)
  } else {
    pauseBgMusic()
  }
}
);
["play", "playing", "pause", "ended", "emptied", "error"].forEach(e => {
  bgMusic.addEventListener(e, syncBgMusicState)
}
);
let _musicRetries = 0;
bgMusic.addEventListener("error", () => {
  const e = bgMusic.error;
  if (e && e.code === MediaError.MEDIA_ERR_NETWORK && _musicRetries < 2) {
    _musicRetries++;
    setTimeout(() => {
      bgMusic.load();
      playBgMusic().catch(() => { }
      )
    }
      , 4e3)
  }
}
);
function buildDust() {
  const e = document.getElementById("introDust");
  for (let n = 0; n < 32; n++) {
    const t = document.createElement("div");
    t.className = "dust-particle";
    const a = 1 + Math.random() * 2.8;
    const r = 22 + Math.random() * 56;
    const l = 8 + Math.random() * 60;
    const i = 7 + Math.random() * 10;
    const c = Math.random() * 8;
    t.style.cssText = `width:${a}px;height:${a}px;left:${r}%;bottom:${l}%;animation-duration:${i}s;animation-delay:${c}s`;
    e.appendChild(t)
  }
}
function buildPetals() {
  const e = document.getElementById("introPetals");
  for (let n = 0; n < 18; n++) {
    const t = document.createElement("div");
    t.className = "petal";
    const a = 6 + Math.random() * 88;
    const r = Math.random() * 18;
    const l = 10 + Math.random() * 14;
    const i = Math.random() * 10;
    const c = 5 + Math.random() * 7;
    t.style.cssText = `left:${a}%;bottom:${r}%;width:${c}px;height:${c * .62}px;animation-duration:${l}s;animation-delay:${i}s`;
    e.appendChild(t)
  }
}
function resist(e) {
  const n = PULL_THRESHOLD * .38;
  const t = PULL_THRESHOLD * .82;
  if (e <= n)
    return e * .92;
  if (e <= t)
    return n * .92 + (e - n) * .58;
  return n * .92 + (t - n) * .58 + (e - t) * .3
}
let pxFrame = 0;
let currentNx = 0
  , currentNy = 0;
function setParallax(e, n) {
  currentNx = e;
  currentNy = n;
  const t = introEl;
  t.style.setProperty("--px-bg-x", `${(-e * 13).toFixed(2)}px`);
  t.style.setProperty("--px-bg-y", `${(-n * 8).toFixed(2)}px`);
  t.style.setProperty("--px-jhm-x", `${(e * 22).toFixed(2)}px`);
  t.style.setProperty("--px-jhm-y", `${(n * 14).toFixed(2)}px`);
  t.style.setProperty("--px-flr-x", `${(e * 52).toFixed(2)}px`);
  t.style.setProperty("--px-flr-y", `${(n * 34).toFixed(2)}px`);
  t.style.setProperty("--px-dya-x", `${(e * 30).toFixed(2)}px`);
  t.style.setProperty("--px-dya-y", `${(n * 19).toFixed(2)}px`)
}
function queueParallax(e, n) {
  if (rmq || introEl.classList.contains("is-complete"))
    return;
  if (pxFrame)
    cancelAnimationFrame(pxFrame);
  pxFrame = requestAnimationFrame(() => {
    setParallax(e, n);
    pxFrame = 0
  }
  )
}
let gyroEnabled = false;
function enableGyro() {
  if (gyroEnabled || rmq)
    return;
  gyroEnabled = true;
  window.addEventListener("deviceorientation", e => {
    if (introEl.classList.contains("is-complete") || isDragging)
      return;
    const n = Math.max(-1, Math.min(1, (e.gamma || 0) / 18));
    const t = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 22));
    queueParallax(n, t)
  }
    , {
      passive: true
    })
}
if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
  document.addEventListener("touchstart", () => {
    DeviceOrientationEvent.requestPermission().then(e => {
      if (e === "granted")
        enableGyro()
    }
    ).catch(() => { }
    )
  }
    , {
      once: true
    })
} else {
  window.addEventListener("load", () => {
    if ("DeviceOrientationEvent" in window)
      enableGyro()
  }
  )
}
if (!rmq) {
  introEl.addEventListener("pointermove", e => {
    if (isDragging || gyroEnabled)
      return;
    const n = introEl.getBoundingClientRect();
    queueParallax(Math.max(-1, Math.min(1, ((e.clientX - n.left) / n.width - .5) * 2)), Math.max(-1, Math.min(1, ((e.clientY - n.top) / n.height - .5) * 2)))
  }
    , {
      passive: true
    });
  introEl.addEventListener("pointerleave", () => queueParallax(0, 0), {
    passive: true
  })
}
function hydrate() {
  const e = getHeroBackgrounds();
  document.getElementById("introBgDark").src = e.dark;
  document.getElementById("introBgLit").src = e.lit;
  document.getElementById("introJhoomer").src = A.jhoomer;
  document.getElementById("introFloralLeft").src = A.floralBush;
  document.getElementById("introFloralRight").src = A.floralBush;
  document.getElementById("introDiyaLeft").src = A.diya;
  document.getElementById("introDiyaRight").src = A.diya;
  ropeImg.src = A.rope;
  lotusIconImg.src = A.lotusClosed;
  lotusGlow.src = A.lotusGlow;
  const n = document.getElementById("lotusOpenImg");
  if (n) {
    n.src = A.lotusOpen;
    new Image().src = A.lotusOpen
  }
  new Image().src = e.lit;
  buildDust();
  buildPetals();
  applyGrandparentsMode();
  renderEvents();
  renderStars();
  renderBirds();
  initEvtParallax();
  renderGallery();
  renderTTK();
  setTimeout(() => {
    if (!triggered)
      introEl.classList.add("is-waiting")
  }
    , 1100);
  setTimeout(() => {
    if (!triggered)
      ropeButton.classList.add("rope-ready", "rope-idle")
  }
    , 1900)
}
let farmanScrollLocked = false;
let farmanLockScrollTop = 0;
const FARMAN_SESSION_KEY = "pn-farman-seen";
function engageFarmanLock() {
  if (farmanScrollLocked || rmq)
    return;
  try {
    if (sessionStorage.getItem(FARMAN_SESSION_KEY))
      return
  } catch (e) { }
  farmanScrollLocked = true;
  farmanLockScrollTop = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${farmanLockScrollTop}px`;
  document.body.style.width = "100%";
  document.body.style.overflowY = "scroll"
}
function releaseFarmanLockAndMark() {
  if (!farmanScrollLocked)
    return;
  farmanScrollLocked = false;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflowY = "";
  window.scrollTo({
    top: farmanLockScrollTop,
    behavior: "instant"
  });
  try {
    sessionStorage.setItem(FARMAN_SESSION_KEY, "1")
  } catch (e) { }
}
function releaseFarmanLock() {
  releaseFarmanLockAndMark()
}
let firstFarmanSeen = false;
function spawnFarmanDust(e) {
  const n = e.querySelector(".farman-dust-layer");
  if (!n || rmq)
    return;
  const t = window.matchMedia("(min-width: 768px)").matches ? 14 : 8;
  for (let a = 0; a < t; a++) {
    const r = document.createElement("div");
    r.className = "farman-dust-dot";
    const l = 2 + Math.random() * 3.5;
    r.style.cssText = [`width:${l}px`, `height:${l}px`, `left:${15 + Math.random() * 70}%`, `bottom:${10 + Math.random() * 55}%`, `--dur:${3.5 + Math.random() * 3}s`, `--del:${Math.random() * 4}s`, `--dx:${(Math.random() - .5) * 18}px`].join(";");
    n.appendChild(r)
  }
}
const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
function openRemainingFarmans() {
  const e = document.getElementById("evtStops");
  if (!e)
    return;
  e.querySelectorAll(".farman-stop").forEach(n => {
    const t = parseInt(n.dataset.farmanIndex ?? "0", 10);
    if (t < 3 || n.classList.contains("is-open"))
      return;
    farmanObserver.unobserve(n);
    const a = (t - 3) * 220;
    setTimeout(() => {
      n.classList.add("is-entering", "is-unrolling", "is-open");
      spawnFarmanDust(n)
    }
      , a)
  }
  )
}
const farmanObserver = new IntersectionObserver(e => {
  e.forEach(n => {
    if (!n.isIntersecting)
      return;
    const t = n.target;
    farmanObserver.unobserve(t);
    const a = parseInt(t.dataset.farmanIndex ?? "0", 10);
    if (isDesktop() && a >= 3) {
      t.classList.add("is-entering", "is-unrolling", "is-open");
      spawnFarmanDust(t);
      return
    }
    const r = rmq || a >= 4;
    if (r) {
      t.classList.add("is-entering", "is-unrolling", "is-open");
      spawnFarmanDust(t);
      return
    }
    const l = !firstFarmanSeen;
    if (l)
      firstFarmanSeen = true;
    t.classList.add("is-entering");
    setTimeout(() => t.classList.add("is-unrolling"), 620);
    const i = t.querySelector(".farman-open-wrap");
    function c(s) {
      if (s && s.propertyName !== "clip-path")
        return;
      i.removeEventListener("transitionend", c);
      t.classList.add("is-open");
      spawnFarmanDust(t);
      if (isDesktop() && a === 2 && EVENTS.length > 3)
        openRemainingFarmans()
    }
    i.addEventListener("transitionend", c);
    setTimeout(() => {
      if (!t.classList.contains("is-open")) {
        i.removeEventListener("transitionend", c);
        t.classList.add("is-open");
        spawnFarmanDust(t);
        if (isDesktop() && a === 2 && EVENTS.length > 3)
          openRemainingFarmans()
      }
    }
      , 1800)
  }
  )
}
  , {
    threshold: .12,
    rootMargin: "0px 0px 0% 0px"
  });
function renderEvents() {
  const e = document.getElementById("evtStops");
  if (!e)
    return;
  const n = `<svg width="88" height="18" viewBox="0 0 88 18" fill="none"
       xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="fgl" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stop-color="rgba(216,169,87,0)"/>
        <stop offset="100%" stop-color="rgba(216,169,87,.48)"/>
      </linearGradient>
      <linearGradient id="fgr" x1="56" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stop-color="rgba(216,169,87,.48)"/>
        <stop offset="100%" stop-color="rgba(216,169,87,0)"/>
      </linearGradient>
    </defs>
    <line x1="0"  y1="9" x2="32" y2="9" stroke="url(#fgl)" stroke-width="1"/>
    <circle cx="37" cy="9" r="1.8" fill="rgba(216,169,87,.38)"/>
    <circle cx="44" cy="9" r="3.2" fill="rgba(216,169,87,.58)"/>
    <circle cx="51" cy="9" r="1.8" fill="rgba(216,169,87,.38)"/>
    <line x1="56" y1="9" x2="88" y2="9" stroke="url(#fgr)" stroke-width="1"/>
  </svg>`;
  const t = Math.floor((EVENTS.length - 1) / 2);
  const a = `<svg width="11" height="14" viewBox="0 0 11 14" fill="none"
       xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:4px">
    <path d="M5.5 0C2.46 0 0 2.46 0 5.5c0 4.12 5.5 8.5 5.5 8.5S11 9.62 11 5.5C11 2.46 8.54 0 5.5 0Z"
          fill="currentColor" opacity=".72"/>
    <circle cx="5.5" cy="5.5" r="2" fill="#fff" opacity=".88"/>
  </svg>`;
  EVENTS.forEach((r, l) => {
    const i = r.note ? `<p class="farman-note">${r.note}</p>` : "";
    const c = r.map ? `<a class="farman-map" href="${r.map}" target="_blank"
            rel="noreferrer" aria-label="Open ${r.venue} on Google Maps">
           ${a}Open in Maps</a>` : "";
    const s = document.createElement("article");
    const h = r.id === "shaadi";
    const f = l % 2 === 0 ? "farman-left" : "farman-right";
    s.className = `farman-stop ${f}${h ? " farman-stop--main" : ""}`;
    s.setAttribute("role", "listitem");
    s.setAttribute("data-event", r.id);
    s.setAttribute("data-farman-index", l);
    s.innerHTML = `
      <div class="farman-rolled-wrap" aria-hidden="true">
        <img class="farman-rolled-img"
             src="assets/event/pn-evt-farman-rolled-x-v01.webp"
             alt="" draggable="false" decoding="async">
      </div>
      <div class="farman-open-wrap">
        <img class="farman-parchment-img"
             src="assets/event/pn-evt-farman-open-x-v01.webp"
             alt="" aria-hidden="true" draggable="false" decoding="async">
        <div class="farman-dust-layer" aria-hidden="true"></div>
        <div class="farman-content" aria-label="${r.name} ceremony details">
          <img class="farman-motif"
               src="${r.icon}" alt="${r.name} motif" decoding="async">
          <h3 class="farman-name">${r.name}</h3>
          <div class="farman-rule" aria-hidden="true"></div>
          <p class="farman-datetime">${r.date} &middot; ${r.time}</p>
          <p class="farman-venue">${r.venue}</p>
          ${i}${c}${r.map ? `<div class="farman-map-rule" aria-hidden="true"></div>` : ""}
        </div>
      </div>`.trim();
    e.appendChild(s);
    farmanObserver.observe(s);
    if (l < EVENTS.length - 1) {
      const u = document.createElement("div");
      if (l === t) {
        u.className = "farman-inter farman-inter--lotus";
        u.setAttribute("aria-hidden", "true");
        u.innerHTML = `<img src="assets/invite/pn-inv-div-lotus-divider-x-v01.webp"
             alt="" decoding="async" loading="lazy">`
      } else {
        u.className = "farman-inter";
        u.setAttribute("aria-hidden", "true");
        u.innerHTML = n
      }
      e.appendChild(u);
      observer.observe(u)
    }
  }
  )
}
function initEvtParallax() {
  const e = document.getElementById("events");
  const n = document.getElementById("evtPeacock");
  const t = document.getElementById("evtElephant");
  if (!e || !n || !t || rmq)
    return;
  let a = false;
  window.addEventListener("scroll", () => {
    if (a)
      return;
    a = true;
    requestAnimationFrame(() => {
      const r = e.getBoundingClientRect();
      const l = e.offsetHeight;
      const i = Math.max(0, Math.min(1, -r.top / l));
      const c = (i * 18).toFixed(1);
      n.style.transform = `translateY(-${c}px)`;
      t.style.transform = `scaleX(-1) translateY(-${c}px)`;
      a = false
    }
    )
  }
    , {
      passive: true
    })
}
function renderStars() {
  const e = document.getElementById("evtStars");
  const n = document.getElementById("events");
  if (!e || !n)
    return;
  const t = e.getContext("2d");
  let a = null
    , r = false;
  function l() {
    e.width = n.offsetWidth;
    e.height = n.offsetHeight
  }
  l();
  window.addEventListener("resize", l, {
    passive: true
  });
  const i = window.innerWidth < 768;
  const c = i ? 40 : 150;
  const s = Array.from({
    length: c
  }, () => {
    const u = Math.random() < .68;
    return {
      x: Math.random(),
      y: u ? Math.random() * .55 : .55 + Math.random() * .3,
      r: .45 + Math.random() * 1.55,
      base: .22 + Math.random() * .62,
      spd: .18 + Math.random() * .65,
      phase: Math.random() * 6.2832,
      warm: Math.random() > .52
    }
  }
  );
  function h(u) {
    if (!r)
      return;
    const y = u * .001;
    const o = e.width
      , b = e.height;
    t.clearRect(0, 0, o, b);
    for (const m of s) {
      const g = .3 + .7 * (Math.sin(y * m.spd + m.phase) * .5 + .5);
      const v = m.base * g;
      const w = m.x * o
        , p = m.y * b;
      t.beginPath();
      t.arc(w, p, m.r, 0, 6.2832);
      t.fillStyle = m.warm ? `rgba(255,238,205,${v})` : `rgba(215,228,255,${v})`;
      t.fill();
      if (m.r > 1.15 && !i) {
        const I = t.createRadialGradient(w, p, 0, w, p, m.r * 4.5);
        I.addColorStop(0, m.warm ? `rgba(255,232,170,${v * .26})` : `rgba(180,210,255,${v * .26})`);
        I.addColorStop(1, "rgba(0,0,0,0)");
        t.beginPath();
        t.arc(w, p, m.r * 4.5, 0, 6.2832);
        t.fillStyle = I;
        t.fill()
      }
    }
    a = requestAnimationFrame(h)
  }
  const f = new IntersectionObserver(([u]) => {
    if (u.isIntersecting && !r) {
      r = true;
      a = requestAnimationFrame(h)
    } else if (!u.isIntersecting && r) {
      r = false;
      cancelAnimationFrame(a)
    }
  }
    , {
      threshold: 0
    });
  f.observe(n);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && r) {
      r = false;
      cancelAnimationFrame(a)
    }
  }
  )
}
function renderBirds() {
  const e = document.getElementById("evtBirds");
  if (!e || rmq)
    return;
  const n = [{
    top: 7,
    w: 24,
    dur: 30,
    del: 0,
    drift: -16
  }, {
    top: 13,
    w: 16,
    dur: 38,
    del: -11,
    drift: -8
  }, {
    top: 19,
    w: 28,
    dur: 24,
    del: -20,
    drift: -24
  }, {
    top: 10,
    w: 14,
    dur: 44,
    del: -6,
    drift: -10
  }, {
    top: 25,
    w: 20,
    dur: 28,
    del: -33,
    drift: -18
  }, {
    top: 5,
    w: 18,
    dur: 35,
    del: -17,
    drift: -12
  }];
  n.forEach(t => {
    const a = document.createElement("span");
    a.className = "evt-bird";
    a.style.setProperty("--bird-top", `${t.top}%`);
    a.style.setProperty("--bird-w", `${t.w}px`);
    a.style.setProperty("--bird-dur", `${t.dur}s`);
    a.style.setProperty("--bird-del", `${t.del}s`);
    a.style.setProperty("--bird-drift", `${t.drift}px`);
    e.appendChild(a)
  }
  )
}
let HAS_GRANDPARENTS = true;
function applyGrandparentsMode() {
  const e = document.querySelector(".inv-blessing");
  const n = document.querySelector(".inv-blessing-alt");
  const t = document.querySelector(".inv-kicker");
  if (!e || !n)
    return;
  if (HAS_GRANDPARENTS) {
    n.style.display = "none"
  } else {
    e.style.display = "none";
    t.style.display = "none"
  }
}
const GALLERY_PHOTOS = [{
  src: "",
  caption: "Together",
  orient: "hero"
}, {
  src: "",
  caption: "Getting ready",
  orient: "portrait"
}, {
  src: "",
  caption: "The ceremony",
  orient: "landscape"
}, {
  src: "",
  caption: "Celebrations",
  orient: "portrait"
}];
const GAL_FRAMES = {
  landscape: "assets/gallery/pn-gal-fr-hanging-landscape-x-v01.webp",
  portrait: "assets/gallery/pn-gal-fr-hanging-portrait-x-v01.webp",
  hero: "assets/gallery/pn-gal-fr-hanging-hero-arch-x-v01.webp"
};
let lbPhotos = [];
let lbIndex = 0;
function openLightbox(e, n) {
  lbPhotos = e;
  lbIndex = n;
  const t = document.getElementById("galLightbox");
  t.hidden = false;
  t.classList.toggle("single", e.length === 1);
  document.body.style.overflow = "hidden";
  showLbPhoto(lbIndex)
}
function closeLightbox() {
  const e = document.getElementById("galLightbox");
  e.hidden = true;
  document.body.style.overflow = ""
}
function showLbPhoto(e) {
  const n = lbPhotos[e];
  const t = document.getElementById("galLbImg");
  const a = document.getElementById("galLbCaption");
  t.style.opacity = "0";
  t.style.transform = "scale(.94)";
  t.src = n.src;
  t.alt = n.caption;
  a.textContent = n.caption;
  t.onload = () => {
    t.style.transition = "opacity 300ms ease, transform 400ms cubic-bezier(.16,1,.3,1)";
    t.style.opacity = "1";
    t.style.transform = "scale(1)"
  }
}
function lbNav(e) {
  lbIndex = (lbIndex + e + lbPhotos.length) % lbPhotos.length;
  showLbPhoto(lbIndex)
}
function spawnGalDust(e) {
  if (rmq)
    return;
  for (let n = 0; n < 10; n++) {
    const t = document.createElement("div");
    t.className = "gal-dust-dot";
    const a = 1.5 + Math.random() * 3;
    t.style.cssText = [`width:${a}px`, `height:${a}px`, `left:${20 + Math.random() * 60}%`, `bottom:${10 + Math.random() * 60}%`, `--dur:${3 + Math.random() * 3.5}s`, `--del:${Math.random() * 5}s`, `--dx:${(Math.random() - .5) * 20}px`].join(";");
    e.appendChild(t)
  }
}
function renderGallery() {
  const e = document.getElementById("galWall");
  if (!e)
    return;
  const n = GALLERY_PHOTOS.filter(a => a.src && a.src.trim() !== "");
  const t = [0, 160, 80, 240];
  GALLERY_PHOTOS.forEach((a, r) => {
    const l = document.createElement("div");
    l.className = `gal-frame-slot gal-slot-${a.orient}`;
    l.setAttribute("role", "listitem");
    l.style.transitionDelay = `${t[r] || 0}ms`;
    const i = document.createElement("div");
    i.className = "gal-frame-inner";
    const c = document.createElement("div");
    c.className = "gal-frame-dust";
    const s = document.createElement("div");
    s.className = "gal-photo-wrap";
    if (a.src && a.src.trim() !== "") {
      const u = document.createElement("img");
      u.className = "gal-photo";
      u.src = a.src;
      u.alt = a.caption;
      u.decoding = "async";
      u.loading = "lazy";
      const y = n.indexOf(a);
      s.addEventListener("click", () => openLightbox(n, y));
      s.appendChild(u)
    } else {
      const u = document.createElement("div");
      u.className = "gal-placeholder";
      u.innerHTML = `
        <div class="gal-placeholder-icon">+</div>
        <p class="gal-placeholder-label">Tap to add photo</p>`;
      const y = document.createElement("input");
      y.type = "file";
      y.accept = "image/*";
      y.className = "gal-file-input";
      y.addEventListener("change", o => {
        const b = o.target.files[0];
        if (!b)
          return;
        const m = URL.createObjectURL(b);
        a.src = m;
        a.caption = b.name.replace(/\.[^.]+$/, "");
        const g = document.createElement("img");
        g.className = "gal-photo";
        g.src = m;
        g.alt = a.caption;
        s.innerHTML = "";
        s.appendChild(g);
        s.style.clipPath = "inset(100% 0 0 0)";
        requestAnimationFrame(() => {
          setTimeout(() => {
            s.style.clipPath = "inset(0% 0 0 0)"
          }
            , 40)
        }
        );
        const v = GALLERY_PHOTOS.filter(p => p.src && p.src.trim() !== "");
        const w = v.indexOf(a);
        s.addEventListener("click", () => openLightbox(v, w));
        spawnGalDust(c)
      }
      );
      u.appendChild(y);
      s.appendChild(u)
    }
    const h = document.createElement("img");
    h.className = "gal-frame-img";
    h.src = GAL_FRAMES[a.orient];
    h.alt = "";
    h.setAttribute("aria-hidden", "true");
    h.decoding = "async";
    h.draggable = false;
    i.appendChild(c);
    i.appendChild(s);
    i.appendChild(h);
    l.appendChild(i);
    const f = document.createElement("p");
    f.className = "gal-frame-caption";
    f.textContent = a.caption;
    l.appendChild(f);
    e.appendChild(l);
    galFrameObserver.observe(l)
  }
  );
  document.getElementById("galLbClose").addEventListener("click", closeLightbox);
  document.getElementById("galLbPrev").addEventListener("click", () => lbNav(-1));
  document.getElementById("galLbNext").addEventListener("click", () => lbNav(1));
  document.getElementById("galLightbox").addEventListener("click", a => {
    if (a.target === a.currentTarget)
      closeLightbox()
  }
  );
  document.addEventListener("keydown", a => {
    if (document.getElementById("galLightbox").hidden)
      return;
    if (a.key === "Escape")
      closeLightbox();
    if (a.key === "ArrowLeft")
      lbNav(-1);
    if (a.key === "ArrowRight")
      lbNav(1)
  }
  )
}
const galFrameObserver = new IntersectionObserver(e => {
  e.forEach(n => {
    if (!n.isIntersecting)
      return;
    galFrameObserver.unobserve(n.target);
    n.target.classList.add("in-view");
    const t = n.target.querySelector(".gal-frame-dust");
    if (t)
      setTimeout(() => spawnGalDust(t), 1100)
  }
  )
}
  , {
    threshold: .22,
    rootMargin: "0px 0px -5% 0px"
  });
function revealSite() {
  introEl.classList.add("is-complete");
  document.body.classList.remove("intro-active");
  floatingMenu.classList.add("is-visible");
  const e = document.getElementById("invite");
  if (e) {
    setTimeout(() => e.classList.add("invite-active"), 180)
  }
  if (typeof window._startPetalShower === "function")
    window._startPetalShower()
}
(function e() {
  const n = 900;
  const t = 8;
  const a = "assets/invite/petal.webp";
  let r = null
    , l = false
    , i = null;
  const c = new Image;
  c.onload = () => {
    r = c;
    l = true
  }
    ;
  c.onerror = () => console.warn("[PetalShower] petal.webp not found");
  c.src = a;
  let s, h, f, u, y;
  let o = [];
  let b = false;
  let m = false;
  let g = [];
  function v() {
    y = Math.min(window.devicePixelRatio || 1, 2);
    const d = s.getBoundingClientRect();
    f = d.width;
    u = d.height;
    s.width = f * y;
    s.height = u * y;
    h.setTransform(y, 0, 0, y, 0, 0)
  }
  function w(d) {
    const E = d.getBoundingClientRect();
    const T = s.getBoundingClientRect();
    return {
      x: E.left - T.left + E.width * .5,
      y: E.top - T.top + E.height * .5
    }
  }
  function p() {
    const d = s.getBoundingClientRect();
    const E = g.filter(B => {
      if (!B)
        return false;
      const S = B.getBoundingClientRect();
      const k = S.left - d.left;
      return k > -S.width && k < f + S.width
    }
    );
    if (!E.length) {
      return {
        x: f * (.15 + Math.random() * .7),
        y: u * .08
      }
    }
    const T = E[Math.floor(Math.random() * E.length)];
    const x = w(T);
    x.x += (Math.random() - .5) * 24;
    x.y += Math.random() * 14;
    return x
  }
  function I() {
    const d = p();
    const E = 26 + Math.random() * 22;
    const T = 1.2 + Math.random() * .6;
    const x = .0015 + Math.random() * .001;
    const B = 18 + Math.random() * 22;
    const S = .018 + Math.random() * .014;
    const k = Math.random() * Math.PI * 2;
    const R = .55 + Math.random() * .35;
    const q = .022 + Math.random() * .018;
    const G = Math.random() * Math.PI * 2;
    const D = (Math.random() - .5) * .008;
    const F = .08 + Math.random() * .07;
    const z = .008 + Math.random() * .006;
    const N = Math.random() * Math.PI * 2;
    return {
      x: d.x,
      y: d.y,
      vy: T,
      vyBase: T,
      fallAccel: x,
      driftAmp: B,
      driftFreq: S,
      driftOff: k,
      rockAmp: R,
      rockFreq: q,
      rockOff: G,
      vr: D,
      rot: Math.random() * Math.PI * 2,
      upliftAmp: F,
      upliftFreq: z,
      upliftOff: N,
      size: E,
      life: 0
    }
  }
  function C(d) {
    const E = Math.min(1, d.life / 20);
    const T = Math.min(1, Math.max(0, (u - d.y) / 80));
    const x = E * T;
    if (x <= 0 || !l)
      return;
    const B = d.rockAmp * Math.sin(d.life * d.rockFreq + d.rockOff);
    const S = Math.cos(B);
    const k = 1 - Math.abs(Math.sin(B)) * .15;
    h.save();
    h.globalAlpha = x;
    h.translate(d.x, d.y);
    h.rotate(d.rot);
    h.scale(S, k);
    const R = d.size / 2;
    h.drawImage(r, -R, -R, d.size, d.size);
    h.restore()
  }
  function P() {
    if (!m)
      return;
    h.clearRect(0, 0, f, u);
    o = o.filter(d => d.y < u + d.size);
    for (const d of o) {
      d.x = d.x + d.driftAmp * Math.cos(d.life * d.driftFreq + d.driftOff) * d.driftFreq;
      const E = d.upliftAmp * Math.sin(d.life * d.upliftFreq + d.upliftOff);
      d.vy = Math.min(d.vyBase + d.life * d.fallAccel, 2.4);
      d.y += Math.max(.05, d.vy - E);
      d.rot += d.vr;
      d.life++;
      C(d)
    }
    requestAnimationFrame(P)
  }
  function O() {
    if (o.length < t)
      o.push(I())
  }
  function U() {
    if (b)
      return;
    b = true;
    s = document.getElementById("invitePetals");
    if (!s)
      return;
    h = s.getContext("2d");
    g = [document.getElementById("invBirdA"), document.getElementById("invBirdB")];
    v();
    window.addEventListener("resize", v);
    new IntersectionObserver(d => {
      const E = d[0].isIntersecting;
      if (E && !m) {
        m = true;
        requestAnimationFrame(P)
      } else if (!E) {
        m = false;
        if (i) {
          clearInterval(i);
          i = null
        }
      }
    }
      , {
        rootMargin: "100px"
      }).observe(s);
    setTimeout(() => {
      O();
      i = setInterval(O, n)
    }
      , 2200)
  }
  window._startPetalShower = U
}
)();
let triggered = false;
function triggerIntro() {
  if (triggered)
    return;
  triggered = true;
  Sound.bell();
  playBgMusic().catch(() => {
    syncBgMusicState();
    function e() {
      playBgMusic().catch(syncBgMusicState);
      document.removeEventListener("click", e, true);
      document.removeEventListener("touchstart", e, true);
      document.removeEventListener("keydown", e, true)
    }
    document.addEventListener("click", e, {
      once: true,
      capture: true
    });
    document.addEventListener("touchstart", e, {
      once: true,
      capture: true,
      passive: true
    });
    document.addEventListener("keydown", e, {
      once: true,
      capture: true
    })
  }
  );
  if (ropeFrame) {
    cancelAnimationFrame(ropeFrame);
    ropeFrame = 0
  }
  hidePullFeedback();
  introEl.classList.remove("is-waiting");
  ropeButton.classList.remove("rope-idle");
  ropeButton.classList.remove("is-pulling");
  if (rmq) {
    introEl.classList.add("is-lit", "show-names", "show-date", "show-venue", "show-lotus");
    return
  }
  ropeButton.style.willChange = "transform, opacity, filter";
  ropeButton.style.transition = "transform 85ms cubic-bezier(.18,0,.6,1)";
  ropeButton.style.transform = "translateX(-50%) rotate(5deg)";
  ropeImg.style.transition = "transform 85ms ease";
  ropeImg.style.transform = "scaleY(1.66)";
  if (navigator.vibrate) {
    try {
      navigator.vibrate([14, 22, 88])
    } catch (e) { }
  }
  setTimeout(() => {
    ropeButton.style.transition = "transform 680ms cubic-bezier(.2,.92,.22,1)";
    ropeButton.style.transform = "translateX(-50%) rotate(-2.2deg)";
    ropeImg.style.transition = "transform 680ms cubic-bezier(.2,.92,.22,1)";
    ropeImg.style.transform = "scaleY(1.16)"
  }
    , 85);
  setTimeout(() => {
    const e = document.createElement("div");
    e.style.cssText = ["position:absolute", "inset:0", "z-index:16", "pointer-events:none", "background:radial-gradient(ellipse 110% 80% at 50% 5%,", "  rgba(255,218,100,.92) 0%,", "  rgba(255,190,60,.44) 30%,", "  rgba(255,160,40,.12) 58%,", "  transparent 76%)", "animation:cinemaFlash 1300ms ease-out forwards"].join(";");
    introEl.appendChild(e);
    setTimeout(() => e.remove(), 1400)
  }
    , 140);
  setTimeout(() => {
    introEl.classList.add("is-lit");
    Sound.ambient()
  }
    , 200);
  setTimeout(() => introEl.classList.add("show-names"), 1200);
  setTimeout(() => introEl.classList.add("show-date"), 2200);
  setTimeout(() => introEl.classList.add("show-venue"), 2550);
  setTimeout(() => introEl.classList.add("show-lotus"), 3100)
}
let isDragging = false
  , dragStartY = 0;
let ropeTargetY = 0;
let ropeVisualY = 0;
let ropeVelocityY = 0;
let ropeSwing = 0;
let ropeLastRaw = 0;
let ropeFrame = 0;
let ropePointerOffset = 0;
let ropePeakRaw = 0;
let pullFeedbackTimer = 0;
function clamp(e, n, t) {
  return Math.max(n, Math.min(t, e))
}
function applyRopePhysicsFrame() {
  const e = isDragging ? .26 : .18;
  const n = isDragging ? .7 : .6;
  ropeVelocityY = (ropeVelocityY + (ropeTargetY - ropeVisualY) * e) * n;
  ropeVisualY += ropeVelocityY;
  const t = Math.min(ropeLastRaw / PULL_THRESHOLD, 1);
  const a = ropeVisualY;
  const r = clamp(ropePointerOffset * 10 + ropeVelocityY * .11 + ropeSwing, -13, 13);
  const l = 1 + clamp(a / (PULL_THRESHOLD * 1.45), 0, .66) + clamp(Math.abs(ropeVelocityY) * .012, 0, .095);
  const i = 1 + t * .76 + clamp(Math.abs(ropeVelocityY) * .01, 0, .15);
  ropeButton.style.transform = `translateX(-50%) rotate(${r.toFixed(2)}deg)`;
  ropeImg.style.transform = `scaleY(${l.toFixed(3)})`;
  ropeHalo.style.opacity = String(.24 + t * .72);
  ropeHalo.style.transform = `translateX(-50%) translateY(${(a * .28).toFixed(2)}px) scale(${i.toFixed(3)})`;
  if (!isDragging && ropeTargetY === 0 && Math.abs(ropeVisualY) < .45 && Math.abs(ropeVelocityY) < .45) {
    ropeVisualY = 0;
    ropeVelocityY = 0;
    ropeLastRaw = 0;
    ropePointerOffset = 0;
    ropeButton.style.transform = "";
    ropeImg.style.transform = "";
    ropeHalo.style.opacity = "";
    ropeHalo.style.transform = "";
    ropeFrame = 0;
    return
  }
  ropeFrame = requestAnimationFrame(applyRopePhysicsFrame)
}
function startRopePhysics() {
  if (!ropeFrame)
    ropeFrame = requestAnimationFrame(applyRopePhysicsFrame)
}
function hidePullFeedback() {
  if (pullFeedbackTimer) {
    clearTimeout(pullFeedbackTimer);
    pullFeedbackTimer = 0
  }
  pullFeedback.classList.remove("is-visible")
}
function showPullFeedback() {
  if (triggered || rmq)
    return;
  hidePullFeedback();
  pullFeedback.classList.add("is-visible");
  pullFeedbackTimer = setTimeout(() => {
    pullFeedback.classList.remove("is-visible");
    pullFeedbackTimer = 0
  }
    , 1900)
}
function snapBack() {
  ropeTargetY = 0;
  ropeLastRaw = 0;
  ropeSwing = clamp(ropeVelocityY * -.08, -5.5, 5.5);
  ropeButton.classList.remove("is-pulling");
  ropeButton.style.transition = "none";
  ropeImg.style.transition = "none";
  ropeHalo.style.transition = "none";
  startRopePhysics();
  setTimeout(() => {
    if (!triggered && !isDragging)
      ropeButton.classList.add("rope-idle")
  }
    , 760)
}
ropeButton.addEventListener("pointerdown", e => {
  if (triggered)
    return;
  _unlockMusic();
  try {
    const t = Sound.ctx;
    if (t && t.state === "suspended")
      t.resume()
  } catch (t) { }
  e.preventDefault();
  isDragging = true;
  dragStartY = e.clientY;
  ropePeakRaw = 0;
  hidePullFeedback();
  ropeButton.classList.add("rope-ready");
  ropeButton.classList.remove("rope-idle");
  ropeButton.classList.add("is-pulling");
  ropeButton.style.transition = "none";
  ropeButton.style.willChange = "transform";
  ropeImg.style.transition = "none";
  ropeHalo.style.transition = "none";
  ropeTargetY = ropeVisualY;
  ropeVelocityY = 0;
  ropeLastRaw = 0;
  const n = ropeButton.getBoundingClientRect();
  ropePointerOffset = clamp((e.clientX - (n.left + n.width / 2)) / n.width, -1, 1);
  startRopePhysics();
  ropeButton.setPointerCapture(e.pointerId)
}
);
ropeButton.addEventListener("pointermove", e => {
  if (!isDragging || triggered)
    return;
  e.preventDefault();
  const n = Math.max(0, e.clientY - dragStartY);
  const t = resist(n);
  const a = ropeButton.getBoundingClientRect();
  const r = clamp((e.clientX - (a.left + a.width / 2)) / a.width, -1, 1);
  ropeTargetY = t;
  ropeLastRaw = n;
  ropePeakRaw = Math.max(ropePeakRaw, n);
  ropeSwing = clamp((r - ropePointerOffset) * 18 + (t - ropeVisualY) * .034, -8.5, 8.5);
  ropePointerOffset = r;
  startRopePhysics();
  if (n >= PULL_THRESHOLD) {
    isDragging = false;
    triggerIntro()
  }
}
);
ropeButton.addEventListener("pointerup", e => {
  if (ropeButton.hasPointerCapture(e.pointerId))
    ropeButton.releasePointerCapture(e.pointerId);
  isDragging = false;
  if (!triggered) {
    if (ropePeakRaw > PULL_THRESHOLD * .18)
      showPullFeedback();
    snapBack()
  }
}
);
ropeButton.addEventListener("pointercancel", () => {
  isDragging = false;
  if (!triggered) {
    if (ropePeakRaw > PULL_THRESHOLD * .18)
      showPullFeedback();
    snapBack()
  }
}
);
ropeButton.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    triggerIntro()
  }
}
);
ropeButton.addEventListener("click", () => {
  if (!triggered && rmq)
    triggerIntro()
}
);
lotusButton.addEventListener("click", () => {
  if (lotusButton.classList.contains("is-animating"))
    return;
  lotusButton.classList.add("is-animating");
  if (rmq) {
    revealSite();
    return
  }
  Sound.lotus();
  lotusButton.classList.add("lotus-phase-1");
  setTimeout(() => {
    lotusButton.classList.remove("lotus-phase-1");
    lotusButton.classList.add("lotus-phase-2")
  }
    , 200);
  setTimeout(() => {
    lotusButton.classList.remove("lotus-phase-2");
    lotusButton.classList.add("lotus-phase-3");
    lotusIconImg.style.transition = "opacity 400ms ease";
    lotusIconImg.style.opacity = "0";
    const e = document.getElementById("lotusOpenImg");
    if (e) {
      e.style.transition = "opacity 420ms ease 80ms";
      e.style.opacity = "1"
    }
  }
    , 600);
  setTimeout(() => {
    lotusButton.classList.remove("lotus-phase-3");
    lotusButton.classList.add("is-open")
  }
    , 860);
  setTimeout(revealSite, 1200)
}
);
skipBtn.addEventListener("click", revealSite);
menuToggle.addEventListener("click", e => {
  e.stopPropagation();
  const n = floatingMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(n))
}
);
document.querySelectorAll(".menu-link").forEach(e => e.addEventListener("click", n => {
  if (e.id === "menuHome") {
    n.preventDefault();
    lotusButton.classList.remove("is-open", "is-animating", "lotus-phase-1", "lotus-phase-2", "lotus-phase-3");
    lotusIconImg.style.transition = "none";
    lotusIconImg.style.opacity = "1";
    var t = document.getElementById("lotusOpenImg");
    if (t) {
      t.style.transition = "none";
      t.style.opacity = "0"
    }
    triggered = false;
    floatingMenu.classList.remove("is-visible");
    introEl.classList.remove("is-complete");
    introEl.classList.add("is-lit", "show-names", "show-date", "show-venue", "show-lotus");
    document.body.classList.add("intro-active");
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }
  floatingMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false")
}
));
document.addEventListener("click", e => {
  if (!floatingMenu.classList.contains("is-open"))
    return;
  if (!floatingMenu.contains(e.target)) {
    floatingMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false")
  }
}
);
const observer = new IntersectionObserver(e => {
  e.forEach(n => {
    if (document.body.classList.contains("intro-active") && n.target.closest(".invite-section"))
      return;
    if (n.isIntersecting) {
      n.target.classList.add("in-view");
      observer.unobserve(n.target)
    }
  }
  )
}
  , {
    threshold: .08,
    rootMargin: "0px 0px -4% 0px"
  });
document.querySelectorAll(".reveal-item").forEach(e => observer.observe(e));
const TTK_BASE = "assets/ttk/";
const TTK_ITEMS = [{
  type: "dress-code",
  enabled: true,
  title: "Dress Code",
  description: "Festive Indian elegance. Sarees, lehengas and sherwanis are warmly encouraged.",
  icon: TTK_BASE + "pn-ttk-ico-dress-code-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "venue",
  enabled: true,
  title: "Venue",
  description: "The Oberoi Udaivilas, Udaipur. All celebrations take place within the palace grounds.",
  icon: TTK_BASE + "pn-ttk-ico-venue-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "stay-options",
  enabled: true,
  title: "Stay Options",
  description: "A curated block of rooms has been reserved. Please book by 1st November 2026.",
  icon: TTK_BASE + "pn-ttk-ico-stay-options-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "hashtag",
  enabled: true,
  title: "Wedding Hashtag",
  description: "Share your favourite moments with #AaravMeeraNoor.",
  icon: TTK_BASE + "pn-ttk-ico-hashtag-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "transport",
  enabled: false,
  title: "Transport",
  description: "Complimentary shuttle service between the airport and the palace.",
  icon: TTK_BASE + "pn-ttk-ico-transport-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "gift-registry",
  enabled: false,
  title: "Gift Registry",
  description: "Your presence is the greatest gift. A registry link is available for those who wish.",
  icon: TTK_BASE + "pn-ttk-ico-gift-registry-x-v01.webp",
  linkLabel: "View Registry",
  linkUrl: "#",
  custom: false
}, {
  type: "food",
  enabled: false,
  title: "Food",
  description: "A lavish spread of vegetarian and non-vegetarian dishes will be served at all events.",
  icon: TTK_BASE + "pn-ttk-ico-food-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "weather",
  enabled: false,
  title: "Weather",
  description: "December in Udaipur is pleasant \u2014 expect clear skies and cool evenings.",
  icon: TTK_BASE + "pn-ttk-ico-weather-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "parking",
  enabled: false,
  title: "Parking",
  description: "Valet parking is available at the main palace entrance.",
  icon: TTK_BASE + "pn-ttk-ico-parking-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "kids-welcome",
  enabled: false,
  title: "Kids Welcome",
  description: "Children are warmly welcome. A dedicated kids' zone will be available at all events.",
  icon: TTK_BASE + "pn-ttk-ico-kids-welcome-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "photography",
  enabled: false,
  title: "Photography",
  description: "A professional photographer will be present. Guests are welcome to capture moments freely.",
  icon: TTK_BASE + "pn-ttk-ico-photography-x-v01.webp",
  linkLabel: null,
  linkUrl: null,
  custom: false
}, {
  type: "whatsapp-group",
  enabled: false,
  title: "WhatsApp Group",
  description: "Join our wedding group for live updates and celebration news.",
  icon: TTK_BASE + "pn-ttk-ico-whatsapp-group-x-v01.webp",
  linkLabel: "Join Group",
  linkUrl: "#",
  custom: false
}];
const ttkObserver = new IntersectionObserver(e => {
  e.forEach(n => {
    if (!n.isIntersecting)
      return;
    n.target.classList.add("in-view");
    ttkObserver.unobserve(n.target)
  }
  )
}
  , {
    threshold: .1,
    rootMargin: "0px 0px -5% 0px"
  });
function renderTTK() {
  const e = document.getElementById("ttkGrid");
  if (!e)
    return;
  const n = TTK_ITEMS.filter(a => a.enabled);
  if (!n.length)
    return;
  const t = n.length;
  if (t === 1)
    e.classList.add("ttk-grid--single");
  n.forEach((a, r) => {
    const l = t > 1 && t % 2 !== 0 && r === t - 1;
    const i = buildTTKCard(a, l);
    if (!rmq)
      i.style.transitionDelay = `${r * 80}ms`;
    e.appendChild(i);
    ttkObserver.observe(i)
  }
  )
}
function buildTTKCard(e, n) {
  const t = document.createElement("article");
  t.className = "ttk-card" + (n ? " ttk-card--last-odd" : "");
  t.setAttribute("role", "listitem");
  const a = document.createElement("div");
  a.className = "ttk-card-icon-wrap";
  const r = document.createElement("img");
  r.className = "ttk-card-icon"; r.onerror = function () { this.style.display = "none"; };
  r.src = e.icon;
  r.alt = "";
  r.decoding = "async";
  r.loading = "lazy";
  r.setAttribute("aria-hidden", "true");
  r.addEventListener("transitionend", () => {
    r.classList.add("icon-sprung")
  }
    , {
      once: true
    });
  a.appendChild(r);
  const l = document.createElement("div");
  l.className = "ttk-card-rule";
  l.setAttribute("aria-hidden", "true");
  const i = document.createElement("h3");
  i.className = "ttk-card-title";
  i.textContent = e.title;
  const c = document.createElement("p");
  c.className = "ttk-card-body";
  c.textContent = e.description;
  t.appendChild(a);
  t.appendChild(l);
  t.appendChild(i);
  t.appendChild(c);
  if (e.linkLabel && e.linkUrl) {
    const s = document.createElement("a");
    s.className = "ttk-card-link";
    s.href = e.linkUrl;
    s.textContent = "\u2197 " + e.linkLabel;
    if (e.linkUrl.startsWith("http")) {
      s.target = "_blank";
      s.rel = "noreferrer"
    }
    t.appendChild(s)
  }
  return t
}
(function e() {
  var n = typeof window !== "undefined" ? window.__WEDDING_CONFIG__ : null;
  if (!n)
    return;
  function t(o) {
    if (!o)
      return "";
    var b = o.split("-");
    var m = parseInt(b[2], 10)
      , g = parseInt(b[1], 10)
      , v = b[0];
    var w = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m + " " + (w[g - 1] || "") + " " + v
  }
  if (n.events && n.events.length > 0) {
    var a = n.events.map(function (o) {
      return {
        id: o.id,
        icon: o.icon,
        name: o.name,
        date: t(o.date),
        time: o.time || "",
        venue: o.venue || "",
        note: o.desc || "",
        map: o.mapsLink || ""
      }
    });
    EVENTS.splice(0, EVENTS.length);
    a.forEach(function (o) {
      EVENTS.push(o)
    })
  }
  if (n.gallery) {
    if (!n.gallery.show || n.gallery.layout === "skip") {
      GALLERY_PHOTOS.splice(0)
    } else {
      var r = (n.gallery.photos || []).filter(Boolean);
      if (r.length > 0) {
        var l = ["hero", "portrait", "landscape", "portrait"];
        var i = n.couple && n.couple.bride || "";
        var c = n.couple && n.couple.groom || "";
        var s = i && c ? i + " & " + c : "";
        var h = parseInt(n.gallery.layout, 10) || 4;
        var f = r.slice(0, h).map(function (o, b) {
          return {
            src: o,
            caption: s,
            orient: l[b] || "portrait"
          }
        });
        GALLERY_PHOTOS.splice(0, GALLERY_PHOTOS.length);
        f.forEach(function (o) {
          GALLERY_PHOTOS.push(o)
        })
      }
    }
  }
  if (n.thingsToKnow && n.thingsToKnow.length > 0) {
    var u = {
      dresscode: "dress-code",
      hotel: "stay-options",
      gifts: "gift-registry",
      kids: "kids-welcome",
      whatsapp: "whatsapp-group",
      photos: "photography"
    };
    TTK_ITEMS.forEach(function (o) {
      o.enabled = false
    });
    n.thingsToKnow.forEach(function (o) {
      var b = u[o.id] || o.id;
      var m = o.id && !o.id.startsWith("ctk_") ? TTK_ITEMS.find(function (v) {
        return v.type === b
      }) : null;
      if (m) {
        m.title = o.label || m.title;
        m.description = o.value || m.description;
        m.enabled = true;
        if (o.iconKey)
          m.icon = TTK_BASE + o.iconKey;
        if (o.mapsLink) {
          m.linkLabel = "Open in Maps";
          m.linkUrl = o.mapsLink
        }
      } else if (o.label) {
        var g = o.iconKey || "pn-ttk-ico-custom-note-x-v01.webp";
        TTK_ITEMS.push({
          type: o.id || "custom-" + TTK_ITEMS.length,
          enabled: true,
          title: o.label,
          description: o.value || "",
          icon: TTK_BASE + g,
          linkLabel: null,
          linkUrl: null,
          custom: true
        })
      }
    })
  }
  if (n.invite) {
    HAS_GRANDPARENTS = !!n.invite.showGrandparents
  }
  if (n.showThingsToKnow === false) {
    TTK_ITEMS.forEach(function (o) {
      o.enabled = false
    });
    var y = document.getElementById("things");
    if (y)
      y.style.display = "none"
  }
}
)();
hydrate();
Sound.init();
const RSVP_EVENT = {
  title: "Aarav & Meera's Wedding",
  startUTC: "20261213T040000Z",
  endUTC: "20261213T070000Z",
  location: "The Oberoi Udaivilas, Udaipur, Rajasthan, India",
  description: "Join us for the wedding of Aarav & Meera. Dress code: Traditional Indian attire."
};
function buildGCalLink(e) {
  const n = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${e.startUTC}/${e.endUTC}`,
    location: e.location,
    details: e.description
  });
  return "https://calendar.google.com/calendar/render?" + n.toString()
}
function buildICSContent(e) {
  const n = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pichwai Noor//Wedding//EN", "BEGIN:VEVENT", `DTSTART:${e.startUTC}`, `DTEND:${e.endUTC}`, `DTSTAMP:${n}`, `SUMMARY:${e.title}`, `LOCATION:${e.location}`, `DESCRIPTION:${e.description}`, "STATUS:CONFIRMED", "END:VEVENT", "END:VCALENDAR"].join("\r\n")
}
function wireCalendarButtons() {
  const e = document.getElementById("rsvpGcalBtn");
  const n = document.getElementById("rsvpIcalBtn");
  if (!e || !n)
    return;
  const t = typeof window !== "undefined" && window.__WEDDING_CONFIG__;
  if (t && t.calendarUrls)
    return;
  e.href = buildGCalLink(RSVP_EVENT);
  const a = new Blob([buildICSContent(RSVP_EVENT)], {
    type: "text/calendar"
  });
  n.href = URL.createObjectURL(a)
}
function initRSVPFireworks(e) {
  const n = e.getContext("2d");
  const t = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (t)
    return;
  let a, r;
  const l = () => {
    a = e.width = e.offsetWidth;
    r = e.height = e.offsetHeight
  }
    ;
  l();
  window.addEventListener("resize", l, {
    passive: true
  });
  const i = [["rgba(247,238,220,", "rgba(235,210,190,"], ["rgba(223,176,180,", "rgba(200,148,160,"], ["rgba(191,155,168,", "rgba(166,120,140,"], ["rgba(180,100,118,", "rgba(140,70,90,"]];
  const c = [];
  function s() {
    const g = a * (.18 + Math.random() * .64);
    const v = r * (.04 + Math.random() * .34);
    const w = i[Math.floor(Math.random() * i.length)];
    const p = 36 + Math.floor(Math.random() * 22);
    const I = [];
    for (let C = 0; C < p; C++) {
      const P = Math.PI * 2 * C / p + (Math.random() - .5) * .3;
      const O = 1.2 + Math.random() * 2.6;
      I.push({
        angle: P,
        speed: O,
        vx: Math.cos(P) * O,
        vy: Math.sin(P) * O,
        x: g,
        y: v,
        life: 1,
        decay: .012 + Math.random() * .01,
        size: .8 + Math.random() * 1.4,
        col: w[Math.floor(Math.random() * w.length)]
      })
    }
    c.push({
      particles: I,
      age: 0
    })
  }
  const h = [600, 2200, 3800, 5200, 6400, 7800];
  const f = 7e3;
  let u = false;
  function y() {
    if (u)
      return;
    u = true;
    h.forEach(g => setTimeout(function v() {
      if (!document.getElementById("rsvp"))
        return;
      s();
      setTimeout(v, f)
    }, g))
  }
  let o;
  function b() {
    n.clearRect(0, 0, a, r);
    for (let g = c.length - 1; g >= 0; g--) {
      const v = c[g];
      let w = true;
      for (const p of v.particles) {
        p.x += p.vx * .72;
        p.y += p.vy * .72 + .04;
        p.vx *= .97;
        p.vy *= .97;
        p.life -= p.decay;
        if (p.life <= 0)
          continue;
        w = false;
        const I = Math.max(0, p.life * p.life);
        n.beginPath();
        n.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        n.fillStyle = p.col + I.toFixed(3) + ")";
        n.fill()
      }
      if (w)
        c.splice(g, 1)
    }
    o = requestAnimationFrame(b)
  }
  const m = new IntersectionObserver(g => {
    g.forEach(v => {
      if (v.isIntersecting) {
        y();
        if (!o)
          b()
      } else {
        cancelAnimationFrame(o);
        o = 0
      }
    }
    )
  }
    , {
      threshold: .05
    });
  m.observe(e.closest(".rsvp-section"))
}
function initRSVPReveal() {
  const e = document.getElementById("rsvp");
  if (!e)
    return;
  const n = new IntersectionObserver(t => {
    t.forEach(a => {
      if (!a.isIntersecting)
        return;
      e.classList.add("rsvp-alive");
      n.unobserve(e)
    }
    )
  }
    , {
      threshold: .08
    });
  n.observe(e)
}
function initRSVP() {
  wireCalendarButtons();
  initRSVPReveal();
  const e = document.getElementById("rsvpFireworksCanvas");
  if (e)
    initRSVPFireworks(e)
}
document.addEventListener("DOMContentLoaded", initRSVP);
if (document.readyState !== "loading")
  initRSVP();
(function () {
  const e = document.getElementById("couple");
  const n = document.getElementById("cplTreeLeft");
  const t = document.getElementById("cplTreeRight");
  if (!e || !n || !t)
    return;
  n.style.transform = "translateX(0%)";
  t.style.transform = "translateX(0%)";
  let a = false;
  let r = false;
  let l = false;
  const i = e.querySelectorAll(".cpl-header, .cpl-story");
  function c() {
    const f = window.innerWidth || document.documentElement.clientWidth || 0;
    if (f >= 1536)
      return 130;
    if (f >= 1280)
      return 124;
    if (f >= 1024)
      return 116;
    if (f >= 768)
      return 108;
    return 100
  }
  function s(f) {
    n.style.transform = `translateX(-${f}%)`;
    t.style.transform = `translateX(${f}%)`
  }
  function h() {
    a = false;
    if (r)
      return;
    const f = e.getBoundingClientRect();
    const u = window.innerHeight;
    const y = u + e.offsetHeight * .15;
    const o = u * .5;
    const b = 1 - (f.bottom - o) / (y - o);
    const m = Math.max(0, Math.min(1, b));
    const g = 1 - Math.pow(1 - m, 4);
    const v = (g * c()).toFixed(3);
    s(v);
    if (!l && m > .4) {
      l = true;
      i.forEach((w, p) => {
        w.style.opacity = "0";
        w.style.transform = "translateY(20px)";
        w.style.transition = `opacity 700ms cubic-bezier(.16,1,.3,1) ${p * 180}ms,
                               transform 800ms cubic-bezier(.16,1,.3,1) ${p * 180}ms`;
        void w.offsetHeight;
        w.style.opacity = "1";
        w.style.transform = "translateY(0)"
      }
      )
    }
    if (m >= 1) {
      r = true;
      s(c())
    }
  }
  i.forEach(f => {
    f.style.opacity = "0";
    f.style.transform = "translateY(20px)"
  }
  );
  window.addEventListener("scroll", () => {
    if (!a && !r) {
      a = true;
      requestAnimationFrame(h)
    }
  }
    , {
      passive: true
    });
  window.addEventListener("resize", () => {
    if (r)
      s(c())
  }
    , {
      passive: true
    });
  h()
}
)();
(function e() {
  var n = typeof window !== "undefined" ? window.__WEDDING_CONFIG__ : null;
  if (!n)
    return;
  var t = n.couple || {};
  var a = n.invite || {};
  var r = n.story || {};
  var l = n.gallery || {};
  var i = n.rsvp || {};
  var c = n.music || {};
  var s = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function h(L) {
    if (!L)
      return "";
    var M = L.split("-");
    return parseInt(M[2], 10) + " " + (s[parseInt(M[1], 10) - 1] || "") + " " + M[0]
  }
  function f(L) {
    if (!L)
      return "";
    var M = L.split("-");
    return parseInt(M[2], 10) + " \xB7 " + (s[parseInt(M[1], 10) - 1] || "") + " \xB7 " + M[0]
  }
  if (t.bride && t.groom) {
    document.title = t.bride + " & " + t.groom + " \xB7 invite.kimiclaw.in"
  }
  var u = document.getElementById("introNames");
  if (u && t.bride && t.groom) {
    var y = Array.from(u.querySelectorAll(".word")).filter(function (L) {
      return !L.classList.contains("amp-wrap")
    });
    if (y.length >= 2) {
      y[0].textContent = t.bride;
      y[y.length - 1].textContent = t.groom
    }
  }
  var o = document.getElementById("introDate");
  if (o && t.date)
    o.textContent = f(t.date);
  var b = document.getElementById("introVenue");
  if (b && t.venue)
    b.textContent = t.venue;
  var m = document.querySelector(".inv-names");
  if (m && t.bride && t.groom) {
    m.innerHTML = t.bride + ' <span class="inv-amp">&amp;</span> ' + t.groom
  }
  var g = document.querySelector(".inv-parents");
  if (g && (a.brideFather || a.groomFather)) {
    var v = a.brideFather || ""
      , w = a.brideMother || "";
    var p = a.groomFather || ""
      , I = a.groomMother || "";
    var C = a.parentsOrder === "groom_first";
    var P = (C ? "S/O " : "D/O ") + v + " &amp; " + w;
    var O = (C ? "D/O " : "S/O ") + p + " &amp; " + I;
    g.innerHTML = "<p>" + P + "</p><p>" + O + "</p>"
  }
  var U = document.querySelector(".inv-date");
  if (U && t.date)
    U.textContent = h(t.date);
  var d = document.querySelector(".inv-venue");
  if (d && t.venue)
    d.textContent = t.venue;
  var E = "With the blessings of the divine and the love of our families";
  var T = document.querySelector(".inv-blessing-alt-line1");
  var x = document.querySelector(".inv-blessing-alt-line2");
  if (T && x && a.blessing && a.blessing.trim() !== E) {
    let L = function (M) {
      return String(M).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    };
    var ge = L;
    var B = String(a.blessing).split("\n");
    T.innerHTML = L(B[0] || "");
    if (B.length > 1) {
      x.innerHTML = B.slice(1).map(L).join("<br>");
      x.style.display = ""
    } else {
      x.style.display = "none"
    }
  }
  if (HAS_GRANDPARENTS && a.showGrandparents) {
    var S = document.querySelector(".inv-blessing");
    if (S) {
      var k = Array.from(S.querySelectorAll("p:not(.inv-overline)"));
      if (k.length >= 2) {
        var R = [a.brideGF, a.brideGM].filter(Boolean).join(" & ");
        var q = [a.groomGF, a.groomGM].filter(Boolean).join(" & ");
        if (R) {
          k[0].textContent = R
        } else {
          k[0].style.display = "none"
        }
        if (q) {
          k[1].textContent = q
        } else {
          k[1].style.display = "none"
        }
      }
    }
  }
  if (r.show === false) {
    var G = document.getElementById("couple");
    if (G)
      G.style.display = "none";
    var D = document.querySelector('.menu-link[href="#couple"]');
    if (D) {
      D.style.display = "none";
      var F = D.previousElementSibling;
      if (F && F.classList.contains("menu-divider"))
        F.style.display = "none"
    }
  }
  var z = r.storyMode || "tags";
  var N = document.querySelector(".cpl-story-body");
  var W = document.getElementById("cplTags");
  if (z === "story") {
    if (N && r.storyText)
      N.textContent = r.storyText
  } else {
    if (r.tags && r.tags.length > 0) {
      if (N)
        N.textContent = "";
      if (W) {
        W.setAttribute("aria-hidden", "false");
        r.tags.forEach(function (L) {
          var M = document.createElement("span");
          M.className = "cpl-tag-chip";
          M.textContent = L;
          W.appendChild(M)
        })
      }
    }
  }
  var j = document.getElementById("cplHashtag");
  if (j) {
    var _ = (r.customHashtag || t.hashtag || "").trim();
    if (_) {
      if (_.charAt(0) !== "#")
        _ = "#" + _;
      j.textContent = _;
      j.removeAttribute("hidden")
    }
  }
  if (!l.show || l.layout === "skip") {
    var Z = document.getElementById("gallery");
    if (Z)
      Z.style.display = "none";
    var K = document.querySelector('.menu-link[href="#gallery"]');
    if (K) {
      K.style.display = "none";
      var X = K.previousElementSibling;
      if (X && X.classList.contains("menu-divider"))
        X.style.display = "none"
    }
  }
  var V = document.getElementById("rsvpHeadline");
  if (V && i.heading) {
    var Q = V.querySelector(".rsvp-hl-join");
    var ee = V.querySelector(".rsvp-hl-will");
    if (Q) {
      Q.textContent = i.heading;
      if (ee)
        ee.textContent = ""
    } else {
      V.textContent = i.heading
    }
  }
  var te = document.querySelector(".rsvp-body");
  if (te && i.subtext)
    te.textContent = i.subtext;
  var $ = document.querySelector(".rsvp-btn-primary");
  if ($ && t.bride) {
    if (i.mode === "form" && i.form_url) {
      $.href = i.form_url;
      $.setAttribute("target", "_blank")
    } else {
      var H = (t.whatsapp || "").replace(/\D/g, "");
      if (H) {
        var de = H.startsWith("91") ? H : "91" + H;
        var ue = encodeURIComponent("Hi " + t.bride + " & " + t.groom + "! I'll be there to celebrate with you!");
        $.href = "https://wa.me/" + de + "?text=" + ue
      }
    }
    var ne = $.querySelector(".rsvp-btn-inner");
    var ae = i.mode === "form" ? i.button_text || i.btnText : i.btnText;
    if (ne && ae)
      ne.textContent = ae;
    var re = $.parentElement && $.parentElement.querySelector(".rsvp-helper");
    if (re) {
      re.textContent = i.mode === "form" ? "You'll be redirected to our RSVP form." : "You'll be redirected to WhatsApp to confirm your attendance."
    }
  }
  if (n.calendarUrls) {
    var ie = document.getElementById("rsvpGcalBtn");
    var Y = document.getElementById("rsvpIcalBtn");
    if (ie)
      ie.href = n.calendarUrls.google;
    if (Y) {
      var me = ((t.bride || "bride") + "-" + (t.groom || "groom") + "-wedding.ics").toLowerCase().replace(/\s+/g, "-");
      var se = (t.date || "").replace(/-/g, "");
      if (se) {
        var J = new Date(t.date);
        J.setDate(J.getDate() + 1);
        var pe = J.toISOString().slice(0, 10).replace(/-/g, "");
        var fe = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//KimiClaw//Wedding//EN", "BEGIN:VEVENT", "DTSTART;VALUE=DATE:" + se, "DTEND;VALUE=DATE:" + pe, "SUMMARY:" + ((t.bride || "Bride") + " weds " + (t.groom || "Groom")), "LOCATION:" + (t.venue || ""), "STATUS:CONFIRMED", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
        var he = new Blob([fe], {
          type: "text/calendar;charset=utf-8"
        });
        Y.href = URL.createObjectURL(he)
      } else {
        Y.href = n.calendarUrls.apple
      }
      Y.setAttribute("download", me)
    }
  }
  var oe = document.querySelector(".closing-names");
  if (oe && t.bride && t.groom) {
    oe.textContent = t.bride + " & " + t.groom
  }
  var le = document.querySelector(".closing-date");
  if (le && t.date)
    le.textContent = f(t.date);
  var ce = document.getElementById("bgMusic");
  if (ce) {
    if (c.enabled && c.src)
      ce.src = c.src
  }
}
)();
