const fs = require('fs');
const file = 'D:\\VOWED\\kiminew\\demos\\shaadipath-template02\\source\\assets\\style-e0e9358dfc.css';

let content = fs.readFileSync(file, 'utf-8');
const lines = content.split('\n');

// Find the line index where '.fam-parents em{' starts, which is where things got messed up.
const cutoff = lines.findIndex(l => l.startsWith('.fam-parents em{'));
if (cutoff !== -1) {
  const goodLines = lines.slice(0, cutoff);
  
  const rest = `\.fam-parents em{font-family:var(--ff-s);font-style:italic;font-size:.8rem;display:block;color:rgba(13,27,62,.55)}
.fam-dot{
  flex-shrink:0;font-size:.9rem;color:var(--gold);
  margin-top:32px;
  opacity:.6;
}
@media(max-width:480px){
  .i-fam{flex-direction:column;align-items:center;gap:14px}
  .fam-dot{margin:0;transform:rotate(90deg)}
  .fam-side{max-width:100%}
}
/* Music button: bottom-right with iOS safe-area handled in main .music-btn rule */
/* ═══ EVENTS FIX 1: hide timeline line on all screens ═══ */
.ev-journey-wrap{display:none!important}
/* ═══ EVENTS FIX 2: desktop grid — flat rows, z-index, detail height ═══ */
@media(min-width:681px){
  .ev-float-stage{row-gap:40px}
  .ev-row2,.ev-row2:nth-child(4),.ev-row2:nth-child(5),.ev-row2:nth-child(6){margin-top:0!important}
  .ev-node{position:relative;z-index:2}
  .ev-node:hover .ev-detail,.ev-node.ev-active .ev-detail{max-height:200px}
}
/* ═══ EVENTS FIX 3: font size +20% ═══ */
.ev-name{font-size:1.28rem}
.ev-date{font-size:0.62rem}
.ev-venue{font-size:0.66rem}
.ev-desc{font-size:0.89rem}
@media(min-width:1024px){.ev-name{font-size:1.42rem}}
@media(max-width:480px){.ev-name{font-size:1.18rem}.ev-date{font-size:0.60rem}.ev-desc{font-size:0.86rem}}

/* Anti-flicker for iOS/Android */
.scroll-in, .petal-canvas, .hero-curtain-l, .hero-curtain-r, .st-char-img, .ev-node, .gal-item, .pl-mandala, .sn-icon { -webkit-backface-visibility: hidden; backface-visibility: hidden; -webkit-transform: translateZ(0); transform: translateZ(0); }
`;
  
  const finalContent = goodLines.join('\n') + '\n' + rest;
  fs.writeFileSync(file, finalContent, 'utf-8');
  console.log('Fixed CSS.');
}
