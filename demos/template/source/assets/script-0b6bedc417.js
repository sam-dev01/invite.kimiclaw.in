'use strict';

/* ─────────────────────────────────────────
   GLOBALS
───────────────────────────────────────── */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─────────────────────────────────────────
   CUSTOM CURSOR (desktop only)
   Only hides native cursor after first mouse
   movement — so it's never invisible on load.
───────────────────────────────────────── */
(function initCursor(){
  if(isTouch) return;
  const ring = document.getElementById('cRing');
  const dot  = document.getElementById('cDot');
  if(!ring || !dot) return;

  let rx=0, ry=0, dx=-200, dy=-200;
  let hasMoved = false;

  document.addEventListener('mousemove', e => {
    dx = e.clientX; dy = e.clientY;
    dot.style.left = dx + 'px';
    dot.style.top  = dy + 'px';
    if(!hasMoved){
      hasMoved = true;
      document.body.classList.add('cursor-active');
    }
  });

  (function loop(){
    rx += (dx - rx) * 0.082;
    ry += (dy - ry) * 0.082;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    // Gold bloom over interactive, ruby glow otherwise — T02 palette
    ring.style.boxShadow = document.body.classList.contains('ch')
      ? '0 0 44px 16px rgba(200,134,10,.55)'
      : '0 0 20px 4px rgba(160,24,48,.25)';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .ev-node, .tt, .gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();

/* ─────────────────────────────────────────
   PRELOADER — 1.6s total
   300ms  → gold line draws
   700ms  → names fade up
   1600ms → preloader fades out, hero animates in
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   PRELOADER — 1.6s total
   300ms  → gold line draws
   700ms  → names fade up
   1600ms → preloader fades out, hero animates in
───────────────────────────────────────── */
function initPreloader() {
  const pl = document.getElementById('preloader');
  if (!pl) {
    revealHero();
    return;
  }

  setTimeout(() => {
    pl.classList.add('li');
  }, 300);

  setTimeout(() => {
    pl.classList.add('ni');
  }, 700);

  setTimeout(() => {
    pl.classList.add('away');
    revealHero();
  }, 1600);
}

function revealHero(){
  document.body.classList.remove('pl-active');
  const palace  = document.querySelector('.hl-palace');
  const flowers = document.querySelector('.hl-flowers');
  const copy    = document.getElementById('heroCopy');
  if(palace)  palace.classList.add('in');
  if(flowers) flowers.classList.add('in');
  if(copy)    copy.classList.add('in');
}

/* ── SCROLL ANIMATIONS (AOS-like) ───────────── */
function initScrollAnim() {
  const elements = document.querySelectorAll('[data-aos]');
  setTimeout(() => {
    pl.classList.add('away');
    revealHero();
  }, 1600);
}

function revealHero(){
  document.body.classList.remove('pl-active');
  const palace  = document.querySelector('.hl-palace');
  const flowers = document.querySelector('.hl-flowers');
  const copy    = document.getElementById('heroCopy');
  if(palace)  palace.classList.add('in');
  if(flowers) flowers.classList.add('in');
  if(copy)    copy.classList.add('in');
}

/* ── SCROLL ANIMATIONS (AOS-like) ───────────── */
function initScrollAnim() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-in');
          if (entry.target.dataset.aosOnce !== 'false') {
            observer.unobserve(entry.target);
          }
        }, Number(delay));
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// Add pl-active to body so CSS hides elements during preload
document.body.classList.add('pl-active');

// Run when page is fully loaded; if already loaded, run immediately
if(document.readyState === 'complete'){
  initPreloader();
  initScrollAnim();
} else {
  window.addEventListener('load', () => {
    initPreloader();
    initScrollAnim();
  });
}

// Safety net: if load never fires within 4s, reveal everything
setTimeout(() => {
  if(document.body.classList.contains('pl-active') && !document.body.classList.contains('scroll-locked')){
    revealHero();
  }
}, 4000);

/* ─────────────────────────────────────────
   - Names positioned by JS just below palace bottom
   - Names fade as palace zooms
───────────────────────────────────────── */
const heroWrap    = document.getElementById('heroWrap');
const heroPin     = document.getElementById('heroPin');
const palaceEl    = document.getElementById('l3');
const heroCopy    = document.getElementById('heroCopy');

const scrollNudge = document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});
const heroMoon    = document.getElementById('heroMoon');

let raw=0, lerped=0, mouseX=0, mouseY=0, rafH=null;

function lerp(a,b,t){ return a+(b-a)*t; }

/* ── Scroll progress 0→1 ── */
function getHeroProgress(){
  if(!heroWrap) return 0;
  const top    = heroWrap.getBoundingClientRect().top + window.scrollY;
  const travel = heroWrap.offsetHeight - window.innerHeight;
  return Math.min(1, Math.max(0, (window.scrollY - top) / travel));
}

function driveHero(){
  lerped += (raw - lerped) * 0.06;
  const p  = lerped;
  const mx = isTouch ? 0 : mouseX;
  const my = isTouch ? 0 : mouseY;

  // Moon: gentle drift
  if(heroMoon)
    heroMoon.style.transform = `translateY(${p * -28 + my * -5}px) translateX(${mx * -3}px)`;

  // Palace: 3D perspective tilt on mouse + scale on scroll (Change 06)
  if(palaceEl){
    const scale = 1.0 + p * 0.45;
    if(isTouch) {
      palaceEl.style.transform = `translateX(-50%) scale(${scale})`;
    } else {
      const tiltX = mx * -14;
      const tiltY = my * -9;
      palaceEl.style.transform = `perspective(1400px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateX(calc(-50% + ${(tiltX*0.5).toFixed(1)}px)) scale(${scale})`;
      palaceEl.style.filter    = `drop-shadow(0 ${(20+p*30).toFixed(0)}px ${(50+p*40).toFixed(0)}px rgba(0,0,0,${(0.28+p*0.22).toFixed(2)})) drop-shadow(0 4px 16px rgba(200,134,10,${(0.10+p*0.08).toFixed(2)}))`;
    }
  }

  // Names: stay fully visible until p=0.55, then dissolve with blur by p=0.88
  if(heroCopy){
    const dissolveStart = 0.55;
    const dissolveEnd   = 0.88;
    const t = Math.max(0, Math.min(1, (p - dissolveStart) / (dissolveEnd - dissolveStart)));
    heroCopy.style.opacity      = (1 - t).toFixed(3);
    heroCopy.style.transform    = `translateY(${p * -32}px)`;
    if(!isTouch) {
      heroCopy.style.filter       = t > 0 ? `blur(${(t*16).toFixed(1)}px)` : '';
      heroCopy.style.letterSpacing = t > 0 ? (t*0.10).toFixed(3)+'em' : '';
    }
  }

  // Scroll nudge fades immediately
  if(scrollNudge)
    scrollNudge.style.opacity = String(Math.max(0, 1 - p / 0.18));

  if(heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
  else
    rafH = null;
}

window.addEventListener('scroll', () => {
  raw = getHeroProgress();
  if(!rafH && heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
}, { passive: true });

// Mouse parallax on hero (desktop only)
if(!isTouch && heroPin){
  heroPin.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth  - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
    if(!rafH) rafH = requestAnimationFrame(driveHero);
  });
  heroPin.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
    if(!rafH) rafH = requestAnimationFrame(driveHero);
  });
}

// Nothing to do on load for hero — CSS handles positioning
window.addEventListener('resize', () => { /* reserved */ });

/* ─────────────────────────────────────────
   SKY LANTERN SYSTEM — T02 Royal Midnight
   Element 2.png = sky lantern (rises UP on dark sky).
   Screen blend so dark backgrounds show through.
   Gold glow filter for ambient lamp warmth.
   Covers ALL sections including story + gallery.
─────────────────────────────────────────── */
class Petals {
  constructor(id, opts={}){
    this.el    = document.getElementById(id);
    this.max   = opts.max  || 6;
    this.rate  = opts.rate || 1200;
    this.src   = 'assets/Element_201-a8193248f0.png';
    this.active= false;
    this.pool  = new Set();
    this._iv   = null;
  }

  spawn(){
    if(!this.el) return;
    if(this.pool.size >= this.max){
      const first = this.pool.values().next().value;
      first?.remove();
      this.pool.delete(first);
    }
    if(this.pool.size >= this.max) return;

    // Lanterns: varied sizes, spread across full width
    const sz    = 50 + Math.random() * 55;       // 50-105px
    const x     = 4  + Math.random() * 90;
    const dur   = 10 + Math.random() * 8;        // slower rise = more majestic
    const drift = (Math.random() - 0.5) * 80;   // gentle horizontal sway
    const tilt  = (Math.random() - 0.5) * 20;   // slight tilt as it rises

    const wrap = document.createElement('div');
    // Lanterns spawn from BOTTOM and rise UP
    wrap.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;bottom:-${sz}px;pointer-events:none`;

    const img = document.createElement('img');
    img.src = this.src;
    img.loading = 'lazy';
    img.style.cssText = [
      'width:100%;height:100%;object-fit:contain',
      'mix-blend-mode:screen',                   // screen on dark bg = lantern glows
      `filter:drop-shadow(0 0 12px rgba(200,134,10,.70)) drop-shadow(0 0 30px rgba(200,134,10,.35))`
    ].join(';');
    wrap.appendChild(img);

    // Rise upward: translateY goes NEGATIVE (up), with gentle sway + tilt
    const anim = wrap.animate([
      { transform: `translateY(0) translateX(0) rotate(0deg)`,                                      opacity: 0 },
      { transform: `translateY(-8vh) translateX(${drift*.15}px) rotate(${tilt*.3}deg)`,              opacity: .80, offset: .06 },
      { transform: `translateY(-55vh) translateX(${drift*.7}px) rotate(${tilt*.8}deg)`,              opacity: .65, offset: .55 },
      { transform: `translateY(-95vh) translateX(${drift}px) rotate(${tilt}deg)`,                   opacity: .30, offset: .90 },
      { transform: `translateY(-115vh) translateX(${drift}px) rotate(${tilt}deg)`,                  opacity: 0   },
    ], { duration: dur * 1000, easing: 'ease-in', fill: 'forwards' });

    anim.onfinish = () => { wrap.remove(); this.pool.delete(wrap); };
    this.el.appendChild(wrap);
    this.pool.add(wrap);
  }

  start(){
    if(this.active || !this.el) return;
    this.active = true;
    const rate = isTouch ? this.rate * 2 : this.rate;
    this._iv = setInterval(() => { if(this.active) this.spawn(); }, rate);
    this.spawn();
  }

  stop(){
    this.active = false;
    clearInterval(this._iv);
  }
}

// Lantern systems — ALL sections including story + gallery (missing in original)
const PS = {
  hero:    new Petals('petalHero',    { max: isTouch?4:8,  rate: isTouch?2000:1000 }),
  invite:  new Petals('petalInvite',  { max: isTouch?3:5,  rate: isTouch?3500:2000 }),
  events:  new Petals('petalEvents',  { max: isTouch?5:12, rate: isTouch?1800:800  }),  // denser flow
  story:   new Petals('petalStory',   { max: isTouch?2:4,  rate: isTouch?4500:2800 }),
  gallery: new Petals('petalGallery', { max: isTouch?2:4,  rate: isTouch?4500:2800 }),
  things:  new Petals('petalThings',  { max: isTouch?2:4,  rate: isTouch?5000:3000 }),
  rsvp:    new Petals('petalRsvp',    { max: isTouch?2:4,  rate: isTouch?3500:2000 }),
};

// Activate/deactivate as sections enter viewport
const sIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const id  = target.id;
    const sys = id === 'heroWrap' ? PS.hero : PS[id];
    if(sys) isIntersecting ? sys.start() : sys.stop();
  });
}, { threshold: 0.08 });

['heroWrap','invite','events','story','gallery','things','rsvp'].forEach(id => {
  const el = document.getElementById(id);
  if(el) sIO.observe(el);
});

/* ─────────────────────────────────────────
   SCROLL REVEAL
   Elements with .scroll-in animate in when
   they enter the viewport.
───────────────────────────────────────── */
const rIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if(isIntersecting){
      target.classList.add('vis');
      rIO.unobserve(target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-in').forEach(el => rIO.observe(el));

// Also observe the invite card itself for name pop-in animation
const inviteCard = document.querySelector('.invite-card');
if(inviteCard) rIO.observe(inviteCard);

/* ─────────────────────────────────────────
   EVENTS — Journey Line
   Measures rendered icon centres after layout,
   draws a smooth SVG curve through them on scroll.
───────────────────────────────────────── */
(function initEventsJourney(){
  if(window.matchMedia('(min-width:681px)').matches) return;

  const section  = document.getElementById('events');
  const stage    = document.getElementById('evStage');
  const svgEl    = document.getElementById('evJourneySvg');
  const trackEl  = document.getElementById('ejTrack');
  const drawnEl  = document.getElementById('ejDrawn');
  if(!section || !stage || !svgEl || !trackEl || !drawnEl) return;

  /* ── Get icon centre positions relative to SECTION ── */
  function getNodeCentres(){
    const nodes = Array.from(stage.querySelectorAll('.ev-node'));
    const secRect = section.getBoundingClientRect();
    return nodes.map(node => {
      const iconWrap = node.querySelector('.ev-icon-wrap');
      const r = (iconWrap || node).getBoundingClientRect();
      return {
        x: r.left + r.width  / 2 - secRect.left,
        y: r.top  + r.height / 2 - secRect.top,
      };
    });
  }

  /* ── Build smooth quadratic bezier path through all centres ── */
  function buildPath(pts){
    if(pts.length < 2) return '';
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for(let i = 0; i < pts.length - 1; i++){
      const a  = pts[i];
      const b  = pts[i + 1];
      const mx = ((a.x + b.x) / 2).toFixed(1);
      const my = ((a.y + b.y) / 2).toFixed(1);
      const wave = (i % 2 === 0 ? 1 : -1) * Math.min(60, Math.abs(b.x - a.x) * 0.28);
      const cy   = ((a.y + b.y) / 2 - 28).toFixed(1);
      d += ` Q ${(+mx + wave).toFixed(1)} ${cy}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }

  /* ── Size SVG canvas to section dimensions ── */
  function sizeSvg(){
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    svgEl.setAttribute('width',   w);
    svgEl.setAttribute('height',  h);
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
  }

  /* ── Full layout pass — exposed globally so config loader can re-trigger ── */
  let cachedSecTop = 0;
  let cachedSecH = 0;

  function layout(){
    sizeSvg();
    requestAnimationFrame(() => {
      const pts  = getNodeCentres();
      const d    = buildPath(pts);
      trackEl.setAttribute('d', d);
      drawnEl.setAttribute('d', d);
      if(drawnEl.getTotalLength){
        const total = drawnEl.getTotalLength();
        drawnEl.style.strokeDasharray  = total;
        drawnEl.style.strokeDashoffset = total;
        drawnEl._total = total;
      }
      cachedSecTop = section.getBoundingClientRect().top + window.scrollY;
      cachedSecH = section.offsetHeight;
      onScroll();
    });
  }

  /* ── Scroll progress: tracks user position THROUGH the section ── */
  let rafJ = null;
  function onScroll(){
    if(!drawnEl._total) { rafJ = null; return; }
    const winH    = window.innerHeight;
    const currentTop = cachedSecTop - window.scrollY;
    const scrolled = winH - currentTop;
    const total    = cachedSecH + winH;
    const progress = Math.min(1, Math.max(0, scrolled / total));
    drawnEl.style.strokeDashoffset = (drawnEl._total * (1 - progress)).toFixed(1);
    rafJ = null;
  }

  window._evJourneyLayout = layout;

  // Re-layout when section first becomes visible (fixes content-visibility timing)
  const visIO = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      requestAnimationFrame(() => requestAnimationFrame(layout));
      visIO.disconnect();
    }
  }, { threshold: 0.01 });
  visIO.observe(section);

  window.addEventListener('load',   layout);
  window.addEventListener('scroll', () => { if(!rafJ) rafJ = requestAnimationFrame(onScroll); }, { passive: true });

  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(layout, 180);
  });

})();

/* ─────────────────────────────────────────
   EVENTS — Scroll-triggered detail reveal
   Details open when the node's centre crosses
   40% from the bottom of the viewport — giving
   a clear "passing through" sensation.
   On desktop (where multiple nodes show at once),
   each node only opens when it reaches the trigger zone.
───────────────────────────────────────── */
function initEventsAutoOpen(){
  const nodes = Array.from(document.querySelectorAll('.ev-node:not(.ev-active)'));
  if(!nodes.length) return;

  if(!window._evAutoObserver) {
    window._evAutoObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          requestAnimationFrame(() => entry.target.classList.add('ev-active'));
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40% 0px" });
  }

  nodes.forEach(node => window._evAutoObserver.observe(node));
}

// Run on initial page load
initEventsAutoOpen();

/* ─────────────────────────────────────────
   STORY — Theatrical Curtain Reveal
   Phase 1 (IntersectionObserver fires):
     - Characters do pull animation
   Phase 2 (300ms later):
     - Tension animation
   Phase 3 (800ms later):
     - Scroll-driven curtain open starts
     - Characters drift outward with curtains
   Phase 4 (curtain > 70% open):
     - Content reveals with CSS stagger
     - Petals spawn
───────────────────────────────────────── */
(function initCurtainReveal(){

  const section  = document.getElementById('story');
  const stage    = document.getElementById('stStage');
  const bride    = document.getElementById('stBride');
  const groom    = document.getElementById('stGroom');
  const curtL    = document.getElementById('stCurtL');
  const curtR    = document.getElementById('stCurtR');
  const reveal   = document.getElementById('stReveal');
  const petalsEl = document.getElementById('stPetals');

  if(!section || !stage || !bride || !curtL || !curtR) return;

  let sequenceDone = false;  // pull+tension phase fired
  let openEnabled  = false;  // scroll-driven phase unlocked
  let revealed     = false;
  let lastP        = 0;

  /* ── Spawn petal ── */
  function spawnPetal(){
    if(!petalsEl) return;
    const sz  = 5 + Math.random() * 10;
    const x   = 10 + Math.random() * 80;
    const dur = 5000 + Math.random() * 4000;
    const dx  = (Math.random() - 0.5) * 90;
    // T02 story petals — ruby, gold, jade on dark stage
    const COLS = ['rgba(160,24,48,.25)','rgba(200,134,10,.20)','rgba(107,142,122,.22)','rgba(240,224,176,.35)'];
    const col  = COLS[Math.floor(Math.random()*COLS.length)];
    const el   = document.createElement('div');
    el.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 10% 50% 10%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      { transform:'translateY(0) translateX(0) rotate(0deg)',                      opacity:0     },
      { transform:`translateY(4vh) translateX(${dx*.1}px) rotate(40deg)`,          opacity:.9, offset:.05 },
      { transform:`translateY(60vh) translateX(${dx*.85}px) rotate(230deg)`,       opacity:.4, offset:.85 },
      { transform:`translateY(90vh) translateX(${dx}px) rotate(360deg)`,           opacity:0     },
    ], { duration:dur, easing:'linear', fill:'forwards' }).onfinish = ()=> el.remove();
  }

  /* ── Phase 1+2: Pull → tension → unlock scroll ── */
  function runSequence(){
    if(sequenceDone) return;
    sequenceDone = true;

    // Phase 1 — Pull
    if (!isTouch) {
      bride.classList.add('st-pull');
      groom.classList.add('st-pull');
    }

    // Phase 2 — Tension (715ms)
    setTimeout(() => {
      bride.classList.remove('st-pull');
      groom.classList.remove('st-pull');
      if (!isTouch) {
        bride.classList.add('st-tension');
        groom.classList.add('st-tension');
      }
    }, isTouch ? 120 : 715);

    // Phase 3 — Enable scroll-driven open (1235ms)
    setTimeout(() => {
      bride.classList.remove('st-tension');
      groom.classList.remove('st-tension');
      openEnabled = true;
      // Apply current scroll progress immediately in case user already scrolled
      applyProgress(getCurtainProgress());
    }, isTouch ? 220 : 1235);
  }

  /* ── Scroll progress for curtain (0→1) ──
     Starts once section centre crosses viewport bottom-40%.
     Completes over 70vh of scroll travel.
  */
  let cachedSecTop = 0;
  window.addEventListener('load', () => cachedSecTop = section.getBoundingClientRect().top + window.scrollY);

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    if(!cachedSecTop) cachedSecTop = section.getBoundingClientRect().top + window.scrollY;
    const currentTop = cachedSecTop - window.scrollY;
    const start = window.innerHeight * 0.55;
    const range = window.innerHeight * 0.91;   /* 30% slower: 0.70 → 0.91 */
    return Math.min(1, Math.max(0, (start - currentTop) / range));
  }

  /* ── Apply curtain + character position for progress p ── */
  function applyProgress(p){
    if(Math.abs(p - lastP) < 0.002) return;
    lastP = p;

    // Curtain slides — cubic overshoot for dramatic feel
    const eased = p < 1 ? 1 - Math.pow(1 - p, 3.2) : 1;
    curtL.style.transform = `translate3d(-${(eased * 100).toFixed(2)}%,0,0)`;
    curtR.style.transform = `translate3d(${(eased  * 100).toFixed(2)}%,0,0)`;
    if(!isTouch) {
      curtL.style.filter = `drop-shadow(${(eased*30).toFixed(1)}px 0 36px rgba(0,0,0,${(eased*.65).toFixed(2)}))`;
      curtR.style.filter = `drop-shadow(-${(eased*30).toFixed(1)}px 0 36px rgba(0,0,0,${(eased*.65).toFixed(2)}))`;
    }

    // Characters follow curtain outward (drift + slight scale down as they "recede")
    const charDrift = eased * (isTouch ? 12 : 28);
    const charScale = 1 - eased * 0.04;
    bride.style.transform = `translateX(-${charDrift.toFixed(1)}px) scale(${charScale.toFixed(3)})`;
    groom.style.transform = `translateX(${charDrift.toFixed(1)}px)  scale(${charScale.toFixed(3)})`;

    // Reveal content once curtain is 70% open
    if(eased >= 0.70 && !revealed){
      revealed = true;
      reveal.classList.add('revealed');
      let n = 0;
      const iv = setInterval(() => { spawnPetal(); if(++n >= 28) clearInterval(iv); }, 160);
    }
  }

  /* ── Scroll listener ── */
  let rafC = null;
  window.addEventListener('scroll', () => {
    if(!rafC) {
      rafC = requestAnimationFrame(() => {
        applyProgress(getCurtainProgress());
        rafC = null;
      });
    }
  }, { passive:true });

  /* ── IntersectionObserver fires the pull sequence ── */
  const io = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting && entries[0].intersectionRatio >= 0.22){
      runSequence();
      io.disconnect();
    }
  }, { threshold: [0.22] });
  io.observe(section);

  /* ── Resize: reapply ── */
  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => applyProgress(getCurtainProgress()), 150);
  });

})();

/* ─────────────────────────────────────────
   RSVP — WhatsApp button petal burst on click
───────────────────────────────────────── */
(function initRsvpBtn(){
  const btn = document.getElementById('rsvpWaBtn');
  if(!btn) return;

  btn.addEventListener('click', () => {
    burstPetals(btn);
  });
})();

/* ─────────────────────────────────────────
   RSVP PETAL BURST
   Petals explode outward from button on click
───────────────────────────────────────── */
function burstPetals(fromEl){
  const r   = fromEl.getBoundingClientRect();
  const cx  = r.left + r.width  / 2;
  const cy  = r.top  + r.height / 2;
  const src = 'assets/Element_201-a8193248f0.png';

  for(let i=0; i<8; i++){
    const el = document.createElement('img');
    el.src = src;
    el.style.cssText = `position:fixed;width:40px;height:40px;left:${cx-20}px;top:${cy-20}px;pointer-events:none;z-index:999;mix-blend-mode:screen`;
    document.body.appendChild(el);

    const ang = (Math.random() * 360) * Math.PI / 180;
    const dist = 60 + Math.random() * 100;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 80; // bias upward

    const anim = el.animate([
      { transform: `translate(0,0) rotate(0deg) scale(0)`, opacity: 1 },
      { transform: `translate(${dx*0.8}px, ${dy*0.8}px) rotate(${180+Math.random()*180}deg) scale(1.2)`, opacity: 1, offset: 0.6 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${360+Math.random()*360}deg) scale(0.8)`, opacity: 0 }
    ], {
      duration: 600 + Math.random() * 400,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards'
    });
    anim.onfinish = () => el.remove();
  }
}
