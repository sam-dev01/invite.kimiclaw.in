'use strict';

/* ─────────────────────────────────────────
   GLOBALS
───────────────────────────────────────── */
const isTouch = window.matchMedia('(pointer:coarse)').matches;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────
   CUSTOM CURSOR (desktop only)
   - transform-based positioning (no layout)
   - rAF loop auto-sleeps when cursor is idle
   - boxShadow written only when hover state changes
───────────────────────────────────────── */
(function initCursor() {
  if (isTouch) return;
  const ring = document.getElementById('cRing');
  const dot = document.getElementById('cDot');
  if (!ring || !dot) return;

  let rx = 0, ry = 0, dx = -200, dy = -200;
  let hasMoved = false, rafId = null, lastCh = null;

  function loop() {
    rx += (dx - rx) * 0.082;
    ry += (dy - ry) * 0.082;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;

    const ch = document.body.classList.contains('ch');
    if (ch !== lastCh) {
      lastCh = ch;
      ring.style.boxShadow = ch
        ? '0 0 44px 16px rgba(196,152,90,.50)'
        : '0 0 20px 4px rgba(196,116,140,.20)';
    }

    /* Sleep when ring has settled onto the dot */
    if (Math.abs(dx - rx) > 0.15 || Math.abs(dy - ry) > 0.15) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }

  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY;
    dot.style.transform = `translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`;
    if (!hasMoved) {
      hasMoved = true;
      document.body.classList.add('cursor-active');
      /* Neutralise the CSS top/left offsets — transform drives position now */
      ring.style.top = '0'; ring.style.left = '0';
      dot.style.top = '0'; dot.style.left = '0';
    }
    if (!rafId) rafId = requestAnimationFrame(loop);
  }, { passive: true });

  document.querySelectorAll('a, button, .ev-node, .tt, .gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();

/* ─────────────────────────────────────────
   PRELOADER — graceful reveal
   Body gets .pl-active immediately. If JS fails
   or preloader is missing, everything is visible
   by default via the CSS fallback.
───────────────────────────────────────── */
function revealHero() {
  document.body.classList.remove('pl-active');
  const palace = document.querySelector('.hl-palace');
  const flowers = document.querySelector('.hl-flowers');
  const copy = document.getElementById('heroCopy');
  if (palace) palace.classList.add('in');
  if (flowers) flowers.classList.add('in');
  if (copy) copy.classList.add('in');
}

// Simple Preloader Initialization
function initPreloader() {
  const preloader = document.getElementById('simplePreloader');
  if (!preloader) {
    revealHero();
    return;
  }
  
  document.body.classList.add('scroll-locked');
  
  // Dismiss after a short delay
  setTimeout(() => {
    preloader.classList.add('dismissed');
    document.body.classList.remove('scroll-locked');
    revealHero();
  }, 1000);
}

// Run on loaded
if(document.readyState === 'complete'){ initPreloader(); } else { window.addEventListener('load', initPreloader); }

/* ─────────────────────────────────────────
   SCROLL-PINNED HERO DRIVER
   - Palace zooms (scale 1→1.45) on scroll
   - Names dissolve between p=.55 and p=.88
   - Style writes are diffed — no redundant
     filter/letter-spacing writes per frame
───────────────────────────────────────── */
const heroWrap = document.getElementById('heroWrap');
const heroPin = document.getElementById('heroPin');
const palaceEl = document.getElementById('l3');
const heroCopy = document.getElementById('heroCopy');
const scrollNudge = document.getElementById('scrollNudge');
const heroMoon = document.getElementById('heroMoon');

/* One-time "look at me" pulse on the scroll nudge if user hasn't scrolled */
(function nudgeAttention() {
  if (!scrollNudge) return;
  let fired = false;
  const timer = setTimeout(() => {
    if (fired) return;
    fired = true;
    scrollNudge.style.animation = 'snAttention 0.9s ease-in-out forwards';
    setTimeout(() => { scrollNudge.style.animation = 'snPulse 2.5s ease-in-out infinite'; }, 900);
  }, 4000);
  window.addEventListener('scroll', () => { fired = true; clearTimeout(timer); }, { once: true, passive: true });
})();

let raw = 0, lerped = 0, mouseX = 0, mouseY = 0, rafH = null;
const heroLast = { palaceT: '', palaceF: '', copyT: '', copyF: '', copyLS: '', copyOp: '', nudgeOp: '' };

function getHeroProgress() {
  if (!heroWrap) return 0;
  const top = heroWrap.getBoundingClientRect().top + window.scrollY;
  const travel = heroWrap.offsetHeight - window.innerHeight;
  if (travel <= 0) return 0;
  return Math.min(1, Math.max(0, (window.scrollY - top) / travel));
}

function setStyle(el, prop, val, key) {
  if (heroLast[key] === val) return;
  heroLast[key] = val;
  el.style[prop] = val;
}

function driveHero() {
  lerped += (raw - lerped) * 0.06;
  const p = lerped;
  const mx = isTouch ? 0 : mouseX;
  const my = isTouch ? 0 : mouseY;

  if (heroMoon)
    heroMoon.style.transform = `translate3d(${(mx * -3).toFixed(1)}px,${(p * -28 + my * -5).toFixed(1)}px,0)`;

  if (palaceEl) {
    const scale = 1.0 + p * 0.45;
    if (isTouch) {
      /* On touch: skip filter — it's a separate compositor layer cost */
      setStyle(palaceEl, 'transform', `translateX(-50%) scale(${scale.toFixed(3)})`, 'palaceT');
    } else {
      const tiltX = mx * -14, tiltY = my * -9;
      setStyle(palaceEl, 'transform',
        `perspective(1400px) rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg) translateX(calc(-50% + ${(tiltX * 0.5).toFixed(1)}px)) scale(${scale.toFixed(3)})`,
        'palaceT');
      /* Filter only on desktop where GPU has headroom */
      setStyle(palaceEl, 'filter',
        `drop-shadow(0 ${(20 + p * 30).toFixed(0)}px ${(50 + p * 40).toFixed(0)}px rgba(61,30,46,${(0.18 + p * 0.22).toFixed(2)}))`,
        'palaceF');
    }
  }

  if (heroCopy) {
    const t = Math.max(0, Math.min(1, (p - 0.55) / 0.33));
    setStyle(heroCopy, 'opacity', (1 - t).toFixed(3), 'copyOp');
    if (!isTouch) {
      setStyle(heroCopy, 'transform', `translateY(${(p * -32).toFixed(1)}px)`, 'copyT');
      /* blur only on desktop — on mobile use opacity fade only */
      setStyle(heroCopy, 'filter', t > 0 ? `blur(${(t * 16).toFixed(1)}px)` : '', 'copyF');
    }
    setStyle(heroCopy, 'letterSpacing', t > 0 ? (t * 0.10).toFixed(3) + 'em' : '', 'copyLS');
  }

  if (scrollNudge)
    setStyle(scrollNudge, 'opacity', Math.max(0, 1 - p / 0.18).toFixed(3), 'nudgeOp');

  /* Continue while in hero AND lerp hasn't settled */
  const settled = Math.abs(raw - lerped) < 0.0004;
  if (heroWrap && window.scrollY < heroWrap.offsetHeight && !settled)
    rafH = requestAnimationFrame(driveHero);
  else
    rafH = null;
}

window.addEventListener('scroll', () => {
  raw = getHeroProgress();
  if (!rafH && heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
}, { passive: true });

if (!isTouch && heroPin) {
  heroPin.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
    if (!rafH) rafH = requestAnimationFrame(driveHero);
  }, { passive: true });
  heroPin.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
    if (!rafH) rafH = requestAnimationFrame(driveHero);
  });
}

/* ─────────────────────────────────────────
   PETAL / FLOWER RAIN SYSTEM
   Section-scoped, IO-gated, tab-visibility aware.
───────────────────────────────────────── */
class Petals {
  constructor(id, opts = {}) {
    this.el = document.getElementById(id);
    this.max = opts.max || 8;
    this.rate = opts.rate || 1000;
    this.src = 'assets/Element_204-03d5916c5b.png';
    this.active = false;
    this.pool = new Set();
    this._iv = null;
  }

  spawn() {
    if (!this.el || document.hidden) return;
    if (this.pool.size >= this.max) {
      const first = this.pool.values().next().value;
      first?.remove();
      this.pool.delete(first);
    }
    if (this.pool.size >= this.max) return;

    const sz = 60 + Math.random() * 50;
    const x = 4 + Math.random() * 92;
    const dur = 8 + Math.random() * 6;
    const drift = (Math.random() - 0.5) * 130;
    const turns = 1 + Math.floor(Math.random() * 2);

    const wrap = document.createElement('div');
    wrap.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;

    const img = document.createElement('img');
    img.src = this.src;
    img.style.cssText =
      'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;' +
      'filter:drop-shadow(0 0 8px rgba(255,160,80,.5)) drop-shadow(0 0 20px rgba(255,120,40,.3))';
    wrap.appendChild(img);

    const anim = wrap.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
      { transform: `translateY(8vh) translateX(${drift * .3}px) rotate(${turns * 110}deg)`, opacity: .75, offset: .08 },
      { transform: `translateY(80vh) translateX(${drift}px) rotate(${turns * 330}deg)`, opacity: .55, offset: .88 },
      { transform: `translateY(108vh) translateX(${drift}px) rotate(${turns * 360}deg)`, opacity: 0 },
    ], { duration: dur * 1000, easing: 'linear', fill: 'forwards' });

    anim.onfinish = () => { wrap.remove(); this.pool.delete(wrap); };
    this.el.appendChild(wrap);
    this.pool.add(wrap);
  }

  start() {
    if (this.active || !this.el || prefersReduced) return;
    this.active = true;
    const rate = isTouch ? this.rate * 2 : this.rate;
    this._iv = setInterval(() => { if (this.active) this.spawn(); }, rate);
    this.spawn();
  }

  stop() {
    this.active = false;
    clearInterval(this._iv);
  }
}

const PS = {
  hero: new Petals('petalHero', { max: isTouch ? 5 : 10, rate: isTouch ? 1600 : 900 }),
  invite: new Petals('petalInvite', { max: isTouch ? 3 : 5, rate: isTouch ? 3500 : 2200 }),
  events: new Petals('petalEvents', { max: isTouch ? 3 : 6, rate: isTouch ? 4000 : 2600 }),
  things: new Petals('petalThings', { max: isTouch ? 2 : 4, rate: isTouch ? 4500 : 3000 }),
  rsvp: new Petals('petalRsvp', { max: isTouch ? 3 : 5, rate: isTouch ? 3000 : 2000 }),
};

const sIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const sys = target.id === 'heroWrap' ? PS.hero : PS[target.id];
    if (sys) isIntersecting ? sys.start() : sys.stop();
  });
}, { threshold: 0.08 });

['heroWrap', 'invite', 'events', 'things', 'rsvp'].forEach(id => {
  const el = document.getElementById(id);
  if (el) sIO.observe(el);
});

/* ─────────────────────────────────────────
   SCROLL REVEAL — .scroll-in elements
───────────────────────────────────────── */
const rIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.classList.add('vis');
      rIO.unobserve(target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-in').forEach(el => rIO.observe(el));

/* ─────────────────────────────────────────
   EVENTS — Journey Line (mobile only)
   Skipped entirely when the wrap is hidden by CSS.
───────────────────────────────────────── */
(function initEventsJourney() {
  if (window.matchMedia('(min-width:681px)').matches) return;

  const section = document.getElementById('events');
  const stage = document.getElementById('evStage');
  const svgEl = document.getElementById('evJourneySvg');
  const trackEl = document.getElementById('ejTrack');
  const drawnEl = document.getElementById('ejDrawn');
  if (!section || !stage || !svgEl || !trackEl || !drawnEl) return;

  /* CSS may disable the journey line — don't waste cycles */
  const wrap = svgEl.closest('.ev-journey-wrap');
  if (wrap && getComputedStyle(wrap).display === 'none') return;

  function getNodeCentres() {
    const secRect = section.getBoundingClientRect();
    return Array.from(stage.querySelectorAll('.ev-node')).map(node => {
      const r = (node.querySelector('.ev-icon-wrap') || node).getBoundingClientRect();
      return { x: r.left + r.width / 2 - secRect.left, y: r.top + r.height / 2 - secRect.top };
    });
  }

  function buildPath(pts) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const mx = (a.x + b.x) / 2;
      const wave = (i % 2 === 0 ? 1 : -1) * Math.min(60, Math.abs(b.x - a.x) * 0.28);
      const cy = ((a.y + b.y) / 2 - 28).toFixed(1);
      d += ` Q ${(mx + wave).toFixed(1)} ${cy}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }

  function sizeSvg() {
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    svgEl.setAttribute('width', w);
    svgEl.setAttribute('height', h);
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
  }

  /* ── Full layout pass ── */
  let cachedSecTop = 0;
  let cachedSecH = 0;

  function layout() {
    sizeSvg();
    requestAnimationFrame(() => {
      const d = buildPath(getNodeCentres());
      trackEl.setAttribute('d', d);
      drawnEl.setAttribute('d', d);
      if (drawnEl.getTotalLength) {
        const total = drawnEl.getTotalLength();
        drawnEl.style.strokeDasharray = total;
        drawnEl.style.strokeDashoffset = total;
        drawnEl._total = total;
      }
      onScroll();
    });
  }

  /* ── Scroll progress ── */
  let _jRaf = null;
  function onScroll() {
    if(!drawnEl._total) return;
    if (_jRaf) return; /* already scheduled — don't queue another */
    _jRaf = requestAnimationFrame(() => {
      _jRaf = null;
      const winH = window.innerHeight;
      const currentTop = cachedSecTop - window.scrollY;
      const progress = Math.min(1, Math.max(0, (winH - currentTop) / (cachedSecH + winH)));
      drawnEl.style.strokeDashoffset = (drawnEl._total * (1 - progress)).toFixed(1);
    });
  }

  window._evJourneyLayout = layout;

  /* Re-layout when section first paints (content-visibility fix) */
  const visIO = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      requestAnimationFrame(() => requestAnimationFrame(layout));
      visIO.disconnect();
    }
  }, { threshold: 0.01 });
  visIO.observe(section);

  window.addEventListener('load', layout);
  window.addEventListener('scroll', onScroll, { passive: true });

  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(layout, 180);
  });
})();

/* ─────────────────────────────────────────
   EVENTS — Scroll-triggered detail reveal
   Single persistent scroll listener; node list
   is refreshed on re-init (config rebuild) —
   no listener leak.
───────────────────────────────────────── */
const _evAuto = { observer: null };

function initEventsAutoOpen() {
  const nodes = Array.from(document.querySelectorAll('.ev-node:not(.ev-active)'));
  if (!nodes.length) return;
  
  if (!_evAuto.observer) {
    _evAuto.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => entry.target.classList.add('ev-active'));
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40% 0px" });
  }

  nodes.forEach(node => _evAuto.observer.observe(node));
}

initEventsAutoOpen();

/* ─────────────────────────────────────────
   STORY — Theatrical Curtain Reveal
   Pull → tension → scroll-driven open → reveal
───────────────────────────────────────── */
(function initCurtainReveal() {
  const section = document.getElementById('story');
  const stage = document.getElementById('stStage');
  const bride = document.getElementById('stBride');
  const groom = document.getElementById('stGroom');
  const curtL = document.getElementById('stCurtL');
  const curtR = document.getElementById('stCurtR');
  const reveal = document.getElementById('stReveal');
  const petalsEl = document.getElementById('stPetals');

  if (!section || !stage || !bride || !curtL || !curtR) return;

  let sequenceDone = false, openEnabled = false, revealed = false, lastP = 0;

  function spawnPetal() {
    if (!petalsEl || prefersReduced) return;
    const sz = 5 + Math.random() * 10;
    const x = 10 + Math.random() * 80;
    const dur = 5000 + Math.random() * 4000;
    const dx = (Math.random() - 0.5) * 90;
    const COLS = ['rgba(196,116,140,.22)', 'rgba(196,152,90,.18)', 'rgba(212,136,106,.20)', 'rgba(242,212,200,.35)'];
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 10% 50% 10%;background:${COLS[Math.floor(Math.random() * COLS.length)]};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
      { transform: `translateY(4vh) translateX(${dx * .1}px) rotate(40deg)`, opacity: .9, offset: .05 },
      { transform: `translateY(60vh) translateX(${dx * .85}px) rotate(230deg)`, opacity: .4, offset: .85 },
      { transform: `translateY(90vh) translateX(${dx}px) rotate(360deg)`, opacity: 0 },
    ], { duration: dur, easing: 'linear', fill: 'forwards' }).onfinish = () => el.remove();
  }

  function runSequence() {
    if (sequenceDone) return;
    sequenceDone = true;

    if (prefersReduced) {
      /* Skip theatrics — open instantly */
      openEnabled = true;
      applyProgress(1);
      return;
    }

    if (!isTouch) {
      bride.classList.add('st-pull');
      groom.classList.add('st-pull');
    }

    setTimeout(() => {
      bride.classList.remove('st-pull');
      groom.classList.remove('st-pull');
      if (!isTouch) {
        bride.classList.add('st-tension');
        groom.classList.add('st-tension');
      }
    }, isTouch ? 120 : 715);

    setTimeout(() => {
      bride.classList.remove('st-tension');
      groom.classList.remove('st-tension');
      openEnabled = true;
      applyProgress(getCurtainProgress());
    }, isTouch ? 220 : 1235);
  }

  let cachedSecTop = 0;
  window.addEventListener('load', () => cachedSecTop = section.getBoundingClientRect().top + window.scrollY);

  let cachedCurtTop = 0;
  window.addEventListener('load', () => cachedCurtTop = section.getBoundingClientRect().top + window.scrollY);

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    if(!cachedCurtTop) cachedCurtTop = section.getBoundingClientRect().top + window.scrollY;
    const currentTop = cachedCurtTop - window.scrollY;
    const start = window.innerHeight * 0.55;
    const range = window.innerHeight * 0.91;
    return Math.min(1, Math.max(0, (start - currentTop) / range));
  }

  function applyProgress(p) {
    if (Math.abs(p - lastP) < 0.002) return;
    lastP = p;

    const eased = p < 1 ? 1 - Math.pow(1 - p, 3.2) : 1;
    curtL.style.transform = `translate3d(-${(eased * 100).toFixed(2)}%,0,0)`;
    curtR.style.transform = `translate3d(${(eased * 100).toFixed(2)}%,0,0)`;
    /* Skip filter on touch — transform alone is GPU-composited and lag-free */
    if (!isTouch) {
      curtL.style.filter = `drop-shadow(${(eased * 26).toFixed(1)}px 0 28px rgba(61,30,46,${(eased * .40).toFixed(2)}))`;
      curtR.style.filter = `drop-shadow(-${(eased * 26).toFixed(1)}px 0 28px rgba(61,30,46,${(eased * .40).toFixed(2)}))`;
    }

    const charDrift = eased * (isTouch ? 12 : 28);
    const charScale = 1 - eased * 0.04;
    bride.style.transform = `translate3d(-${charDrift.toFixed(1)}px,0,0) scale(${charScale.toFixed(3)})`;
    groom.style.transform = `translate3d(${charDrift.toFixed(1)}px,0,0) scale(${charScale.toFixed(3)})`;

    if (eased >= 0.70 && !revealed) {
      revealed = true;
      reveal.classList.add('revealed');
      let n = 0;
      const iv = setInterval(() => { spawnPetal(); if (++n >= 28) clearInterval(iv); }, 160);
    }
  }

  /* rAF-throttled curtain scroll — never fires more than once per frame */
  let _cRaf = null;
  window.addEventListener('scroll', () => {
    if (_cRaf) return;
    _cRaf = requestAnimationFrame(() => { _cRaf = null; applyProgress(getCurtainProgress()); });
  }, { passive: true });

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && entries[0].intersectionRatio >= 0.22) {
      runSequence();
      io.disconnect();
    }
  }, { threshold: [0.22] });
  io.observe(section);

  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => applyProgress(getCurtainProgress()), 150);
  });
})();

/* ─────────────────────────────────────────
   RSVP — WhatsApp button petal burst on click
───────────────────────────────────────── */
(function initRsvpBtn() {
  const btn = document.getElementById('rsvpWaBtn');
  if (!btn) return;
  btn.addEventListener('click', () => burstPetals(btn));
})();

function burstPetals(fromEl) {
  if (prefersReduced) return;
  const r = fromEl.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const src = 'assets/Element_204-03d5916c5b.png';

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'burst-p';
    const sz = 10 + Math.random() * 16;
    const ang = (i / 18) * 360 + Math.random() * 18;
    const dst = 60 + Math.random() * 80;
    const tx = Math.cos(ang * Math.PI / 180) * dst;
    const ty = Math.sin(ang * Math.PI / 180) * dst;
    el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      { transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.1) rotate(${Math.random() * 360}deg)`, opacity: .85, offset: .45 },
      { transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5 + 50}px)) scale(.3) rotate(${Math.random() * 560}deg)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 400, easing: 'ease-out', fill: 'forwards' })
      .onfinish = () => el.remove();
  }
}

/* ─────────────────────────────────────────
   3D CARD TILT — ev-nodes + gallery
───────────────────────────────────────── */
(function initCardTilt() {
  if (prefersReduced) return;

  function attachMouseTilt(el) {
    if (el._tiltAttached) return;
    el._tiltAttached = true;
    el.addEventListener('mousemove', function (e) {
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      this.style.transition = 'transform 0.08s ease';
      this.style.transform = `perspective(900px) rotateX(${(y * -13).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) scale(1.035)`;
    }, { passive: true });
    el.addEventListener('mouseleave', function () {
      this.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  function attachTouchTilt(el) {
    if (el._touchTiltAttached) return;
    el._touchTiltAttached = true;
    el.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 1) return;
      const r = this.getBoundingClientRect();
      const x = (e.touches[0].clientX - r.left) / r.width - 0.5;
      const y = (e.touches[0].clientY - r.top) / r.height - 0.5;
      this.style.transition = 'transform 0.05s ease';
      this.style.transform = `perspective(700px) rotateX(${(y * -8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) scale(1.025)`;
    }, { passive: true });
    el.addEventListener('touchend', function () {
      this.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  function attachTilt(el) { attachMouseTilt(el); attachTouchTilt(el); }

  document.querySelectorAll('.ev-node, .gal-item').forEach(attachTilt);

  /* Re-attach after config rebuilds evStage */
  const _origOpen = window.initEventsAutoOpen;
  window.initEventsAutoOpen = function () {
    if (typeof _origOpen === 'function') _origOpen();
    document.querySelectorAll('.ev-node').forEach(attachTilt);
  };
})();

/* ─────────────────────────────────────────
   HERO COUNTDOWN TIMER
   - DOM built once; only digits update per tick
   - Interval self-clears after the wedding date
───────────────────────────────────────── */
(function initCountdown() {
  const el = document.getElementById('heroCountdown');
  if (!el) return;

  function getTarget() {
    try {
      if (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.couple && WEDDING_CONFIG.couple.date) {
        const d = new Date(WEDDING_CONFIG.couple.date + 'T00:00:00');
        if (!isNaN(d)) return d;
      }
    } catch (e) { }
    return new Date('2026-12-12T00:00:00');
  }

  const target = getTarget();
  const pad = n => String(n).padStart(2, '0');

  /* Build structure once */
  el.innerHTML =
    '<span class="hc-cd-unit"><span class="hc-cd-num"></span><span class="hc-cd-label">Days</span></span>' +
    '<span class="hc-cd-sep">·</span>' +
    '<span class="hc-cd-unit"><span class="hc-cd-num"></span><span class="hc-cd-label">Hrs</span></span>' +
    '<span class="hc-cd-sep">·</span>' +
    '<span class="hc-cd-unit"><span class="hc-cd-num"></span><span class="hc-cd-label">Min</span></span>' +
    '<span class="hc-cd-sep">·</span>' +
    '<span class="hc-cd-unit"><span class="hc-cd-num"></span><span class="hc-cd-label">Sec</span></span>';
  const nums = el.querySelectorAll('.hc-cd-num');
  const prev = ['', '', '', ''];

  let iv = null;
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.innerHTML = '<span class="hc-cd-unit"><span class="hc-cd-num" style="font-size:clamp(.65rem,1.6vw,1rem);color:var(--rose)">We\'re Married ♥</span></span>';
      if (iv) clearInterval(iv);
      return;
    }
    const vals = [
      String(Math.floor(diff / 86400000)),
      pad(Math.floor((diff % 86400000) / 3600000)),
      pad(Math.floor((diff % 3600000) / 60000)),
      pad(Math.floor((diff % 60000) / 1000)),
    ];
    vals.forEach((v, i) => {
      if (prev[i] !== v) { prev[i] = v; nums[i].textContent = v; }
    });
  }

  tick();
  iv = setInterval(tick, 1000);
})();

/* ─────────────────────────────────────────
   ELEPHANT CONFETTI SYSTEM
   Canvas confetti from trunk tips.
   - Pauses when bridge leaves viewport
   - Pauses when tab is hidden
───────────────────────────────────────── */
(function initElephantConfetti() {
  if (prefersReduced) return;

  const rainCanvas = document.getElementById('confettiRain');
  const bridge = document.getElementById('elephBridge');
  if (!rainCanvas || !bridge) return;

  const ctx = rainCanvas.getContext('2d');
  const OVERFLOW = 200;

  function resizeCanvas() {
    rainCanvas.width = bridge.offsetWidth;
    rainCanvas.height = bridge.offsetHeight + OVERFLOW;
    rainCanvas.style.height = (bridge.offsetHeight + OVERFLOW) + 'px';
  }

  /* Trunk tip fractions calibrated to the paper-cut elephant PNGs */
  const TRUNK = {
    left: { xFrac: 0.85, yFrac: 0.10 },
    right: { xFrac: 0.15, yFrac: 0.10 },
  };

  function getTrunkTips() {
    const bridgeRect = bridge.getBoundingClientRect();
    const elephLEl = document.querySelector('#elephL img, #elephL .eleph-svg');
    const elephREl = document.querySelector('#elephR img, #elephR .eleph-svg');

    const measure = (el, frac, fallbackX) => {
      if (el) {
        const r = el.getBoundingClientRect();
        return {
          x: (r.left - bridgeRect.left) + r.width * frac.xFrac,
          y: (r.top - bridgeRect.top) + r.height * frac.yFrac,
        };
      }
      return { x: bridge.offsetWidth * fallbackX, y: bridge.offsetHeight * 0.12 };
    };

    return {
      left: measure(elephLEl, TRUNK.left, 0.28),
      right: measure(elephREl, TRUNK.right, 0.72),
    };
  }

  let tips = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
  let particles = [];

  function refreshLayout() {
    resizeCanvas();
    tips = getTrunkTips();
    particles.forEach(p => {
      const origin = p.side === 'left' ? tips.left : tips.right;
      p.ox = origin.x;
      p.oy = origin.y;
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshLayout, 120);
  });

  const COLOURS = ['#C4748C', '#F2D4C8', '#C4985A', '#8BAE9B', '#F0C4A0', '#E8A060', '#FAF3E8', '#D4886A'];
  const SHAPES = ['rect', 'circle', 'petal'];

  class Particle {
    constructor(side) {
      this.side = side;
      const origin = side === 'left' ? tips.left : tips.right;
      this.ox = origin.x;
      this.oy = origin.y;
      this.initRandom();
      this.y = Math.random() * (bridge.offsetHeight + OVERFLOW);
    }

    initRandom() {
      const dir = this.side === 'left' ? 1 : -1;
      this.x = this.ox + (Math.random() - 0.5) * 20;
      this.y = this.oy + Math.random() * 10;
      this.vx = dir * (0.3 + Math.random() * 1.8) + (Math.random() - 0.5) * 0.9;
      this.vy = 0.6 + Math.random() * 1.8;
      this.vr = (Math.random() - 0.5) * 5;
      this.rot = Math.random() * 360;
      this.sz = 5 + Math.random() * 9;
      this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
      this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.alpha = 0.7 + Math.random() * 0.3;
      this.decay = 0.001 + Math.random() * 0.001;
    }

    update(canvasH) {
      this.x += this.vx;
      this.vy += 0.035;
      this.y += this.vy;
      this.rot += this.vr;
      this.alpha -= this.decay;
      if (this.y > canvasH + 10 || this.alpha <= 0) {
        const origin = this.side === 'left' ? tips.left : tips.right;
        this.ox = origin.x;
        this.oy = origin.y;
        this.initRandom();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.colour;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot * Math.PI / 180);
      const s = this.sz;
      if (this.shape === 'rect') {
        ctx.fillRect(-s / 2, -s / 4, s, s / 2);
      } else if (this.shape === 'circle') {
        ctx.beginPath(); ctx.arc(0, 0, s / 2, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -s / 2);
        ctx.quadraticCurveTo(s / 2, 0, 0, s / 2);
        ctx.quadraticCurveTo(-s / 2, 0, 0, -s / 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  const COUNT = isTouch ? 35 : 90;
  let built = false, running = false, rafId = null;

  function buildParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle(i < COUNT / 2 ? 'left' : 'right'));
    }
  }

  function animate() {
    if (!running) { rafId = null; return; }
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    particles.forEach(p => { p.update(rainCanvas.height); p.draw(ctx); });
    rafId = requestAnimationFrame(animate);
  }

  function startLoop() {
    if (running) return;
    running = true;
    if (!rafId) rafId = requestAnimationFrame(animate);
  }
  function stopLoop() {
    running = false;
  }

  /* Pause when bridge leaves viewport — observer stays connected */
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      requestAnimationFrame(() => {
        if (!built) { refreshLayout(); buildParticles(); built = true; }
        startLoop();
      });
    } else {
      stopLoop();
    }
  }, { threshold: 0.1 });
  io.observe(bridge);

  /* Pause when tab hidden */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop();
    else if (built) startLoop();
  });
})();

/* ─────────────────────────────────────────
   GALLERY LIGHTBOX
   - Opens on click / Enter / Space
   - Prev/Next buttons + keyboard arrows
   - Swipe left/right on touch
   - Dot indicators
   - Escape to close
───────────────────────────────────────── */
(function initGalleryLightbox() {
  const lb      = document.getElementById('galLightbox');
  const lbClose = document.getElementById('galLbClose');
  const lbPrev  = document.getElementById('galLbPrev');
  const lbNext  = document.getElementById('galLbNext');
  const lbCap   = document.getElementById('galLbCaption');
  const lbDots  = document.getElementById('galLbDots');
  if (!lb) return;

  const items = Array.from(document.querySelectorAll('.gal-item[data-gal-idx]'));
  const total = items.length;
  let current = 0;

  /* Build dot indicators */
  items.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'gal-lb-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Go to photo ${i + 1}`);
    d.addEventListener('click', () => show(i));
    lbDots.appendChild(d);
  });

  function getDots() { return Array.from(lbDots.querySelectorAll('.gal-lb-dot')); }

  function show(idx) {
    current = (idx + total) % total;
    const item = items[current];

    /* Update caption */
    const cap = item.querySelector('.gal-ov-caption');
    lbCap.textContent = cap ? cap.textContent : '';

    /* Update dots */
    getDots().forEach((d, i) => d.classList.toggle('active', i === current));

    /* Show/hide nav if only 1 item */
    lbPrev.style.display = lbNext.style.display = total <= 1 ? 'none' : '';
  }

  function open(idx) {
    lb.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    show(idx);
    /* Focus close button for keyboard users */
    requestAnimationFrame(() => lbClose.focus());
  }

  function close() {
    document.body.style.overflow = '';
    /* Fade out then re-add hidden */
    lb.setAttribute('hidden', '');
    /* Return focus to the card that opened it */
    if (items[current]) items[current].focus();
  }

  /* Open on card click */
  items.forEach(item => {
    item.addEventListener('click', () => open(+item.dataset.galIdx));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(+item.dataset.galIdx); }
    });

    /* Touch: show overlay briefly on tap before lightbox opens */
    if (isTouch) {
      item.addEventListener('touchstart', () => {
        item.querySelector('.gal-overlay')?.style.setProperty('opacity', '1');
      }, { passive: true });
      item.addEventListener('touchend', () => {
        setTimeout(() => {
          item.querySelector('.gal-overlay')?.style.setProperty('opacity', '');
        }, 400);
      });
    }
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => show(current - 1));
  lbNext.addEventListener('click', () => show(current + 1));

  /* Dot clicks handled in build loop above */

  /* Keyboard navigation */
  lb.addEventListener('keydown', e => {
    if (e.key === 'Escape')     { e.preventDefault(); close(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
  });

  /* Click backdrop to close */
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  /* Swipe support */
  let swipeX = null;
  lb.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (swipeX === null) return;
    const dx = e.changedTouches[0].clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) < 40) return;
    show(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });
})();
