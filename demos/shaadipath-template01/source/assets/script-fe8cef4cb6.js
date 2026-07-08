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
  return; // Disabled custom cursor
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
    ring.style.boxShadow = document.body.classList.contains('ch')
      ? '0 0 44px 16px rgba(196,152,90,.50)'
      : '0 0 20px 4px rgba(196,116,140,.20)';
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
   PRELOADER — graceful reveal
   Body gets .pl-active immediately (inline
   script in <head> sets it). If JS fails or
   preloader not found, everything is visible
   by default via CSS fallback.
───────────────────────────────────────── */
function revealHero(){
  document.body.classList.remove('pl-active');
  const palace  = document.querySelector('.hl-palace');
  const flowers = document.querySelector('.hl-flowers');
  const copy    = document.getElementById('heroCopy');
  if(palace)  palace.classList.add('in');
  if(flowers) flowers.classList.add('in');
  if(copy)    copy.classList.add('in');
}

function runPreloader(){
  const pl = document.getElementById('preloader');
  if(pl) pl.style.display = 'none';
  revealHero();
}

// Add pl-active to body so CSS hides elements during preload
document.body.classList.add('pl-active');

// Run when page is fully loaded; if already loaded, run immediately
if(document.readyState === 'complete'){
  runPreloader();
} else {
  window.addEventListener('load', runPreloader);
}

// Safety net: if load never fires within 4s, reveal everything
setTimeout(() => {
  if(document.body.classList.contains('pl-active')){
    revealHero();
    const pl = document.getElementById('preloader');
    if(pl) pl.style.display = 'none';
  }
}, 4000);

/* ─────────────────────────────────────────
   SCROLL-PINNED HERO DRIVER
   - Palace zooms in (scale 1→1.5) as user scrolls
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

  // Moon: static
  if(heroMoon)
    heroMoon.style.transform = '';

  // Palace: 3D perspective tilt on mouse + scale on scroll (Change 06)
  if(palaceEl){
    const scale = 1.0 + p * 0.45;
    const tiltX = mx * -14;
    const tiltY = my * -9;
    // On touch/mobile: no horizontal offset — keeps palace centred and prevents page shake
    if(isTouch){
      palaceEl.style.transform = `translateX(-50%) scale(${scale})`;
    } else {
      palaceEl.style.transform = `perspective(1400px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateX(calc(-50% + ${(tiltX * 0.5).toFixed(1)}px)) scale(${scale})`;
    }
    palaceEl.style.filter    = `drop-shadow(0 ${(20 + p*30).toFixed(0)}px ${(50 + p*40).toFixed(0)}px rgba(61,30,46,${(0.18 + p*0.22).toFixed(2)}))`;
  }

  // Names: static
  if(heroCopy){
    heroCopy.style.opacity = '1';
    heroCopy.style.transform = '';
    heroCopy.style.filter = '';
    heroCopy.style.letterSpacing = '';
  }

  // Scroll nudge: hidden
  if(scrollNudge)
    scrollNudge.style.opacity = '0';

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
   PETAL / FLOWER RAIN SYSTEM
   Spawns Element 2.png petals in any section.
   Big (60-110px), glowing, falling.
───────────────────────────────────────── */
class Petals {
  constructor(id, opts={}){
    this.el    = document.getElementById(id);
    this.max   = opts.max  || 8;
    this.rate  = opts.rate || 1000;
    this.src   = 'assets/Element_204-03d5916c5b.png';
    this.active= false;
    this.pool  = new Set();
    this._iv   = null;
  }

  spawn(){
    return; // Disabled falling petals spawn
    if(!this.el) return;
    // Evict oldest if at max
    if(this.pool.size >= this.max){
      const first = this.pool.values().next().value;
      first?.remove();
      this.pool.delete(first);
    }
    if(this.pool.size >= this.max) return;

    const sz    = 60 + Math.random() * 50;       // 60-110px
    const x     = 4  + Math.random() * 92;
    const dur   = 8  + Math.random() * 6;
    const drift = (Math.random() - 0.5) * 130;  // wider organic drift (Change 09)
    const turns = 1  + Math.floor(Math.random() * 2);

    const wrap = document.createElement('div');
    wrap.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;

    const img = document.createElement('img');
    img.src = this.src;
    img.style.cssText = [
      'width:100%;height:100%;object-fit:contain',
      'mix-blend-mode:multiply',
      'filter:drop-shadow(0 0 8px rgba(255,160,80,.5)) drop-shadow(0 0 20px rgba(255,120,40,.3))'
    ].join(';');
    wrap.appendChild(img);

    const anim = wrap.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
      { transform: `translateY(8vh) translateX(${drift*.3}px) rotate(${turns*110}deg)`, opacity: .75, offset: .08 },
      { transform: `translateY(80vh) translateX(${drift}px) rotate(${turns*330}deg)`, opacity: .55, offset: .88 },
      { transform: `translateY(108vh) translateX(${drift}px) rotate(${turns*360}deg)`, opacity: 0 },
    ], { duration: dur * 1000, easing: 'linear', fill: 'forwards' });

    anim.onfinish = () => { wrap.remove(); this.pool.delete(wrap); };
    this.el.appendChild(wrap);
    this.pool.add(wrap);
  }

  start(){
    if(this.active || !this.el) return;
    this.active = true;
    const rate = isTouch ? this.rate * 2 : this.rate;
    this._iv = setInterval(() => { if(this.active) this.spawn(); }, rate);
    this.spawn(); // spawn one immediately
  }

  stop(){
    this.active = false;
    clearInterval(this._iv);
  }
}

// Create petal systems for each section
// Touch: halved max + slower spawn = less GPU on mobile
const PS = {
  hero:   new Petals('petalHero',   { max: isTouch?5:10,  rate: isTouch?1600:900  }),
  invite: new Petals('petalInvite', { max: isTouch?3:5,   rate: isTouch?3500:2200 }),
  events: new Petals('petalEvents', { max: isTouch?3:6,   rate: isTouch?4000:2600 }),
  things: new Petals('petalThings', { max: isTouch?2:4,   rate: isTouch?4500:3000 }),
  rsvp:   new Petals('petalRsvp',   { max: isTouch?3:5,   rate: isTouch?3000:2000 }),
};

// Activate/deactivate petals as sections enter/leave viewport
const sIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    const id  = target.id;
    const sys = id === 'heroWrap' ? PS.hero : PS[id];
    if(sys) isIntersecting ? sys.start() : sys.stop();
  });
}, { threshold: 0.08 });

['heroWrap','invite','events','things','rsvp'].forEach(id => {
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
   Draws a smooth SVG curve through icon centres.
   Line travels with the user as they scroll
   through the section.
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

  /* ── Full layout pass ── */
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
        drawnEl.style.strokeDashoffset = 0; // Fully drawn immediately
        drawnEl._total = total;
      }
      onScroll();
    });
  }

  /* ── Scroll progress: tracks how far user has scrolled THROUGH the section ──
     Starts drawing when section top reaches bottom of viewport.
     Completes when section bottom leaves top of viewport.
     This means the line draws proportionally as user scrolls through,
     keeping pace with where they are in the section.
  ── */
  function onScroll(){
    if(!drawnEl._total) return;
    drawnEl.style.strokeDashoffset = 0; // Keep fully drawn
  }

  // Expose layout globally so config loader can re-run after replacing evStage innerHTML
  window._evJourneyLayout = layout;

  // Re-layout when section first becomes visible
  // This fixes content-visibility:auto which breaks getBoundingClientRect until painted
  const visIO = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      // Give browser one frame to finish paint after content-visibility kicks in
      requestAnimationFrame(() => requestAnimationFrame(layout));
      visIO.disconnect();
    }
  }, { threshold: 0.01 });
  visIO.observe(section);

  window.addEventListener('load',   layout);
  window.addEventListener('scroll', onScroll, { passive: true });

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
  // Re-read nodes fresh every time (supports config-rebuilt DOM)
  const nodes = Array.from(document.querySelectorAll('.ev-node'));
  if(!nodes.length) return;

  // Track which nodes are already revealed (never re-close)
  const revealed = new Set();

  function checkNodes(){
    const triggerLine = window.innerHeight * 0.60;
    nodes.forEach(node => {
      if(revealed.has(node)) return;
      const rect = node.getBoundingClientRect();
      const nodeCentre = rect.top + rect.height / 2;
      if(nodeCentre < triggerLine){
        revealed.add(node);
        requestAnimationFrame(() => node.classList.add('ev-active'));
      }
    });
  }

  window.addEventListener('scroll', checkNodes, { passive: true });
  window.addEventListener('load', checkNodes);
  // Also check immediately (page may already be scrolled)
  checkNodes();
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
    const COLS = ['rgba(196,116,140,.22)','rgba(196,152,90,.18)','rgba(212,136,106,.20)','rgba(242,212,200,.35)'];
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
    sequenceDone = true;
    openEnabled = true;
    applyProgress(1);
  }

  /* ── Scroll progress for curtain (0→1) ──
     Starts once section centre crosses viewport bottom-40%.
     Completes over 70vh of scroll travel.
  */
  function getCurtainProgress(){
    return 1;
  }

  /* ── Apply curtain + character position for progress p ── */
  function applyProgress(p){
    curtL.style.transform = `translateX(-100%)`;
    curtR.style.transform = `translateX(100%)`;
    curtL.style.filter = '';
    curtR.style.filter = '';

    bride.style.transform = `translateX(-28px) scale(0.96)`;
    groom.style.transform = `translateX(28px) scale(0.96)`;

    if(!revealed){
      revealed = true;
      reveal.classList.add('revealed');
    }
  }

  /* ── Scroll listener ── */
  window.addEventListener('scroll', () => {
    applyProgress(getCurtainProgress());
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
  const src = 'assets/Element_204-03d5916c5b.png';

  for(let i = 0; i < 18; i++){
    const el  = document.createElement('div');
    el.className = 'burst-p';
    const sz  = 10 + Math.random() * 16;
    const ang = (i / 18) * 360 + Math.random() * 18;
    const dst = 60 + Math.random() * 80;
    const tx  = Math.cos(ang * Math.PI / 180) * dst;
    const ty  = Math.sin(ang * Math.PI / 180) * dst;
    el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      { transform:`translate(-50%,-50%) scale(.2) rotate(0deg)`, opacity:1 },
      { transform:`translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.1) rotate(${Math.random()*360}deg)`, opacity:.85, offset:.45 },
      { transform:`translate(calc(-50% + ${tx*1.5}px), calc(-50% + ${ty*1.5+50}px)) scale(.3) rotate(${Math.random()*560}deg)`, opacity:0 },
    ], { duration:900 + Math.random()*400, easing:'ease-out', fill:'forwards' })
    .onfinish = () => el.remove();
  }
}

/* ─────────────────────────────────────────
   3D CARD TILT — ev-nodes + gallery (Change 07)
   Cerpow-style perspective tilt on mouse move.
   Skipped on touch — would fire on scroll.
   Re-attaches after config rebuilds evStage.
─────────────────────────────────────────── */
(function initCardTilt(){
  return; // Disabled 3D Card Tilt
  // Desktop: mousemove tilt
  function attachMouseTilt(el){
    if(el._tiltAttached) return;
    el._tiltAttached = true;
    el.addEventListener('mousemove', function(e){
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      this.style.transition = 'transform 0.08s ease';
      this.style.transform  = `perspective(900px) rotateX(${(y*-13).toFixed(2)}deg) rotateY(${(x*16).toFixed(2)}deg) scale(1.035)`;
    });
    el.addEventListener('mouseleave', function(){
      this.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // Mobile: touchmove tilt
  function attachTouchTilt(el){
    if(el._touchTiltAttached) return;
    el._touchTiltAttached = true;
    el.addEventListener('touchmove', function(e){
      if(e.touches.length !== 1) return;
      const r = this.getBoundingClientRect();
      const x = (e.touches[0].clientX - r.left) / r.width  - 0.5;
      const y = (e.touches[0].clientY - r.top)  / r.height - 0.5;
      this.style.transition = 'transform 0.05s ease';
      this.style.transform  = `perspective(700px) rotateX(${(y*-8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) scale(1.025)`;
    }, {passive:true});
    el.addEventListener('touchend', function(){
      this.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  function attachTilt(el){
    attachMouseTilt(el);
    attachTouchTilt(el);
  }

  // Attach to existing nodes
  document.querySelectorAll('.ev-node, .gal-item').forEach(attachTilt);

  // Re-attach after config rebuilds evStage
  const _origOpen = window.initEventsAutoOpen;
  window.initEventsAutoOpen = function(){
    if(typeof _origOpen === 'function') _origOpen();
    document.querySelectorAll('.ev-node').forEach(attachTilt);
  };
})();

/* ─────────────────────────────────────────
   HERO COUNTDOWN TIMER (Change 12)
   Reads WEDDING_CONFIG.couple.date when set.
   Falls back to 2026-12-12 otherwise.
   Placed AFTER config script has run so it can
   read WEDDING_CONFIG on first render.
─────────────────────────────────────────── */
(function initCountdown(){
  const el = document.getElementById('heroCountdown');
  if(!el) return;

  function getTarget(){
    try{
      if(typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.couple && WEDDING_CONFIG.couple.date){
        const d = new Date(WEDDING_CONFIG.couple.date + 'T00:00:00');
        if(!isNaN(d)) return d;
      }
    }catch(e){}
    return new Date('2026-12-12T00:00:00');
  }

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const diff = getTarget() - Date.now();
    if(diff <= 0){
      el.innerHTML = '<span class="hc-cd-unit"><span class="hc-cd-num" style="font-size:clamp(.65rem,1.6vw,1rem);color:var(--rose)">We\'re Married ♥</span></span>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    el.innerHTML =
      `<span class="hc-cd-unit"><span class="hc-cd-num">${d}</span><span class="hc-cd-label">Days</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(h)}</span><span class="hc-cd-label">Hrs</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(m)}</span><span class="hc-cd-label">Min</span></span>` +
      `<span class="hc-cd-sep">·</span>` +
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(s)}</span><span class="hc-cd-label">Sec</span></span>`;
  }

  tick();
  setInterval(tick, 1000);
})();

/* ─────────────────────────────────────────
   ELEPHANT CONFETTI SYSTEM
   Canvas-based confetti rains from trunk tips
   of both elephants, cascading into invitation.

   HOW IT WORKS:
   - Each particle starts at the trunk tip position
   - Falls with gravity + gentle horizontal drift
   - Rotates continuously while falling
   - Colours sampled from the wedding palette
   - Particles that exit bottom are recycled to top
─────────────────────────────────────────── */
(function initElephantConfetti(){
  return; // Disabled elephant confetti
  const rainCanvas = document.getElementById('confettiRain');
  if(!rainCanvas) return;
  const bridge = document.getElementById('elephBridge');
  if(!bridge) return;

  const ctx = rainCanvas.getContext('2d');

  // ── Resize canvas exactly to bridge + overflow ──
  const OVERFLOW = 200; // px confetti spills below bridge into invite
  function resizeCanvas(){
    rainCanvas.width  = bridge.offsetWidth;
    rainCanvas.height = bridge.offsetHeight + OVERFLOW;
    rainCanvas.style.height = (bridge.offsetHeight + OVERFLOW) + 'px';
  }

  // ── Trunk tip: measured from actual elephant DOM element ──
  // Left elephant:  trunk tip is at the RIGHT edge, near the TOP of the img
  // Right elephant: trunk tip is at the LEFT  edge, near the TOP of the img
  // We use getBoundingClientRect() relative to the bridge to get true px coords.
  // These ratios (trunkX, trunkY as fraction of the elephant img dimensions)
  // are calibrated to the paper-cut elephant illustrations.
  // If using your own Firefly images, adjust TRUNK_X_FRAC / TRUNK_Y_FRAC below.
  const TRUNK = {
    // Fraction of elephant IMG width/height where trunk tip appears
    // Left elephant (facing right): tip is at ~85% width, ~10% height
    left:  { xFrac: 0.85, yFrac: 0.10 },
    // Right elephant (facing left, mirrored): tip is at ~15% width, ~10% height
    right: { xFrac: 0.15, yFrac: 0.10 },
  };

  function getTrunkTips(){
    const bridgeRect = bridge.getBoundingClientRect();

    // Find elephant image elements (or SVG fallback if no image)
    const elephLEl = document.querySelector('#elephL img, #elephL .eleph-svg');
    const elephREl = document.querySelector('#elephR img, #elephR .eleph-svg');

    let leftTip, rightTip;

    if(elephLEl){
      const r = elephLEl.getBoundingClientRect();
      leftTip = {
        x: (r.left - bridgeRect.left) + r.width  * TRUNK.left.xFrac,
        y: (r.top  - bridgeRect.top)  + r.height * TRUNK.left.yFrac,
      };
    } else {
      // Absolute fallback if DOM not ready
      leftTip = { x: bridge.offsetWidth * 0.28, y: bridge.offsetHeight * 0.12 };
    }

    if(elephREl){
      const r = elephREl.getBoundingClientRect();
      rightTip = {
        x: (r.left - bridgeRect.left) + r.width  * TRUNK.right.xFrac,
        y: (r.top  - bridgeRect.top)  + r.height * TRUNK.right.yFrac,
      };
    } else {
      rightTip = { x: bridge.offsetWidth * 0.72, y: bridge.offsetHeight * 0.12 };
    }

    return { left: leftTip, right: rightTip };
  }

  // ── Re-measure tips on resize so confetti always tracks trunk ──
  let tips = { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } };
  function refreshLayout(){
    resizeCanvas();
    tips = getTrunkTips();
    // Reset all particles to new trunk positions
    particles?.forEach(p => {
      const origin = p.side === 'left' ? tips.left : tips.right;
      p.ox = origin.x;
      p.oy = origin.y;
    });
  }

  // Debounced resize — don't thrash on every pixel of drag
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshLayout, 120);
  });

  // ── Wedding palette ──
  const COLOURS = ['#C4748C','#F2D4C8','#C4985A','#8BAE9B','#F0C4A0','#E8A060','#FAF3E8','#D4886A'];
  const SHAPES  = ['rect','circle','petal'];

  // ── Particle ──
  class Particle {
    constructor(side){
      this.side = side;
      const origin = side === 'left' ? tips.left : tips.right;
      this.ox = origin.x;
      this.oy = origin.y;
      this.initRandom();
      // Stagger so they don't all start at trunk tip simultaneously
      this.y = Math.random() * (bridge.offsetHeight + OVERFLOW);
    }

    initRandom(){
      const dir = this.side === 'left' ? 1 : -1;
      this.x     = this.ox + (Math.random() - 0.5) * 20;
      this.y     = this.oy + Math.random() * 10;
      this.vx    = dir * (0.3 + Math.random() * 1.8) + (Math.random() - 0.5) * 0.9; // wider fan (Change 10)
      this.vy    = 0.6 + Math.random() * 1.8;
      this.vr    = (Math.random() - 0.5) * 5;
      this.rot   = Math.random() * 360;
      this.sz    = 5 + Math.random() * 9;
      this.colour= COLOURS[Math.floor(Math.random() * COLOURS.length)];
      this.shape = SHAPES [Math.floor(Math.random() * SHAPES.length)];
      this.alpha = 0.7 + Math.random() * 0.3;
      this.decay = 0.001 + Math.random() * 0.001;
    }

    update(canvasH){
      this.x   += this.vx;
      this.vy  += 0.035;          // gravity
      this.y   += this.vy;
      this.rot += this.vr;
      this.alpha -= this.decay;

      if(this.y > canvasH + 10 || this.alpha <= 0){
        // Recycle back to measured trunk tip
        const origin = this.side === 'left' ? tips.left : tips.right;
        this.ox = origin.x;
        this.oy = origin.y;
        this.initRandom();
      }
    }

    draw(ctx){
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = this.colour;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot * Math.PI / 180);
      const s = this.sz;
      if(this.shape === 'rect'){
        ctx.fillRect(-s/2, -s/4, s, s/2);
      } else if(this.shape === 'circle'){
        ctx.beginPath(); ctx.arc(0, 0, s/2, 0, Math.PI*2); ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -s/2);
        ctx.quadraticCurveTo(s/2, 0, 0, s/2);
        ctx.quadraticCurveTo(-s/2, 0, 0, -s/2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // ── Build particle pool after first layout measurement ──
  // Fewer particles on touch = smoother scroll on mid-range Android
  const COUNT = isTouch ? 35 : 90;
  let particles = [];

  function buildParticles(){
    particles = [];
    for(let i = 0; i < COUNT; i++){
      particles.push(new Particle(i < COUNT/2 ? 'left' : 'right'));
    }
  }

  // ── Render loop ──
  function animate(){
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    particles.forEach(p => { p.update(rainCanvas.height); p.draw(ctx); });
    requestAnimationFrame(animate);
  }

  // ── Start once bridge is in viewport AND images have had time to lay out ──
  const io = new IntersectionObserver(([entry]) => {
    if(!entry.isIntersecting) return;
    io.disconnect();
    // Wait one frame for images to have real dimensions
    requestAnimationFrame(() => {
      refreshLayout();
      buildParticles();
      animate();
    });
  }, { threshold: 0.1 });
  io.observe(bridge);

})();