'use strict';
/* ═══════════════════════════════════════════════════
   TEMPLATE 06 — KERALA BACKWATERS POETRY — script.js
   12 MICRO-INTERACTIONS:
   01 Water Cursor    02 Dawn Preloader   03 Boat Parallax (bottom zoom)
   04 Firefly Drift   05 Boat Breathe (CSS, 7s)  06 Toran Sway (CSS)
   07 Card Bloom (CSS) 08 Icon Magnetic   09 Frame Hover (CSS)
   10 Knowledge Bloom (CSS) 11 Jasmine Burst  12 Kasavu Underline
═══════════════════════════════════════════════════ */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─── 01 WATER CURSOR ──────────────────────────── */
(function initCursor(){
  if(isTouch) return;
  const ring=document.getElementById('cRing'), dot=document.getElementById('cDot');
  if(!ring||!dot) return;
  let rx=0,ry=0,dx=-200,dy=-200,hasMoved=false;
  document.addEventListener('mousemove',e=>{
    dx=e.clientX;dy=e.clientY;
    dot.style.left=dx+'px';dot.style.top=dy+'px';
    if(!hasMoved){hasMoved=true;document.body.classList.add('cursor-active');}
  });
  // Slower lerp — smooth like water
  (function loop(){
    rx+=(dx-rx)*.082;ry+=(dy-ry)*.082;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.ev-node,.tt,.gal-item,.rsvp-wa-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>{document.body.classList.add('ch');ring.style.boxShadow='0 0 0 4px rgba(200,168,48,.40),0 0 18px rgba(46,107,74,.15)';});
    el.addEventListener('mouseleave',()=>{document.body.classList.remove('ch');ring.style.boxShadow='';});
  });
})();

/* ─── 02 DAWN PRELOADER ────────────────────────── */
function revealHero(){
  document.body.classList.remove('pl-active');
  /* Everything appears together — no staggered layer-by-layer reveal.
     All layers are already fully positioned; just fade in as one unit. */
  const subject = document.getElementById('heroSubject');
  const fgLayer = document.getElementById('heroFgImg');
  const copy    = document.getElementById('heroCopy');
  if(subject) subject.classList.add('in');
  if(fgLayer) fgLayer.classList.add('in');
  if(copy)    copy.classList.add('in');
}
function runPreloader(){
  const pl=document.getElementById('preloader');
  if(!pl){revealHero();return;}
  setTimeout(()=>pl.classList.add('li'), 340);
  setTimeout(()=>pl.classList.add('ni'), 860);
  setTimeout(()=>{
    pl.classList.add('away');
    setTimeout(()=>{pl.style.display='none';revealHero();},750);
  },2000);
}
document.body.classList.add('pl-active');
if(document.readyState==='complete'){runPreloader();}
else{window.addEventListener('load',runPreloader);}
setTimeout(()=>{
  if(document.body.classList.contains('pl-active')){
    revealHero();
    const pl=document.getElementById('preloader');
    if(pl)pl.style.display='none';
  }
},5500);

/* ─── 04 FIREFLY DRIFT — gold & jade motes ─────── */
(function initFireflies(){
  const container=document.getElementById('heroParticles');
  if(!container) return;
  const COUNT=isTouch?7:22;
  for(let i=0;i<COUNT;i++){
    const p=document.createElement('div');
    p.className='hp';
    const x=3+Math.random()*94;
    const dur=10+Math.random()*18;
    const del=Math.random()*-24;
    const dx=(Math.random()-0.5)*55;
    // Kasavu gold + jade + warm white — Kerala backwater palette
    const colours=['#C8A830','#D4B840','#FAFAF5','#4A8A6A','#D4C890'];
    const weights=[3,2,2,2,1];
    let pick=0,rnd=Math.random()*10;
    for(let w=0,j=0;j<colours.length;j++){w+=weights[j];if(rnd<w){pick=j;break;}}
    const size=Math.random()<0.25?3:(Math.random()<0.55?2:1.5);
    p.style.cssText=`left:${x}%;--dur:${dur}s;--del:${del}s;--dx:${dx}px;width:${size}px;height:${size}px;background:${colours[pick]};border-radius:50%;opacity:0`;
    container.appendChild(p);
  }
})();

/* ─── 03 HERO PARALLAX — 3-LAYER KERALA SYSTEM ──────
   Layer 1 (Background): Mountains/sky  — upward drift on scroll
   Layer 3 (Subject):    Houseboat      — zooms in anchored bottom-centre
   Layer 4 (Foreground): Coconut palms  — X-only sinusoidal sway.
                                          Wrapper extends 80px past each
                                          edge; drift ±28px stays inside.
   lerp 0.12 = snappy, clearly visible, not sluggish.
──────────────────────────────────────────────────────── */
const heroWrap    = document.getElementById('heroWrap');
const heroPin     = document.getElementById('heroPin');
const bgImg       = document.getElementById('heroBgImg');
const subjectEl   = document.getElementById('heroSubject');
const fgImg       = document.getElementById('heroFgImg');
const heroCopy    = document.getElementById('heroCopy');
const scrollNudge = document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});
let raw=0, lerped=0, mouseX=0, mouseY=0, rafH=null;

function getHeroProgress(){
  if(!heroWrap) return 0;
  const top    = heroWrap.getBoundingClientRect().top + window.scrollY;
  const travel = heroWrap.offsetHeight - window.innerHeight;
  return Math.min(1, Math.max(0, (window.scrollY - top) / travel));
}

/* ── FOREGROUND PALM SWAY — X only, wrapper absorbs any edge gap ──
   Mobile wrapper: ±80px buffer → drift ±28px is safe.
   Desktop wrapper: ±120px buffer → drift ±40px looks more dramatic & still safe. */
let fgDriftT = 0;
(function driveFgDrift(){
  fgDriftT += 0.008;
  const isDesktop = window.innerWidth >= 768;
  const amplitude = isDesktop ? 40 : 28;           // larger sway on desktop
  const driftX = Math.sin(fgDriftT) * amplitude;
  if(fgImg) fgImg.style.transform = `translateX(${driftX}px)`;
  requestAnimationFrame(driveFgDrift);
})();

function driveHero(){
  lerped += (raw - lerped) * 0.12; // snappy lerp — parallax clearly visible
  const p  = lerped;
  const mx = isTouch ? 0 : mouseX;

  /* Layer 1: Background — parallax upward as you scroll */
  if(bgImg) bgImg.style.transform = `translateY(${p * -12}%)`;

  /* Layer 3: Subject houseboat — zoom from scale 1→1.50 from bottom */
  if(subjectEl){
    const scale = 1.0 + p * 0.50;
    subjectEl.style.transform =
      `translateX(calc(-50% + ${mx * -3}px)) scale(${scale}) perspective(1400px) rotateY(${mx * 4}deg)`;
  }

  /* Hero copy — fades on scroll. Mobile: top-anchored, no drift. Desktop: floats up. */
  if(heroCopy){
    const op = p < 0.15 ? 1 : Math.max(0, 1 - (p - 0.15) / 0.22);
    heroCopy.style.opacity   = String(op);
    heroCopy.style.transform = window.innerWidth > 767 ? `translateY(${p * -20}px)` : '';
  }

  if(scrollNudge) scrollNudge.style.opacity = String(Math.max(0, 1 - p / 0.18));

  if(heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
  else rafH = null;
}

window.addEventListener('scroll', ()=>{
  raw = getHeroProgress();
  if(!rafH && heroWrap && window.scrollY < heroWrap.offsetHeight)
    rafH = requestAnimationFrame(driveHero);
}, {passive:true});

if(!isTouch && heroPin){
  heroPin.addEventListener('mousemove', e=>{
    mouseX = e.clientX / window.innerWidth  - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
    if(!rafH) rafH = requestAnimationFrame(driveHero);
  });
  heroPin.addEventListener('mouseleave', ()=>{
    mouseX = 0; mouseY = 0;
    if(!rafH) rafH = requestAnimationFrame(driveHero);
  });
}

/* ─── BOAT BRIDGE LINE DRAW ─────────────────────── */
(function initBoatLine(){
  const bridge=document.getElementById('urnBridge');
  const lineEl=document.getElementById('urnBridgeLine');
  if(!bridge||!lineEl) return;
  const io=new IntersectionObserver(([e])=>{
    if(e.isIntersecting){setTimeout(()=>bridge.classList.add('line-drawn'),400);io.disconnect();}
  },{threshold:0.3});
  io.observe(bridge);
})();

/* ─── WHITE JASMINE PETAL RAIN ──────────────────── */
class Petals{
  constructor(id,opts={}){
    this.el=document.getElementById(id);
    this.max=opts.max||6;
    this.rate=opts.rate||1600;
    this.src='assets/elements/Element 2.png';
    this.active=false;this.pool=new Set();this._iv=null;
  }
  spawn(){
    if(!this.el) return;
    if(this.pool.size>=this.max){const f=this.pool.values().next().value;f?.remove();this.pool.delete(f);}
    if(this.pool.size>=this.max) return;
    const sz=38+Math.random()*32;
    const x=5+Math.random()*90;
    const dur=8+Math.random()*8;
    const drift=(Math.random()-0.5)*130;
    const wrap=document.createElement('div');
    wrap.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;
    const img=document.createElement('img');
    img.src=this.src;
    // White jasmine — gentle gold glow
    img.style.cssText='width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.65;filter:drop-shadow(0 0 6px rgba(200,168,48,.35))';
    wrap.appendChild(img);
    const anim=wrap.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(6vh) translateX(${drift*.2}px) rotate(60deg)`,opacity:.58,offset:.07},
      {transform:`translateY(82vh) translateX(${drift}px) rotate(320deg)`,opacity:.38,offset:.88},
      {transform:`translateY(110vh) translateX(${drift}px) rotate(380deg)`,opacity:0},
    ],{duration:dur*1000,easing:'linear',fill:'forwards'});
    anim.onfinish=()=>{wrap.remove();this.pool.delete(wrap);};
    this.el.appendChild(wrap);this.pool.add(wrap);
  }
  start(){if(this.active||!this.el)return;this.active=true;const rate=isTouch?this.rate*2:this.rate;this._iv=setInterval(()=>{if(this.active)this.spawn();},rate);this.spawn();}
  stop(){this.active=false;clearInterval(this._iv);}
}
const PS={
  hero:  new Petals('petalHero',  {max:isTouch?3:6,  rate:1600}),
  invite:new Petals('petalInvite',{max:isTouch?1:3,  rate:3000}),
  events:new Petals('petalEvents',{max:isTouch?2:4,  rate:3500}),
  things:new Petals('petalThings',{max:isTouch?1:2,  rate:4500}),
  rsvp:  new Petals('petalRsvp',  {max:isTouch?1:3,  rate:2800}),
};
const sIO=new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>{
    const id=target.id;
    const sys=id==='heroWrap'?PS.hero:PS[id];
    if(sys)isIntersecting?sys.start():sys.stop();
  });
},{threshold:0.08});
['heroWrap','invite','events','things','rsvp'].forEach(id=>{const el=document.getElementById(id);if(el)sIO.observe(el);});

/* ─── SCROLL REVEAL ─────────────────────────────── */
const rIO=new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>{
    if(isIntersecting){target.classList.add('vis');rIO.unobserve(target);}
  });
},{threshold:0.08});
document.querySelectorAll('.scroll-in').forEach(el=>rIO.observe(el));
const inviteCard=document.querySelector('.invite-card');
if(inviteCard)rIO.observe(inviteCard);

/* ─── 12 KASAVU UNDERLINE ──────────────────────── */
(function initKasavuLines(){
  const wraps=document.querySelectorAll('.sh-line-wrap');
  if(!wraps.length) return;
  const lineIO=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(isIntersecting){setTimeout(()=>target.classList.add('drawn'),460);lineIO.unobserve(target);}
    });
  },{threshold:0.5});
  wraps.forEach(w=>lineIO.observe(w));
})();

/* ─── EVENTS JOURNEY LINE ──────────────────────── */
(function initEventsJourney(){
  if(window.matchMedia('(min-width:681px)').matches) return;
  const section=document.getElementById('events');
  const stage=document.getElementById('evStage');
  const svgEl=document.getElementById('evJourneySvg');
  const trackEl=document.getElementById('ejTrack');
  const drawnEl=document.getElementById('ejDrawn');
  if(!section||!stage||!svgEl||!trackEl||!drawnEl) return;
  function getNodeCentres(){
    const nodes=Array.from(stage.querySelectorAll('.ev-node'));
    const sr=section.getBoundingClientRect();
    return nodes.map(n=>{const iw=n.querySelector('.ev-icon-wrap');const r=(iw||n).getBoundingClientRect();return{x:r.left+r.width/2-sr.left,y:r.top+r.height/2-sr.top};});
  }
  function buildPath(pts){
    if(pts.length<2)return'';
    let d=`M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for(let i=0;i<pts.length-1;i++){
      const a=pts[i],b=pts[i+1];
      const mx=((a.x+b.x)/2).toFixed(1);
      const wave=(i%2===0?1:-1)*Math.min(54,Math.abs(b.x-a.x)*.26);
      const cy=((a.y+b.y)/2-24).toFixed(1);
      d+=` Q ${(+mx+wave).toFixed(1)} ${cy}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }
  function layout(){
    const w=section.offsetWidth,h=section.offsetHeight;
    svgEl.setAttribute('width',w);svgEl.setAttribute('height',h);svgEl.setAttribute('viewBox',`0 0 ${w} ${h}`);
    requestAnimationFrame(()=>{
      const pts=getNodeCentres();const d=buildPath(pts);
      trackEl.setAttribute('d',d);drawnEl.setAttribute('d',d);
      if(drawnEl.getTotalLength){const t=drawnEl.getTotalLength();drawnEl.style.strokeDasharray=t;drawnEl.style.strokeDashoffset=t;drawnEl._total=t;}
      onScroll();
    });
  }
  function onScroll(){
    if(!drawnEl._total)return;
    const rect=section.getBoundingClientRect();
    const winH=window.innerHeight;
    const secH=section.offsetHeight;
    const scrolled=winH-rect.top;
    const total=secH+winH;
    const p=Math.min(1,Math.max(0,scrolled/total));
    drawnEl.style.strokeDashoffset=drawnEl._total*(1-p);
  }
  window._evJourneyLayout=layout;
  window.addEventListener('load',layout);
  window.addEventListener('scroll',onScroll,{passive:true});
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(layout,180);});
  const visIO=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){layout();visIO.disconnect();}
  },{threshold:0.01});
  visIO.observe(section);;
})();

/* ─── EVENTS AUTO OPEN ──────────────────────────── */
function initEventsAutoOpen(){
  const nodes=Array.from(document.querySelectorAll('.ev-node'));
  if(!nodes.length) return;
  const revealed=new Set();
  function check(){
    const tl=window.innerHeight*.60;
    nodes.forEach(n=>{
      if(revealed.has(n))return;
      const r=n.getBoundingClientRect();
      if(r.top+r.height/2<tl){revealed.add(n);requestAnimationFrame(()=>n.classList.add('ev-active'));}
    });
  }
  window.addEventListener('scroll',check,{passive:true});
  window.addEventListener('load',check);
  check();
}
initEventsAutoOpen();

/* ─── CARD TILT — 3D mouse+touch tilt on event/gallery cards ─── */
function initCardTilt(){
  function attachMouseTilt(el){
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(900px) rotateX(${(-y*10).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) scale(1.025)`;
    });
    el.addEventListener('mouseleave',()=>{el.style.transform='';});
  }
  function attachTouchTilt(el){
    el.addEventListener('touchmove',e=>{
      const t=e.touches[0];
      const r=el.getBoundingClientRect();
      const x=(t.clientX-r.left)/r.width-.5;
      const y=(t.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg) scale(1.015)`;
    },{passive:true});
    el.addEventListener('touchend',()=>{el.style.transform='';});
  }
  document.querySelectorAll('.ev-node,.gal-item').forEach(el=>{
    if(isTouch){attachTouchTilt(el);}else{attachMouseTilt(el);}
  });
}
const _origInitEventsAutoOpen=window.initEventsAutoOpen;
window.initEventsAutoOpen=function(){
  if(_origInitEventsAutoOpen)_origInitEventsAutoOpen();
  initCardTilt();
};
initCardTilt();

/* ─── 08 ICON MAGNETIC ─────────────────────────── */
(function initIconMagnetic(){
  if(isTouch) return;
  document.querySelectorAll('.ev-node').forEach(node=>{
    const wrap=node.querySelector('.ev-icon-wrap');
    if(!wrap) return;
    node.addEventListener('mousemove',e=>{
      const r=node.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/r.width*10;
      const dy=(e.clientY-r.top-r.height/2)/r.height*8;
      wrap.style.transform=`translate(${dx}px,${dy}px) scale(1.06)`;
      wrap.style.animationPlayState='paused';
    });
    node.addEventListener('mouseleave',()=>{
      wrap.style.transform='';
      wrap.style.animationPlayState='';
    });
  });
})();

/* ─── HERO COUNTDOWN ────────────────────────────── */
(function initCountdown(){
  const el=document.getElementById('heroCountdown');
  if(!el) return;
  function getTarget(){
    if(typeof WEDDING_CONFIG!=='undefined'&&WEDDING_CONFIG.couple&&WEDDING_CONFIG.couple.date){
      const d=new Date(WEDDING_CONFIG.couple.date+'T00:00:00');
      if(!isNaN(d))return d;
    }
    return new Date('2026-12-12T00:00:00');
  }
  function tick(){
    const now=new Date();const target=getTarget();
    const diff=target-now;
    if(diff<=0){el.textContent="We're Married \u2665";return;}
    const days=Math.floor(diff/86400000);
    const hrs=Math.floor((diff%86400000)/3600000);
    const mins=Math.floor((diff%3600000)/60000);
    const secs=Math.floor((diff%60000)/1000);
    el.textContent=`${days}d ${hrs}h ${mins}m ${secs}s`;
    setTimeout(tick,1000);
  }
  tick();
})();

/* ─── CURTAIN REVEAL ─────────────────────────────── */
(function initCurtainReveal(){
  const section=document.getElementById('story');
  const stage=document.getElementById('stStage');
  const bride=document.getElementById('stBride');
  const groom=document.getElementById('stGroom');
  const curtL=document.getElementById('stCurtL');
  const curtR=document.getElementById('stCurtR');
  const reveal=document.getElementById('stReveal');
  const petalsEl=document.getElementById('stPetals');
  if(!section||!stage||!bride||!curtL||!curtR) return;
  let seqDone=false,openEnabled=false,revealed=false,lastP=0;

  function spawnPetal(){
    if(!petalsEl) return;
    const sz=4+Math.random()*8;
    const x=10+Math.random()*80;
    const dur=6000+Math.random()*5000;
    const dx=(Math.random()-0.5)*80;
    // White jasmine + kasavu gold + jade green — Kerala palette
    const COLS=[
      'rgba(250,250,245,.35)','rgba(200,168,48,.28)',
      'rgba(74,138,106,.22)','rgba(244,237,208,.42)'
    ];
    const col=COLS[Math.floor(Math.random()*COLS.length)];
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(4vh) translateX(${dx*.08}px) rotate(30deg)`,opacity:.88,offset:.05},
      {transform:`translateY(56vh) translateX(${dx*.88}px) rotate(220deg)`,opacity:.38,offset:.87},
      {transform:`translateY(88vh) translateX(${dx}px) rotate(340deg)`,opacity:0},
    ],{duration:dur,easing:'linear',fill:'forwards'}).onfinish=()=>el.remove();
  }

  function runSequence(){
    if(seqDone) return;
    seqDone=true;
    bride.classList.add('st-pull');groom.classList.add('st-pull');
    setTimeout(()=>{
      bride.classList.remove('st-pull');groom.classList.remove('st-pull');
      bride.classList.add('st-tension');groom.classList.add('st-tension');
    },735);
    setTimeout(()=>{
      bride.classList.remove('st-tension');groom.classList.remove('st-tension');
      openEnabled=true;applyProgress(getCurtainProgress());
    },1255);
  }

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    const r=section.getBoundingClientRect();
    const start=window.innerHeight*.55;
    const range=window.innerHeight*.95; // slowest curtain open in library
    return Math.min(1,Math.max(0,(start-r.top)/range));
  }

  function applyProgress(p){
    if(Math.abs(p-lastP)<0.002) return;
    lastP=p;
    const eased=p<1?1-Math.pow(1-p,3.2):1;
    const shadowBlur=4+eased*28;const shadowOpacity=(eased*.18).toFixed(3);
    curtL.style.transform=`translateX(-${(eased*100).toFixed(2)}%)`;
    curtL.style.filter=`drop-shadow(${(eased*8).toFixed(1)}px 0 ${shadowBlur.toFixed(0)}px rgba(14,34,24,${shadowOpacity}))`;
    curtR.style.transform=`translateX(${(eased*100).toFixed(2)}%)`;
    curtR.style.filter=`drop-shadow(-${(eased*8).toFixed(1)}px 0 ${shadowBlur.toFixed(0)}px rgba(14,34,24,${shadowOpacity}))`;
    const drift=eased*24;const sc=1-eased*.030;
    bride.style.transform=`translateX(-${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    groom.style.transform=`translateX(${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    if(eased>=0.65&&!revealed){
      revealed=true;reveal.classList.add('revealed');
      // More jasmine flowers on curtain reveal
      let n=0;
      const iv=setInterval(()=>{spawnPetal();if(++n>=24)clearInterval(iv);},160);
    }
  }
  window.addEventListener('scroll',()=>applyProgress(getCurtainProgress()),{passive:true});
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&entries[0].intersectionRatio>=0.20){runSequence();io.disconnect();}
  },{threshold:[0.20]});
  io.observe(section);
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(()=>applyProgress(getCurtainProgress()),150);});
})();

/* ─── 11 JASMINE BURST — white flower explosion ── */
function burstPetals(fromEl){
  const r=fromEl.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;
  const src='assets/elements/Element 2.png';
  for(let i=0;i<22;i++){
    const el=document.createElement('div');
    el.className='burst-p';
    const sz=12+Math.random()*16;
    const ang=(i/22)*360+Math.random()*16;
    const dst=68+Math.random()*88;
    const tx=Math.cos(ang*Math.PI/180)*dst;
    const ty=Math.sin(ang*Math.PI/180)*dst;
    el.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img=document.createElement('img');
    img.src=src;
    img.style.cssText='width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.72';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      {transform:'translate(-50%,-50%) scale(.2) rotate(0deg)',opacity:.8},
      {transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(1.1) rotate(${Math.random()*360}deg)`,opacity:.65,offset:.44},
      {transform:`translate(calc(-50% + ${tx*1.55}px),calc(-50% + ${ty*1.55+55}px)) scale(.2) rotate(${Math.random()*550}deg)`,opacity:0},
    ],{duration:1050+Math.random()*380,easing:'ease-out',fill:'forwards'})
    .onfinish=()=>el.remove();
  }
}
(function initRsvpBtn(){
  const btn=document.getElementById('rsvpWaBtn');
  if(!btn) return;
  btn.addEventListener('click',()=>burstPetals(btn));
})();
/* ═══════════════════════════════════════════════════════════
   LAMP LIGHTING CEREMONY — nilavilakku scroll animation
   Scroll-triggered: centre lamp → left lamp → right lamp
   Background warms as lamps ignite one by one.
═══════════════════════════════════════════════════════════ */
(function initLampCeremony() {
  const stage    = document.getElementById('lampStage');
  if (!stage) return;

  const lamps    = Array.from(stage.querySelectorAll('.ls-lamp'));
  const bgGlowL  = document.getElementById('lsBgGlowL');
  const bgGlowC  = document.getElementById('lsBgGlowC');
  const bgGlowR  = document.getElementById('lsBgGlowR');
  const canvas   = document.getElementById('lsSparks');

  // Order: centre(index 1) → left(0) → right(2)
  const LIGHT_ORDER   = [1, 0, 2];
  const LIGHT_GLOWS   = [bgGlowC, bgGlowL, bgGlowR];
  // Progress thresholds (0–1) at which each lamp lights
  // Spread wider so user must scroll deeper to see each lamp ignite
  const LIGHT_AT      = [0.30, 0.45, 0.60];

  let litCount = 0;
  const lampLit = [false, false, false];

  /* ─── Canvas spark system ─── */
  let ctx, W, H, sparks = [];

  function resizeCanvas() {
    if (!canvas) return;
    W = canvas.width  = stage.offsetWidth;
    H = canvas.height = stage.offsetHeight;
    ctx = canvas.getContext('2d');
  }

  function spawnSparks(lampEl, count) {
    if (!canvas || !ctx) return;
    const rect  = lampEl.getBoundingClientRect();
    const sRect = stage.getBoundingClientRect();
    // flame centre — top-centre of the lamp image
    const cx = rect.left - sRect.left + rect.width  * 0.50;
    const cy = rect.top  - sRect.top  + rect.height * 0.10;

    for (let i = 0; i < count; i++) {
      const angle  = (-Math.PI * 0.75) + (Math.random() * Math.PI * 0.5);
      const speed  = 1.0 + Math.random() * 2.4;
      sparks.push({
        x: cx,  y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        life: 1.0,
        decay: 0.012 + Math.random() * 0.018,
        size:  1.2  + Math.random() * 2.2,
        hue:   30   + Math.random() * 24   // warm gold range
      });
    }
  }

  function tickSparks() {
    if (!ctx || sparks.length === 0) { requestAnimationFrame(tickSparks); return; }
    ctx.clearRect(0, 0, W, H);
    sparks = sparks.filter(s => s.life > 0.02);
    sparks.forEach(s => {
      s.x   += s.vx;
      s.y   += s.vy;
      s.vy  += 0.055;   // gravity
      s.vx  *= 0.985;   // air drag
      s.life -= s.decay;
      const a = Math.min(1, s.life * 2);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},100%,72%,${a})`;
      ctx.shadowColor = `hsla(${s.hue},100%,80%,${a * 0.6})`;
      ctx.shadowBlur  = 6;
      ctx.fill();
    });
    requestAnimationFrame(tickSparks);
  }

  /* ─── Light a specific lamp ─── */
  function lightLamp(orderIdx) {
    const lampIdx = LIGHT_ORDER[orderIdx];
    if (lampLit[lampIdx]) return;
    lampLit[lampIdx] = true;
    litCount++;

    const lamp  = lamps[lampIdx];
    const glow  = LIGHT_GLOWS[orderIdx];

    // Mark lamp as lit
    lamp.classList.add('is-lit');

    // Reveal ambient glow
    if (glow) glow.classList.add('lit');

    // Spawn sparks burst on ignition
    spawnSparks(lamp, 38 + orderIdx * 10);

    // Warm the stage background progressively
    if (litCount === 1) stage.classList.add('stage-lit');
    if (litCount === 2) stage.classList.add('stage-warm');
    if (litCount === 3) stage.style.background = '#1f3018'; // fully warm
  }

  /* ─── Scroll progress calculation ─── */
  function getStageProgress() {
    const rect = stage.getBoundingClientRect();
    const vh   = window.innerHeight;
    // Extended range: starts when stage enters viewport bottom, ends well past centre
    // Multiplying total by 1.6 stretches the trigger window = slower lamp ignition
    const total  = vh * 1.40;
    const fromTop = vh - rect.top;
    return Math.min(1, Math.max(0, fromTop / total));
  }

  /* ─── Main scroll handler ─── */
  function onScroll() {
    const p = getStageProgress();

    // Make lamps visible once stage enters viewport meaningfully
    if (p > 0.10) {
      lamps.forEach(l => l.classList.add('lamp-visible'));
      stage.querySelector('#lsMantra') && (stage.querySelector('.ls-mantra').style.display = 'block');
    }

    // Light lamps at progressive thresholds
    LIGHT_AT.forEach((threshold, i) => {
      if (p >= threshold) lightLamp(i);
    });
  }

  /* ─── Init ─── */
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', onScroll,  { passive: true });
  requestAnimationFrame(tickSparks);

  // Run once on load in case already in view
  onScroll();

})();