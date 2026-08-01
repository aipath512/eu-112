export default {
 async fetch(request, env) {
   const url=new URL(request.url);
   if(request.method==='POST' && url.pathname==='/api/assessment'){
     const body=await request.json();
     // Production: validate payment, persist canonical JSON to R2, index in D1,
     // create server-side hash/timestamp and enqueue OTS anchoring.
     return Response.json({ok:false,code:'CONFIG_REQUIRED',message:'Configure D1/R2/Stripe/OTS bindings before production.'},{status:501});
   }
   return new Response('EU-112 Worker', {status:200});
 }
};