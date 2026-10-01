const P=[['index.html','Home'],['research.html','Research'],['publications.html','Publications'],['outreach.html','Outreach'],['contact.html','Contact']];
const cur=location.pathname.split('/').pop()||'index.html';
document.body.insertAdjacentHTML('afterbegin','<canvas id="sky"></canvas><header class="bar"><a class="brand" href="index.html">Eungwang Seo</a><nav>'+P.map(([h,t])=>`<a href="${h}"${h===cur?' aria-current="page"':''}>${t}</a>`).join('')+'</nav></header>');
document.body.insertAdjacentHTML('beforeend','<footer>© 2026 Eungwang Seo, University of Glasgow</footer>');
// Gravitational-lens starfield: stars near the lens get bent around an Einstein ring
const cv=document.getElementById('sky'),g=cv.getContext('2d'),home=document.body.dataset.lens==='pointer',
rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
let W,H,S,E,L={x:.7,y:.4},T={x:.7,y:.4},t=0;
function init(){W=cv.width=innerWidth;H=cv.height=innerHeight;E=Math.min(W,H)*.1;
S=Array.from({length:Math.round(W*H/2200)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,c:['#fff','#bcd7ff','#ffd9a8'][Math.random()*3|0]}))}
addEventListener('resize',init);init();
if(home)addEventListener('pointermove',e=>{T.x=e.clientX/W;T.y=e.clientY/H});
function draw(){t+=.004;if(!home){T.x=.5+.3*Math.sin(t);T.y=.45+.2*Math.cos(t*1.3)}
L.x+=(T.x-L.x)*.06;L.y+=(T.y-L.y)*.06;const cx=L.x*W,cy=L.y*H;
g.clearRect(0,0,W,H);
for(const s of S){const dx=s.x-cx,dy=s.y-cy,k=Math.min(E*E/(dx*dx+dy*dy+1),3);
g.fillStyle=s.c;g.globalAlpha=.55+.45*Math.sin(t*3+s.x);g.beginPath();g.arc(s.x+dx*k,s.y+dy*k,s.r,0,6.3);g.fill()}
g.globalAlpha=1;const gr=g.createRadialGradient(cx,cy,E*.9,cx,cy,E*1.1);
gr.addColorStop(0,'rgba(255,180,84,0)');gr.addColorStop(.5,'rgba(255,180,84,.22)');gr.addColorStop(1,'rgba(255,180,84,0)');
g.fillStyle=gr;g.beginPath();g.arc(cx,cy,E*1.1,0,6.3);g.fill();
if(!rm)requestAnimationFrame(draw)}
draw();
