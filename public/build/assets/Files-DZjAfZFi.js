import{F as q,_ as K}from"./AppLayout.vue_vue_type_script_setup_true_lang-CbpgM4a7.js";import{d as O,r as b,q as G,s as H,c as g,o,a as t,u as e,m as J,w as l,b as s,h as V,e as C,t as i,g as x,F as k,i as L,n as j,W as X,j as Y}from"./app-nLh1rLCO.js";import{_ as I,a as B,b as m,c as d,d as E,e as r,f as M}from"./Skeleton.vue_vue_type_script_setup_true_lang-C0vgvkzQ.js";import{_ as N}from"./index-CtMMYbN-.js";import{_ as Z}from"./Input.vue_vue_type_script_setup_true_lang-Bb3MhqG6.js";import{u as ee,a as te,C as R}from"./Skeleton.vue_vue_type_script_setup_true_lang-ClmoYYpf.js";import{F as le}from"./file-text-LbDx6W-f.js";import{E as ae}from"./eye-C3jy5iZz.js";import{A as se,a as ne}from"./arrow-right-CP1FoNUY.js";import"./NavFooter.vue_vue_type_script_setup_true_lang-DWTHgTpG.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-D4T7y-Kl.js";const re={class:"p-6 space-y-6"},ie={class:"flex w-full justify-between items-center"},ue={key:0},oe={class:"flex text-md font-bold items-center"},de={class:"text-center text-red-500 flex items-center justify-center"},fe=["onClick"],ce={class:"flex items-center space-x-3"},me={class:"font-medium"},pe={class:"flex items-center justify-between space-x-4"},_e={class:"text-red-500 flex items-center justify-center"},ge=["href"],ve=["onClick"],xe={class:"text-wrap text-[13px]"},ye={class:"text-nowrap"},we={class:"text-nowrap"},he={class:"text-nowrap"},be={key:0},Ce=["onClick"],ke={class:"flex justify-between items-center mt-8"};function Pe(P){const y=new Date(P),$=y.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),c=y.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${$} | ${c}`}const Ee=O({__name:"Files",props:{id:{}},setup(P){const y=P;ee();const $=[{title:"Files",href:"/user/files/"+y.id}],c=b(1),F=b(""),A=b([]),p=b({currentPage:1,lastPage:1,hasMorePages:!1}),Q=async()=>(await Y.post("/graphql",{query:`
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
  `,variables:{id:y.id,page:c.value,first:20}})).data.data,{data:v,isPending:$e,isFetching:S,isLoading:U}=te({queryKey:["fetchFiles",c],queryFn:Q});G(()=>{var f,a;(a=(f=v.value)==null?void 0:f.userfiles)!=null&&a.filesListPaginated&&(A.value=v.value.userfiles.filesListPaginated.data,p.value=v.value.userfiles.filesListPaginated.paginatorInfo)});const T=H(()=>{const f=F.value.toLowerCase();return A.value.filter(a=>{var w,n,_,u,h;return((w=a.title)==null?void 0:w.toLowerCase().includes(f))||((_=(n=a.ordinanceNumber)==null?void 0:n.toLowerCase())==null?void 0:_.includes(f))||((h=(u=a.author.name)==null?void 0:u.toLowerCase())==null?void 0:h.includes(f))})}),W=()=>{c.value<p.value.lastPage&&c.value++},z=()=>{c.value>1&&c.value--};function D(f,a={}){X.get(route(f,a))}return(f,a)=>(o(),g(k,null,[t(e(J),{title:"Files"}),t(K,{breadcrumbs:$},{default:l(()=>{var w;return[s("div",re,[s("div",ie,[s("div",null,[!e(U)&&!e(S)?(o(),g("div",ue,[s("h6",oe,[t(e(q),{class:"h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"}),C(" "+i((w=e(v))==null?void 0:w.userfiles.categoryName.category),1)])])):V("",!0)])]),t(e(I),null,{default:l(()=>[t(e(B),null,{default:l(()=>[t(e(m),null,{default:l(()=>[t(e(d),{class:"w-[50px]"},{default:l(()=>a[1]||(a[1]=[s("small",null,"#",-1)])),_:1}),t(e(d),{class:"w-[300px]"},{default:l(()=>a[2]||(a[2]=[s("small",null,"Category",-1)])),_:1}),t(e(d),null,{default:l(()=>a[3]||(a[3]=[s("small",null,"No. of Files",-1)])),_:1}),t(e(d),null,{default:l(()=>a[4]||(a[4]=[s("small",null,"Creation Date",-1)])),_:1})]),_:1})]),_:1}),t(e(E),null,{default:l(()=>{var n,_;return[e(S)?(o(),x(e(m),{key:0},{default:l(()=>[t(e(r),{colspan:"10",class:"text-center"},{default:l(()=>[t(M)]),_:1})]),_:1})):((n=e(v))==null?void 0:n.userfiles.subCategoriesList.length)==0?(o(),x(e(m),{key:1},{default:l(()=>[t(e(r),{colspan:"5"},{default:l(()=>[s("small",de,[t(e(R),{class:"mr-2 w-5"}),a[5]||(a[5]=C(" No Data Found "))])]),_:1})]),_:1})):(o(!0),g(k,{key:2},L((_=e(v))==null?void 0:_.userfiles.subCategoriesList,(u,h)=>(o(),x(e(m),{key:u.id},{default:l(()=>[t(e(r),null,{default:l(()=>[s("small",null,i(h+1),1)]),_:2},1024),t(e(r),{class:"w-[300px] pr-20"},{default:l(()=>[s("a",{href:"#",onClick:Fe=>D("user.files",{id:u.encrypted_id})},[s("div",ce,[s("div",null,[t(e(q),{class:"h-8 w-8 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"})]),s("div",null,[s("div",me,i(u.category),1)])])],8,fe)]),_:2},1024),t(e(r),null,{default:l(()=>[C(i(u.totalFiles),1)]),_:2},1024),t(e(r),null,{default:l(()=>[s("small",null,i(Pe(u.created_at)),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),s("div",pe,[t(e(Z),{modelValue:F.value,"onUpdate:modelValue":a[0]||(a[0]=n=>F.value=n),placeholder:"Search... (if no results, go to next page)",class:"w-full max-w-md text-sm"},null,8,["modelValue"])]),t(e(I),null,{default:l(()=>[t(e(B),null,{default:l(()=>[t(e(m),null,{default:l(()=>[t(e(d),{class:"w-[50px]"},{default:l(()=>a[6]||(a[6]=[s("small",null,"#",-1)])),_:1}),t(e(d),{class:"w-[50px]"},{default:l(()=>a[7]||(a[7]=[s("small",null,"File",-1)])),_:1}),t(e(d),{class:"w-[300px]"},{default:l(()=>a[8]||(a[8]=[s("small",null,"Title",-1)])),_:1}),t(e(d),null,{default:l(()=>a[9]||(a[9]=[s("small",null,"Ordinance Number",-1)])),_:1}),t(e(d),null,{default:l(()=>a[10]||(a[10]=[s("small",null,"Author",-1)])),_:1}),t(e(d),null,{default:l(()=>a[11]||(a[11]=[s("small",null,"Mun. Status",-1)])),_:1}),t(e(d),null,{default:l(()=>a[12]||(a[12]=[s("small",null,"Prov. Status",-1)])),_:1}),t(e(d),{class:"text-right"},{default:l(()=>a[13]||(a[13]=[s("small",null,"Actions",-1)])),_:1})]),_:1})]),_:1}),t(e(E),null,{default:l(()=>[e(S)?(o(),x(e(m),{key:0},{default:l(()=>[t(e(r),{colspan:"10",class:"text-center"},{default:l(()=>[t(M)]),_:1})]),_:1})):T.value.length===0?(o(),x(e(m),{key:1},{default:l(()=>[t(e(r),{colspan:"10",class:"text-center"},{default:l(()=>[s("small",_e,[t(e(R),{class:"mr-2 w-5"}),a[14]||(a[14]=C(" No Data Found "))])]),_:1})]),_:1})):(o(!0),g(k,{key:2},L(T.value,(n,_)=>(o(),x(e(m),{key:n.encrypted_id},{default:l(()=>[t(e(r),null,{default:l(()=>[s("small",null,i(_+1),1)]),_:2},1024),t(e(r),null,{default:l(()=>[s("a",{href:`/storage/files/${n.file}`,target:"_blank"},[t(e(le),{class:"w-5 h-5 text-green-500"})],8,ge)]),_:2},1024),t(e(r),{class:"pr-5"},{default:l(()=>[s("a",{href:"#",onClick:u=>D("user.view-file",{id:n.encrypted_id})},[s("div",xe,i(n.title),1)],8,ve)]),_:2},1024),t(e(r),null,{default:l(()=>[s("small",ye,i(n.ordinanceNumber??"-"),1)]),_:2},1024),t(e(r),{class:"pr-5"},{default:l(()=>[s("div",we,[s("b",null,i(n.author.name),1)]),a[16]||(a[16]=s("div",null,[s("small",{class:"text-blue-500"},"Co Authors:")],-1)),(o(!0),g(k,null,L(n.coAuthors,u=>(o(),g("div",{key:u.official.name},[s("small",he,i(u.official.name),1)]))),128)),n.coAuthors.length==0?(o(),g("div",be,a[15]||(a[15]=[s("small",null,"None",-1)]))):V("",!0)]),_:2},1024),t(e(r),null,{default:l(()=>[s("small",{class:j(n.municipalStatus==1?"text-wrap text-red-500":"text-wrap text-green-500")},i(n.municipalStatus==1?"Draft":"Approved"),3)]),_:2},1024),t(e(r),null,{default:l(()=>[s("small",{class:j(n.provincialStatus==1?"text-wrap text-red-500":n.provincialStatus==2?"text-wrap text-green-500":"text-wrap text-gray-500")},i(n.provincialStatus==null?"-":n.provincialStatus==1?"Disapproved":"Approved"),3)]),_:2},1024),t(e(r),{class:"text-right"},{default:l(()=>[s("a",{href:"#",onClick:u=>D("user.view-file",{id:n.encrypted_id})},[t(e(N),{variant:"link",class:"ml-0 cursor-pointer"},{default:l(()=>[t(e(ae))]),_:1})],8,Ce)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),s("div",ke,[t(e(N),{disabled:p.value.currentPage<=1,onClick:z,class:"cursor-pointer"},{default:l(()=>[t(e(se))]),_:1},8,["disabled"]),s("small",null," Pages "+i(p.value.currentPage)+" of "+i(p.value.lastPage),1),t(e(N),{disabled:p.value.currentPage>=p.value.lastPage,onClick:W,class:"cursor-pointer"},{default:l(()=>[t(e(ne))]),_:1},8,["disabled"])])])]}),_:1})],64))}});export{Ee as default};
