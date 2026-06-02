'use strict';
/* ═══════════════════════════════════════════════════
   TEMPLATE 04 — FLORAL GARDEN MEHENDI — script.js
   12 MICRO-INTERACTIONS:
   01 Petal Cursor   02 Bloom Preloader  03 Mandap+Couple Parallax
   04 Floating Sparks  05 Urn Breathe (CSS)  06 Toran Sway (CSS)
   07 Card Bloom (CSS) 08 Icon Magnetic  09 Wreath Spin (CSS)
   10 Knowledge Bloom (CSS)  11 Marigold Burst  12 Garden Underline
═══════════════════════════════════════════════════ */
const isTouch = window.matchMedia('(pointer:coarse)').matches;

/* ─── 01 PETAL CURSOR ──────────────────────────── */
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
  (function loop(){
    rx+=(dx-rx)*.082;ry+=(dy-ry)*.082;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    // Gold bloom over interactive, coral glow on default — T04 palette
    ring.style.boxShadow=document.body.classList.contains('ch')
      ?'0 0 36px 12px rgba(212,160,96,.40)'
      :'0 0 12px 2px rgba(200,112,96,.15)';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.ev-node,.tt,.gal-item,.rsvp-wa-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
})();

/* ─── 02 BLOOM PRELOADER ───────────────────────── */
function revealHero(){
  document.body.classList.remove('pl-active');
  const mandap=document.querySelector('.hl-palace');
  const couple=document.querySelector('.hl-couple');
  const copy=document.getElementById('heroCopy');
  if(mandap)mandap.classList.add('in');
  if(couple)couple.classList.add('in');
  if(copy)copy.classList.add('in');
}
function runPreloader(){
  const pl=document.getElementById('preloader');
  if(!pl){revealHero();return;}
  setTimeout(()=>pl.classList.add('li'), 320);
  setTimeout(()=>pl.classList.add('ni'), 780);
  setTimeout(()=>{
    pl.classList.add('away');
    setTimeout(()=>{pl.style.display='none';revealHero();},700);
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
},5000);

/* ─── 04 FLOATING SPARKS ───────────────────────── */
(function initSparks(){
  const container=document.getElementById('heroParticles');
  if(!container) return;
  const COUNT=isTouch?7:22;
  for(let i=0;i<COUNT;i++){
    const p=document.createElement('div');
    p.className='hp';
    const x=4+Math.random()*92;
    const dur=9+Math.random()*18;
    const del=Math.random()*-22;
    const dx=(Math.random()-0.5)*80;
    // Mix of orange, gold, coral sparks
    const colours=['#D4A060','#E8A0A0','#C87060','#F0C080'];
    const col=colours[Math.floor(Math.random()*colours.length)];
    const size=Math.random()<0.35?3.5:(Math.random()<0.6?2.5:1.5);
    p.style.cssText=`left:${x}%;--dur:${dur}s;--del:${del}s;--dx:${dx}px;width:${size}px;height:${size}px;background:${col};opacity:0`;
    container.appendChild(p);
  }
})();

/* ─── 03 HERO PARALLAX — MANDAP + COUPLE ────────── */
const heroWrap=document.getElementById('heroWrap');
const heroPin=document.getElementById('heroPin');
const mandapEl=document.getElementById('l3');
const coupleEl=document.getElementById('l4');
const heroCopy=document.getElementById('heroCopy');
const scrollNudge=document.getElementById('scrollNudge');
var _snFired=false;var _snTimer=setTimeout(function(){if(scrollNudge&&!_snFired){_snFired=true;scrollNudge.style.animation='snAttention 0.9s ease-in-out forwards';setTimeout(function(){if(scrollNudge)scrollNudge.style.animation='snPulse 2.5s ease-in-out infinite';},900);}},4000);window.addEventListener('scroll',function(){if(!_snFired){_snFired=true;clearTimeout(_snTimer);}},{once:true,passive:true});
let raw=0,lerped=0,mouseX=0,mouseY=0,rafH=null;

function getHeroProgress(){
  if(!heroWrap) return 0;
  const top=heroWrap.getBoundingClientRect().top+window.scrollY;
  const travel=heroWrap.offsetHeight-window.innerHeight;
  return Math.min(1,Math.max(0,(window.scrollY-top)/travel));
}
function driveHero(){
  lerped+=(raw-lerped)*0.055;
  const p=lerped;
  const mx=isTouch?0:mouseX;
  const my=isTouch?0:mouseY;
  // Mandap: 3D perspective tilt + standard zoom 1.0→1.45
  if(mandapEl){
    const scale=1.0+p*0.45;
    const tiltX=mx*-10;
    const tiltY=my*-6;
    mandapEl.style.transform=`perspective(1200px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateX(calc(-50% + ${(tiltX*0.4).toFixed(1)}px)) scale(${scale})`;
    mandapEl.style.filter=`drop-shadow(0 ${(12+p*18).toFixed(0)}px ${(40+p*30).toFixed(0)}px rgba(58,46,32,${(0.10+p*0.12).toFixed(2)}))`;
  }
  // Couple: slower zoom 1.0→1.20 + gentle upward drift
  // Creates depth: couple recedes INTO mandap as user scrolls
  if(coupleEl){
    const cs=1.0+p*0.20;
    const cy=p*-14;
    coupleEl.style.transform=`translateX(calc(-50% + ${mx*-2}px)) translateY(${cy}px) scale(${cs})`;
    coupleEl.style.opacity=String(Math.max(0.25,1-p*0.60));
  }
  // Names: stay fully visible until p=0.55, dissolve by p=0.88 (blur+letterSpacing)
  if(heroCopy){
    const dissolveStart=0.55;
    const dissolveEnd=0.88;
    const t=Math.max(0,Math.min(1,(p-dissolveStart)/(dissolveEnd-dissolveStart)));
    heroCopy.style.opacity=(1-t).toFixed(3);
    heroCopy.style.transform=`translateY(${p*-18}px)`;
    heroCopy.style.filter=t>0?`blur(${(t*14).toFixed(1)}px)`:'';
    heroCopy.style.letterSpacing=t>0?(t*0.08).toFixed(3)+'em':'';
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
    mouseY=e.clientY/window.innerHeight-0.5;
    if(!rafH)rafH=requestAnimationFrame(driveHero);
  });
  heroPin.addEventListener('mouseleave',()=>{mouseX=0;mouseY=0;if(!rafH)rafH=requestAnimationFrame(driveHero);});
}

/* ─── URN BRIDGE LINE DRAW ─────────────────────── */
(function initPeacock(){
  'use strict';
  const bridge=document.getElementById('peacockBridge');
  const fan=document.getElementById('pbFan');
  const body=document.getElementById('pbBody');
  const img=document.getElementById('pbImg');
  if(!bridge||!fan||!body||!img) return;

  const CFG={
    src:'assets/elements/feather-transparent.png',
    count:23, arc:160, featherAspect:0.534, lenMult:1.55,
    tailX:0.485, tailY:0.937,
    /* Auto cycle: open for openDur ms, closed for closeDur ms */
    openDur:4500, closeDur:2200,
  };

  let _spread=false,_entered=false,_breatheTO=null,_cycleTO=null;

  function build(){
    const bW=img.offsetWidth, bH=img.offsetHeight;
    if(bW<10||bH<10){requestAnimationFrame(build);return;}

    const tailPxX=bW*CFG.tailX, tailPxY=bH*CFG.tailY;
    const bridgeH=bridge.offsetHeight, bridgeW=bridge.offsetWidth;
    const pivotX=bridgeW/2, pivotY=bridgeH*0.88;

    body.style.position='absolute';
    body.style.left=(pivotX-tailPxX)+'px';
    body.style.top=(pivotY-tailPxY)+'px';
    fan.style.left=pivotX+'px';
    fan.style.top=pivotY+'px';

    const N=CFG.count, feathH=Math.round(bH*CFG.lenMult);
    for(let i=0;i<N;i++){
      const norm=i/(N-1);
      const lm=0.76+Math.sin(norm*Math.PI)*0.24;
      const fH=Math.round(feathH*lm), fW=Math.round(fH*CFG.featherAspect);
      const stagger=(Math.abs(norm-0.5)*0.72).toFixed(2);
      const el=document.createElement('div');
      el.className='pb-feather';
      el.style.width=fW+'px'; el.style.height=fH+'px';
      el.style.left=(-fW*0.485)+'px'; el.style.top=(-fH*0.976)+'px';
      el.style.transitionDelay=stagger+'s,'+stagger+'s';
      const fi=document.createElement('img');
      fi.src=CFG.src; fi.alt=''; fi.loading='lazy';
      fi.style.cssText='width:100%;height:100%;object-fit:contain;display:block;';
      el.appendChild(fi); fan.appendChild(el);
    }
    fan._f=Array.from(fan.querySelectorAll('.pb-feather'));
    checkVisible();
  }

  function fold(){
    _spread=false;
    fan.classList.remove('is-spread','is-breathing');
    if(_breatheTO){clearTimeout(_breatheTO);_breatheTO=null;}
    if(!fan._f) return;
    fan._f.forEach(f=>{f.style.transform='rotate(0deg)';f.style.opacity='0';});
  }

  function spread(){
    if(_spread||!fan._f) return;
    _spread=true; fan.classList.add('is-spread');
    fan._f.forEach((f,i)=>{
      const norm=i/(fan._f.length-1);
      const angle=(-CFG.arc/2+norm*CFG.arc).toFixed(1);
      const droop=(Math.abs(norm-0.5)*9).toFixed(1);
      f.style.transform=`rotate(${angle}deg) translateY(${droop}px)`;
      f.style.opacity='1';
    });
    _breatheTO=setTimeout(()=>{fan.classList.add('is-breathing');sparks();},(0.72+1.6+0.1)*1000);
  }

  /* Auto cycle: spread → wait → fold → wait → spread … */
  function startCycle(){
    if(_cycleTO) return;
    function tick(){
      if(_spread){
        fold();
        _cycleTO=setTimeout(tick, CFG.closeDur);
      } else {
        spread();
        _cycleTO=setTimeout(tick, CFG.openDur);
      }
    }
    /* Start first open after a short pause */
    _cycleTO=setTimeout(tick, 600);
  }

  function sparks(){
    const cx=bridge.offsetWidth/2, cy=bridge.offsetHeight*0.5;
    for(let i=0;i<22;i++){
      const p=document.createElement('div'); p.className='pb-spark';
      const sz=(2.5+Math.random()*5.5).toFixed(1);
      const ang=Math.random()*360, dst=55+Math.random()*190;
      const tx=(Math.cos(ang*Math.PI/180)*dst).toFixed(0)+'px';
      const ty=((Math.sin(ang*Math.PI/180)*dst)-25).toFixed(0)+'px';
      const d=(.75+Math.random()*.95).toFixed(2), dl=(Math.random()*.6).toFixed(2);
      const col=Math.random()>.45?'rgba(198,160,36,.88)':'rgba(12,152,108,.80)';
      p.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;background:${col};--tx:${tx};--ty:${ty};--d:${d}s;--dl:${dl}s;animation-delay:${dl}s`;
      bridge.appendChild(p);
      setTimeout(()=>p.remove(),(parseFloat(d)+parseFloat(dl)+.25)*1000);
    }
  }

  function entry(){
    _entered=true; fold(); bridge.classList.remove('vis');
    img.classList.remove('entry'); void img.offsetWidth; img.classList.add('entry');
    setTimeout(()=>{ startCycle(); }, 800);
  }

  function checkVisible(){
    const r=bridge.getBoundingClientRect();
    if(r.top<window.innerHeight*.92&&!_entered) entry();
  }

  new IntersectionObserver(es=>{
    if(es[0].isIntersecting&&!_entered){entry();}
  },{threshold:.15}).observe(bridge);

  if(img.complete&&img.naturalHeight>0) build();
  else img.addEventListener('load',build,{once:true});
  window.addEventListener('load',()=>{if(!fan._f) build(); checkVisible();});
})();

/* ─── PETAL RAIN SYSTEM ────────────────────────── */
class Petals{
  constructor(id,opts={}){
    this.el=document.getElementById(id);
    this.max=opts.max||7;
    this.rate=opts.rate||1300;
    this.src='assets/elements/Element 2.png';
    this.active=false;this.pool=new Set();this._iv=null;
  }
  spawn(){
    if(!this.el) return;
    if(this.pool.size>=this.max){const f=this.pool.values().next().value;f?.remove();this.pool.delete(f);}
    if(this.pool.size>=this.max) return;
    const sz=45+Math.random()*38;
    const x=5+Math.random()*90;
    const dur=7+Math.random()*7;
    const drift=(Math.random()-0.5)*130;
    const wrap=document.createElement('div');
    wrap.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none`;
    const img=document.createElement('img');
    img.src=this.src;
    img.style.cssText='width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.65;filter:drop-shadow(0 0 10px rgba(212,128,40,.55))';
    wrap.appendChild(img);
    const anim=wrap.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(7vh) translateX(${drift*.25}px) rotate(${80}deg)`,opacity:.6,offset:.07},
      {transform:`translateY(80vh) translateX(${drift}px) rotate(${300}deg)`,opacity:.45,offset:.88},
      {transform:`translateY(108vh) translateX(${drift}px) rotate(${360}deg)`,opacity:0},
    ],{duration:dur*1000,easing:'linear',fill:'forwards'});
    anim.onfinish=()=>{wrap.remove();this.pool.delete(wrap);};
    this.el.appendChild(wrap);this.pool.add(wrap);
  }
  start(){if(this.active||!this.el)return;this.active=true;const rate=isTouch?this.rate*2:this.rate;this._iv=setInterval(()=>{if(this.active)this.spawn();},rate);this.spawn();}
  stop(){this.active=false;clearInterval(this._iv);}
}
const PS={
  hero:  new Petals('petalHero',  {max:isTouch?4:8,  rate:isTouch?2400:1200}),
  invite:new Petals('petalInvite',{max:isTouch?2:4,  rate:isTouch?5200:2600}),
  events:new Petals('petalEvents',{max:isTouch?2:5,  rate:isTouch?5800:2900}),
  things:new Petals('petalThings',{max:isTouch?1:3,  rate:isTouch?7200:3600}),
  rsvp:  new Petals('petalRsvp',  {max:isTouch?2:4,  rate:isTouch?4400:2200}),
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

/* ─── 12 GARDEN UNDERLINE ──────────────────────── */
(function initGardenLines(){
  const wraps=document.querySelectorAll('.sh-line-wrap');
  if(!wraps.length) return;
  const lineIO=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(isIntersecting){setTimeout(()=>target.classList.add('drawn'),420);lineIO.unobserve(target);}
    });
  },{threshold:0.5});
  wraps.forEach(w=>lineIO.observe(w));
})();

/* ─── EVENTS — Journey line ─────────────────────── */
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
      const wave=(i%2===0?1:-1)*Math.min(56,Math.abs(b.x-a.x)*.27);
      const cy=((a.y+b.y)/2-25).toFixed(1);
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
    const winH=window.innerHeight;
    const rect=section.getBoundingClientRect();
    const secH=section.offsetHeight;
    const scrolled=winH-rect.top;
    const total=secH+winH;
    const progress=Math.min(1,Math.max(0,scrolled/total));
    drawnEl.style.strokeDashoffset=(drawnEl._total*(1-progress)).toFixed(1);
  }
  window._evJourneyLayout=layout;
  // Re-layout when section first visible (fixes content-visibility timing)
  const visIO=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){requestAnimationFrame(()=>requestAnimationFrame(layout));visIO.disconnect();}
  },{threshold:0.01});
  visIO.observe(section);
  window.addEventListener('load',layout);
  window.addEventListener('scroll',onScroll,{passive:true});
  let rTO;window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(layout,180);});
})();

/* ─── EVENTS — Auto open details ────────────────── */
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

/* ─── 3D CARD TILT — events + gallery ─────────── */
(function initCardTilt(){
  function attachMouseTilt(el){
    if(el._tiltAttached) return;
    el._tiltAttached=true;
    el.addEventListener('mousemove',function(e){
      const r=this.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-0.5;
      const y=(e.clientY-r.top)/r.height-0.5;
      this.style.transition='transform 0.08s ease';
      this.style.transform=`perspective(900px) rotateX(${(y*-10).toFixed(2)}deg) rotateY(${(x*12).toFixed(2)}deg) scale(1.025)`;
    });
    el.addEventListener('mouseleave',function(){
      this.style.transition='transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform='perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTouchTilt(el){
    if(el._touchTiltAttached) return;
    el._touchTiltAttached=true;
    el.addEventListener('touchmove',function(e){
      if(e.touches.length!==1)return;
      const r=this.getBoundingClientRect();
      const x=(e.touches[0].clientX-r.left)/r.width-0.5;
      const y=(e.touches[0].clientY-r.top)/r.height-0.5;
      this.style.transition='transform 0.05s ease';
      this.style.transform=`perspective(700px) rotateX(${(y*-6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) scale(1.018)`;
    },{passive:true});
    el.addEventListener('touchend',function(){
      this.style.transition='transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      this.style.transform='perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
  function attachTilt(el){attachMouseTilt(el);attachTouchTilt(el);}
  document.querySelectorAll('.ev-node,.gal-item').forEach(attachTilt);
  const _orig=window.initEventsAutoOpen;
  window.initEventsAutoOpen=function(){
    if(typeof _orig==='function')_orig();
    document.querySelectorAll('.ev-node').forEach(attachTilt);
  };
})();

/* ─── HERO COUNTDOWN TIMER ──────────────────────── */
(function initCountdown(){
  const el=document.getElementById('heroCountdown');
  if(!el) return;
  function getTarget(){
    try{
      if(typeof WEDDING_CONFIG!=='undefined'&&WEDDING_CONFIG.couple&&WEDDING_CONFIG.couple.date){
        const d=new Date(WEDDING_CONFIG.couple.date+'T00:00:00');
        if(!isNaN(d))return d;
      }
    }catch(e){}
    return new Date('2026-12-12T00:00:00');
  }
  function pad(n){return String(n).padStart(2,'0');}
  function tick(){
    const diff=getTarget()-Date.now();
    if(diff<=0){
      el.innerHTML='<span class="hc-cd-unit"><span class="hc-cd-num" style="font-size:clamp(.6rem,1.4vw,.85rem)">We\'re Married ♥</span></span>';
      return;
    }
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    el.innerHTML=
      `<span class="hc-cd-unit"><span class="hc-cd-num">${d}</span><span class="hc-cd-label">Days</span></span>`+
      `<span class="hc-cd-sep">·</span>`+
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(h)}</span><span class="hc-cd-label">Hrs</span></span>`+
      `<span class="hc-cd-sep">·</span>`+
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(m)}</span><span class="hc-cd-label">Min</span></span>`+
      `<span class="hc-cd-sep">·</span>`+
      `<span class="hc-cd-unit"><span class="hc-cd-num">${pad(s)}</span><span class="hc-cd-label">Sec</span></span>`;
  }
  tick();
  setInterval(tick,1000);
})();

/* ─── 08 ICON MAGNETIC ─────────────────────────── */
(function initIconMagnetic(){
  if(isTouch) return;
  const nodes=document.querySelectorAll('.ev-node');
  nodes.forEach(node=>{
    const wrap=node.querySelector('.ev-icon-wrap');
    if(!wrap) return;
    node.addEventListener('mousemove',e=>{
      const r=node.getBoundingClientRect();
      const cx=r.left+r.width/2;
      const cy=r.top+r.height/2;
      const dx=(e.clientX-cx)/r.width*12;   // max 12px pull
      const dy=(e.clientY-cy)/r.height*10;
      wrap.style.transform=`translate(${dx}px, ${dy}px) scale(1.08)`;
      wrap.style.animationPlayState='paused';
    });
    node.addEventListener('mouseleave',()=>{
      wrap.style.transform='';
      wrap.style.animationPlayState='';
    });
  });
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
    const sz=5+Math.random()*9;
    const x=10+Math.random()*80;
    const dur=5000+Math.random()*4500;
    const dx=(Math.random()-0.5)*90;
    // Marigold orange + rose + coral
    const COLS=['rgba(212,160,96,.25)','rgba(232,160,96,.30)','rgba(200,112,96,.22)','rgba(232,160,160,.28)'];
    const col=COLS[Math.floor(Math.random()*COLS.length)];
    const el=document.createElement('div');
    el.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${x}%;top:-${sz}px;pointer-events:none;border-radius:50% 10% 50% 10%;background:${col};mix-blend-mode:multiply`;
    petalsEl.appendChild(el);
    el.animate([
      {transform:'translateY(0) translateX(0) rotate(0deg)',opacity:0},
      {transform:`translateY(4vh) translateX(${dx*.08}px) rotate(40deg)`,opacity:.9,offset:.05},
      {transform:`translateY(58vh) translateX(${dx*.88}px) rotate(240deg)`,opacity:.4,offset:.87},
      {transform:`translateY(90vh) translateX(${dx}px) rotate(360deg)`,opacity:0},
    ],{duration:dur,easing:'linear',fill:'forwards'}).onfinish=()=>el.remove();
  }

  function runSequence(){
    if(seqDone) return;
    seqDone=true;
    bride.classList.add('st-pull');
    groom.classList.add('st-pull');
    setTimeout(()=>{
      bride.classList.remove('st-pull');groom.classList.remove('st-pull');
      bride.classList.add('st-tension');groom.classList.add('st-tension');
    },735);
    setTimeout(()=>{
      bride.classList.remove('st-tension');groom.classList.remove('st-tension');
      openEnabled=true;
      applyProgress(getCurtainProgress());
    },1255);
  }

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    const r=section.getBoundingClientRect();
    const start=window.innerHeight*.55;
    const range=window.innerHeight*.88;
    return Math.min(1,Math.max(0,(start-r.top)/range));
  }

  function applyProgress(p){
    if(Math.abs(p-lastP)<0.002) return;
    lastP=p;
    const eased=p<1?1-Math.pow(1-p,3.2):1;
    curtL.style.transform=`translateX(-${(eased*100).toFixed(2)}%)`;
    curtR.style.transform=`translateX(${(eased*100).toFixed(2)}%)`;
    // Growing drop-shadow as curtains part — physical weight
    curtL.style.filter=`drop-shadow(${(eased*24).toFixed(1)}px 0 30px rgba(58,46,32,${(eased*.28).toFixed(2)}))`;
    curtR.style.filter=`drop-shadow(-${(eased*24).toFixed(1)}px 0 30px rgba(58,46,32,${(eased*.28).toFixed(2)}))`;
    const drift=eased*26;
    const sc=1-eased*.035;
    bride.style.transform=`translateX(-${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    groom.style.transform=`translateX(${drift.toFixed(1)}px) scale(${sc.toFixed(3)})`;
    if(eased>=0.68&&!revealed){
      revealed=true;
      reveal.classList.add('revealed');
      let n=0;
      const iv=setInterval(()=>{spawnPetal();if(++n>=26)clearInterval(iv);},145);
    }
  }
  window.addEventListener('scroll',()=>applyProgress(getCurtainProgress()),{passive:true});
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&entries[0].intersectionRatio>=0.22){runSequence();io.disconnect();}
  },{threshold:[0.22]});
  io.observe(section);
  let rTO;
  window.addEventListener('resize',()=>{clearTimeout(rTO);rTO=setTimeout(()=>applyProgress(getCurtainProgress()),150);});
})();

/* ─── 11 MARIGOLD BURST ─────────────────────────── */
function burstPetals(fromEl){
  const r=fromEl.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;
  const src='assets/elements/Element 2.png';
  // 22 petals — full marigold explosion
  for(let i=0;i<22;i++){
    const el=document.createElement('div');
    el.className='burst-p';
    const sz=10+Math.random()*18;
    const ang=(i/22)*360+Math.random()*16;
    const dst=65+Math.random()*95;
    const tx=Math.cos(ang*Math.PI/180)*dst;
    const ty=Math.sin(ang*Math.PI/180)*dst;
    el.style.cssText=`left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;transform:translate(-50%,-50%);position:fixed;pointer-events:none;z-index:9000`;
    const img=document.createElement('img');
    img.src=src;
    img.style.cssText='width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply;opacity:0.75';
    el.appendChild(img);
    document.body.appendChild(el);
    el.animate([
      {transform:'translate(-50%,-50%) scale(.2) rotate(0deg)',opacity:.8},
      {transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(1.2) rotate(${Math.random()*360}deg)`,opacity:.70,offset:.42},
      {transform:`translate(calc(-50% + ${tx*1.6}px),calc(-50% + ${ty*1.6+60}px)) scale(.25) rotate(${Math.random()*580}deg)`,opacity:0},
    ],{duration:950+Math.random()*400,easing:'ease-out',fill:'forwards'})
    .onfinish=()=>el.remove();
  }
}
(function initRsvpBtn(){
  const btn=document.getElementById('rsvpWaBtn');
  if(!btn) return;
  btn.addEventListener('click',()=>burstPetals(btn));
})();
