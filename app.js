const questions=[
{q:"Folosiți software în activitatea firmei?",a:["DA","NU"]},
{q:"Folosiți instrumente precum ChatGPT, Copilot sau alte servicii AI?",a:["DA","NU","NU ȘTIU"]},
{q:"Doriți documentul complet al evaluării?",a:["DA","NU"]}
];

let i=0;
let answers=[];

function show(){
document.getElementById("question").innerText=questions[i].q;
let box=document.getElementById("answers");
box.innerHTML="";
questions[i].a.forEach(x=>{
let b=document.createElement("button");
b.innerText=x;
b.onclick=()=>{answers.push(x);i++;i<questions.length?show():result();};
box.appendChild(b);
});
}

function result(){
document.getElementById("app").classList.add("hidden");
let r=document.getElementById("result");
r.classList.remove("hidden");
r.innerHTML="<h2>Evaluare finalizată</h2><p>Răspunsuri analizate: "+answers.length+"</p><p>Documentul complet va fi generat după integrarea plății Stripe.</p>";
}
show();
