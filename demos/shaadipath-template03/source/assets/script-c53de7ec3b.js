'use strict';

/* ─────────────────────────────────────────
   GLOBALS
───────────────────────────────────────── */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─────────────────────────────────────────
   LUXURY ANIMATION 7: MAGNETIC CURSOR
   Platinum crosshair ring — architectural.
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
    // Gold bloom over interactive, platinum default — T03 palette
    ring.style.boxShadow = document.body.classList.contains('ch')
      ? '0 0 36px 12px rgba(200,168,112,.40)'
      : '0 0 12px 2px rgba(176,160,128,.15)';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .ev-node, .tt, .gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();

/* ─────────────────────────────────────────
   PRELOADER — 2.0s total (slower = editorial)
   400ms  → platinum line draws
   900ms  → names silk-fade up
   2000ms → preloader fades out, hero reveals
───────────────────────────────────────── */
function revealHero(){
  document.body.classList.remove('pl-active');
  const arch   = document.querySelector('.hl-palace');
  const couple = document.querySelector('.hl-couple');
  const copy   = document.getElementById('heroCopy');
  if(arch)   arch.classList.add('in');
  if(couple) couple.classList.add('in');
  if(copy)   copy.classList.add('in');
}

function runPreloader(){
  const pl = document.getElementById('preloader');
  if(!pl){ revealHero(); return; }
  setTimeout(() => pl.classList.add('li'),  400);
  setTimeout(() => pl.classList.add('ni'),  900);
  setTimeout(() => {
    pl.classList.add('away');
    setTimeout(() => { pl.style.display='none'; revealHero(); }, 800);
  }, 2000);
}

document.body.classList.add('pl-active');
if(document.readyState === 'complete'){
  runPreloader();
} else {
  window.addEventListener('load', runPreloader);
}
setTimeout(() => {
  if(document.body.classList.contains('pl-active')){
    revealHero();
    const pl = document.getElementById('preloader');
    if(pl) pl.style.display = 'none';
  }
}, 5000);

/* ─────────────────────────────────────────
   LUXURY ANIMATION: AMBIENT HERO PARTICLES
   CSS-powered floating gold dust particles.
   Created in JS, animated purely in CSS.
   30 particles on desktop, 12 on mobile.
───────────────────────────────────────── */
(function initHeroParticles(){
  const container = document.getElementById('heroParticles');
  if(!container) return;
  const COUNT = isTouch ? 10 : 22;

  for(let i = 0; i < COUNT; i++){
    const p = document.createElement('div');
    p.className = 'hp';
    const x    = 5 + Math.random() * 90;
    const dur  = 10 + Math.random() * 16;   // 10–26s cycle
    const del  = Math.random() * -20;        // negative delay = pre-started
    const dx   = (Math.random() - 0.5) * 60; // horizontal drift
    const size = Math.random() < 0.3 ? 3 : (Math.random() < 0.6 ? 2 : 1.5);
    p.style.cssText = `left:${x}%;--dur:${dur}s;--del:${del}s;--dx:${dx}px;width:${size}px;height:${size}px;opacity:0`;
    container.appendChild(p);
  }
})();

/* ─────────────────────────────────────────
   SCROLL-PINNED HERO DRIVER
   T03 INNOVATION: Dual parallax rates
   ─ Arch (l3)    → scale 1.0 → 1.45 (standard)
   ─ Couple (l4)  → scale 1.0 → 1.20 (slower)
   Net result: couple appears to recede INTO
   the arch as the user scrolls, creating depth.
───────────────────────────────────────── */
const heroWrap    = document.getElementById('heroWrap');
const heroPin     = document.getElementById('heroPin');
const archEl      = document.getElementById('l3');    // The arch
const coupleEl    = document.getElementById('l4');    // The couple
const heroCopy    = document.getElementById('heroCopy');
const scrollNudge = document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});

let raw=0, lerped=0, mouseX=0, mouseY=0, rafH=null;
function lerp(a,b,t){ return a+(b-a)*t; }

function getHeroProgress(){
  if(!heroWrap) return 0;
  const top    = heroWrap.getBoundingClientRect().top + window.scrollY;
  const travel = heroWrap.offsetHeight - window.innerHeight;
  return Math.min(1, Math.max(0, (window.scrollY - top) / travel));
}

function driveHero(){
  lerped += (raw - lerped) * 0.05;  // T03: slightly slower lerp (0.05 vs 0.06)
  const p  = lerped;
  const mx = isTouch ? 0 : mouseX;
  const my = isTouch ? 0 : mouseY;

  // ARCH — 3D perspective tilt on mouse + standard zoom (Change 06)
  if(archEl){
    const scale  = 1.0 + p * 0.45;
    const tiltX  = mx * -10;
    const tiltY  = my * -6;
    archEl.style.transform = `perspective(1200px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateX(calc(-50% + ${(tiltX*0.4).toFixed(1)}px)) scale(${scale})`;
    archEl.style.filter    = `drop-shadow(0 ${(12+p*18).toFixed(0)}px ${(40+p*30).toFixed(0)}px rgba(42,36,32,${(0.10+p*0.12).toFixed(2)}))`;
  }

  // COUPLE — slower zoom (1.0→1.20) + slight upward float — depth effect
  if(coupleEl){
    const coupleScale = 1.0 + p * 0.20;
    const coupleY     = p * -15;
    const tiltX       = mx * -2;
    coupleEl.style.transform = `translateX(calc(-50% + ${tiltX}px)) translateY(${coupleY}px) scale(${coupleScale})`;
    coupleEl.style.opacity = String(Math.max(0.3, 1 - p * 0.5));
  }

  // Names: stay fully visible until p=0.55, dissolve by p=0.88 (Change 03)
  if(heroCopy){
    const dissolveStart = 0.55;
    const dissolveEnd   = 0.88;
    const t = Math.max(0, Math.min(1, (p - dissolveStart) / (dissolveEnd - dissolveStart)));
    heroCopy.style.opacity      = (1 - t).toFixed(3);
    heroCopy.style.transform    = `translateY(${p * -18}px)`;
    heroCopy.style.filter       = t > 0 ? `blur(${(t*14).toFixed(1)}px)` : '';
    heroCopy.style.letterSpacing = t > 0 ? (t*0.08).toFixed(3)+'em' : '';
  }

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

/* ─────────────────────────────────────────
   LUXURY ANIMATION: MERLION FOUNTAIN ARC
   Realistic water arcs from each merlion mouth toward the centre.
   Left merlion jets water RIGHT + UP → peaks at centre-top → falls down.
   Right merlion jets water LEFT + UP → peaks at centre-top → falls down.
   Three bezier stream curves per merlion + water-drop particles that
   travel along the arc path (gravity bends them naturally).
───────────────────────────────────────── */
(function initMerlionWater(){
  const bridge = document.getElementById('urnBridge');
  const lineEl = document.getElementById('urnBridgeLine');
  const canvas = document.getElementById('waterCanvas');
  if(!bridge || !canvas) return;

  // roundRect polyfill
  if(!CanvasRenderingContext2D.prototype.roundRect){
    CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){
      this.beginPath();this.moveTo(x+r,y);this.lineTo(x+w-r,y);
      this.quadraticCurveTo(x+w,y,x+w,y+r);this.lineTo(x+w,y+h-r);
      this.quadraticCurveTo(x+w,y+h,x+w-r,y+h);this.lineTo(x+r,y+h);
      this.quadraticCurveTo(x,y+h,x,y+h-r);this.lineTo(x,y+r);
      this.quadraticCurveTo(x,y,x+r,y);this.closePath();
    };
  }

  const EXTRA_H = 520;  // tall enough to reach the lotus section below

  function resizeCanvas(){
    canvas.width  = bridge.offsetWidth;
    canvas.height = bridge.offsetHeight + EXTRA_H;
    canvas.style.height = canvas.height + 'px';
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); });

  const ctx = canvas.getContext('2d');

  // Soft aqua water palette
  const COLS = [
    [160,210,230],
    [185,225,242],
    [210,238,250],
    [175,218,238],
  ];

  let particles = [];
  let running   = false;
  let frameId;
  let t = 0;

  // ── Mouth positions ──
  // Placed right at the inner/top of each merlion head, close to statue
  function getMouths(){
    const W    = canvas.width;
    const H    = bridge.offsetHeight;
    const urnW = Math.min(W * 0.36, 220);
    const urnH = urnW * (960/1088);
    const top  = H - urnH;
    const lx = urnW * 0.76,      ly = top + urnH * 0.16;
    const rx = W - urnW * 0.76,  ry = ly;
    return [
      { x:lx, y:ly, side:+1 },
      { x:rx, y:ry, side:-1 },
    ];
  }

  // ── Spawn a water-drop particle ──
  // Matches yellow sketch: shoots UPWARD (55°–75° above horizontal) with
  // a tiny inward nudge. Gravity pulls it back down through the centre
  // toward the lotus — creating a tall narrow arch per merlion.
  function spawnDrop(m){
    const W   = canvas.width;
    const col = COLS[Math.floor(Math.random() * COLS.length)];

    // Steep upward launch angle (matches the tall arch in the sketch)
    const angleDeg = 40 + Math.random() * 16;  // 40°–54° above horizontal
    const angleRad = (angleDeg * Math.PI) / 180;

    // Speed calibrated so peak is ~100–140px above mouth on mobile,
    // slightly more on desktop. Formula: v²·sin²θ / (2g) = peak_height
    // target peak ~120px → v = sqrt(2 * 0.18 * 120) / sin(angle) ≈ 8–9
    const baseSpeed = 3.5 + Math.random() * 2.0 + (W > 600 ? 1.5 : 0);

    // Small inward horizontal component (toward centre) — keeps arc narrow
    const vx = m.side * Math.cos(angleRad) * baseSpeed * 0.30;
    const vy = -Math.sin(angleRad) * baseSpeed; // strong upward

    return {
      x: m.x, y: m.y,
      vx, vy,
      ay: 0.18,
      side:   m.side,
      mouthX: m.x,
      col,
      rot:  Math.atan2(vy, vx),
      rotV: (Math.random() - 0.5) * 0.05,
      w: 1.8 + Math.random() * 2.0,
      h: 4   + Math.random() * 10,
      alpha: 0.72 + Math.random() * 0.22,
      life:  1.0,
      decay: 0.010 + Math.random() * 0.007, // lives long enough to reach lotus
    };
  }

  let spawnTick = 0;

  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t++;
    spawnTick++;

    // Stream curves removed — particles only for clean confetti-water look

    // Update & draw particles
    particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 50);

    for(const p of particles){
      p.vy += p.ay;
      p.x  += p.vx;
      p.y  += p.vy;
      p.life -= p.decay;
      p.rot  += p.rotV;

      // Hard clamp: kill any particle that drifts back OUTSIDE the merlion
      // (i.e. past its own mouth in the outward direction)
      if(p.side === +1 && p.x < p.mouthX) { p.life = 0; continue; }
      if(p.side === -1 && p.x > p.mouthX) { p.life = 0; continue; }

      const a = Math.min(p.life * p.alpha, 1);
      const [r,g,b] = p.col;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      ctx.roundRect(-p.w/2, -p.h/2, p.w, p.h, p.w/2);
      ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
      ctx.fill();
      // Subtle specular sheen
      ctx.beginPath();
      ctx.moveTo(0, -p.h * 0.3);
      ctx.lineTo(0,  p.h * 0.3);
      ctx.strokeStyle = `rgba(255,255,255,${(a * 0.45).toFixed(2)})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    }

    // Spawn drops — reduced 30%: every frame, 2–3 per mouth (was 3–5)
    {
      const mouths = getMouths();
      mouths.forEach(m => {
        const n = 2 + Math.floor(Math.random() * 2);
        for(let i = 0; i < n; i++) particles.push(spawnDrop(m));
      });
    }

    if(particles.length > 420) particles.splice(0, particles.length - 420);

    frameId = requestAnimationFrame(loop);
  }

  function startWater(){
    if(running) return;
    running = true;
    if(lineEl) setTimeout(() => bridge.classList.add('line-drawn'), 400);
    // Pre-seed drops so arc looks full immediately on scroll-in
    const mouths = getMouths();
    mouths.forEach(m => {
      for(let i = 0; i < 50; i++) particles.push(spawnDrop(m));
    });
    loop();
  }

  const io = new IntersectionObserver(([e]) => {
    if(e.isIntersecting){ setTimeout(startWater, 200); io.disconnect(); }
  }, { threshold: 0.25 });
  io.observe(bridge);
})();

/* ─────────────────────────────────────────
   LUXURY ANIMATION: MINIMAL PETAL RAIN
   T03 version — champagne leaf petals.
   Max 4 per section, very slow rate.
   Opacity reduced to 0.35 for editorial subtlety.
───────────────────────────────────────── */
class Petals {
  constructor(id, opts={}){
    this.el    = document.getElementById(id);
    this.max   = opts.max  || 3;    // T03: much fewer
    this.rate  = opts.rate || 3000; // T03: much slower
    this.src   = 'assets/Element_204-314386d360.png';
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

    const sz    = 40 + Math.random() * 30;
    const x     = 8  + Math.random() * 84;
    const dur   = 14 + Math.random() * 10;
    const drift = (Math.random() - 0.5) * 100;  // wider organic drift
    const turns = 1;

    const wrap = document.createElement('div');
    wrap.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;

    const img = document.createElement('img');
    img.src = this.src;
    img.loading = 'lazy';
    img.style.cssText = [
      'width:100%;height:100%;object-fit:contain',
      'mix-blend-mode:multiply',
      'opacity:0.85',
      'filter:drop-shadow(0 2px 6px rgba(42,36,32,.12))',
    ].join(';');
    wrap.appendChild(img);

    const anim = wrap.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
      { transform: `translateY(6vh) translateX(${drift*.2}px) rotate(${turns*60}deg)`, opacity: .85, offset: .06 },
      { transform: `translateY(80vh) translateX(${drift}px) rotate(${turns*240}deg)`, opacity: .75, offset: .90 },
      { transform: `translateY(108vh) translateX(${drift}px) rotate(${turns*280}deg)`, opacity: 0 },
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
    this.spawn();
  }

  stop(){
    this.active = false;
    clearInterval(this._iv);
  }
}

// T03 petal systems — minimal counts, slow editorial rates. Story+gallery added.
const PS = {
  hero:    new Petals('petalHero',    { max: isTouch?40:60,  rate: isTouch?350:200 }),
  invite:  new Petals('petalInvite',  { max: isTouch?30:50,  rate: isTouch?400:250 }),
  events:  new Petals('petalEvents',  { max: isTouch?30:50,  rate: isTouch?400:250 }),
  story:   new Petals('petalStory',   { max: isTouch?30:50,  rate: isTouch?400:250 }),
  gallery: new Petals('petalGallery', { max: isTouch?30:50,  rate: isTouch?400:250 }),
  things:  new Petals('petalThings',  { max: isTouch?30:50,  rate: isTouch?450:300 }),
  rsvp:    new Petals('petalRsvp',    { max: isTouch?30:50,  rate: isTouch?400:250 }),
};

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
   LUXURY ANIMATION 6: SILK FADE SCROLL REVEAL
   1.2s editorial pace vs T01's 0.8s.
───────────────────────────────────────── */
const rIO = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if(isIntersecting){
      target.classList.add('vis');
      rIO.unobserve(target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.scroll-in').forEach(el => rIO.observe(el));
const inviteCard = document.querySelector('.invite-card');
if(inviteCard) rIO.observe(inviteCard);

/* ─────────────────────────────────────────
   LUXURY ANIMATION 3: PLATINUM LINE DRAWS
   SVG underlines animate in under section headings
   when they enter the viewport.
───────────────────────────────────────── */
(function initLineDraws(){
  const lines = document.querySelectorAll('.sh-line');
  if(!lines.length) return;

  const lineIO = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if(isIntersecting){
        // Stagger the draw slightly after the heading scroll-in
        setTimeout(() => target.classList.add('drawn'), 500);
        lineIO.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  lines.forEach(l => lineIO.observe(l));
})();

/* ─────────────────────────────────────────
   EVENTS — Journey Line (identical to T01/T02)
───────────────────────────────────────── */
(function initEventsJourney(){
  if(window.matchMedia('(min-width:681px)').matches) return;
  const section  = document.getElementById('events');
  const stage    = document.getElementById('evStage');
  const svgEl    = document.getElementById('evJourneySvg');
  const trackEl  = document.getElementById('ejTrack');
  const drawnEl  = document.getElementById('ejDrawn');
  if(!section || !stage || !svgEl || !trackEl || !drawnEl) return;

  function getNodeCentres(){
    const nodes = Array.from(stage.querySelectorAll('.ev-node'));
    const secRect = section.getBoundingClientRect();
    return nodes.map(node => {
      const iconWrap = node.querySelector('.ev-icon-wrap');
      const r = (iconWrap || node).getBoundingClientRect();
      return { x: r.left + r.width/2 - secRect.left, y: r.top + r.height/2 - secRect.top };
    });
  }

  function buildPath(pts){
    if(pts.length < 2) return '';
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for(let i = 0; i < pts.length - 1; i++){
      const a = pts[i], b = pts[i+1];
      const mx = ((a.x+b.x)/2).toFixed(1);
      const wave = (i%2===0?1:-1) * Math.min(55, Math.abs(b.x-a.x)*.26);
      const cy = ((a.y+b.y)/2-24).toFixed(1);
      d += ` Q ${(+mx+wave).toFixed(1)} ${cy}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }

  function sizeSvg(){
    const w = section.offsetWidth, h = section.offsetHeight;
    svgEl.setAttribute('width', w);
    svgEl.setAttribute('height', h);
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
  }

  function layout(){
    sizeSvg();
    requestAnimationFrame(() => {
      const pts = getNodeCentres();
      const d   = buildPath(pts);
      trackEl.setAttribute('d', d);
      drawnEl.setAttribute('d', d);
      if(drawnEl.getTotalLength){
        const total = drawnEl.getTotalLength();
        drawnEl.style.strokeDasharray  = total;
        drawnEl.style.strokeDashoffset = total;
        drawnEl._total = total;
      }
      onScroll();
    });
  }

  function onScroll(){
    if(!drawnEl._total) return;
    const winH    = window.innerHeight;
    const rect    = section.getBoundingClientRect();
    const secH    = section.offsetHeight;
    const scrolled = winH - rect.top;
    const total    = secH + winH;
    const progress = Math.min(1, Math.max(0, scrolled / total));
    drawnEl.style.strokeDashoffset = (drawnEl._total * (1 - progress)).toFixed(1);
  }

  window._evJourneyLayout = layout;

  // Re-layout when section first visible (fixes content-visibility timing)
  const visIO = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      requestAnimationFrame(() => requestAnimationFrame(layout));
      visIO.disconnect();
    }
  }, { threshold: 0.01 });
  visIO.observe(section);

  window.addEventListener('load', layout);
  window.addEventListener('scroll', onScroll, { passive: true });
  let rTO;
  window.addEventListener('resize', () => { clearTimeout(rTO); rTO = setTimeout(layout, 180); });
})();

/* ─────────────────────────────────────────
   EVENTS — Scroll-triggered detail reveal
───────────────────────────────────────── */
function initEventsAutoOpen(){
  const nodes = Array.from(document.querySelectorAll('.ev-node'));
  if(!nodes.length) return;
  const revealed = new Set();
  function checkNodes(){
    const triggerLine = window.innerHeight * 0.62;
    nodes.forEach(node => {
      if(revealed.has(node)) return;
      const rect = node.getBoundingClientRect();
      if(rect.top + rect.height/2 < triggerLine){
        revealed.add(node);
        requestAnimationFrame(() => node.classList.add('ev-active'));
      }
    });
  }
  window.addEventListener('scroll', checkNodes, { passive: true });
  window.addEventListener('load', checkNodes);
  checkNodes();
}
initEventsAutoOpen();

/* ─────────────────────────────────────────
   3D CARD TILT — events + gallery (T03 Change 07)
   Restrained angles to match T03 editorial feel
─────────────────────────────────────────── */
(function initCardTilt(){
  function attachMouseTilt(el){
    if(el._tiltAttached) return;
    el._tiltAttached = true;
    el.addEventListener('mousemove', function(e){
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      this.style.transition = 'transform 0.08s ease';
      this.style.transform  = `perspective(900px) rotateX(${(y*-10).toFixed(2)}deg) rotateY(${(x*12).toFixed(2)}deg) scale(1.025)`;
    });
    el.addEventListener('mouseleave', function(){
      this.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTouchTilt(el){
    if(el._touchTiltAttached) return;
    el._touchTiltAttached = true;
    el.addEventListener('touchmove', function(e){
      if(e.touches.length !== 1) return;
      const r = this.getBoundingClientRect();
      const x = (e.touches[0].clientX - r.left) / r.width  - 0.5;
      const y = (e.touches[0].clientY - r.top)  / r.height - 0.5;
      this.style.transition = 'transform 0.05s ease';
      this.style.transform  = `perspective(700px) rotateX(${(y*-6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) scale(1.018)`;
    }, { passive: true });
    el.addEventListener('touchend', function(){
      this.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTilt(el){ attachMouseTilt(el); attachTouchTilt(el); }
  document.querySelectorAll('.ev-node, .gal-item').forEach(attachTilt);
  const _orig = window.initEventsAutoOpen;
  window.initEventsAutoOpen = function(){
    if(typeof _orig === 'function') _orig();
    document.querySelectorAll('.ev-node').forEach(attachTilt);
  };
})();

/* ─────────────────────────────────────────
   HERO COUNTDOWN TIMER (T03 Change 12)
   Reads WEDDING_CONFIG.couple.date.
   Falls back to 12 Dec 2026.
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
      el.innerHTML = '<span class="hc-cd-unit"><span class="hc-cd-num" style="font-size:clamp(.6rem,1.4vw,.85rem)">We\'re Married ♥</span></span>';
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
   STORY — Theatrical Curtain Reveal
   T03 version: slower, more restrained.
   Curtain open speed reduced.
   Story petal colours: warm champagne tones.
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

  let sequenceDone=false, openEnabled=false, revealed=false, lastP=0;

  function spawnPetal(){
    if(!petalsEl) return;
    const sz  = 4 + Math.random() * 7;
    const x   = 12 + Math.random() * 76;
    const dur = 6000 + Math.random() * 5000;
    const dx  = (Math.random()-0.5) * 80;
    // T03: warm champagne/sand petal colours only
    const COLS = ['rgba(200,168,112,.18)','rgba(176,160,128,.14)','rgba(212,188,152,.20)','rgba(232,220,196,.28)'];
    const col  = COLS[Math.floor(Math.random()*COLS.length)];
    const el   = document.createElement('div');
    el.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 12% 50% 12%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      { transform:'translateY(0) translateX(0) rotate(0deg)', opacity:0 },
      { transform:`translateY(3vh) translateX(${dx*.08}px) rotate(30deg)`, opacity:.8, offset:.04 },
      { transform:`translateY(55vh) translateX(${dx*.90}px) rotate(210deg)`, opacity:.3, offset:.88 },
      { transform:`translateY(88vh) translateX(${dx}px) rotate(300deg)`, opacity:0 },
    ], { duration:dur, easing:'linear', fill:'forwards' }).onfinish = ()=> el.remove();
  }

  function runSequence(){
    if(sequenceDone) return;
    sequenceDone = true;
    bride.classList.add('st-pull');
    groom.classList.add('st-pull');
    setTimeout(() => {
      bride.classList.remove('st-pull'); groom.classList.remove('st-pull');
      bride.classList.add('st-tension'); groom.classList.add('st-tension');
    }, 800);
    setTimeout(() => {
      bride.classList.remove('st-tension'); groom.classList.remove('st-tension');
      openEnabled = true;
      applyProgress(getCurtainProgress());
    }, 1400);
  }

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    const rect  = section.getBoundingClientRect();
    const start = window.innerHeight * 0.52;
    const range = window.innerHeight * 1.0;  // T03: slower curtain open
    return Math.min(1, Math.max(0, (start - rect.top) / range));
  }

  function applyProgress(p){
    if(Math.abs(p - lastP) < 0.002) return;
    lastP = p;
    const eased = p < 1 ? 1 - Math.pow(1-p, 3.2) : 1;
    curtL.style.transform = `translateX(-${(eased*100).toFixed(2)}%)`;
    curtR.style.transform = `translateX(${(eased*100).toFixed(2)}%)`;
    // Growing shadow as curtains part — physical weight
    curtL.style.filter = `drop-shadow(${(eased*24).toFixed(1)}px 0 30px rgba(42,36,32,${(eased*.28).toFixed(2)}))`;
    curtR.style.filter = `drop-shadow(-${(eased*24).toFixed(1)}px 0 30px rgba(42,36,32,${(eased*.28).toFixed(2)}))`;
    const charDrift = eased * 22;
    const charScale = 1 - eased * 0.03;
    bride.style.transform = `translateX(-${charDrift.toFixed(1)}px) scale(${charScale.toFixed(3)})`;
    groom.style.transform = `translateX(${charDrift.toFixed(1)}px) scale(${charScale.toFixed(3)})`;
    if(eased >= 0.65 && !revealed){
      revealed = true;
      reveal.classList.add('revealed');
      // T03: fewer petals, spread over more time
      let n = 0;
      const iv = setInterval(() => { spawnPetal(); if(++n >= 16) clearInterval(iv); }, 280);
    }
  }

  window.addEventListener('scroll', () => { applyProgress(getCurtainProgress()); }, { passive:true });

  const io = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting && entries[0].intersectionRatio >= 0.20){
      runSequence();
      io.disconnect();
    }
  }, { threshold: [0.20] });
  io.observe(section);

  let rTO;
  window.addEventListener('resize', () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => applyProgress(getCurtainProgress()), 150);
  });
})();

/* ─────────────────────────────────────────
   RSVP — Subtle leaf burst on click
   T03 version: much smaller, champagne only
───────────────────────────────────────── */
function burstPetals(fromEl){
  const r   = fromEl.getBoundingClientRect();
  const cx  = r.left + r.width/2;
  const cy  = r.top  + r.height/2;
  const src = 'assets/Element_204-314386d360.png';

  for(let i = 0; i < 25; i++){  // Increased burst petals
    const el  = document.createElement('div');
    el.className = 'burst-p';
    const sz  = 6 + Math.random() * 10;  // smaller
    const ang = (i/10)*360 + Math.random()*20;
    const dst = 40 + Math.random() * 55; // shorter distance
    const tx  = Math.cos(ang*Math.PI/180)*dst;
    const ty  = Math.sin(ang*Math.PI/180)*dst;
    el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.5';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      { transform:`translate(-50%,-50%) scale(.15) rotate(0deg)`, opacity:.5 },
      { transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(1) rotate(${Math.random()*280}deg)`, opacity:.4, offset:.40 },
      { transform:`translate(calc(-50% + ${tx*1.3}px),calc(-50% + ${ty*1.3+40}px)) scale(.2) rotate(${Math.random()*420}deg)`, opacity:0 },
    ], { duration:1100+Math.random()*300, easing:'ease-out', fill:'forwards' })
    .onfinish = () => el.remove();
  }
}

(function initRsvpBtn(){
  const btn = document.getElementById('rsvpWaBtn');
  if(!btn) return;
  btn.addEventListener('click', () => { burstPetals(btn); });
})();
