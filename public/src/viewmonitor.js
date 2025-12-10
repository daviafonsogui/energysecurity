


function gauge(canvasId, min, max, label){
  const c=document.getElementById(canvasId),ctx=c.getContext('2d');
  let val=0,disp=0;

  function ang(v){return (-120+240*((v-min)/(max-min)))*Math.PI/180;}

  function draw(){
    const w=c.width,h=c.height,cx=w/2,cy=h/2,r=Math.min(w*0.42,h*0.8);
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth=10;
    ctx.strokeStyle="rgba(255, 255, 255, 1)";
    ctx.beginPath();ctx.arc(cx,cy,r,Math.PI * 2,0);ctx.stroke();

    // ponteiro
    const a=ang(disp);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(a+Math.PI/2);
    ctx.fillStyle="rgba(255, 255, 255, 1)";
    ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(r-20,0);ctx.lineTo(0,4);ctx.fill();
    ctx.restore();

    ctx.fillStyle="rgba(255, 255, 255, 1)";
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
const amp1=gauge("amp-1",0,50,"mA");
const watt1=gauge("watt-1",0,2000,"W");


const amp2=gauge("amp-2",0,50,"mA");
const watt2=gauge("watt-2",0,2000,"W");

const amp3=gauge("amp-3",0,50,"mA");
const watt3=gauge("watt-3",0,2000,"W");
amp1.draw();
watt1.draw();
amp2.draw();
watt2.draw();
amp3.draw();
watt3.draw();

// Exemplo automático:
setInterval(()=>{


carregarDados()

},1500);



async function carregarDados() {
    try {
        const res = await fetch("https://energysecurity.onrender.com/api/espdata");

        if (!res.ok) {
            throw new Error("Erro no GET");
        }

        const json = await res.json();
        
        // exemplo usando seus medidores:
        updateFromJSON(json);

    } catch (err) {
        console.error("Erro:", err);
    }
}

function updateFromJSON(json){
    console.log(json["s1"].corrente)
    amp1.set(json["s1"].corrente * 1000); 
    watt1.set(json["s1"].potencia * 1)
    amp2.set(json["s2"].corrente * 1000); 
    watt2.set(json["s2"].potencia * 1)
    amp3.set(json["s3"].corrente * 1000); 
    watt3.set(json["s3"].potencia * 1)

    if(json["s1"].ativo) {
        document.querySelector("#amp-1").className = "on"
        document.querySelector("#watt-1").className = "on"
    } else {
        document.querySelector("#amp-1").className = ""
        document.querySelector("#watt-1").className = ""
    }
     if(json["s2"].ativo) {
        document.querySelector("#amp-2").className = "on"
        document.querySelector("#watt-2").className = "on"
    } else {
        document.querySelector("#amp-2").className = ""
        document.querySelector("#watt-2").className = ""
    }

     if(json["s3"].ativo) {
        document.querySelector("#amp-3").className = "on"
        document.querySelector("#watt-3").className = "on"
    } else {
        document.querySelector("#amp-3").className = ""
        document.querySelector("#watt-3").className = ""
    }

}