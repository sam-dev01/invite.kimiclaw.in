const fs = require('fs');
const path = require('path');

const demosDir = path.join(__dirname, '../demos');
const templatePrefix = 'shaadipath-template';
const skipTemplate = '02';

// ---------------------------------------------------------
// INJECTABLE BLOCKS
// ---------------------------------------------------------

const scratchHtml = `<!-- ═══ SCRATCH GATE ══════════════════════════════════ -->
<div id="scratchGate" class="scratch-gate">
  <div class="sg-bg"></div>

  <!-- Floating ornaments on gate -->
  <img class="sg-diya sg-dl" src="assets/Element_201-4f5283889f.png" alt="" aria-hidden="true">
  <img class="sg-diya sg-dr" src="assets/Element_201-4f5283889f.png" alt="" aria-hidden="true">
  <img class="sg-vine sg-vl" src="assets/Element_204-03d5916c5b.png" alt="" aria-hidden="true">
  <img class="sg-vine sg-vr" src="assets/Element_205-cbfd2ffa8a.png" alt="" aria-hidden="true">

  <div class="sg-content">
    <!-- Top mandala -->
    <div class="sg-mandala" aria-hidden="true">
      <svg viewBox="0 0 120 120" width="72" height="72" style="color: var(--gold, #C8A84B);">
        <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>
        <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" stroke-width=".8" opacity=".35"/>
        <g opacity=".18">
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(0 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(45 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(90 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(135 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(180 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(225 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(270 60 60)"/>
          <ellipse cx="60" cy="18" rx="6" ry="15" fill="currentColor" transform="rotate(315 60 60)"/>
        </g>
        <circle cx="60" cy="60" r="6" fill="currentColor" opacity=".6"/>
      </svg>
    </div>

    <!-- Couple names above scratch -->
    <p class="sg-eyebrow">A Royal Invitation</p>
    <div class="sg-names">
      <span class="sg-bride pl-n1">Priya</span>
      <span class="sg-heart">♡</span>
      <span class="sg-groom pl-n2">Arjun</span>
    </div>
    <p class="sg-hint">✦ Scratch to reveal the wedding date ✦</p>

    <!-- THE SCRATCH CARD -->
    <div class="scratch-card-wrap">
      <!-- Hidden date underneath -->
      <div class="scratch-reveal" id="scratchReveal" aria-label="Wedding date">
        <div class="sr-top">
          <div class="sr-line"></div>
          <span class="sr-label">Wedding Date</span>
          <div class="sr-line"></div>
        </div>
        <div class="sr-date pl-date">
          <span class="sr-day">12</span>
          <span class="sr-sep">·</span>
          <span class="sr-month">December</span>
          <span class="sr-sep">·</span>
          <span class="sr-year">2026</span>
        </div>
        <p class="sr-venue">Umaid Bhawan · Jodhpur</p>
        <div class="sr-stars" aria-hidden="true">✦ ✦ ✦</div>
      </div>
      <!-- Canvas scratch surface -->
      <canvas id="scratchCanvas" class="scratch-canvas" aria-hidden="true"></canvas>
      <!-- Scratch texture hint overlay -->
      <div class="scratch-hint-overlay" id="scratchHint">
        <div class="sho-icon">
          <svg viewBox="0 0 24 24" width="32" fill="none" stroke="currentColor" stroke-width="0.5">
            <path d="M12 2v20M17 5l-5-3-5 3M17 19l-5 3-5-3M2 12h20M5 7l3 5-3 5M19 7l-3 5 3 5" />
          </svg>
        </div>
        <span>Scratch here</span>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="sg-progress-wrap">
      <div class="sg-progress-bar" id="sgProgress"></div>
    </div>
    <p class="sg-progress-label" id="sgProgressLabel">0% revealed</p>

    <!-- Unlocked message (hidden until done) -->
    <div class="sg-unlocked" id="sgUnlocked">
      <p>🎊 Date revealed! Scroll to explore</p>
      <div class="sg-unlock-arrow">↓</div>
    </div>
  </div>
</div>`;

const scratchCss = `
/* ═══════════════════════════════════════════════════════
   SCRATCH GATE
   ═══════════════════════════════════════════════════════ */
.scratch-gate {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity .4s ease, visibility .4s;
}
.scratch-gate.dismissed {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.scroll-locked {
  overflow: hidden;
  touch-action: none;
}

.sg-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(139,26,46,.22) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 80%, rgba(200,168,75,.12) 0%, transparent 50%),
    linear-gradient(150deg, var(--deep, #0A1628) 0%, #0F1E3A 50%, var(--deep, #14082A) 100%);
}

/* Floating ornaments */
.sg-diya, .sg-vine { position: absolute; pointer-events: none; }
.sg-dl { left: 2%; top: 20%; width: clamp(55px,8vw,100px); opacity: .55; animation: floatUp 4s ease-in-out infinite; }
.sg-dr { right: 2%; top: 20%; width: clamp(55px,8vw,100px); opacity: .55; animation: floatUp 4s ease-in-out infinite 2s; transform: scaleX(-1); }
.sg-vl { left: 0; top: 5%;  width: clamp(65px,10vw,130px); opacity: .5; animation: floatUp 5.5s ease-in-out infinite 1s; }
.sg-vr { right: 0; top: 5%; width: clamp(65px,10vw,130px); opacity: .5; animation: floatUp 5.5s ease-in-out infinite 3s; transform: scaleX(-1); }

/* Content */
.sg-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  gap: .9rem;
  padding: 1.5rem 1rem;
  width: 100%; max-width: 480px;
  text-align: center;
  animation: scaleFadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes scaleFadeIn {
  0% { opacity: 0; transform: scale(0.92) translateY(15px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* Spinning mandala */
.sg-mandala { 
  display: flex; justify-content: center; width: 100%;
  animation: rotateSlow 14s linear infinite; 
}

.sg-eyebrow {
  font-family: var(--ff-s);
  font-size: .68rem;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: var(--gold, rgba(200,168,75,.65));
}

.sg-names {
  display: flex; align-items: center; gap: .8rem;
}
.sg-bride, .sg-groom {
  font-family: var(--ff-d);
  font-size: clamp(1.8rem, 8vw, 2.8rem);
  font-weight: 700;
  color: var(--gold, #D8A038);
  letter-spacing: .06em;
}
.sg-heart {
  font-size: 1.4rem;
  color: var(--rose, #F0C4A0);
  animation: heartBeat 1.4s ease-in-out infinite;
}

.sg-hint {
  font-family: var(--ff-b);
  font-size: clamp(.8rem, 2.5vw, .95rem);
  font-style: italic;
  color: var(--gold, rgba(200,168,75,.6));
  letter-spacing: .05em;
  margin-top: 0.4rem;
  margin-bottom: 24px;
}

/* ── THE SCRATCH CARD ───────────────────────────────── */
.scratch-card-wrap {
  position: relative;
  width: min(340px, 88vw);
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(220,180,75,0.4),
    0 15px 50px rgba(0,0,0,0.6),
    0 0 60px rgba(212,175,55,0.25),
    inset 0 2px 10px rgba(255,255,255,0.3);
  cursor: crosshair;
  flex-shrink: 0;
}

/* Date revealed underneath */
.scratch-reveal {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #FAF0DC 0%, #FBF3E3 60%, #F5E8C5 100%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: .5rem;
  padding: 1.2rem;
}
.sr-top {
  display: flex; align-items: center; gap: .8rem; width: 100%;
}
.sr-line { flex: 1; height: 1px; background: rgba(200,168,75,.35); }
.sr-label {
  font-family: var(--ff-s); font-size: .6rem;
  letter-spacing: .3em; text-transform: uppercase;
  color: rgba(200,168,75,.65);
  white-space: nowrap;
}
.sr-date {
  display: flex; align-items: baseline; gap: .5rem;
  flex-wrap: wrap; justify-content: center;
}
.sr-day, .sr-year {
  font-family: var(--ff-d);
  font-size: clamp(1.8rem, 8vw, 2.6rem);
  font-weight: 700;
  color: #0F2044;
  line-height: 1;
}
.sr-month {
  font-family: var(--ff-d);
  font-size: clamp(1.2rem, 5vw, 1.7rem);
  font-weight: 600;
  color: #0F2044;
  line-height: 1;
}
.sr-sep { color: rgba(200,168,75,.6); font-size: 1.1rem; }
.sr-venue {
  font-family: var(--ff-b); font-size: .82rem;
  font-style: italic; color: rgba(15,32,68,.55);
}
.sr-stars { font-size: .75rem; color: rgba(200,168,75,.5); letter-spacing: .4em; }

/* Canvas sits on top of the date */
.scratch-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border-radius: 16px;
  touch-action: none;
  cursor: crosshair;
}

/* Scratch hint pulsing overlay */
.scratch-hint-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.15);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: .5rem;
  pointer-events: none;
  transition: opacity 0.3s;
}
.scratch-hint-overlay.hidden { opacity: 0; }
.sho-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  animation: hintPulse 2s infinite;
  color: #fff;
}
.scratch-hint-overlay span {
  font-family: var(--ff-b); font-size: .75rem;
  color: rgba(255,255,255,0.8); letter-spacing: .1em;
  text-transform: uppercase;
}
@keyframes hintPulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255,255,255,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
}

/* Progress bar */
.sg-progress-wrap {
  width: min(180px, 50vw);
  height: 3px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  margin-top: .5rem;
  overflow: hidden;
}
.sg-progress-bar {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, #D4AF37, #FFF7B0);
  transition: width 0.15s linear;
}
.sg-progress-label {
  font-family: var(--ff-s); font-size: .65rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: .1em; text-transform: uppercase;
  margin-top: -0.3rem;
}

/* Unlocked text */
.sg-unlocked {
  opacity: 0; transform: translateY(10px);
  transition: all 0.6s ease;
  position: absolute; bottom: 3%;
  display: flex; flex-direction: column; align-items: center; gap: .5rem;
}
.sg-unlocked.show {
  opacity: 1; transform: translateY(0);
}
.sg-unlocked p {
  font-family: var(--ff-b); font-size: .85rem;
  color: #fff; letter-spacing: .05em;
}
.sg-unlock-arrow {
  color: #D4AF37; font-size: 1.2rem;
  animation: bounceDown 1.5s infinite;
}
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* RSVP Center Fix */
.rsvp-btn {
  margin: 0 auto;
  display: table;
}
`;

const scratchJs = `function initScratch() {
  const gate        = document.getElementById('scratchGate');
  const canvas      = document.getElementById('scratchCanvas');
  const hint        = document.getElementById('scratchHint');
  const progressBar = document.getElementById('sgProgress');
  const progressLbl = document.getElementById('sgProgressLabel');
  const unlocked    = document.getElementById('sgUnlocked');
  if (!gate || !canvas){
    revealHero();
    return;
  }

  // Lock scroll
  document.body.classList.add('scroll-locked');

  const ctx = canvas.getContext('2d');
  const THRESHOLD = 55;   // % needed to unlock
  let isDrawing   = false;
  let hasStarted  = false;
  let isDone      = false;

  /* Size canvas to wrapper */
  function sizeCanvas() {
    const wrap = canvas.parentElement;
    canvas.width  = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
    drawScratchLayer();
  }

  /* Fill canvas with the gold foil scratch surface */
  function drawScratchLayer() {
    const w = canvas.width, h = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0,   '#B58428');
    grad.addColorStop(0.3, '#F7D070');
    grad.addColorStop(0.5, '#FFF7B0');
    grad.addColorStop(0.7, '#D29B35');
    grad.addColorStop(1,   '#A37119');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 350; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.5 + 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,' + (Math.random() * 0.08 + 0.03) + ')';
      ctx.fill();
    }
    for (let i = 0; i < 200; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1 + 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.15 + 0.05) + ')';
      ctx.fill();
    }

    ctx.font = 'bold 14px Jost, sans-serif';
    ctx.fillStyle = 'rgba(15,32,68,.65)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦  SCRATCH TO REVEAL  ✦', w / 2, h / 2);
  }

  let lastX = null, lastY = null;
  let lastProgressCheck = 0;

  function scratch(x, y, isStart) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.min(canvas.width, canvas.height) * 0.23;

    ctx.beginPath();
    if (isStart || lastX === null) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 0.1);
    } else {
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';

    lastX = x;
    lastY = y;

    const now = performance.now();
    if (now - lastProgressCheck > 100) {
      lastProgressCheck = now;
      requestAnimationFrame(updateProgress);
    }
  }

  function getScratched() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels    = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 128) transparent++;
    }
    const total = pixels.length / 16;
    return Math.round((transparent / total) * 100);
  }

  function updateProgress() {
    if (isDone) return;
    const pct = getScratched();
    const display = Math.min(pct, 100);
    progressBar.style.width = display + '%';
    progressLbl.textContent = display + '% revealed';

    if (pct >= THRESHOLD) {
      onUnlocked();
    }
  }

  function onUnlocked() {
    if (isDone) return;
    isDone = true;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    progressBar.style.width = '100%';
    progressLbl.textContent = '100% revealed ✦';

    unlocked.classList.add('show');

    setTimeout(() => {
      document.body.classList.remove('scroll-locked');
      revealHero();
    }, 200);

    function dismiss() {
      gate.classList.add('dismissed');
      gate.removeEventListener('click', dismiss);
    }
    gate.addEventListener('click', dismiss);
    document.addEventListener('keydown', dismiss, { once: true });

    setTimeout(dismiss, 400);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left)  * scaleX,
      y: (src.clientY - rect.top)   * scaleY
    };
  }

  function onStart(e) {
    e.preventDefault();
    isDrawing = true;
    if (!hasStarted) {
      hasStarted = true;
      hint.classList.add('hidden');
    }
    const pos = getPos(e);
    scratch(pos.x, pos.y, true);
  }

  function onMove(e) {
    e.preventDefault();
    if (!isDrawing || isDone) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y, false);
  }

  function onEnd() { 
    isDrawing = false; 
    lastX = null; 
    lastY = null;
  }

  canvas.addEventListener('mousedown',  onStart, { passive: false });
  canvas.addEventListener('mousemove',  onMove,  { passive: false });
  canvas.addEventListener('mouseup',   onEnd);
  canvas.addEventListener('mouseleave', onEnd);
  canvas.addEventListener('touchstart', onStart, { passive: false });
  canvas.addEventListener('touchmove',  onMove,  { passive: false });
  canvas.addEventListener('touchend',   onEnd);

  gate.addEventListener('wheel',      e => e.preventDefault(), { passive: false });
  gate.addEventListener('touchmove',  e => e.preventDefault(), { passive: false });

  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);
}`

// ---------------------------------------------------------
// RUNNER
// ---------------------------------------------------------

const dirs = fs.readdirSync(demosDir);

for (const dir of dirs) {
  if (dir.startsWith(templatePrefix) && !dir.includes(skipTemplate) && !dir.includes('std')) {
    const sourceDir = path.join(demosDir, dir, 'source');
    if (!fs.existsSync(sourceDir)) continue;

    console.log('Processing:', dir);

    // 1. Process HTML
    const htmlPath = path.join(sourceDir, 'index.html');
    if (fs.existsSync(htmlPath)) {
      let html = fs.readFileSync(htmlPath, 'utf8');
      if (html.includes('id="preloader"')) {
        // Regex to match the preloader block
        html = html.replace(/<!-- ═══ PRELOADER ═══ -->[\\s\\S]*?<div id="preloader"[\\s\\S]*?<\/svg>[\\s\\S]*?<\/div>\s*<\/div>/, scratchHtml);
        // Wait, preloader can be tricky. Let's find index of <div id="preloader" and the closing div.
        const plStart = html.indexOf('<div id="preloader"');
        if (plStart > -1) {
            let nextSection = html.indexOf('<!-- ═══ HERO ═══ -->', plStart);
            if (nextSection === -1) nextSection = html.indexOf('<div id="heroWrap"', plStart);
            if (nextSection > -1) {
                html = html.substring(0, plStart) + scratchHtml + "\n\n  " + html.substring(nextSection);
                fs.writeFileSync(htmlPath, html);
                console.log('  - Updated index.html (replaced preloader)');
            } else {
                console.log('  - Failed to find end of preloader block in HTML');
            }
        }
      } else if (!html.includes('id="scratchGate"')) {
        console.log('  - No preloader found, inserting scratchGate manually before heroWrap');
        const heroStart = html.indexOf('<div id="heroWrap"');
        if (heroStart > -1) {
            html = html.substring(0, heroStart) + scratchHtml + "\n\n  " + html.substring(heroStart);
            fs.writeFileSync(htmlPath, html);
            console.log('  - Updated index.html (inserted scratchGate)');
        }
      }
    }

    // 2. Process CSS
    const assetsDir = path.join(sourceDir, 'assets');
    if (fs.existsSync(assetsDir)) {
      const cssFiles = fs.readdirSync(assetsDir).filter(f => f.startsWith('style-') && f.endsWith('.css'));
      if (cssFiles.length > 0) {
        const cssPath = path.join(assetsDir, cssFiles[0]);
        let css = fs.readFileSync(cssPath, 'utf8');
        if (!css.includes('.scratch-gate')) {
          fs.appendFileSync(cssPath, '\n' + scratchCss);
          console.log('  - Updated CSS');
        }
      }

      // 3. Process JS
      const jsFiles = fs.readdirSync(assetsDir).filter(f => f.startsWith('script-') && f.endsWith('.js'));
      if (jsFiles.length > 0) {
        const jsPath = path.join(assetsDir, jsFiles[0]);
        let js = fs.readFileSync(jsPath, 'utf8');

        // Replace runPreloader with initScratch definition
        if (js.includes('function runPreloader() {') && !js.includes('initScratch')) {
          // Replace runPreloader definition up to end of setTimeout safety net
          const runPreloaderStart = js.indexOf('function runPreloader()');
          const safetyNetEnd = js.indexOf('SCROLL-PINNED HERO DRIVER', runPreloaderStart);
          if (runPreloaderStart > -1 && safetyNetEnd > -1) {
              const replaceEnd = js.lastIndexOf('/*', safetyNetEnd);
              js = js.substring(0, runPreloaderStart) + scratchJs + "\n\n// Run on loaded\nif(document.readyState === 'complete'){ initScratch(); } else { window.addEventListener('load', initScratch); }\n\n" + js.substring(replaceEnd);
              console.log('  - Updated JS (replaced runPreloader with initScratch)');
          }
        } else if (!js.includes('initScratch')) {
            console.log('  - runPreloader not found. Appending initScratch to end of file.');
            js += "\n\n" + scratchJs + "\n\n// Run on loaded\nif(document.readyState === 'complete'){ initScratch(); } else { window.addEventListener('load', initScratch); }\n";
        }

        // Journey Scroll optimization
        if (js.includes('function onScroll() {') && js.includes('getBoundingClientRect') && !js.includes('cachedSecH')) {
          js = js.replace(/  function layout\(\) \{[\s\S]*?  function onScroll\(\) \{[\s\S]*?    \}\);\n  \}/, 
            `  let cachedSecTop = 0;
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
  let _jRaf = null;
  function onScroll(){
    if(!drawnEl._total) return;
    if (_jRaf) return;
    _jRaf = requestAnimationFrame(() => {
        _jRaf = null;
        const winH    = window.innerHeight;
        const currentTop = cachedSecTop - window.scrollY;
        const scrolled = winH - currentTop;
        const total    = cachedSecH + winH;
        const progress = Math.min(1, Math.max(0, scrolled / total));
        drawnEl.style.strokeDashoffset = (drawnEl._total * (1 - progress)).toFixed(1);
    });
  }`);
            console.log('  - Updated JS Journey Scroll');
        }

        // Curtain Scroll Optimization
        if (js.includes('function getCurtainProgress()') && js.includes('getBoundingClientRect()')) {
          js = js.replace(/function getCurtainProgress\(\)\s*\{[\s\S]*?return Math\.min[\s\S]*?\}/, 
            `let cachedCurtTop = 0;
  window.addEventListener('load', () => cachedCurtTop = section.getBoundingClientRect().top + window.scrollY);

  function getCurtainProgress(){
    if(!openEnabled) return 0;
    if(!cachedCurtTop) cachedCurtTop = section.getBoundingClientRect().top + window.scrollY;
    const currentTop = cachedCurtTop - window.scrollY;
    const start = window.innerHeight * 0.55;
    const range = window.innerHeight * 0.91;
    return Math.min(1, Math.max(0, (start - currentTop) / range));
  }`);
          console.log('  - Updated JS Curtain Scroll');
        }

        // IntersectionObserver for autoOpen
        if (js.includes('function initEventsAutoOpen()') && js.includes('function checkNodes()')) {
          js = js.replace(/function initEventsAutoOpen\(\) \{[\s\S]*?\}\n\n\/\/ Run on initial/, 
            `function initEventsAutoOpen(){
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

// Run on initial`);
          console.log('  - Updated JS IntersectionObserver for journey nodes');
        }

        fs.writeFileSync(jsPath, js);
      }
    }
  }
}
console.log('Done!');
