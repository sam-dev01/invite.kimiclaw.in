'use strict';
/* ═══════════════════════════════════════════════════════════════
   TEMPLATE 08 — NRI DESTINATION GRACE — script.js
   12 MICRO-INTERACTIONS:
   01 Silver Crosshair Cursor   02 Navy Preloader (slowest)
   03 Haveli Parallax (0.045)   04 Silver Mote Drift (upward)
   05 Arch Bridge Line Draw     06 Jali Toran Sway (CSS)
   07 Card Bloom (CSS shimmer)  08 Icon Magnetic (JS proximity)
   09 Gallery Shimmer (CSS)     10 Knowledge Bloom (CSS ◈)
   11 Lotus Petal Burst (12)    12 Jali Underline (SVG dashoffset)

   KEY T08 DIFFERENCES FROM T01-T07:
   — NO urnBridge / initUrnBridgeLine (CSS crossfade bridge only)
   — NO bride/groom characters (Taj silhouette revealed by curtain)
   — Cursor lerp: 0.085 (slower than T07's 0.12 — precision instrument)
   — Hero lerp: 0.045 (slowest in library — Mughal garden pace)
   — Petals: max 3/2/2/1/2 — minimum density (felt, not seen)
   — Petal opacity: 0.28 (lowest in library)
   — Curtain reveal: Taj silhouette fades in (not characters walking apart)
   — Burst: 12 petals only (most restrained RSVP burst in library)
   — Preloader: 2400ms (longest — editorial slow reveal)
════════════════════════════════════════════════════════════════ */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─── 01 SILVER CROSSHAIR CURSOR ──────────────────────────── */
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
  // T08: precision instrument lerp — slower even than T03
  (function loop(){
    rx+=(dx-rx)*.085;ry+=(dy-ry)*.085;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.ev-node,.tt,.gal-item,.rsvp-wa-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
})();

/* ─── 02 NAVY PRELOADER — longest, most stately in library ─── */
function revealHero(){
  document.body.classList.remove('pl-active');
  const arch=document.querySelector('.hl-palace');
  const couple=document.querySelector('.hl-couple');
  const copy=document.getElementById('heroCopy');
  if(arch)arch.classList.add('in');
  if(couple)couple.classList.add('in');
  if(copy)copy.classList.add('in');
  if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    var _autoScrolled=false;
    window.addEventListener('scroll',function(){_autoScrolled=true;},{once:true,passive:true});
    setTimeout(function(){
      if(_autoScrolled||window.scrollY>0)return;
      const hw=document.getElementById('heroWrap');
      if(!hw)return;
      window.scrollTo({top:Math.max(0,hw.offsetHeight-window.innerHeight*0.38),behavior:'smooth'});
    },2500);
  }
}
function runPreloader(){
  const pl=document.getElementById('preloader');
  if(!pl){revealHero();return;}
  // T08: slower reveal — 440ms line, 1000ms names, 2400ms fade
  setTimeout(()=>pl.classList.add('li'), 440);
  setTimeout(()=>pl.classList.add('ni'), 1000);
  setTimeout(()=>{
    pl.classList.add('away');
    setTimeout(()=>{pl.style.display='none';revealHero();},850);
  },2400);
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
},6500);

/* ─── 04 SILVER MOTE DRIFT — upward like dust off Mughal marble ─ */
(function initSilverMotes(){
  const container=document.getElementById('heroParticles');
  if(!container) return;
  const COUNT=isTouch?8:20;
  // T08: silver / champagne / dusty blue / warm white — no vivid colour ever
  const colours=['#C0B090','#D4C8A8','#E8E0D0','#6A80A0','#F8F5EE','#A09080'];
  for(let i=0;i<COUNT;i++){
    const p=document.createElement('div');
    p.className='hp';
    const x=3+Math.random()*94;
    const dur=12+Math.random()*18;  // T08: slowest particle drift in library
    const del=Math.random()*-28;
    const dx=(Math.random()-0.5)*40;  // tighter horizontal drift — architectural calm
    const col=colours[Math.floor(Math.random()*colours.length)];
    const size=Math.random()<0.25?2.5:(Math.random()<0.55?1.8:1.2);
    p.style.cssText=`left:${x}%;--dur:${dur}s;--del:${del}s;--dx:${dx}px;width:${size}px;height:${size}px;background:${col};border-radius:50%;opacity:0`;
    container.appendChild(p);
  }
})();

/* ─── 03 HAVELI PARALLAX — slowest in library ──────────────────
   T08: lerp 0.045 — the pace of a Mughal garden at dawn.
   Arch zooms standard (1.0→1.45). Couple slower (1.0→1.18).
   No mouse tilt Y — only X, very subtle.
──────────────────────────────────────────────────────────────── */
const heroWrap=document.getElementById('heroWrap');
const heroPin=document.getElementById('heroPin');
const archEl=document.getElementById('l3');
const coupleEl=document.getElementById('l4');
const heroCopy=document.getElementById('heroCopy');
const scrollNudge=document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});
let raw=0,lerped=0,mouseX=0,rafH=null;

function getHeroProgress(){
  if(!heroWrap) return 0;
  const top=heroWrap.getBoundingClientRect().top+window.scrollY;
  const travel=heroWrap.offsetHeight-window.innerHeight;
  return Math.min(1,Math.max(0,(window.scrollY-top)/travel));
}
function driveHero(){
  // T08: slowest lerp in library — Mughal garden pace
  lerped+=(raw-lerped)*0.045;
  const p=lerped;
  const mx=isTouch?0:mouseX;

  // Arch: keep the full gateway visible on load, then scale with scroll
  if(archEl){
    const s=1.0+p*0.24;
    const tiltX=mx*-2.4;
    archEl.style.transform=`translateX(calc(-50% + ${tiltX}px)) scale(${s})`;
  }
  // Couple stays behind the arch and becomes more visible as the user scrolls
  if(coupleEl){
    const cs=0.96+p*0.16;
    const cy=p*-18;
    const tiltX=mx*-1.0;
    coupleEl.style.transform=`translateX(calc(-50% + ${tiltX}px)) translateY(${cy}px) scale(${cs})`;
    coupleEl.style.opacity=String(Math.min(0.82,0.22+p*0.58));
  }
  // Names fade away once the couple starts taking visual priority
  if(heroCopy){
    const op=p<0.14?1:Math.max(0,1-(p-0.14)/0.24);
    heroCopy.style.opacity=String(op);
    heroCopy.style.transform=`translateY(${p*-16}px)`;
  }
  if(scrollNudge)scrollNudge.style.opacity=String(Math.max(0,1-p/0.18));

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
    if(!rafH)rafH=requestAnimationFrame(driveHero);
  });
  heroPin.addEventListener('mouseleave',()=>{mouseX=0;if(!rafH)rafH=requestAnimationFrame(driveHero);});
}

/* ─── 05 ARCH BRIDGE — warm silver hairline draws ─────────────
   T08: NO urn elements, NO breathe animation, NO confetti.
   Only a single hairline that draws across the CSS crossfade bridge.
──────────────────────────────────────────────────────────────── */
(function initArchBridgeLine(){
  const bridge=document.getElementById('archBridge');
  const lineEl=document.getElementById('archBridgeLine');
  if(!bridge||!lineEl) return;
  const io=new IntersectionObserver(([e])=>{
    if(e.isIntersecting){
      // Delayed for stately editorial timing
      setTimeout(()=>bridge.classList.add('line-drawn'),600);
      io.disconnect();
    }
  },{threshold:0.4});
  io.observe(bridge);
})();

/* ─── WHITE LOTUS PETAL RAIN — felt, not seen ─────────────────
   T08: opacity 0.28 (lowest in library).
   Max 3 hero, 2 sections — barely visible, atmospheric.
──────────────────────────────────────────────────────────────── */
class Petals{
  constructor(id,opts={}){
    this.el=document.getElementById(id);
    this.max=opts.max||3;
    this.rate=opts.rate||3200;
    this.src='assets/Element_205-1f3c1ef266.png';
    this.active=false;this.pool=new Set();this._iv=null;
  }
  spawn(){
    if(!this.el) return;
    if(this.pool.size>=this.max){const f=this.pool.values().next().value;f?.remove();this.pool.delete(f);}
    if(this.pool.size>=this.max) return;
    const sz=36+Math.random()*26;  // T08: smaller petals
    const x=6+Math.random()*88;
    const dur=16+Math.random()*12;  // T08: very slow fall (felt not seen)
    const drift=(Math.random()-0.5)*38;
    const turns=1;
    const wrap=document.createElement('div');
    wrap.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;
    const img=document.createElement('img');
    img.src=this.src;
    // T08: lowest opacity in library — 0.28. Just a whisper.
    img.style.cssText=[
      'width:100%;height:100%;object-fit:contain',
      'mix-blend-mode:multiply',
      'opacity:0.28',
      'filter:drop-shadow(0 2px 6px rgba(192,176,144,.16))'
    ].join(';');
    wrap.appendChild(img);
    const anim=wrap.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(5vh) translateX(${drift*.1}px) rotate(${turns*40}deg)`,opacity:.22,offset:.05},
      {transform:`translateY(80vh) translateX(${drift}px) rotate(${turns*200}deg)`,opacity:.14,offset:.90},
      {transform:`translateY(110vh) translateX(${drift}px) rotate(${turns*240}deg)`,opacity:0},
    ],{duration:dur*1000,easing:'linear',fill:'forwards'});
    anim.onfinish=()=>{wrap.remove();this.pool.delete(wrap);};
    this.el.appendChild(wrap);this.pool.add(wrap);
  }
  start(){if(this.active||!this.el)return;this.active=true;const rate=isTouch?this.rate*2.5:this.rate;this._iv=setInterval(()=>{if(this.active)this.spawn();},rate);this.spawn();}
  stop(){this.active=false;clearInterval(this._iv);}
}

// T08: Minimum petal density — felt, not seen
const PS={
  hero:  new Petals('petalHero',  {max:3, rate:3200}),
  invite:new Petals('petalInvite',{max:2, rate:5500}),
  events:new Petals('petalEvents',{max:2, rate:6000}),
  things:new Petals('petalThings',{max:1, rate:7000}),
  rsvp:  new Petals('petalRsvp',  {max:2, rate:5000}),
};
const sIO=new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>{
    const id=target.id;
    const sys=id==='heroWrap'?PS.hero:PS[id];
    if(sys)isIntersecting?sys.start():sys.stop();
  });
},{threshold:0.08});
['heroWrap','invite','events','things','rsvp'].forEach(id=>{const el=document.getElementById(id);if(el)sIO.observe(el);});

/* ─── SCROLL REVEAL — slowest in library (1.4s) ─────────────── */
const rIO=new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>{
    if(isIntersecting){target.classList.add('vis');rIO.unobserve(target);}
  });
},{threshold:0.08});
document.querySelectorAll('.scroll-in').forEach(el=>rIO.observe(el));
const inviteCard=document.querySelector('.invite-card');
if(inviteCard)rIO.observe(inviteCard);

/* ─── 12 JALI UNDERLINE — silver diamond strip draws ────────── */
(function initJaliLines(){
  const wraps=document.querySelectorAll('.sh-line-wrap');
  if(!wraps.length) return;
  const lineIO=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(isIntersecting){
        // T08: longer delay — architectural pause before the line appears
        setTimeout(()=>target.classList.add('drawn'),560);
        lineIO.unobserve(target);
      }
    });
  },{threshold:0.5});
  wraps.forEach(w=>lineIO.observe(w));
})();

/* ─── EVENTS JOURNEY LINE ───────────────────────────────────── */
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
      const wave=(i%2===0?1:-1)*Math.min(52,Math.abs(b.x-a.x)*.24);
      const cy=((a.y+b.y)/2-22).toFixed(1);
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
    const top=section.getBoundingClientRect().top+window.scrollY;
    const p=Math.min(1,Math.max(0,(window.scrollY+window.innerHeight-top)/(section.offsetHeight+window.innerHeight*.5)));
    drawnEl.style.strokeDashoffset=drawnEl._total*(1-p);
  }
  window._evJourneyLayout=layout;
  window.addEventListener('load',layout);
  window.addEventListener('scroll',onScroll,{passive:true});
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(layout,200);});
})();

/* ─── EVENTS AUTO OPEN ──────────────────────────────────────── */
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

/* ─── 08 ICON MAGNETIC — architectural precision ───────────── */
(function initIconMagnetic(){
  if(isTouch) return;
  document.querySelectorAll('.ev-node').forEach(node=>{
    const wrap=node.querySelector('.ev-icon-wrap');
    if(!wrap) return;
    node.addEventListener('mousemove',e=>{
      const r=node.getBoundingClientRect();
      // T08: subtler magnetic pull — 8px vs T07's 12px
      const dx=(e.clientX-r.left-r.width/2)/r.width*8;
      const dy=(e.clientY-r.top-r.height/2)/r.height*6;
      wrap.style.transform=`translate(${dx}px,${dy}px) scale(1.05)`;
      wrap.style.animationPlayState='paused';
    });
    node.addEventListener('mouseleave',()=>{
      wrap.style.transform='';
      wrap.style.animationPlayState='';
    });
  });
})();

/* ─── STORY — Curtain Reveal + Taj Mahal Silhouette ──────────
   T08 UNIQUE: NO bride/groom characters.
   The curtains open to reveal the Taj Mahal silhouette
   (Firefly_Remove background 269115.png — transparent PNG)
   and the story text. The Taj fades in at 65% open.
   Petals are champagne/silver/dusty-blue — architectural palette.
──────────────────────────────────────────────────────────────── */
(function initCurtainReveal(){
  const section=document.getElementById('story');
  const stage=document.getElementById('stStage');
  const curtL=document.getElementById('stCurtL');
  const curtR=document.getElementById('stCurtR');
  const reveal=document.getElementById('stReveal');
  const petalsEl=document.getElementById('stPetals');
  const archWrap=document.getElementById('stArchWrap');
  if(!section||!stage||!curtL||!curtR) return;

  // Curtains should track scroll directly so the reveal is readable on both desktop and mobile
  let seqDone=false,openEnabled=false,revealed=false,lastP=-1;

  function spawnPetal(){
    if(!petalsEl) return;
    const sz=3+Math.random()*7;
    const x=10+Math.random()*80;
    const dur=7000+Math.random()*6000;
    const dx=(Math.random()-0.5)*70;
    // T08: architectural palette — champagne / silver / dusty blue / warm white ONLY
    const COLS=[
      'rgba(248,245,238,.32)',  // warm white
      'rgba(232,224,208,.38)',  // champagne
      'rgba(192,176,144,.25)',  // warm silver
      'rgba(106,128,160,.18)',  // steel blue
      'rgba(212,200,168,.34)'   // pale sand
    ];
    const col=COLS[Math.floor(Math.random()*COLS.length)];
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(4vh) translateX(${dx*.06}px) rotate(20deg)`,opacity:.70,offset:.05},
      {transform:`translateY(55vh) translateX(${dx*.88}px) rotate(180deg)`,opacity:.28,offset:.88},
      {transform:`translateY(88vh) translateX(${dx}px) rotate(260deg)`,opacity:0},
    ],{duration:dur,easing:'linear',fill:'forwards'}).onfinish=()=>el.remove();
  }

  function runSequence(){
    if(seqDone) return;
    seqDone=true;
    openEnabled=true;
    applyProgress(getCurtainProgress());
  }

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    const r=section.getBoundingClientRect();
    const start=window.innerHeight*.90;
    const end=window.innerHeight*.18;
    return Math.min(1,Math.max(0,(start-r.top)/(start-end)));
  }

  function applyProgress(p){
    if(Math.abs(p-lastP)<0.001) return;
    lastP=p;
    const eased=p<1?1-Math.pow(1-p,1.45):1;
    const shift=52+eased*56;
    curtL.style.transform=`translateX(-${shift.toFixed(2)}%)`;
    curtR.style.transform=`translateX(${shift.toFixed(2)}%)`;

    if(eased>=0.42&&!revealed){
      revealed=true;
      reveal.classList.add('revealed');
      let n=0;
      const iv=setInterval(()=>{spawnPetal();if(++n>=12)clearInterval(iv);},220);
    }
  }

  window.addEventListener('scroll',()=>applyProgress(getCurtainProgress()),{passive:true});
  window.addEventListener('load',()=>applyProgress(getCurtainProgress()));
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&entries[0].intersectionRatio>=0.08){runSequence();io.disconnect();}
  },{threshold:[0.08]});
  io.observe(section);
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(()=>applyProgress(getCurtainProgress()),120);});
})();

/* ─── 11 LOTUS PETAL BURST — 12 petals only (most restrained) ─
   T08: 12 petals (vs T07's 28). Smaller, shorter distance.
   The most refined RSVP burst in the library.
──────────────────────────────────────────────────────────────── */
function burstPetals(fromEl){
  const r=fromEl.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;
  const src='assets/Element_205-1f3c1ef266.png';
  // T08: 12 petals only — architectural restraint
  for(let i=0;i<12;i++){
    const el=document.createElement('div');
    el.className='burst-p';
    const sz=8+Math.random()*10;  // T08: smaller petals
    const ang=(i/12)*360+Math.random()*14;
    const dst=38+Math.random()*52;  // T08: shorter distance
    const tx=Math.cos(ang*Math.PI/180)*dst;
    const ty=Math.sin(ang*Math.PI/180)*dst;
    el.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img=document.createElement('img');
    img.src=src;
    // T08: multiply blend, low opacity — pure restraint
    img.style.cssText='width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.52';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      {transform:'translate(-50%,-50%) scale(.2) rotate(0deg)',opacity:.55},
      {transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(1.0) rotate(${Math.random()*280}deg)`,opacity:.42,offset:.45},
      {transform:`translate(calc(-50% + ${tx*1.4}px),calc(-50% + ${ty*1.4+35}px)) scale(.15) rotate(${Math.random()*400}deg)`,opacity:0},
    ],{duration:1000+Math.random()*320,easing:'ease-out',fill:'forwards'})
    .onfinish=()=>el.remove();
  }
}
(function initRsvpBtn(){
  const btn=document.getElementById('rsvpWaBtn');
  if(!btn) return;
  btn.addEventListener('click',()=>burstPetals(btn));
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
