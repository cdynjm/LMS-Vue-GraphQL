import{F as h,U as b,_ as g}from"./AppLayout.vue_vue_type_script_setup_true_lang-ukEacdAI.js";import{d as x,c as k,o as C,a as t,u as e,m as v,w as s,b as l,e as d,t as n,F as w,j as F}from"./app-CtoEL4a4.js";import{u as j,a as q}from"./useQuery-CZXxaNs8.js";import{_ as i,a as u,b as c}from"./CardHeader.vue_vue_type_script_setup_true_lang-C1WsUdX_.js";import{_ as f}from"./CardTitle.vue_vue_type_script_setup_true_lang-BqkMTUf_.js";import{c as p}from"./index-iWvz-iZK.js";import"./NavFooter.vue_vue_type_script_setup_true_lang-CwG4qb4N.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-CdvQ3L--.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=p("FileArchiveIcon",[["path",{d:"M10 12v-1",key:"v7bkov"}],["path",{d:"M10 18v-2",key:"1cjy8d"}],["path",{d:"M10 7V6",key:"dljcrl"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01",key:"gkbcor"}],["circle",{cx:"10",cy:"20",r:"2",key:"1xzdoj"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=p("UsersIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),V={class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4"},$={class:"text-2xl font-bold"},U={class:"text-2xl font-bold"},A={class:"text-2xl font-bold"},B={class:"text-2xl font-bold"},G=x({__name:"Dashboard",setup(H){const m=[{title:"Dashboard",href:"/admin/dashboard"}];j();const _=async()=>(await F.post("/graphql",{query:`
        query {
            dashboard {
                adminsCount
                officialsCount
                categoriesCount
                filesCount
            }
        }
    `})).data.data,{isPending:I,data:r,error:N,isFetching:Q}=q({queryKey:["fetchDashboardCounts"],queryFn:_});return(y,o)=>(C(),k(w,null,[t(e(v),{title:"Dashboard"}),t(g,{breadcrumbs:m},{default:s(()=>[l("div",V,[t(e(i),{class:"pt-0"},{default:s(()=>[t(e(u),{class:"flex items-center justify-between bg-green-50 py-2"},{default:s(()=>[t(e(f),null,{default:s(()=>o[0]||(o[0]=[d("Admins")])),_:1}),t(e(D),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(c),null,{default:s(()=>{var a;return[l("p",$,n((a=e(r))==null?void 0:a.dashboard.adminsCount),1)]}),_:1})]),_:1}),t(e(i),{class:"pt-0"},{default:s(()=>[t(e(u),{class:"flex items-center justify-between bg-blue-50 py-2"},{default:s(()=>[t(e(f),null,{default:s(()=>o[1]||(o[1]=[d("Categories")])),_:1}),t(e(h),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(c),null,{default:s(()=>{var a;return[l("p",U,n((a=e(r))==null?void 0:a.dashboard.categoriesCount),1)]}),_:1})]),_:1}),t(e(i),{class:"pt-0"},{default:s(()=>[t(e(u),{class:"flex items-center justify-between bg-red-50 py-2"},{default:s(()=>[t(e(f),null,{default:s(()=>o[2]||(o[2]=[d("Files")])),_:1}),t(e(M),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(c),null,{default:s(()=>{var a;return[l("p",A,n((a=e(r))==null?void 0:a.dashboard.filesCount),1)]}),_:1})]),_:1}),t(e(i),{class:"pt-0"},{default:s(()=>[t(e(u),{class:"flex items-center justify-between bg-orange-50 py-2"},{default:s(()=>[t(e(f),null,{default:s(()=>o[3]||(o[3]=[d("Officials")])),_:1}),t(e(b),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(c),null,{default:s(()=>{var a;return[l("p",B,n((a=e(r))==null?void 0:a.dashboard.officialsCount),1)]}),_:1})]),_:1})])]),_:1})],64))}});export{G as default};
