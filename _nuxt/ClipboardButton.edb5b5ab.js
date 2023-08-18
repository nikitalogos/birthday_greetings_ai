import{m as p,y as r,o as l,c,a as o,s as a,t as d,_ as u,l as m}from"./entry.05a5f92c.js";const _=["aria-label"],y={style:{"margin-right":"5px"}};function g(t,e,n,f,h,C){const i=p("tooltip");return t.compact?r((l(),c("button",{key:0,"aria-label":`Copy ${t.name} to clipboard`,onClick:e[0]||(e[0]=s=>t.copy_to_clipboard(s))},[o("i",{class:a(["clipboard icon",{accent:t.accent}])},null,2),o("span",{class:a(["copied",{right:t.popup_right}])},"Copied!",2)],8,_)),[[i]]):(l(),c("button",{key:1,class:"button",onClick:e[1]||(e[1]=s=>t.copy_to_clipboard(s))},[o("span",y,"Copy "+d(t.name),1),o("i",{class:a(["clipboard icon",{accent:t.accent}])},null,2),o("span",{class:a(["copied",{right:t.popup_right}])},"Copied!",2)]))}const b=m({props:{name:{type:String,default:"text"},text:{type:String,required:!0},accent:{type:Boolean,default:!1},compact:{type:Boolean,default:!1},popup_right:{type:Boolean,default:!1}},methods:{copy_to_clipboard_impl(t){const e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e);const n=document.getSelection().rangeCount>0?document.getSelection().getRangeAt(0):!1;e.select(),document.execCommand("copy"),document.body.removeChild(e),n&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(n))},copy_to_clipboard(t){this.copy_to_clipboard_impl(this.text);const e=t.currentTarget.querySelector(".copied");e.classList.add("show"),setTimeout(()=>{e.classList.remove("show")},1e3)}}},"$odxehLue9n"),S=u(b,[["render",g],["__scopeId","data-v-3259d7af"]]);export{S as _};
