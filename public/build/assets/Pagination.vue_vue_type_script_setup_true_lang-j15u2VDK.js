import{c,_ as o}from"./index-vWOFmHOK.js";import{d as m,c as p,o as u,a as s,b as f,u as a,w as n,t as i}from"./app-GRqBZMjc.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=c("ArrowLeftIcon",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=c("ArrowRightIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),P={class:"flex justify-between items-center mt-8"},x=m({__name:"Pagination",props:{currentPage:{},lastPage:{}},emits:["previous","next"],setup(l,{emit:k}){const e=l;return(r,t)=>(u(),p("div",P,[s(a(o),{disabled:e.currentPage<=1,onClick:t[0]||(t[0]=d=>r.$emit("previous")),class:"cursor-pointer"},{default:n(()=>[s(a(g))]),_:1},8,["disabled"]),f("small",null,"Pages "+i(e.currentPage)+" of "+i(e.lastPage),1),s(a(o),{disabled:e.currentPage>=e.lastPage,onClick:t[1]||(t[1]=d=>r.$emit("next")),class:"cursor-pointer"},{default:n(()=>[s(a(_))]),_:1},8,["disabled"])]))}});export{x as _};
