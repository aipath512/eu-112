const questions=[
"Organizația utilizează sisteme AI?",
"Există o evidență a sistemelor AI utilizate?",
"Există reguli interne pentru utilizarea AI?"
];
let i=0, score=0;
function render(){
const el=document.getElementById("app");
if(i<questions.length){
el.innerHTML=`<h2>${questions[i]}</h2>
<button onclick="answer(1)">DA</button>
<button onclick="answer(0)">NU</button>`;
}else{
el.innerHTML=`<h2>Rezultat: ${score}/${questions.length}</h2>
<p>Generare raport pregătită.</p>
<a href="report.html">Vezi raport demo</a>`;
}}
function answer(v){score+=v;i++;render()}
render();
