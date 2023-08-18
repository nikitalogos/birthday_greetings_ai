import{p as i}from"./params.12f6eb38.js";import{C as _,L as l}from"./entry.05a5f92c.js";function h(t,e){var r=document.createElement("a");r.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),r.setAttribute("download",t),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)}const u="https://birthday-greetings-ai.fly.dev",n=_({token:null,is_in_progress:!1,chat_history:[],response_or_error(t){return t.completed?t.is_error?`Error: ${t.error_str}`:t.response:"Waiting for response..."},export_txt(){const t=this.chat_history.map(e=>`~~~~~~~~~~~~~Prompt~~~~~~~~~~~~~

${e.prompt}

~~~~~~~~~~~~~Response~~~~~~~~~~~~~

${this.response_or_error(e)}`).join(`


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


`);h("birthday_greetings_ai_session.txt",t)},export_json(){const t=JSON.stringify({chat_history:this.chat_history},null,4);h("birthday_greetings_ai_session.json",t)},async run_impl(t){this.is_in_progress=!0;try{const r=await(await fetch(u+"/api/chatbot",{method:"POST",body:JSON.stringify({token:this.token,prompt:t})})).json();if(r.error)throw new Error(r.error);return r.message}finally{this.is_in_progress=!1}},async run(){const t=i.prompt,e=Date.now();let r="",a=!1,o="";const s={timestamp_ms:e,prompt:t,duration_ms:0,response:r,is_error:a,error_str:o,completed:!1};this.chat_history.push(s);try{r=await this.run_impl(t)}catch(c){a=!0,o=c.message}const p=Date.now();s.duration_ms=p-e,s.response=r,s.is_error=a,s.error_str=o,s.completed=!0,this.chat_history.pop(s),this.chat_history.push(s)}});n.can_run=l(()=>i.is_valid&&n.token&&!n.is_in_progress);n.google_translate_url=l(()=>{const t=n.chat_history;if(t.length===0)return null;const e=t[t.length-1];if(e.is_error)return null;const r=encodeURIComponent(e.response),o={Arabic:"ar",Chinese:"zh-CN",Danish:"da",Dutch:"nl",English:"en",French:"fr",German:"de",Hebrew:"he",Hindi:"hi",Italian:"it",Japanese:"ja",Korean:"ko",Norwegian:"no",Polish:"pl",Portuguese:"pt",Russian:"ru",Swedish:"sv",Thai:"th",Turkish:"tr",Spanish:"es"}[i.target_language.value]??"en";return i.prompt,`https://translate.google.com/?sl=auto&tl=${o}&text=${r}&op=translate`});export{n as c};
