import{F as T,_ as O}from"./AppLayout.vue_vue_type_script_setup_true_lang-BMX_0Q05.js";import{d as G,r as b,p as H,q as J,c as g,o as i,a as t,u as e,m as W,w as l,b as s,h as V,e as P,t as u,g as x,F as C,i as D,P as L,n as j,j as X}from"./app-DyVB8uVv.js";import{_ as I,a as B,b as m,c as o,d as E,e as n,f as M}from"./Skeleton.vue_vue_type_script_setup_true_lang-DHyk1leJ.js";import{_ as N}from"./index-C937B89l.js";import{_ as Y}from"./Input.vue_vue_type_script_setup_true_lang-DxWFPNyO.js";import{u as Z,a as ee,C as R}from"./Skeleton.vue_vue_type_script_setup_true_lang-DsqJI58h.js";import{F as te}from"./file-text-DBYmkvA-.js";import{E as le}from"./eye-CzXyyRDz.js";import{A as ae,a as se}from"./arrow-right-CfIHuNcs.js";import"./NavFooter.vue_vue_type_script_setup_true_lang-D04IC9SS.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-DzrdwzEy.js";const re={class:"p-6 space-y-6"},ne={class:"flex w-full justify-between items-center"},ue={key:0},ie={class:"flex text-md font-bold items-center"},oe={class:"text-center text-red-500 flex items-center justify-center"},de={class:"flex items-center space-x-3"},fe={class:"font-medium"},ce={class:"flex items-center justify-between space-x-4"},me={class:"text-red-500 flex items-center justify-center"},pe=["href"],_e={class:"text-wrap text-[13px]"},ge={class:"text-nowrap"},ve={class:"text-nowrap"},xe={class:"text-nowrap"},ye={key:0},we={class:"flex justify-between items-center mt-8"};function he(k){const y=new Date(k),F=y.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),c=y.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${F} | ${c}`}const Te=G({__name:"Files",props:{id:{}},setup(k){const y=k;Z();const F=[{title:"Files",href:"/user/files/"+y.id}],c=b(1),S=b(""),A=b([]),p=b({currentPage:1,lastPage:1,hasMorePages:!1}),Q=async()=>(await X.post("/graphql",{query:`
    query ($id: String!, $page: Int!, $first: Int!) {
      userfiles(id: $id, page: $page, first: $first) {
        categoryName {
          encrypted_id
          category
        }
        authors {
          encrypted_id
          name
        }
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
        subCategoriesList {
          encrypted_id
          category
          parentID
          created_at
          totalFiles
        }
      }
    }
  `,variables:{id:y.id,page:c.value,first:20}})).data.data,{data:v,isPending:be,isFetching:$,isLoading:U}=ee({queryKey:["fetchFiles",c],queryFn:Q});H(()=>{var d,a;(a=(d=v.value)==null?void 0:d.userfiles)!=null&&a.filesListPaginated&&(A.value=v.value.userfiles.filesListPaginated.data,p.value=v.value.userfiles.filesListPaginated.paginatorInfo)});const q=J(()=>{const d=S.value.toLowerCase();return A.value.filter(a=>{var w,r,_,f,h;return((w=a.title)==null?void 0:w.toLowerCase().includes(d))||((_=(r=a.ordinanceNumber)==null?void 0:r.toLowerCase())==null?void 0:_.includes(d))||((h=(f=a.author.name)==null?void 0:f.toLowerCase())==null?void 0:h.includes(d))})}),z=()=>{c.value<p.value.lastPage&&c.value++},K=()=>{c.value>1&&c.value--};return(d,a)=>(i(),g(C,null,[t(e(W),{title:"Files"}),t(O,{breadcrumbs:F},{default:l(()=>{var w;return[s("div",re,[s("div",ne,[s("div",null,[!e(U)&&!e($)?(i(),g("div",ue,[s("h6",ie,[t(e(T),{class:"h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"}),P(" "+u((w=e(v))==null?void 0:w.userfiles.categoryName.category),1)])])):V("",!0)])]),t(e(I),null,{default:l(()=>[t(e(B),null,{default:l(()=>[t(e(m),null,{default:l(()=>[t(e(o),{class:"w-[50px]"},{default:l(()=>a[1]||(a[1]=[s("small",null,"#",-1)])),_:1}),t(e(o),{class:"w-[300px]"},{default:l(()=>a[2]||(a[2]=[s("small",null,"Category",-1)])),_:1}),t(e(o),null,{default:l(()=>a[3]||(a[3]=[s("small",null,"No. of Files",-1)])),_:1}),t(e(o),null,{default:l(()=>a[4]||(a[4]=[s("small",null,"Creation Date",-1)])),_:1})]),_:1})]),_:1}),t(e(E),null,{default:l(()=>{var r,_;return[e($)?(i(),x(e(m),{key:0},{default:l(()=>[t(e(n),{colspan:"10",class:"text-center"},{default:l(()=>[t(M)]),_:1})]),_:1})):((r=e(v))==null?void 0:r.userfiles.subCategoriesList.length)==0?(i(),x(e(m),{key:1},{default:l(()=>[t(e(n),{colspan:"5"},{default:l(()=>[s("small",oe,[t(e(R),{class:"mr-2 w-5"}),a[5]||(a[5]=P(" No Data Found "))])]),_:1})]),_:1})):(i(!0),g(C,{key:2},D((_=e(v))==null?void 0:_.userfiles.subCategoriesList,(f,h)=>(i(),x(e(m),{key:f.id},{default:l(()=>[t(e(n),null,{default:l(()=>[s("small",null,u(h+1),1)]),_:2},1024),t(e(n),{class:"w-[300px] pr-20"},{default:l(()=>[t(e(L),{href:d.route("user.files",{id:f.encrypted_id}),prefetch:""},{default:l(()=>[s("div",de,[s("div",null,[t(e(T),{class:"h-8 w-8 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"})]),s("div",null,[s("div",fe,u(f.category),1)])])]),_:2},1032,["href"])]),_:2},1024),t(e(n),null,{default:l(()=>[P(u(f.totalFiles),1)]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",null,u(he(f.created_at)),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),s("div",ce,[t(e(Y),{modelValue:S.value,"onUpdate:modelValue":a[0]||(a[0]=r=>S.value=r),placeholder:"Search... (if no results, go to next page)",class:"w-full max-w-md text-sm"},null,8,["modelValue"])]),t(e(I),null,{default:l(()=>[t(e(B),null,{default:l(()=>[t(e(m),null,{default:l(()=>[t(e(o),{class:"w-[50px]"},{default:l(()=>a[6]||(a[6]=[s("small",null,"#",-1)])),_:1}),t(e(o),{class:"w-[50px]"},{default:l(()=>a[7]||(a[7]=[s("small",null,"File",-1)])),_:1}),t(e(o),{class:"w-[300px]"},{default:l(()=>a[8]||(a[8]=[s("small",null,"Title",-1)])),_:1}),t(e(o),null,{default:l(()=>a[9]||(a[9]=[s("small",null,"Ordinance Number",-1)])),_:1}),t(e(o),null,{default:l(()=>a[10]||(a[10]=[s("small",null,"Author",-1)])),_:1}),t(e(o),null,{default:l(()=>a[11]||(a[11]=[s("small",null,"Mun. Status",-1)])),_:1}),t(e(o),null,{default:l(()=>a[12]||(a[12]=[s("small",null,"Prov. Status",-1)])),_:1}),t(e(o),{class:"text-right"},{default:l(()=>a[13]||(a[13]=[s("small",null,"Actions",-1)])),_:1})]),_:1})]),_:1}),t(e(E),null,{default:l(()=>[e($)?(i(),x(e(m),{key:0},{default:l(()=>[t(e(n),{colspan:"10",class:"text-center"},{default:l(()=>[t(M)]),_:1})]),_:1})):q.value.length===0?(i(),x(e(m),{key:1},{default:l(()=>[t(e(n),{colspan:"10",class:"text-center"},{default:l(()=>[s("small",me,[t(e(R),{class:"mr-2 w-5"}),a[14]||(a[14]=P(" No Data Found "))])]),_:1})]),_:1})):(i(!0),g(C,{key:2},D(q.value,(r,_)=>(i(),x(e(m),{key:r.encrypted_id},{default:l(()=>[t(e(n),null,{default:l(()=>[s("small",null,u(_+1),1)]),_:2},1024),t(e(n),null,{default:l(()=>[s("a",{href:`/storage/files/${r.file}`,target:"_blank"},[t(e(te),{class:"w-5 h-5 text-green-500"})],8,pe)]),_:2},1024),t(e(n),{class:"pr-5"},{default:l(()=>[t(e(L),{href:d.route("user.view-file",{id:r.encrypted_id}),prefetch:""},{default:l(()=>[s("div",_e,u(r.title),1)]),_:2},1032,["href"])]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",ge,u(r.ordinanceNumber??"-"),1)]),_:2},1024),t(e(n),{class:"pr-5"},{default:l(()=>[s("div",ve,[s("b",null,u(r.author.name),1)]),a[16]||(a[16]=s("div",null,[s("small",{class:"text-blue-500"},"Co Authors:")],-1)),(i(!0),g(C,null,D(r.coAuthors,f=>(i(),g("div",{key:f.official.name},[s("small",xe,u(f.official.name),1)]))),128)),r.coAuthors.length==0?(i(),g("div",ye,a[15]||(a[15]=[s("small",null,"None",-1)]))):V("",!0)]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",{class:j(r.municipalStatus==1?"text-wrap text-red-500":"text-wrap text-green-500")},u(r.municipalStatus==1?"Draft":"Approved"),3)]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",{class:j(r.provincialStatus==1?"text-wrap text-red-500":r.provincialStatus==2?"text-wrap text-green-500":"text-wrap text-gray-500")},u(r.provincialStatus==null?"-":r.provincialStatus==1?"Disapproved":"Approved"),3)]),_:2},1024),t(e(n),{class:"text-right"},{default:l(()=>[t(e(L),{href:d.route("user.view-file",{id:r.encrypted_id}),prefetch:""},{default:l(()=>[t(e(N),{variant:"link",class:"ml-0 cursor-pointer"},{default:l(()=>[t(e(le))]),_:1})]),_:2},1032,["href"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),s("div",we,[t(e(N),{disabled:p.value.currentPage<=1,onClick:K,class:"cursor-pointer"},{default:l(()=>[t(e(ae))]),_:1},8,["disabled"]),s("small",null," Pages "+u(p.value.currentPage)+" of "+u(p.value.lastPage),1),t(e(N),{disabled:p.value.currentPage>=p.value.lastPage,onClick:z,class:"cursor-pointer"},{default:l(()=>[t(e(se))]),_:1},8,["disabled"])])])]}),_:1})],64))}});export{Te as default};
