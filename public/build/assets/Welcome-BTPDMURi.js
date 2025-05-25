import{d as M,r as _,p as E,q as j,c as p,o as u,a as t,b as l,w as s,u as a,m as T,J as I,e as x,P as V,g as w,F as h,i as L,t as o,h as B,n as C,j as R}from"./app-BqAfXH8t.js";import{_ as y}from"./index-BvwjPUS9.js";import{_ as Q}from"./NavFooter.vue_vue_type_script_setup_true_lang-BMIFv135.js";import{a as O,b as W,_ as z}from"./CardHeader.vue_vue_type_script_setup_true_lang-CDXYD8B8.js";import{_ as J}from"./CardDescription.vue_vue_type_script_setup_true_lang-DyL9sfRR.js";import{_ as K,a as G,b as v,c,d as H,e as i,f as U}from"./Skeleton.vue_vue_type_script_setup_true_lang-DFfGL6pa.js";import{u as X,a as Y}from"./Skeleton.vue_vue_type_script_setup_true_lang-n19xrzSB.js";import{C as Z}from"./circle-minus-CRoEJ2u5.js";import{F as ee,A as te,a as ae}from"./file-text-CfAX3eyI.js";const se={class:"flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8"},le={class:"not-has-[nav]:hidden mb-6 w-full lg:px-40"},ne={class:"flex items-center justify-between gap-4 w-full"},re={class:"flex items-center gap-4"},oe={class:"min-h-screen flex flex-col w-full"},ie={class:"flex-1 w-full lg:px-40 lg:pt-10"},ue={class:"text-red-500 flex items-center justify-center"},de=["href"],ce={class:"text-wrap text-[13px]"},fe={class:"text-nowrap"},me={class:"text-nowrap"},pe={class:"text-nowrap"},ge={key:0},_e={class:"flex justify-between items-center mt-8"},De=M({__name:"Welcome",setup(xe){X();const f=_(1),D=_(""),P=_([]),d=_({currentPage:1,lastPage:1,hasMorePages:!1}),F=async()=>(await R.post("/graphql",{query:`
    query ($page: Int, $first: Int!)  {
      welcome(page: $page, first: $first) {
        filesListPaginated {
          data {
            encrypted_id
            municipalStatus
            provincialStatus
            title
            firstReadingDate
            secondReadingDate
            thirdReadingDate
            ordinanceNumber
            finalTitle
            enactmentDate
            lceapprovalDate
            transmittalDate
            spslapprovalDate
            postStatus
            publishStatus
            file
            author {
              encrypted_id
              name
            }
            coAuthors {
              official {
                encrypted_id
                name
              }
            }
          }
          paginatorInfo {
            currentPage
            lastPage
            total
            perPage
            hasMorePages
          }
        }
      }
    }
  `,variables:{page:f.value,first:20}})).data.data,{data:b,isPending:ve,isFetching:N,isLoading:be}=Y({queryKey:["guestFetchFiles",f],queryFn:F});E(()=>{var r,e;(e=(r=b.value)==null?void 0:r.welcome)!=null&&e.filesListPaginated&&(P.value=b.value.welcome.filesListPaginated.data,d.value=b.value.welcome.filesListPaginated.paginatorInfo)});const k=j(()=>{const r=D.value.toLowerCase();return P.value.filter(e=>{var n,g,m,S,$;return((n=e.title)==null?void 0:n.toLowerCase().includes(r))||((m=(g=e.ordinanceNumber)==null?void 0:g.toLowerCase())==null?void 0:m.includes(r))||(($=(S=e.author.name)==null?void 0:S.toLowerCase())==null?void 0:$.includes(r))})}),A=()=>{f.value<d.value.lastPage&&f.value++},q=()=>{f.value>1&&f.value--};return(r,e)=>(u(),p(h,null,[t(a(T),{title:"Welcome"},{default:s(()=>e[0]||(e[0]=[l("link",{rel:"preconnect",href:"https://rsms.me/"},null,-1),l("link",{rel:"stylesheet",href:"https://rsms.me/inter/inter.css"},null,-1)])),_:1}),l("div",se,[l("header",le,[l("nav",ne,[e[3]||(e[3]=I('<div class="flex items-center gap-3"><img src="/app-logo.jpg" alt="Logo" class="h-10 w-auto"><div class="flex flex-col leading-tight"><div class="hidden sm:flex flex-col"><span class="text-base font-semibold text-[#1b1b18] text-[14px] dark:text-white"> Legislative MS </span><span class="text-sm text-gray-500 text-[12px] dark:text-gray-400"> Legislative Management System </span></div><span class="block sm:hidden text-base font-semibold text-[#1b1b18] dark:text-white"> LMS </span></div></div>',1)),l("div",re,[t(a(V),{href:r.route("login"),class:"inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"},{default:s(()=>e[1]||(e[1]=[x(" Log in ")])),_:1},8,["href"]),t(y,{class:"inline-block rounded-sm"},{default:s(()=>e[2]||(e[2]=[x(" LMS ")])),_:1})])])]),l("div",oe,[l("main",ie,[t(a(z),{class:"shadow-none"},{default:s(()=>[t(a(O),null,{default:s(()=>[t(a(J),{class:"font-bold"},{default:s(()=>e[4]||(e[4]=[x("Ordinances")])),_:1})]),_:1}),t(a(W),null,{default:s(()=>[t(a(K),null,{default:s(()=>[t(a(G),null,{default:s(()=>[t(a(v),null,{default:s(()=>[t(a(c),{class:"w-[50px]"},{default:s(()=>e[5]||(e[5]=[l("small",null,"#",-1)])),_:1}),t(a(c),{class:"w-[50px]"},{default:s(()=>e[6]||(e[6]=[l("small",null,"File",-1)])),_:1}),t(a(c),{class:"w-[300px]"},{default:s(()=>e[7]||(e[7]=[l("small",null,"Title",-1)])),_:1}),t(a(c),null,{default:s(()=>e[8]||(e[8]=[l("small",null,"Ordinance Number",-1)])),_:1}),t(a(c),null,{default:s(()=>e[9]||(e[9]=[l("small",null,"Author",-1)])),_:1}),t(a(c),null,{default:s(()=>e[10]||(e[10]=[l("small",null,"Mun. Status",-1)])),_:1}),t(a(c),null,{default:s(()=>e[11]||(e[11]=[l("small",null,"Prov. Status",-1)])),_:1})]),_:1})]),_:1}),t(a(H),null,{default:s(()=>[a(N)?(u(),w(a(v),{key:0},{default:s(()=>[t(a(i),{colspan:"10",class:"text-center"},{default:s(()=>[t(U)]),_:1})]),_:1})):k.value.length===0?(u(),w(a(v),{key:1},{default:s(()=>[t(a(i),{colspan:"10",class:"text-center"},{default:s(()=>[l("small",ue,[t(a(Z),{class:"mr-2 w-5"}),e[12]||(e[12]=x(" No Data Found "))])]),_:1})]),_:1})):(u(!0),p(h,{key:2},L(k.value,(n,g)=>(u(),w(a(v),{key:n.encrypted_id},{default:s(()=>[t(a(i),null,{default:s(()=>[l("small",null,o(g+1),1)]),_:2},1024),t(a(i),null,{default:s(()=>[l("a",{href:`/storage/files/${n.file}`,target:"_blank"},[t(a(ee),{class:"w-5 h-5 text-green-500"})],8,de)]),_:2},1024),t(a(i),{class:"pr-5"},{default:s(()=>[l("div",ce,o(n.title),1)]),_:2},1024),t(a(i),null,{default:s(()=>[l("small",fe,o(n.ordinanceNumber??"-"),1)]),_:2},1024),t(a(i),{class:"pr-5"},{default:s(()=>[l("div",me,[l("b",null,o(n.author.name),1)]),e[14]||(e[14]=l("div",null,[l("small",{class:"text-blue-500"},"Co Authors:")],-1)),(u(!0),p(h,null,L(n.coAuthors,m=>(u(),p("div",{key:m.official.name},[l("small",pe,o(m.official.name),1)]))),128)),n.coAuthors.length==0?(u(),p("div",ge,e[13]||(e[13]=[l("small",null,"None",-1)]))):B("",!0)]),_:2},1024),t(a(i),null,{default:s(()=>[l("small",{class:C(n.municipalStatus==1?"text-wrap text-red-500":"text-wrap text-green-500")},o(n.municipalStatus==1?"Draft":"Approved"),3)]),_:2},1024),t(a(i),null,{default:s(()=>[l("small",{class:C(n.provincialStatus==1?"text-wrap text-red-500":n.provincialStatus==2?"text-wrap text-green-500":"text-wrap text-gray-500")},o(n.provincialStatus==null?"-":n.provincialStatus==1?"Disapproved":"Approved"),3)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),l("div",_e,[t(y,{disabled:d.value.currentPage<=1,onClick:q,class:"cursor-pointer"},{default:s(()=>[t(a(te))]),_:1},8,["disabled"]),l("small",null," Pages "+o(d.value.currentPage)+" of "+o(d.value.lastPage),1),t(y,{disabled:d.value.currentPage>=d.value.lastPage,onClick:A,class:"cursor-pointer"},{default:s(()=>[t(a(ae))]),_:1},8,["disabled"])])]),_:1})]),_:1})]),t(Q)])])],64))}});export{De as default};
