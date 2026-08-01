
const questions=[
["Numele organizației?","text"],
["Domeniul de activitate?","text"],
["Folosiți software în activitatea firmei?",["DA","NU","NU ȘTIU"]],
["Folosiți ChatGPT, Copilot sau alte instrumente AI?",["DA","NU","NU ȘTIU"]],
["Aveți automatizări care clasifică, recomandă sau generează rezultate?",["DA","NU","NU ȘTIU"]],
["Folosiți AI pentru clienți sau angajați?",["DA","NU","NU ȘTIU"]]
];

let pos=0, data=[];

function render(){
 let app=document.getElementById("app");
 let q=questions[pos];
 app.innerHTML=`<div class="card"><h2>Pas ${pos+1}/${questions.length}</h2><h3>${q[0]}</h3></div>`;
 let c=app.firstChild;
 if(q[1]=="text"){
   let i=document.createElement("input");
   let b=document.createElement("button"); b.innerText="Continuă";
   b.onclick=()=>{data.push(i.value);next()};
   c.append(i,b);
 } else {
   q[1].forEach(a=>{
    let b=document.createElement("button"); b.innerText=a;
    b.onclick=()=>{data.push(a);next()};
    c.append(b);
   });
 }
}

function next(){pos++;pos<questions.length?render():report()}

function report(){
 let org=data[0]||"Organizație";
 let ai=data.includes("DA");
 let text=`
EU-112 AI ASSESSMENT REPORT

Organizație: ${org}

REZULTAT:
${ai?"AI IDENTIFICAT - necesită analiză":"Nu au fost identificați indicatori AI pe baza răspunsurilor"}

ELEMENTE ANALIZATE:
${data.length}

CONSTĂRI:
- Utilizare software evaluată
- Utilizare AI evaluată
- Automatizări evaluate

ACȚIUNI RECOMANDATE:
1. Inventar sisteme AI
2. Identificare utilizări
3. Păstrarea dovezilor evaluării

Assessment ID: EU112-${Date.now()}
Version: 1.0
`;

document.getElementById("app").innerHTML=`
<div class="card">
<h2>EU-112 AI Assessment</h2>
<table>
<tr><td>Organizație</td><td>${org}</td></tr>
<tr><td>Status</td><td>${ai?"AI IDENTIFICAT":"Fără indicator AI"}</td></tr>
<tr><td>Elemente analizate</td><td>${data.length}</td></tr>
</table>
<button onclick="download()">DESCARCĂ DOCUMENTUL</button>
</div>`;

window.download=()=>{
 let blob=new Blob([text],{type:"text/plain"});
 let a=document.createElement("a");
 a.href=URL.createObjectURL(blob);
 a.download="EU-112-AI-Assessment.txt";
 a.click();
}
}
render();
