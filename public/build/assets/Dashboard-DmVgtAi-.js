import{F as h,U as y,_ as g}from"./AppLayout.vue_vue_type_script_setup_true_lang-CCaLD2XR.js";import{d as x,c as C,o as k,a as t,u as e,m as w,w as s,b as l,e as n,t as d,F as q,j as F}from"./app-efulhXh7.js";import{u as v,a as D}from"./useQuery-DZQKhNjt.js";import{_ as u,a as i,b as f}from"./CardHeader.vue_vue_type_script_setup_true_lang-C0z-GdSP.js";import{_ as c}from"./CardTitle.vue_vue_type_script_setup_true_lang-Diy-pYos.js";import{c as m}from"./index-DNSBEiLm.js";import"./NavFooter.vue_vue_type_script_setup_true_lang-pgRUZ3I1.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-DsqOc39k.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=m("FileIcon",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=m("UsersIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),$={class:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4"},U={class:"text-2xl font-bold"},V={class:"text-2xl font-bold"},B={class:"text-2xl font-bold"},I={class:"text-2xl font-bold"},Z=x({__name:"Dashboard",setup(N){const _=[{title:"Dashboard",href:"/admin/dashboard"}];v();const p=async()=>(await F.post("/graphql",{query:`
        query {
            dashboard {
                adminsCount
                officialsCount
                categoriesCount
                filesCount
            }
        }
    `})).data.data,{isPending:H,data:r,error:Q,isFetching:z}=D({queryKey:["fetchDashboardCounts"],queryFn:p});return(b,o)=>(k(),C(q,null,[t(e(w),{title:"Dashboard"}),t(g,{breadcrumbs:_},{default:s(()=>[l("div",$,[t(e(u),{class:"pt-0"},{default:s(()=>[t(e(i),{class:"flex items-center justify-between bg-green-50 py-2"},{default:s(()=>[t(e(c),null,{default:s(()=>o[0]||(o[0]=[n("Admins")])),_:1}),t(e(M),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(f),null,{default:s(()=>{var a;return[l("p",U,d((a=e(r))==null?void 0:a.dashboard.adminsCount),1)]}),_:1})]),_:1}),t(e(u),{class:"pt-0"},{default:s(()=>[t(e(i),{class:"flex items-center justify-between bg-blue-50 py-2"},{default:s(()=>[t(e(c),null,{default:s(()=>o[1]||(o[1]=[n("Categories")])),_:1}),t(e(h),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(f),null,{default:s(()=>{var a;return[l("p",V,d((a=e(r))==null?void 0:a.dashboard.categoriesCount),1)]}),_:1})]),_:1}),t(e(u),{class:"pt-0"},{default:s(()=>[t(e(i),{class:"flex items-center justify-between bg-red-50 py-2"},{default:s(()=>[t(e(c),null,{default:s(()=>o[2]||(o[2]=[n("Files")])),_:1}),t(e(j),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(f),null,{default:s(()=>{var a;return[l("p",B,d((a=e(r))==null?void 0:a.dashboard.filesCount),1)]}),_:1})]),_:1}),t(e(u),{class:"pt-0"},{default:s(()=>[t(e(i),{class:"flex items-center justify-between bg-orange-50 py-2"},{default:s(()=>[t(e(c),null,{default:s(()=>o[3]||(o[3]=[n("Officials")])),_:1}),t(e(y),{class:"w-5 h-5 text-muted-foreground"})]),_:1}),t(e(f),null,{default:s(()=>{var a;return[l("p",I,d((a=e(r))==null?void 0:a.dashboard.officialsCount),1)]}),_:1})]),_:1})])]),_:1})],64))}});export{Z as default};
