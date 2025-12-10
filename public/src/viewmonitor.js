


function gauge(canvasId, min, max, label){
  const c=document.getElementById(canvasId),ctx=c.getContext('2d');
  let val=0,disp=0;

  function ang(v){return (-120+240*((v-min)/(max-min)))*Math.PI/180;}

  function draw(){
    const w=c.width,h=c.height,cx=w/2,cy=h*0.9,r=Math.min(w*0.42,h*0.8);
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth=10;
    ctx.strokeStyle="#324";
    ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,0);ctx.stroke();

    // ponteiro
    const a=ang(disp);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(a+Math.PI/2);
    ctx.fillStyle="#0ff";
    ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(r-20,0);ctx.lineTo(0,4);ctx.fill();
    ctx.restore();

    ctx.fillStyle="#0ff";
    ctx.font="20px Arial";
    ctx.textAlign="center";
    ctx.fillText(Math.round(disp)+" "+label,cx,cy-r*0.6);
  }

  function animate(targ){
    const from=disp,start=performance.now(),d=400;
    function step(n){
      const k=Math.min(1,(n-start)/d);
      disp=from+(targ-from)*(1-Math.pow(1-k,3));
      draw();
      if(k<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  return {
    set(v){v=Math.max(min,Math.min(max,v));val=v;animate(v);},
    get(){return val;},
    draw
  }
}

// Instâncias
const amp1=gauge("amp-1",0,50,"A");
const watt1=gauge("watt-1",0,2000,"W");


const amp2=gauge("amp-2",0,50,"A");
const watt2=gauge("watt-2",0,2000,"W");

const amp3=gauge("amp-3",0,50,"A");
const watt3=gauge("watt-3",0,2000,"W");
amp1.draw();
watt1.draw();
amp2.draw();
watt2.draw();
amp3.draw();
watt3.draw();

// Exemplo automático:
setInterval(()=>{
    amp1.set(Math.random()*50); 
    watt1.set(Math.random()*2000)
    amp2.set(Math.random()*50); 
    watt2.set(Math.random()*2000)
    amp3.set(Math.random()*50); 
    watt3.set(Math.random()*2000)


},1500);
async function carregarDados() {
    try {
        const res = await fetch("http://127.0.0.1:3000/api/espdata");

        if (!res.ok) {
            throw new Error("Erro no GET");
        }

        const json = await res.json();
        console.log("Recebido do servidor:", json);
        
        // exemplo usando seus medidores:
        updateFromJSON(json);

    } catch (err) {
        console.error("Erro:", err);
    }
}

carregarDados();