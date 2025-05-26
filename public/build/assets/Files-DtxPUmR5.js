import{_ as K}from"./AppLayout.vue_vue_type_script_setup_true_lang-DI3RdprT.js";import{d as O,r as P,p as G,q as H,c as _,o as u,a as t,u as e,m as J,w as l,b as s,h as A,e as b,t as i,g as x,F,i as D,P as N,n as T,j as W}from"./app-CcRrdmyW.js";import{_ as V,a as I,b as c,c as o,d as j,e as n,f as B}from"./Skeleton.vue_vue_type_script_setup_true_lang-BlzBSkCP.js";import{_ as X}from"./index-Bl_V7f6V.js";import{_ as Y}from"./Input.vue_vue_type_script_setup_true_lang-BHKsCkag.js";import{u as Z,a as ee,C as E}from"./Skeleton.vue_vue_type_script_setup_true_lang-ez4uci9I.js";import{_ as te}from"./Pagination.vue_vue_type_script_setup_true_lang-BRAFZMem.js";import{F as M}from"./NavFooter.vue_vue_type_script_setup_true_lang-DJVGY2Tk.js";import{F as le}from"./file-text-zFsEsBhw.js";import{E as ae}from"./eye-DWsoQtyT.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-TKp6VV-O.js";const se={class:"p-6 space-y-6"},re={class:"flex w-full justify-between items-center"},ne={key:0},ue={class:"flex text-md font-bold items-center"},ie={class:"text-center text-red-500 flex items-center justify-center"},oe={class:"flex items-center space-x-3"},de={class:"font-medium"},fe={class:"flex items-center justify-between space-x-4"},me={class:"text-red-500 flex items-center justify-center"},ce=["href"],pe={class:"text-wrap text-[13px]"},_e={class:"text-nowrap"},ge={class:"text-nowrap"},xe={class:"text-nowrap"},ve={key:0};function ye(S){const v=new Date(S),$=v.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),m=v.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${$} | ${m}`}const qe=O({__name:"Files",props:{id:{}},setup(S){const v=S;Z();const $=[{title:"Files",href:"/user/files/"+v.id}],m=P(1),C=P(""),L=P([]),w=P({currentPage:1,lastPage:1,hasMorePages:!1}),Q=async()=>(await W.post("/graphql",{query:`
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
  `,variables:{id:v.id,page:m.value,first:20}})).data.data,{data:g,isPending:we,isFetching:k,isLoading:R}=ee({queryKey:["fetchFiles",m],queryFn:Q});G(()=>{var d,a;(a=(d=g.value)==null?void 0:d.userfiles)!=null&&a.filesListPaginated&&(L.value=g.value.userfiles.filesListPaginated.data,w.value=g.value.userfiles.filesListPaginated.paginatorInfo)});const q=H(()=>{const d=C.value.toLowerCase();return L.value.filter(a=>{var y,r,p,f,h;return((y=a.title)==null?void 0:y.toLowerCase().includes(d))||((p=(r=a.ordinanceNumber)==null?void 0:r.toLowerCase())==null?void 0:p.includes(d))||((h=(f=a.author.name)==null?void 0:f.toLowerCase())==null?void 0:h.includes(d))})}),U=()=>{m.value<w.value.lastPage&&m.value++},z=()=>{m.value>1&&m.value--};return(d,a)=>(u(),_(F,null,[t(e(J),{title:"Files"}),t(K,{breadcrumbs:$},{default:l(()=>{var y;return[s("div",se,[s("div",re,[s("div",null,[!e(R)&&!e(k)?(u(),_("div",ne,[s("h6",ue,[t(e(M),{class:"h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"}),b(" "+i((y=e(g))==null?void 0:y.userfiles.categoryName.category),1)])])):A("",!0)])]),t(e(V),null,{default:l(()=>[t(e(I),null,{default:l(()=>[t(e(c),null,{default:l(()=>[t(e(o),{class:"w-[50px]"},{default:l(()=>a[1]||(a[1]=[s("small",null,"#",-1)])),_:1}),t(e(o),{class:"w-[300px]"},{default:l(()=>a[2]||(a[2]=[s("small",null,"Category",-1)])),_:1}),t(e(o),null,{default:l(()=>a[3]||(a[3]=[s("small",null,"No. of Files",-1)])),_:1}),t(e(o),null,{default:l(()=>a[4]||(a[4]=[s("small",null,"Creation Date",-1)])),_:1})]),_:1})]),_:1}),t(e(j),null,{default:l(()=>{var r,p;return[e(k)?(u(),x(e(c),{key:0},{default:l(()=>[t(e(n),{colspan:"10",class:"text-center"},{default:l(()=>[t(B)]),_:1})]),_:1})):((r=e(g))==null?void 0:r.userfiles.subCategoriesList.length)==0?(u(),x(e(c),{key:1},{default:l(()=>[t(e(n),{colspan:"5"},{default:l(()=>[s("small",ie,[t(e(E),{class:"mr-2 w-5"}),a[5]||(a[5]=b(" No Data Found "))])]),_:1})]),_:1})):(u(!0),_(F,{key:2},D((p=e(g))==null?void 0:p.userfiles.subCategoriesList,(f,h)=>(u(),x(e(c),{key:f.id},{default:l(()=>[t(e(n),null,{default:l(()=>[s("small",null,i(h+1),1)]),_:2},1024),t(e(n),{class:"w-[300px] pr-20"},{default:l(()=>[t(e(N),{href:d.route("user.files",{id:f.encrypted_id}),prefetch:""},{default:l(()=>[s("div",oe,[s("div",null,[t(e(M),{class:"h-8 w-8 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"})]),s("div",null,[s("div",de,i(f.category),1)])])]),_:2},1032,["href"])]),_:2},1024),t(e(n),null,{default:l(()=>[b(i(f.totalFiles),1)]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",null,i(ye(f.created_at)),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),s("div",fe,[t(e(Y),{modelValue:C.value,"onUpdate:modelValue":a[0]||(a[0]=r=>C.value=r),placeholder:"Search... (if no results, go to next page)",class:"w-full max-w-md text-sm"},null,8,["modelValue"])]),t(e(V),null,{default:l(()=>[t(e(I),null,{default:l(()=>[t(e(c),null,{default:l(()=>[t(e(o),{class:"w-[50px]"},{default:l(()=>a[6]||(a[6]=[s("small",null,"#",-1)])),_:1}),t(e(o),{class:"w-[50px]"},{default:l(()=>a[7]||(a[7]=[s("small",null,"File",-1)])),_:1}),t(e(o),{class:"w-[300px]"},{default:l(()=>a[8]||(a[8]=[s("small",null,"Title",-1)])),_:1}),t(e(o),null,{default:l(()=>a[9]||(a[9]=[s("small",null,"Ordinance Number",-1)])),_:1}),t(e(o),null,{default:l(()=>a[10]||(a[10]=[s("small",null,"Author",-1)])),_:1}),t(e(o),null,{default:l(()=>a[11]||(a[11]=[s("small",null,"Mun. Status",-1)])),_:1}),t(e(o),null,{default:l(()=>a[12]||(a[12]=[s("small",null,"Prov. Status",-1)])),_:1}),t(e(o),{class:"text-right"},{default:l(()=>a[13]||(a[13]=[s("small",null,"Actions",-1)])),_:1})]),_:1})]),_:1}),t(e(j),null,{default:l(()=>[e(k)?(u(),x(e(c),{key:0},{default:l(()=>[t(e(n),{colspan:"10",class:"text-center"},{default:l(()=>[t(B)]),_:1})]),_:1})):q.value.length===0?(u(),x(e(c),{key:1},{default:l(()=>[t(e(n),{colspan:"10",class:"text-center"},{default:l(()=>[s("small",me,[t(e(E),{class:"mr-2 w-5"}),a[14]||(a[14]=b(" No Data Found "))])]),_:1})]),_:1})):(u(!0),_(F,{key:2},D(q.value,(r,p)=>(u(),x(e(c),{key:r.encrypted_id},{default:l(()=>[t(e(n),null,{default:l(()=>[s("small",null,i(p+1),1)]),_:2},1024),t(e(n),null,{default:l(()=>[s("a",{href:`/storage/files/${r.file}`,target:"_blank"},[t(e(le),{class:"w-5 h-5 text-green-500"})],8,ce)]),_:2},1024),t(e(n),{class:"pr-5"},{default:l(()=>[t(e(N),{href:d.route("user.view-file",{id:r.encrypted_id}),prefetch:""},{default:l(()=>[s("div",pe,i(r.title),1)]),_:2},1032,["href"])]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",_e,i(r.ordinanceNumber??"-"),1)]),_:2},1024),t(e(n),{class:"pr-5"},{default:l(()=>[s("div",ge,[s("b",null,i(r.author.name),1)]),a[16]||(a[16]=s("div",null,[s("small",{class:"text-blue-500"},"Co Authors:")],-1)),(u(!0),_(F,null,D(r.coAuthors,f=>(u(),_("div",{key:f.official.name},[s("small",xe,i(f.official.name),1)]))),128)),r.coAuthors.length==0?(u(),_("div",ve,a[15]||(a[15]=[s("small",null,"None",-1)]))):A("",!0)]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",{class:T(r.municipalStatus==1?"text-wrap text-red-500":"text-wrap text-green-500")},i(r.municipalStatus==1?"Draft":"Approved"),3)]),_:2},1024),t(e(n),null,{default:l(()=>[s("small",{class:T(r.provincialStatus==1?"text-wrap text-red-500":r.provincialStatus==2?"text-wrap text-green-500":"text-wrap text-gray-500")},i(r.provincialStatus==null?"-":r.provincialStatus==1?"Disapproved":"Approved"),3)]),_:2},1024),t(e(n),{class:"text-right"},{default:l(()=>[t(e(N),{href:d.route("user.view-file",{id:r.encrypted_id}),prefetch:""},{default:l(()=>[t(e(X),{variant:"link",class:"ml-0 cursor-pointer"},{default:l(()=>[t(e(ae))]),_:1})]),_:2},1032,["href"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),t(te,{"current-page":w.value.currentPage,"last-page":w.value.lastPage,onNext:U,onPrevious:z},null,8,["current-page","last-page"])])]}),_:1})],64))}});export{qe as default};
