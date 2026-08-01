const questions=[
{q:"Cu ce se ocupă firma?",type:"text"},
{q:"Folosiți software în activitatea firmei?",a:["DA","NU","NU ȘTIU"]},
{q:"Folosiți instrumente AI precum ChatGPT sau Copilot?",a:["DA","NU","NU ȘTIU"]},
{q:"Aveți procese automate care recomandă sau clasifică?",a:["DA","NU","NU ȘTIU"]},
{q:"Vindeți sau importați produse cu software?",a:["DA","NU","NU ȘTIU"]}
];

let i=0, answers=[];

function show(){
 const box=document.getElementById("box");
 const q=questions[i];
 box.innerHTML="";
 const card=document.createElement("div");
 card.className="card";
 card.innerHTML="<h2>"+q.q+"</h2>";
 box.appendChild(card);

 if(q.type==="text"){
  const input=document.createElement("input");
  const btn=document.createElement("button");
  btn.innerText="Continuă";
  btn.onclick=()=>{answers.push(input.value);next()};
  card.append(input,btn);
 } else {
  q.a.forEach(a=>{
   const btn=document.createElement("button");
   btn.innerText=a;
   btn.onclick=()=>{answers.push(a);next()};
   card.appendChild(btn);
  });
 }
}

function next(){
 i++;
 i<questions.length?show():finish();
}

function finish(){
 const ai=answers.includes("DA");
 document.getElementById("box").innerHTML=`
 <div class="card">
 <h2>Evaluare finalizată</h2>
 <p><b>Status:</b> ${ai?"AI identificat / necesită analiză":"Fără indicator AI identificat pe baza răspunsurilor"}</p>
 <p>Elemente analizate: ${answers.length}</p>
 <button onclick="alert('Documentul va fi generat în versiunea următoare')">GENEREAZĂ DOCUMENT</button>
 </div>`;
}
show();
