import{d as T,r as x,p as I,q as V,c as p,o,a,b as l,w as s,u as t,m as B,J as R,e as g,P as Q,g as v,h as C,F as y,i as $,t as i,n as D,j as O}from"./app-efulhXh7.js";import{_ as h}from"./index-DNSBEiLm.js";import{_ as W}from"./NavFooter.vue_vue_type_script_setup_true_lang-pgRUZ3I1.js";import{a as z,b as J,_ as K}from"./CardHeader.vue_vue_type_script_setup_true_lang-C0z-GdSP.js";import{_ as G}from"./CardDescription.vue_vue_type_script_setup_true_lang-CmcrpD7q.js";import{_ as H,a as U,b,c,d as X,e as u}from"./TableHeader.vue_vue_type_script_setup_true_lang-BYB1nJdW.js";import{u as Y,a as Z}from"./useQuery-DZQKhNjt.js";import{L as ee}from"./loader-circle-dNhnotDL.js";import{C as te}from"./circle-minus-CHQ4TYvL.js";import{F as ae,A as se,a as le}from"./file-text-j0GWrC5A.js";const ne={class:"flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8"},re={class:"not-has-[nav]:hidden mb-6 w-full lg:px-40"},oe={class:"flex items-center justify-between gap-4 w-full"},ie={class:"flex items-center gap-4"},ue={class:"min-h-screen flex flex-col w-full"},de={class:"flex-1 w-full lg:px-40 lg:pt-10"},ce={class:"text-green-500 flex items-center justify-center"},fe={class:"text-red-500 flex items-center justify-center"},me=["href"],pe={class:"text-wrap text-[13px]"},ge={class:"text-nowrap"},_e={class:"text-nowrap"},xe={class:"text-nowrap"},ve={key:0},be={class:"flex justify-between items-center mt-8"},Ne=T({__name:"Welcome",setup(we){Y();const f=x(1),F=x(""),P=x([]),d=x({currentPage:1,lastPage:1,hasMorePages:!1}),N=async()=>(await O.post("/graphql",{query:`
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
  `,variables:{page:f.value,first:20}})).data.data,{data:w,isPending:A,isFetching:q,isLoading:M}=Z({queryKey:["guestFetchFiles",f],queryFn:N});I(()=>{var r,e;(e=(r=w.value)==null?void 0:r.welcome)!=null&&e.filesListPaginated&&(P.value=w.value.welcome.filesListPaginated.data,d.value=w.value.welcome.filesListPaginated.paginatorInfo)});const k=V(()=>{const r=F.value.toLowerCase();return P.value.filter(e=>{var n,_,m,L,S;return((n=e.title)==null?void 0:n.toLowerCase().includes(r))||((m=(_=e.ordinanceNumber)==null?void 0:_.toLowerCase())==null?void 0:m.includes(r))||((S=(L=e.author.name)==null?void 0:L.toLowerCase())==null?void 0:S.includes(r))})}),j=()=>{f.value<d.value.lastPage&&f.value++},E=()=>{f.value>1&&f.value--};return(r,e)=>(o(),p(y,null,[a(t(B),{title:"Welcome"},{default:s(()=>e[0]||(e[0]=[l("link",{rel:"preconnect",href:"https://rsms.me/"},null,-1),l("link",{rel:"stylesheet",href:"https://rsms.me/inter/inter.css"},null,-1)])),_:1}),l("div",ne,[l("header",re,[l("nav",oe,[e[3]||(e[3]=R('<div class="flex items-center gap-3"><img src="/app-logo.jpg" alt="Logo" class="h-10 w-auto"><div class="flex flex-col leading-tight"><div class="hidden sm:flex flex-col"><span class="text-base font-semibold text-[#1b1b18] text-[14px] dark:text-white"> Legislative MS </span><span class="text-sm text-gray-500 text-[12px] dark:text-gray-400"> Legislative Management System </span></div><span class="block sm:hidden text-base font-semibold text-[#1b1b18] dark:text-white"> LMS </span></div></div>',1)),l("div",ie,[a(t(Q),{href:r.route("login"),class:"inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"},{default:s(()=>e[1]||(e[1]=[g(" Log in ")])),_:1},8,["href"]),a(h,{class:"inline-block rounded-sm"},{default:s(()=>e[2]||(e[2]=[g(" LMS ")])),_:1})])])]),l("div",ue,[l("main",de,[a(t(K),{class:"shadow-none"},{default:s(()=>[a(t(z),null,{default:s(()=>[a(t(G),{class:"font-bold"},{default:s(()=>e[4]||(e[4]=[g("Ordinances")])),_:1})]),_:1}),a(t(J),null,{default:s(()=>[a(t(H),null,{default:s(()=>[a(t(U),null,{default:s(()=>[a(t(b),null,{default:s(()=>[a(t(c),{class:"w-[50px]"},{default:s(()=>e[5]||(e[5]=[l("small",null,"#",-1)])),_:1}),a(t(c),{class:"w-[50px]"},{default:s(()=>e[6]||(e[6]=[l("small",null,"File",-1)])),_:1}),a(t(c),{class:"w-[300px]"},{default:s(()=>e[7]||(e[7]=[l("small",null,"Title",-1)])),_:1}),a(t(c),null,{default:s(()=>e[8]||(e[8]=[l("small",null,"Ordinance Number",-1)])),_:1}),a(t(c),null,{default:s(()=>e[9]||(e[9]=[l("small",null,"Author",-1)])),_:1}),a(t(c),null,{default:s(()=>e[10]||(e[10]=[l("small",null,"Mun. Status",-1)])),_:1}),a(t(c),null,{default:s(()=>e[11]||(e[11]=[l("small",null,"Prov. Status",-1)])),_:1})]),_:1})]),_:1}),!t(M)&&!t(q)?(o(),v(t(X),{key:0},{default:s(()=>[t(A)?(o(),v(t(b),{key:0},{default:s(()=>[a(t(u),{colspan:"10",class:"text-center"},{default:s(()=>[l("small",ce,[a(t(ee),{class:"mr-2 w-5"}),e[12]||(e[12]=g(" Loading... "))])]),_:1})]),_:1})):k.value.length===0?(o(),v(t(b),{key:1},{default:s(()=>[a(t(u),{colspan:"10",class:"text-center"},{default:s(()=>[l("small",fe,[a(t(te),{class:"mr-2 w-5"}),e[13]||(e[13]=g(" No Data Found "))])]),_:1})]),_:1})):(o(!0),p(y,{key:2},$(k.value,(n,_)=>(o(),v(t(b),{key:n.encrypted_id},{default:s(()=>[a(t(u),null,{default:s(()=>[l("small",null,i(_+1),1)]),_:2},1024),a(t(u),null,{default:s(()=>[l("a",{href:`/storage/files/${n.file}`,target:"_blank"},[a(t(ae),{class:"w-5 h-5 text-green-500"})],8,me)]),_:2},1024),a(t(u),{class:"pr-5"},{default:s(()=>[l("div",pe,i(n.title),1)]),_:2},1024),a(t(u),null,{default:s(()=>[l("small",ge,i(n.ordinanceNumber??"-"),1)]),_:2},1024),a(t(u),{class:"pr-5"},{default:s(()=>[l("div",_e,[l("b",null,i(n.author.name),1)]),e[15]||(e[15]=l("div",null,[l("small",{class:"text-blue-500"},"Co Authors:")],-1)),(o(!0),p(y,null,$(n.coAuthors,m=>(o(),p("div",{key:m.official.name},[l("small",xe,i(m.official.name),1)]))),128)),n.coAuthors.length==0?(o(),p("div",ve,e[14]||(e[14]=[l("small",null,"None",-1)]))):C("",!0)]),_:2},1024),a(t(u),null,{default:s(()=>[l("small",{class:D(n.municipalStatus==1?"text-wrap text-red-500":"text-wrap text-green-500")},i(n.municipalStatus==1?"Draft":"Approved"),3)]),_:2},1024),a(t(u),null,{default:s(()=>[l("small",{class:D(n.provincialStatus==1?"text-wrap text-red-500":n.provincialStatus==2?"text-wrap text-green-500":"text-wrap text-gray-500")},i(n.provincialStatus==null?"-":n.provincialStatus==1?"Disapproved":"Approved"),3)]),_:2},1024)]),_:2},1024))),128))]),_:1})):C("",!0)]),_:1}),l("div",be,[a(h,{disabled:d.value.currentPage<=1,onClick:E,class:"cursor-pointer"},{default:s(()=>[a(t(se))]),_:1},8,["disabled"]),l("small",null," Pages "+i(d.value.currentPage)+" of "+i(d.value.lastPage),1),a(h,{disabled:d.value.currentPage>=d.value.lastPage,onClick:j,class:"cursor-pointer"},{default:s(()=>[a(t(le))]),_:1},8,["disabled"])])]),_:1})]),_:1})]),a(W)])])],64))}});export{Ne as default};
