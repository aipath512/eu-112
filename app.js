const questions=[
{q:"Cu ce se ocupă firma?",type:"text"},
{q:"Folosiți software în activitatea firmei?",a:["DA","NU","NU ȘTIU"]},
{q:"Folosiți instrumente AI precum ChatGPT sau Copilot?",a:["DA","NU","NU ȘTIU"]},
{q:"Aveți procese automate care recomandă sau clasifică?",a:["DA","NU","NU ȘTIU"]},
{q:"Vindeți sau importați produse cu software?",a:["DA","NU","NU ȘTIU"]}
];

let i=0; let answers=[];
function show(){
let b=document.getElementById("box");
let q=questions[i];
b.innerHTML="<div class='card'><h2>"+q.q+"</h2></div>";
let card=b.firstChild;
if(q.type==="text"){
let input=document.createElement("input"); input.style.width="80%"; input.style.padding="10px";
let btn=document.createElement("button"); btn.innerText="Continuă";
btn.onclick=()=>{answers.push(input.value);next()};
card.append(input,btn);
}else{
q.a.forEach(x=>{let btn=document.createElement("button");btn.innerText=x;btn.onclick=()=>{answers.push(x);next()};card.appendChild(btn)})
}}
function next(){i++;i<questions.length?show():finish()}
function finish(){
document.getElementById("box").innerHTML="<div class='card'><h2>Evaluare finalizată</h2><p>Răspunsuri analizate: "+answers.length+"</p><p>Versiune V2 - motor evaluare inițială.</p></div>"
}
show();
