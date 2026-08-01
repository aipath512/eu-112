const questions=[
{q:"Cu ce se ocupă firma?",type:"text"},
{q:"Folosiți software în activitatea firmei?",a:["DA","NU","NU ȘTIU"]},
{q:"Folosiți instrumente AI precum ChatGPT sau Copilot?",a:["DA","NU","NU ȘTIU"]},
{q:"Aveți procese automate care recomandă sau clasifică?",a:["DA","NU","NU ȘTIU"]}
];
let i=0,answers=[];
function show(){
const box=document.getElementById("box"),q=questions[i];
box.innerHTML="";
let c=document.createElement("div");c.className="card";
c.innerHTML="<h2>"+q.q+"</h2>";box.appendChild(c);
if(q.type==="text"){let x=document.createElement("input"),b=document.createElement("button");b.innerText="Continuă";b.onclick=()=>{answers.push(x.value);next()};c.append(x,b)}
else q.a.forEach(a=>{let b=document.createElement("button");b.innerText=a;b.onclick=()=>{answers.push(a);next()};c.append(b)})
}
function next(){i++;i<questions.length?show():finish()}
function finish(){
let ai=answers.includes("DA");
document.getElementById("box").innerHTML=`
<div class="card">
<h2>EVALUARE FINALIZATĂ</h2>
<p>Elemente analizate: ${answers.length}</p>
<p>Status: <b>${ai?"AI IDENTIFICAT":"FĂRĂ INDICATOR AI IDENTIFICAT"}</b></p>
<p>Următorul pas: generarea documentului firmei.</p>
<button>GENEREAZĂ DOCUMENTUL FIRMEI</button>
</div>`;
}
show();