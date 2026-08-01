
let data=null, answers={}, idx=0, org={};
const $=s=>document.querySelector(s);
async function load(){ data=await fetch('questions.json').then(r=>r.json()); }
load();

function startAssessment(){
 if(!data){setTimeout(startAssessment,200);return}
 $('#assessment').classList.remove('hidden'); $('#result').classList.add('hidden');
 idx=-1; renderOrg(); $('#assessment').scrollIntoView({behavior:'smooth'});
}
function renderOrg(){
 $('#step').innerHTML=`<h2>Identificarea organizației</h2>
 <p>Datele intră în evaluarea inițială și în amprenta acesteia.</p>
 <label>Denumirea legală</label><input id="company" placeholder="Ex. ABC SRL">
 <label>CUI / identificator</label><input id="cui" placeholder="Ex. RO12345678">
 <label>Persoană responsabilă</label><input id="responsible" placeholder="Nume și rol">
 <label>Domeniu</label><input id="sector" placeholder="Ex. servicii profesionale">
 <button class="primary" onclick="saveOrg()">CONTINUĂ</button>`;
}
function saveOrg(){
 org={company:$('#company').value.trim(),cui:$('#cui').value.trim(),responsible:$('#responsible').value.trim(),sector:$('#sector').value.trim()};
 if(!org.company){alert('Completează denumirea legală.');return} idx=0; renderQ();
}
function renderQ(){
 const q=data.questions[idx], pct=Math.round((idx/data.questions.length)*100);
 $('#step').innerHTML=`<div>${q.module}. ${q.module_name}</div><div class="progress"><div class="bar" style="width:${pct}%"></div></div>
 <div>${idx+1} / ${data.questions.length}</div><div class="q">${q.text}</div>
 <div class="choices">${q.options.map(o=>`<button onclick='answer(${JSON.stringify(q.id)},${JSON.stringify(o)})'>${o}</button>`).join('')}</div>`;
}
function answer(id,val){answers[id]=val; idx++; if(idx<data.questions.length) renderQ(); else finish();}
function scoreVal(v){return v==='Da'?1:v==='Parțial'?.5:0}
async function sha256(txt){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(txt));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function finish(){
 const byModule={}; data.questions.forEach(q=>{(byModule[q.module]??=[]).push(scoreVal(answers[q.id]))});
 const moduleScores=Object.fromEntries(Object.entries(byModule).map(([m,a])=>[m,Math.round(100*a.reduce((x,y)=>x+y,0)/a.length)]));
 const overall=Math.round(Object.values(moduleScores).reduce((a,b)=>a+b,0)/Object.values(moduleScores).length);
 const timestamp=new Date().toISOString(), id='EU112-'+Date.now().toString(36).toUpperCase();
 const record={id,timestamp,organisation:org,overall,moduleScores,answers,version:data.version};
 const hash=await sha256(JSON.stringify(record));
 localStorage.setItem(id,JSON.stringify({...record,hash}));
 const gaps=data.questions.filter(q=>!['Da'].includes(answers[q.id])).length;
 $('#assessment').classList.add('hidden'); $('#result').classList.remove('hidden');
 $('#result').innerHTML=`<h2>Evaluarea inițială a fost generată</h2>
 <div class="result-grid"><div class="card"><div class="score">${overall}%</div><b>Readiness indicativ</b><p>${gaps} răspunsuri necesită clarificare sau acțiune.</p></div>
 <div class="card"><b>Verification ID</b><p>${id}</p><b>Timestamp</b><p>${timestamp}</p></div></div>
 <h3>Scor pe module</h3>${Object.entries(moduleScores).map(([m,s])=>`<p>${m} — ${data.questions.find(q=>q.module===m).module_name}: <b>${s}%</b></p>`).join('')}
 <div class="card"><b>SHA-256</b><p class="hash">${hash}</p><p>Amprenta dovedește integritatea exactă a acestui record local. Pentru ancorare OTS/Bitcoin și verificare publică este necesar backend-ul Cloudflare.</p></div>
 <div class="actions"><button class="primary" onclick="downloadReport('${id}')">DESCARCĂ EVALUAREA</button><button onclick="openVerify('${id}')">VERIFICARE LA DISTANȚĂ</button></div>
 <p class="fine">Rezultatul este o evaluare inițială bazată pe declarațiile organizației; nu constituie certificare sau constatare oficială de conformitate.</p>`;
 $('#result').scrollIntoView({behavior:'smooth'});
}
function downloadReport(id){
 const r=JSON.parse(localStorage.getItem(id)); const blob=new Blob([JSON.stringify(r,null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=id+'-assessment.json';a.click();URL.revokeObjectURL(a.href);
}
function openVerify(id){location.href='verify.html?id='+encodeURIComponent(id)}
function showDemo(){
 org={company:'EXEMPLU DEMO SRL',cui:'RO-DEMO',responsible:'Responsabil AI — Demo',sector:'Servicii'};
 if(!data){setTimeout(showDemo,200);return}
 data.questions.forEach((q,i)=>answers[q.id]=i%5===0?'Parțial':'Da'); idx=data.questions.length; finish();
}
