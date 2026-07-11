'use strict';
/* ═══════════════════════════════════════════════════
   TEMPLATE 07 — PUNJABI VIBRANT BLOCKBUSTER — script.js
   (Updated with master changes)
═══════════════════════════════════════════════════ */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─── 01 BHANGRA CURSOR — contextual bloom (#6) ── */
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
  /* Lerp slowed 0.12→0.082 for buttery lag (#6) */
  let cRafId=null;
  function cursorLoop(){
    rx+=(dx-rx)*.082;ry+=(dy-ry)*.082;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    cRafId=requestAnimationFrame(cursorLoop);
  }
  document.addEventListener('mousemove',()=>{if(!cRafId)cRafId=requestAnimationFrame(cursorLoop);},{once:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&cRafId){cancelAnimationFrame(cRafId);cRafId=null;}
    else if(!document.hidden&&hasMoved&&!cRafId){cRafId=requestAnimationFrame(cursorLoop);}
  });
  /* Gold bloom on interactive, rose otherwise (#6) */
  document.querySelectorAll('a,button,.rsvp-wa-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      document.body.classList.add('ch-interactive');
      document.body.classList.remove('ch');
    });
    el.addEventListener('mouseleave',()=>{
      document.body.classList.remove('ch-interactive');
    });
  });
  document.querySelectorAll('.ev-node,.tt,.gal-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
})();

/* ─── 02 SAFFRON PRELOADER — mandala trace (#1) ── */
function revealHero(){
  document.body.classList.remove('pl-active');
  const bgLayer   = document.querySelector('.hero-bg-layer');
  const subjectLayer = document.querySelector('.hero-subject-layer');
  const fgLayer   = document.querySelector('.hero-fg-layer');
  const copy      = document.getElementById('heroCopy');
  if(bgLayer)      { bgLayer.classList.add('in'); }
  if(subjectLayer) { subjectLayer.classList.add('in'); }
  if(fgLayer)      { setTimeout(()=>fgLayer.classList.add('in'), 180); }
  if(copy)         { copy.classList.add('in'); }
  /* Position temple immediately at p=0 so it never shows at wrong spot */
  requestAnimationFrame(driveHero);
}
function runPreloader(){
  const pl=document.getElementById('preloader');
  if(!pl){revealHero();return;}
  setTimeout(()=>pl.classList.add('li'), 320);
  setTimeout(()=>pl.classList.add('ni'), 780);
  setTimeout(()=>{
    pl.classList.add('away');
    setTimeout(()=>{pl.style.display='none';revealHero();},720);
  },1800);
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

/* ─── COUNTDOWN TIMER (#5) ─────────────────────── */
(function initCountdown(){
  const dEl=document.getElementById('cdDays'),
        hEl=document.getElementById('cdHrs'),
        mEl=document.getElementById('cdMin'),
        sEl=document.getElementById('cdSec');
  if(!dEl) return;
  /* Use WEDDING_CONFIG date if available, else 12 Dec 2026 */
  const targetDateStr=(typeof WEDDING_CONFIG!=='undefined'&&WEDDING_CONFIG.couple&&WEDDING_CONFIG.couple.date)
    ? WEDDING_CONFIG.couple.date : '2026-12-12';
  const target=new Date(targetDateStr+'T00:00:00');
  function tick(){
    const diff=target-Date.now();
    if(diff<=0){
      dEl.textContent=hEl.textContent=mEl.textContent=sEl.textContent='';
      const wrap=dEl.closest('#heroCountdown')||dEl.parentElement;
      if(wrap){wrap.innerHTML='<span style="font-size:clamp(.8rem,2vw,1.1rem);letter-spacing:.08em">We\'re Married \u2665</span>';}
      return;
    }
    const totalSec=Math.floor(diff/1000);
    const d=Math.floor(totalSec/86400);
    const h=Math.floor((totalSec%86400)/3600);
    const m=Math.floor((totalSec%3600)/60);
    const s=totalSec%60;
    dEl.textContent=String(d).padStart(2,'0');
    hEl.textContent=String(h).padStart(2,'0');
    mEl.textContent=String(m).padStart(2,'0');
    sEl.textContent=String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick,1000);
})();

/* ─── 04 MARIGOLD DRIFT ────────────────────────── */
(function initMarigoldDrift(){
  const container=document.getElementById('heroParticles');
  if(!container) return;
  /* Halved on mobile (#29) */
  const COUNT=isTouch?10:24;
  const colours=['#C81060','#E84010','#F0A800','#F5E8C0','#8C2080','#FAD0A0'];
  for(let i=0;i<COUNT;i++){
    const p=document.createElement('div');
    p.className='hp';
    const x=3+Math.random()*94;
    const dur=8+Math.random()*16;
    const del=Math.random()*-22;
    const dx=(Math.random()-0.5)*60;
    const col=colours[Math.floor(Math.random()*colours.length)];
    const size=Math.random()<0.25?3.5:(Math.random()<0.55?2.5:1.8);
    p.style.cssText=`left:${x}%;--dur:${dur}s;--del:${del}s;--dx:${dx}px;width:${size}px;height:${size}px;background:${col};border-radius:50%;opacity:0`;
    container.appendChild(p);
  }
})();

/* ─── 03 THREE-LAYER PARALLAX + MOUSE TILT ────────── */
const heroWrap=document.getElementById('heroWrap');
const heroPin=document.getElementById('heroPin');
const heroCopy=document.getElementById('heroCopy');
const scrollNudge=document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});
/* New layer refs */
const bgImgEl      = document.querySelector('.hero-bg-img');
const subjectImgEl = document.getElementById('l3');   /* Golden Temple */
const fgImgEl      = document.getElementById('l4');   /* foreground paper-cut */
let raw=0,lerped=0,mouseX=0,mouseY=0,rafH=null;

function getHeroProgress(){
  if(!heroWrap) return 0;
  const top=heroWrap.getBoundingClientRect().top+window.scrollY;
  const travel=heroWrap.offsetHeight-window.innerHeight;
  return Math.min(1,Math.max(0,(window.scrollY-top)/travel));
}

function driveHero(){
  lerped+=(raw-lerped)*0.12;  /* snappy lerp — same as T06, parallax clearly visible */
  const p=lerped;
  const mx=isTouch?0:mouseX;
  const my=isTouch?0:mouseY;

  /* LAYER 1 — Background: slow upward drift + subtle mouse pan */
  if(bgImgEl){
    bgImgEl.style.transform=`translateY(${(p*-12).toFixed(2)}%)`;
  }

  /* LAYER 2 — Golden Temple: grows upward from waterline, stays centred on scroll.
     
     MOBILE asset (< 768px):
       - Temple horizontal centre: ~62% of canvas width
       - cy = vh*0.30 (original top-anchor, proven working)
     
     DESKTOP asset (≥ 768px) — new asset analysis:
       - Temple horizontal centre: ~48% of canvas width (nearly centred)
       - Temple base sits at ~58% of canvas height
       - We want the temple to appear BELOW the countdown text (~top 38% of vh)
       - So waterline target = vh*0.72 (bottom of visible water area)
       - cy = waterline - imgH*templeBaseY places base exactly at waterline
       - Temple is 1.5× size (set via CSS: 78vw/840px vs 80vw/560px)
     
     transform-origin at templeX% bottom: scale grows straight upward. */
  if(subjectImgEl){
    const scale        = 1.0 + p * 0.55;
    const vw           = window.innerWidth;
    const vh           = window.innerHeight;
    const imgW         = subjectImgEl.offsetWidth;
    const imgH         = subjectImgEl.offsetHeight;
    const isDesktop    = vw >= 768;

    const templeX      = isDesktop ? 0.58 : 0.62;   /* temple horiz centre in canvas */
    const templeBaseY  = isDesktop ? 0.58 : 1.0;    /* temple base as fraction of imgH */
    const waterlineVH  = isDesktop ? 0.83 : 0.30;   /* target: desktop=waterline at 72vh; mobile=top anchor */

    const cx = vw / 2 - imgW * templeX;
    /* Desktop: anchor temple BASE to waterline. Mobile: top-anchor (original). */
    const cy = isDesktop
      ? (vh * waterlineVH - imgH * templeBaseY)
      : (vh * waterlineVH);

    subjectImgEl.style.transformOrigin = `${(templeX * 100).toFixed(0)}% bottom`;
    subjectImgEl.style.transform =
      `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) scale(${scale.toFixed(4)})`;

    const glowAlpha = (0.22 + p * 0.34).toFixed(2);
    const shadowB   = (56 + p * 44).toFixed(0);
    subjectImgEl.style.filter =
      `drop-shadow(0 20px ${shadowB}px rgba(240,168,0,${glowAlpha})) drop-shadow(0 6px 22px rgba(26,14,8,0.30))`;
  }

  /* LAYER 3 — Foreground: fixed, micro mouse-parallax only */
  if(fgImgEl){
    const fgTX = isTouch ? 0 : mx * -12;
    fgImgEl.style.transform = fgTX ? `translateX(${fgTX.toFixed(2)}px)` : '';
  }

  /* Names: fully visible at p=0, fade out between p=0.15→0.38, then gone */
  if(heroCopy){
    const op = p < 0.15 ? 1 : Math.max(0, 1 - (p - 0.15) / 0.23);
    heroCopy.style.opacity = String(op);
    /* Desktop: subtle upward float as names dissolve */
    if(window.innerWidth > 600){
      heroCopy.style.transform = `translateY(${(p * -18).toFixed(1)}px)`;
    }
  }
  if(scrollNudge) scrollNudge.style.opacity=String(Math.max(0,1-p/0.18));

  if(heroWrap&&window.scrollY<heroWrap.offsetHeight)rafH=requestAnimationFrame(driveHero);
  else rafH=null;
}
window.addEventListener('scroll',()=>{
  raw=getHeroProgress();
  if(!rafH&&heroWrap&&window.scrollY<heroWrap.offsetHeight)rafH=requestAnimationFrame(driveHero);
},{passive:true});
if(!isTouch&&heroPin){
  heroPin.addEventListener('mousemove',e=>{
    mouseX=e.clientX/window.innerWidth-0.5;
    mouseY=e.clientY/window.innerHeight-0.5;
    if(!rafH)rafH=requestAnimationFrame(driveHero);
  });
  heroPin.addEventListener('mouseleave',()=>{mouseX=0;mouseY=0;if(!rafH)rafH=requestAnimationFrame(driveHero);});
}

/* ─── SWAN RIVER BRIDGE ────────────────────────────────────────────────────
   Pure CSS animation drives the swans (swbSwimA / swbSwimB keyframes).
   This JS block only handles:
     1. Pausing animations when section is scrolled out of view (saves GPU)
     2. Resuming when it comes back into view
   No rAF loop needed — the swim is handled entirely by CSS.
────────────────────────────────────────────────────────────────────────── */
(function initSwanBridge(){
  const bridge = document.getElementById('swanBridge');
  const swanA  = document.getElementById('swbSwanA');
  const swanB  = document.getElementById('swbSwanB');
  if(!bridge) return;

  /* Pause all animated children when scrolled away — saves CPU/GPU */
  function setPaused(paused){
    const state = paused ? 'paused' : 'running';
    bridge.querySelectorAll(
      '.swb-wave--1,.swb-wave--2,.swb-wave--3,' +
      '.swb-swan--a,.swb-swan--b,' +
      '.swb-ripple,.swb-sh,.swb-swan-wake,' +
      '.swb-birds-1,.swb-birds-2,.swb-mote'
    ).forEach(el => { el.style.animationPlayState = state; });
  }

  const io = new IntersectionObserver(([e]) => {
    setPaused(!e.isIntersecting);
  }, { threshold: 0.05 });

  io.observe(bridge);
})();

/* ─── MARIGOLD PETAL RAIN — wider organic drift (#12) ── */
class Petals{
  constructor(id,opts={}){
    this.el=document.getElementById(id);
    this.max=opts.max||10;
    this.rate=opts.rate||900;
    this.src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40"><ellipse cx="10" cy="20" rx="8" ry="18" fill="%23F0A800" opacity="0.8"/></svg>';
    this.active=false;this.pool=new Set();this._iv=null;
  }
  spawn(){
    if(!this.el) return;
    if(this.pool.size>=this.max){const f=this.pool.values().next().value;f?.remove();this.pool.delete(f);}
    if(this.pool.size>=this.max) return;
    const sz=44+Math.random()*38;
    const x=5+Math.random()*90;
    const dur=6+Math.random()*7;
    /* Drift range increased 55→130px (#12) */
    const drift=(Math.random()-0.5)*130;
    const turns=1+Math.floor(Math.random()*2);
    const wrap=document.createElement('div');
    wrap.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;
    const img=document.createElement('img');
    img.src=this.src;
    img.style.cssText=[
      'width:100%;height:100%;object-fit:contain',
      'mix-blend-mode:multiply',
      'opacity:0.70',
      'filter:drop-shadow(0 0 12px rgba(240,128,0,.60))'
    ].join(';');
    wrap.appendChild(img);
    const anim=wrap.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(5vh) translateX(${drift*.2}px) rotate(${turns*55}deg)`,opacity:.62,offset:.06},
      {transform:`translateY(80vh) translateX(${drift}px) rotate(${turns*240}deg)`,opacity:.42,offset:.88},
      {transform:`translateY(110vh) translateX(${drift}px) rotate(${turns*290}deg)`,opacity:0},
    ],{duration:dur*1000,easing:'linear',fill:'forwards'});
    anim.onfinish=()=>{wrap.remove();this.pool.delete(wrap);};
    this.el.appendChild(wrap);this.pool.add(wrap);
  }
  start(){if(this.active||!this.el)return;this.active=true;const rate=isTouch?this.rate*2:this.rate;this._iv=setInterval(()=>{if(this.active)this.spawn();},rate);this.spawn();}
  stop(){this.active=false;clearInterval(this._iv);}
}

/* Halved counts on mobile (#29) */
const PS={
  hero:  new Petals('petalHero',  {max:isTouch?5:10,  rate:isTouch?1800:900}),
  invite:new Petals('petalInvite',{max:isTouch?3:6,   rate:isTouch?4000:2000}),
  events:new Petals('petalEvents',{max:isTouch?3:7,   rate:isTouch?4800:2400}),
  things:new Petals('petalThings',{max:isTouch?2:4,   rate:isTouch?5600:2800}),
  rsvp:  new Petals('petalRsvp',  {max:isTouch?3:6,   rate:isTouch?3600:1800}),
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

/* ─── 12 PHULKARI UNDERLINE ─────────────────────── */
(function initPhulkariLines(){
  const wraps=document.querySelectorAll('.sh-line-wrap');
  if(!wraps.length) return;
  const lineIO=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(isIntersecting){setTimeout(()=>target.classList.add('drawn'),440);lineIO.unobserve(target);}
    });
  },{threshold:0.5});
  wraps.forEach(w=>lineIO.observe(w));
})();

/* ─── EVENTS JOURNEY LINE — corrected scroll formula (#11) ── */
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
      const wave=(i%2===0?1:-1)*Math.min(56,Math.abs(b.x-a.x)*.26);
      const cy=((a.y+b.y)/2-24).toFixed(1);
      d+=` Q ${(+mx+wave).toFixed(1)} ${cy}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
  }
  let firstVisible=false;
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
    /* Corrected progress formula: scrolled/(secH+winH) (#11) */
    const secH=section.offsetHeight;
    const winH=window.innerHeight;
    const top=section.getBoundingClientRect().top+window.scrollY;
    const scrolled=window.scrollY+winH-top;
    const p=Math.min(1,Math.max(0,scrolled/(secH+winH)));
    drawnEl.style.strokeDashoffset=drawnEl._total*(1-p);
  }
  /* IntersectionObserver re-layout on first visibility (fixes content-visibility:auto conflict) (#11) */
  const visIO=new IntersectionObserver(([e])=>{
    if(e.isIntersecting&&!firstVisible){firstVisible=true;layout();visIO.disconnect();}
  },{threshold:0.01});
  visIO.observe(section);
  window._evJourneyLayout=layout;
  window.addEventListener('load',layout);
  window.addEventListener('scroll',onScroll,{passive:true});
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(layout,180);});
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

/* ─── 08 ICON MAGNETIC ─────────────────────────── */
(function initIconMagnetic(){
  if(isTouch) return;
  document.querySelectorAll('.ev-node').forEach(node=>{
    const wrap=node.querySelector('.ev-icon-wrap');
    if(!wrap) return;
    node.addEventListener('mousemove',e=>{
      const r=node.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/r.width*12;
      const dy=(e.clientY-r.top-r.height/2)/r.height*10;
      wrap.style.transform=`translate(${dx}px,${dy}px) scale(1.08)`;
      wrap.style.animationPlayState='paused';
    });
    node.addEventListener('mouseleave',()=>{
      wrap.style.transform='';
      wrap.style.animationPlayState='';
    });
  });
})();

/* ─── EVENT CARDS 3D TILT (#10) ─────────────────── */
(function initEventCardTilt(){
  const nodes=document.querySelectorAll('.ev-node');
  nodes.forEach(node=>{
    if(!isTouch){
      node.addEventListener('mousemove',e=>{
        const r=node.getBoundingClientRect();
        const rx=(e.clientY-r.top-r.height/2)/r.height*10;
        const ry=(e.clientX-r.left-r.width/2)/r.width*-12;
        node.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      node.addEventListener('mouseleave',()=>{
        node.style.transform='';
      });
    } else {
      node.addEventListener('touchmove',e=>{
        const t=e.touches[0];
        const r=node.getBoundingClientRect();
        const rx=(t.clientY-r.top-r.height/2)/r.height*8;
        const ry=(t.clientX-r.left-r.width/2)/r.width*-10;
        node.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      },{passive:true});
      node.addEventListener('touchend',()=>{node.style.transform='';});
    }
  });
})();

/* ─── CURTAIN REVEAL — easing 2.2→3.2 (#14) ─────── */
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
    const sz=5+Math.random()*9;
    const x=8+Math.random()*84;
    const dur=5000+Math.random()*4500;
    const dx=(Math.random()-0.5)*90;
    const COLS=[
      'rgba(200,16,96,.28)','rgba(232,64,16,.22)',
      'rgba(240,168,0,.25)','rgba(250,208,160,.38)',
      'rgba(140,32,128,.18)'
    ];
    const col=COLS[Math.floor(Math.random()*COLS.length)];
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 20% 50% 20%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(4vh) translateX(${dx*.08}px) rotate(35deg)`,opacity:1.0,offset:.05},
      {transform:`translateY(56vh) translateX(${dx*.88}px) rotate(240deg)`,opacity:.42,offset:.87},
      {transform:`translateY(88vh) translateX(${dx}px) rotate(360deg)`,opacity:0},
    ],{duration:dur,easing:'linear',fill:'forwards'}).onfinish=()=>el.remove();
  }

  function runSequence(){
    if(seqDone) return;
    seqDone=true;
    bride.classList.add('st-pull');groom.classList.add('st-pull');
    setTimeout(()=>{
      bride.classList.remove('st-pull');groom.classList.remove('st-pull');
      bride.classList.add('st-tension');groom.classList.add('st-tension');
    },720);
    setTimeout(()=>{
      bride.classList.remove('st-tension');groom.classList.remove('st-tension');
      openEnabled=true;applyProgress(getCurtainProgress());
    },1220);
  }

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    const r=section.getBoundingClientRect();
    const start=window.innerHeight*.54;
    const range=window.innerHeight*.82;
    return Math.min(1,Math.max(0,(start-r.top)/range));
  }

  function applyProgress(p){
    if(Math.abs(p-lastP)<0.002) return;
    lastP=p;
    /* Easing exponent 2.2→3.2 for more dramatic overshoot (#14) */
    const eased=p<1?1-Math.pow(1-p,3.2):1;
    curtL.style.transform=`translateX(-${(eased*100).toFixed(2)}%)`;
    curtR.style.transform=`translateX(${(eased*100).toFixed(2)}%)`;
    /* Drop-shadow grows on inner edges as curtains open (#14) */
    const shadowDepth=(eased*0.30).toFixed(3);
    curtL.querySelector('.st-curt-shadow').style.background=
      `linear-gradient(to right,transparent,rgba(26,14,8,${shadowDepth}))`;
    curtR.querySelector('.st-curt-shadow').style.background=
      `linear-gradient(to left,transparent,rgba(26,14,8,${shadowDepth}))`;
    const drift=eased*26;const sc=1-eased*.028;
    bride.style.transform=`translateX(-${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    groom.style.transform=`translateX(${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    if(eased>=0.62&&!revealed){
      revealed=true;reveal.classList.add('revealed');
      let n=0;
      const iv=setInterval(()=>{spawnPetal();if(++n>=32)clearInterval(iv);},100);
    }
  }
  window.addEventListener('scroll',()=>applyProgress(getCurtainProgress()),{passive:true});
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&entries[0].intersectionRatio>=0.20){runSequence();io.disconnect();}
  },{threshold:[0.20]});
  io.observe(section);
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(()=>applyProgress(getCurtainProgress()),150);});
})();

/* ─── GALLERY 3D TOUCH TILT (#16) ─────────────── */
(function initGalleryTilt(){
  document.querySelectorAll('.gal-item').forEach(item=>{
    if(!isTouch){
      item.addEventListener('mousemove',e=>{
        const r=item.getBoundingClientRect();
        const rx=(e.clientY-r.top-r.height/2)/r.height*8;
        const ry=(e.clientX-r.left-r.width/2)/r.width*-10;
        item.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      });
      item.addEventListener('mouseleave',()=>{item.style.transform='';});
    } else {
      item.addEventListener('touchmove',e=>{
        const t=e.touches[0];
        const r=item.getBoundingClientRect();
        const rx=(t.clientY-r.top-r.height/2)/r.height*6;
        const ry=(t.clientX-r.left-r.width/2)/r.width*-8;
        item.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      },{passive:true});
      item.addEventListener('touchend',()=>{item.style.transform='';});
    }
  });
})();

/* ─── 11 MARIGOLD BURST ─────────────────────────── */
function burstPetals(fromEl){
  const r=fromEl.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;
  const src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40"><ellipse cx="10" cy="20" rx="8" ry="18" fill="%23F0A800" opacity="0.8"/></svg>';
  for(let i=0;i<28;i++){
    const el=document.createElement('div');
    el.className='burst-p';
    const sz=14+Math.random()*18;
    const ang=(i/28)*360+Math.random()*14;
    const dst=80+Math.random()*110;
    const tx=Math.cos(ang*Math.PI/180)*dst;
    const ty=Math.sin(ang*Math.PI/180)*dst;
    el.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img=document.createElement('img');
    img.src=src;
    img.style.cssText='width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.75';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      {transform:'translate(-50%,-50%) scale(.2) rotate(0deg)',opacity:.85},
      {transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(1.15) rotate(${Math.random()*380}deg)`,opacity:.70,offset:.44},
      {transform:`translate(calc(-50% + ${tx*1.6}px),calc(-50% + ${ty*1.6+60}px)) scale(.2) rotate(${Math.random()*580}deg)`,opacity:0},
    ],{duration:1100+Math.random()*420,easing:'ease-out',fill:'forwards'})
    .onfinish=()=>el.remove();
  }
}
(function initRsvpBtn(){
  const btn=document.getElementById('rsvpWaBtn');
  if(!btn) return;
  btn.addEventListener('click',()=>burstPetals(btn));
})();