import{a as j,_ as Y}from"./AppLayout.vue_vue_type_script_setup_true_lang-DXo4Y2IQ.js";import{d as G,r as w,p as H,q as J,c as o,o as i,a as t,u as e,m as W,w as l,b as s,h as X,e as c,t as r,g as $,F as v,i as P,n as V,j as Z}from"./app-B5RSMSZ1.js";import{_ as L,d as I,a as A,c as B,b as ee}from"./CardTitle.vue_vue_type_script_setup_true_lang-BvBdejRt.js";import{_ as te,C as O,a as se}from"./SkeletonBox.vue_vue_type_script_setup_true_lang-CmGL5Xvk.js";import{_ as ae,a as le,b as S,c as k,d as ne,e as _,f as ie}from"./Skeleton.vue_vue_type_script_setup_true_lang-BkuUTNeC.js";import{_ as E}from"./index-l_Car5mf.js";import{_ as re}from"./Input.vue_vue_type_script_setup_true_lang-S-YkM2GB.js";import{u as oe,a as de,C}from"./Skeleton.vue_vue_type_script_setup_true_lang-BU2jfo3N.js";import{_ as M,F as ue}from"./SkeletonCard.vue_vue_type_script_setup_true_lang-COBlVb9L.js";import{_ as ce}from"./Pagination.vue_vue_type_script_setup_true_lang-BsnkwZyJ.js";import{F as Q}from"./NavFooter.vue_vue_type_script_setup_true_lang-CQZNlL2H.js";import{E as fe}from"./eye-D0EWloHj.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-DhEr0diU.js";const pe={class:"p-4 space-y-6"},me={class:"flex w-full justify-between items-center"},_e={key:0},ge={key:1},xe={class:"flex text-md font-bold items-center"},he={class:"text-center text-red-500 flex items-center justify-center"},ve={class:"flex items-center space-x-3"},ye={class:"font-medium"},be={class:"flex items-center justify-between space-x-4"},we={key:0,class:"grid grid-cols-1 gap-4"},$e={class:"grid grid-cols-1 xl:grid-cols-3 gap-4"},Pe={class:"flex items-center space-x-4 rounded-md border p-4"},Se=["src"],ke={class:"flex-1 space-y-1"},Ce={class:"text-sm font-medium leading-none"},Fe={class:"text-[13px] text-muted-foreground"},De={class:"text-[14px]"},Ne={class:"mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-0 last:mb-0 last:pb-0"},Le={class:"space-y-1"},qe={class:"text-sm font-medium leading-none"},Te={class:"text-[12px] text-muted-foreground"},je={class:"text-gray-500 text-[13px] flex items-center gap-2"},Ve={key:0},Ie={key:1},Ae={class:"text-gray-500 text-[13px] flex items-center gap-2"},Be={key:0},Oe={key:1},Ee={class:"text-gray-500"},Me=["href"];function R(F){const g=new Date(F),D=g.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),f=g.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${D} | ${f}`}const at=G({__name:"Files",props:{id:{}},setup(F){const g=F;oe();const D=[{title:"Files",href:"/admin/files/"+g.id}],f=w(1),N=w(""),q=w([]),y=w({currentPage:1,lastPage:1,hasMorePages:!1}),U=async()=>(await Z.post("/graphql",{query:`
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
            updated_at
            author {
              encrypted_id
              name
              position
              photo
            }
            coAuthors {
              official {
                encrypted_id
                name
                position
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
  `,variables:{id:g.id,page:f.value,first:20}})).data.data,{data:p,isPending:Qe,isFetching:b,isLoading:Re}=de({queryKey:["userfetchFiles",f],queryFn:U});H(()=>{var u,a;(a=(u=p.value)==null?void 0:u.userfiles)!=null&&a.filesListPaginated&&(q.value=p.value.userfiles.filesListPaginated.data,y.value=p.value.userfiles.filesListPaginated.paginatorInfo)});const T=J(()=>{const u=N.value.toLowerCase();return q.value.filter(a=>{var x,n,m,d,h;return((x=a.title)==null?void 0:x.toLowerCase().includes(u))||((m=(n=a.ordinanceNumber)==null?void 0:n.toLowerCase())==null?void 0:m.includes(u))||((h=(d=a.author.name)==null?void 0:d.toLowerCase())==null?void 0:h.includes(u))})}),z=()=>{f.value<y.value.lastPage&&f.value++},K=()=>{f.value>1&&f.value--};return(u,a)=>(i(),o(v,null,[t(e(W),{title:"Files"}),t(Y,{breadcrumbs:D},{default:l(()=>{var x;return[s("div",pe,[s("div",me,[e(b)?(i(),o("div",_e,[t(M)])):(i(),o("div",ge,[s("h6",xe,[t(e(Q),{class:"h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"}),c(" "+r((x=e(p))==null?void 0:x.userfiles.categoryName.category),1)])]))]),t(e(ae),null,{default:l(()=>[t(e(le),null,{default:l(()=>[t(e(S),null,{default:l(()=>[t(e(k),{class:"w-[50px]"},{default:l(()=>a[1]||(a[1]=[s("small",null,"#",-1)])),_:1}),t(e(k),{class:"w-[300px]"},{default:l(()=>a[2]||(a[2]=[s("small",null,"Category",-1)])),_:1}),t(e(k),null,{default:l(()=>a[3]||(a[3]=[s("small",null,"No. of Files",-1)])),_:1}),t(e(k),null,{default:l(()=>a[4]||(a[4]=[s("small",null,"Creation Date",-1)])),_:1})]),_:1})]),_:1}),t(e(ne),null,{default:l(()=>{var n,m;return[e(b)?(i(),$(e(S),{key:0},{default:l(()=>[t(e(_),{colspan:"10",class:"text-center"},{default:l(()=>[t(ie)]),_:1})]),_:1})):((n=e(p))==null?void 0:n.userfiles.subCategoriesList.length)===0?(i(),$(e(S),{key:1},{default:l(()=>[t(e(_),{colspan:"5"},{default:l(()=>[s("small",he,[t(e(C),{class:"mr-2 w-5"}),a[5]||(a[5]=c(" No Data Found "))])]),_:1})]),_:1})):(i(!0),o(v,{key:2},P((m=e(p))==null?void 0:m.userfiles.subCategoriesList,(d,h)=>(i(),$(e(S),{key:d.id},{default:l(()=>[t(e(_),null,{default:l(()=>[s("small",null,r(h+1),1)]),_:2},1024),t(e(_),{class:"w-[300px] pr-20"},{default:l(()=>[t(j,{href:u.route("user.files",{id:d.encrypted_id}),prefetch:""},{default:l(()=>[s("div",ve,[s("div",null,[t(e(Q),{class:"h-8 w-8 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"})]),s("div",null,[s("div",ye,r(d.category),1)])])]),_:2},1032,["href"])]),_:2},1024),t(e(_),null,{default:l(()=>[c(r(d.totalFiles),1)]),_:2},1024),t(e(_),null,{default:l(()=>[s("small",null,r(R(d.created_at)),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),s("div",be,[t(e(re),{modelValue:N.value,"onUpdate:modelValue":a[0]||(a[0]=n=>N.value=n),placeholder:"Search... (if no results, go to next page)",class:"w-full max-w-md text-sm"},null,8,["modelValue"])]),T.value.length===0&&!e(b)?(i(),o("div",we,[t(e(L),{class:"shadow-none"},{default:l(()=>[t(e(I),{class:"text-red-500 flex items-center justify-center text-[12px] gap-2"},{default:l(()=>[t(e(C),{class:"w-5 h-auto"}),a[6]||(a[6]=c(" No Data Found "))]),_:1})]),_:1})])):X("",!0),s("div",$e,[e(b)?(i(),o(v,{key:0},P(3,n=>t(e(L),{class:"shadow-none"},{default:l(()=>[t(e(A),{class:"text-[14px]"},{default:l(()=>[t(M)]),_:1}),t(e(B),{class:"grid gap-4"},{default:l(()=>[t(te)]),_:1})]),_:1})),64)):(i(!0),o(v,{key:1},P(T.value,(n,m)=>(i(),$(e(L),{class:"shadow-none flex flex-col h-full"},{default:l(()=>[t(e(A),{class:"text-[14px]"},{default:l(()=>[t(e(ee),null,{default:l(()=>a[7]||(a[7]=[c("Ordinance Number")])),_:1}),t(e(I),null,{default:l(()=>[c(r(n.ordinanceNumber!=null?n.ordinanceNumber:"-"),1)]),_:2},1024),s("div",Pe,[s("img",{draggable:"false",src:"/storage/profile/"+n.author.photo,class:"w-10 h-10 rounded-full object-cover"},null,8,Se),s("div",ke,[s("p",Ce,r(n.author.name),1),s("p",Fe,r(n.author.position),1)]),t(j,{href:u.route("user.view-file",{id:n.encrypted_id}),prefetch:""},{default:l(()=>[t(e(E),{variant:"link",class:"ml-0 cursor-pointer"},{default:l(()=>[t(e(fe))]),_:1})]),_:2},1032,["href"])])]),_:2},1024),t(e(B),{class:"grid gap-4"},{default:l(()=>[s("div",null,[s("p",De,r(n.finalTitle==null?n.title:n.finalTitle),1)]),s("div",null,[a[9]||(a[9]=s("div",{class:"text-[14px] mb-4 font-bold text-blue-500"},"Co-Authors",-1)),(i(!0),o(v,null,P(n.coAuthors,(d,h)=>(i(),o("div",Ne,[a[8]||(a[8]=s("span",{class:"flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"},null,-1)),s("div",Le,[s("p",qe,r(d.official.name),1),s("p",Te,r(d.official.position),1)])]))),256))]),s("div",je,[n.municipalStatus==1?(i(),o("div",Ve,[t(e(C),{class:"w-5 h-5 text-red-500"})])):(i(),o("div",Ie,[t(e(O),{class:"w-5 h-5 text-green-500"})])),a[10]||(a[10]=c(" Municipal Status: ")),s("span",{class:V(n.municipalStatus==1?"text-red-500":"text-green-500")},r(n.municipalStatus==1?"Draft Ordinance":"Approved Ordinance"),3)]),s("div",Ae,[n.provincialStatus==null||n.provincialStatus==1?(i(),o("div",Be,[t(e(C),{class:"w-5 h-5 text-red-500"})])):(i(),o("div",Oe,[t(e(O),{class:"w-5 h-5 text-green-500"})])),a[11]||(a[11]=c(" Provincial Status: ")),s("span",{class:V([n.provincialStatus==1?"text-red-500":n.provincialStatus==2?"text-green-500":"text-gray-500"])},r(n.provincialStatus==1?"Disapproved":n.provincialStatus==2?"Approved Ordinance":"No Status Yet"),3)]),s("small",Ee,r(R(n.updated_at)),1)]),_:2},1024),t(e(se),{class:"mt-auto"},{default:l(()=>[t(e(E),{class:"w-full text-[12px] cursor-pointer"},{default:l(()=>[s("a",{href:"/storage/files/"+n.file,class:"flex items-center gap-2",target:"_blank"},[t(e(ue)),a[12]||(a[12]=c(" Open PDF File "))],8,Me)]),_:2},1024)]),_:2},1024)]),_:2},1024))),256))]),t(ce,{"current-page":y.value.currentPage,"last-page":y.value.lastPage,onNext:z,onPrevious:K},null,8,["current-page","last-page"])])]}),_:1})],64))}});export{at as default};
