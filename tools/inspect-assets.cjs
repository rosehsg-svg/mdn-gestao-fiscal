'use strict';
(async()=>{
for (const query of ['logo','mdn','prateado']) {
try {
const r=await fetch('https://mdnservicosmedicos.com/wp-json/wp/v2/media?per_page=100&search='+query,{signal:AbortSignal.timeout(25000)});
const data=await r.json();
if(Array.isArray(data))for(const x of data)console.log(JSON.stringify({title:x.title?.rendered,url:x.source_url,width:x.media_details?.width,height:x.media_details?.height}));
else console.log('Media API: HTTP '+r.status);
}catch(e){console.log('Media API unavailable: '+e.message)}
}
})().catch(e=>{console.error(e.message);process.exitCode=1});
