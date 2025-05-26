import{_ as G}from"./AppLayout.vue_vue_type_script_setup_true_lang-DZjoYUPg.js";import{d as H,r as w,p as J,q as W,c as o,o as i,a as t,u as e,m as X,w as l,b as a,h as j,e as c,t as r,g as $,F as h,i as P,P as V,n as I,j as Z}from"./app-PR7YfxxH.js";import{_ as L,d as A,a as B,c as O,b as ee}from"./CardTitle.vue_vue_type_script_setup_true_lang-jJvO3ZWX.js";import{_ as te,C as E,a as ae}from"./SkeletonBox.vue_vue_type_script_setup_true_lang-CYgCbvI6.js";import{_ as se,a as le,b as S,c as C,d as ne,e as _,f as ie}from"./Skeleton.vue_vue_type_script_setup_true_lang-Cupo0CPn.js";import{_ as M}from"./index-C-x4h69a.js";import{_ as re}from"./Input.vue_vue_type_script_setup_true_lang-aS6N_niu.js";import{u as oe,a as ue,C as k}from"./Skeleton.vue_vue_type_script_setup_true_lang-TkwrUVOM.js";import{_ as de,F as ce}from"./SkeletonCard.vue_vue_type_script_setup_true_lang-pH7_ZXiG.js";import{_ as fe}from"./Pagination.vue_vue_type_script_setup_true_lang-C4k3uBlQ.js";import{F as Q}from"./NavFooter.vue_vue_type_script_setup_true_lang-D1kNVddv.js";import{E as pe}from"./eye-iV61HEVf.js";import"./AppLogoIcon.vue_vue_type_script_setup_true_lang-DAt4NrLG.js";const me={class:"p-4 space-y-6"},_e={class:"flex w-full justify-between items-center"},ge={key:0},xe={class:"flex text-md font-bold items-center"},ve={class:"text-center text-red-500 flex items-center justify-center"},he={class:"flex items-center space-x-3"},ye={class:"font-medium"},be={class:"flex items-center justify-between space-x-4"},we={key:0,class:"grid grid-cols-1 gap-4"},$e={class:"grid grid-cols-1 xl:grid-cols-3 gap-4"},Pe={class:"flex items-center space-x-4 rounded-md border p-4"},Se=["src"],Ce={class:"flex-1 space-y-1"},ke={class:"text-sm font-medium leading-none"},Fe={class:"text-[13px] text-muted-foreground"},De={class:"text-[14px]"},Ne={class:"mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-0 last:mb-0 last:pb-0"},Le={class:"space-y-1"},qe={class:"text-sm font-medium leading-none"},Te={class:"text-[12px] text-muted-foreground"},je={class:"text-gray-500 text-[13px] flex items-center gap-2"},Ve={key:0},Ie={key:1},Ae={class:"text-gray-500 text-[13px] flex items-center gap-2"},Be={key:0},Oe={key:1},Ee={class:"text-gray-500"},Me=["href"];function R(F){const g=new Date(F),D=g.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),f=g.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${D} | ${f}`}const at=H({__name:"Files",props:{id:{}},setup(F){const g=F;oe();const D=[{title:"Files",href:"/admin/files/"+g.id}],f=w(1),N=w(""),q=w([]),y=w({currentPage:1,lastPage:1,hasMorePages:!1}),U=async()=>(await Z.post("/graphql",{query:`
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
  `,variables:{id:g.id,page:f.value,first:20}})).data.data,{data:p,isPending:Qe,isFetching:b,isLoading:z}=ue({queryKey:["fetchFiles",f],queryFn:U});J(()=>{var d,s;(s=(d=p.value)==null?void 0:d.userfiles)!=null&&s.filesListPaginated&&(q.value=p.value.userfiles.filesListPaginated.data,y.value=p.value.userfiles.filesListPaginated.paginatorInfo)});const T=W(()=>{const d=N.value.toLowerCase();return q.value.filter(s=>{var x,n,m,u,v;return((x=s.title)==null?void 0:x.toLowerCase().includes(d))||((m=(n=s.ordinanceNumber)==null?void 0:n.toLowerCase())==null?void 0:m.includes(d))||((v=(u=s.author.name)==null?void 0:u.toLowerCase())==null?void 0:v.includes(d))})}),K=()=>{f.value<y.value.lastPage&&f.value++},Y=()=>{f.value>1&&f.value--};return(d,s)=>(i(),o(h,null,[t(e(X),{title:"Files"}),t(G,{breadcrumbs:D},{default:l(()=>{var x;return[a("div",me,[a("div",_e,[a("div",null,[!e(z)&&!e(b)?(i(),o("div",ge,[a("h6",xe,[t(e(Q),{class:"h-8 w-8 mr-2 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"}),c(" "+r((x=e(p))==null?void 0:x.userfiles.categoryName.category),1)])])):j("",!0)])]),t(e(se),null,{default:l(()=>[t(e(le),null,{default:l(()=>[t(e(S),null,{default:l(()=>[t(e(C),{class:"w-[50px]"},{default:l(()=>s[1]||(s[1]=[a("small",null,"#",-1)])),_:1}),t(e(C),{class:"w-[300px]"},{default:l(()=>s[2]||(s[2]=[a("small",null,"Category",-1)])),_:1}),t(e(C),null,{default:l(()=>s[3]||(s[3]=[a("small",null,"No. of Files",-1)])),_:1}),t(e(C),null,{default:l(()=>s[4]||(s[4]=[a("small",null,"Creation Date",-1)])),_:1})]),_:1})]),_:1}),t(e(ne),null,{default:l(()=>{var n,m;return[e(b)?(i(),$(e(S),{key:0},{default:l(()=>[t(e(_),{colspan:"10",class:"text-center"},{default:l(()=>[t(ie)]),_:1})]),_:1})):((n=e(p))==null?void 0:n.userfiles.subCategoriesList.length)==0?(i(),$(e(S),{key:1},{default:l(()=>[t(e(_),{colspan:"5"},{default:l(()=>[a("small",ve,[t(e(k),{class:"mr-2 w-5"}),s[5]||(s[5]=c(" No Data Found "))])]),_:1})]),_:1})):(i(!0),o(h,{key:2},P((m=e(p))==null?void 0:m.userfiles.subCategoriesList,(u,v)=>(i(),$(e(S),{key:u.id},{default:l(()=>[t(e(_),null,{default:l(()=>[a("small",null,r(v+1),1)]),_:2},1024),t(e(_),{class:"w-[300px] pr-20"},{default:l(()=>[t(e(V),{href:d.route("user.files",{id:u.encrypted_id}),prefetch:""},{default:l(()=>[a("div",he,[a("div",null,[t(e(Q),{class:"h-8 w-8 flex-shrink-0 rounded-full border p-1 text-blue-500",fill:"currentColor"})]),a("div",null,[a("div",ye,r(u.category),1)])])]),_:2},1032,["href"])]),_:2},1024),t(e(_),null,{default:l(()=>[c(r(u.totalFiles),1)]),_:2},1024),t(e(_),null,{default:l(()=>[a("small",null,r(R(u.created_at)),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),a("div",be,[t(e(re),{modelValue:N.value,"onUpdate:modelValue":s[0]||(s[0]=n=>N.value=n),placeholder:"Search... (if no results, go to next page)",class:"w-full max-w-md text-sm"},null,8,["modelValue"])]),T.value.length==0&&!e(b)?(i(),o("div",we,[t(e(L),{class:"shadow-none"},{default:l(()=>[t(e(A),{class:"text-red-500 flex items-center justify-center text-[12px] gap-2"},{default:l(()=>[t(e(k),{class:"w-5 h-auto"}),s[6]||(s[6]=c(" No Data Found "))]),_:1})]),_:1})])):j("",!0),a("div",$e,[e(b)?(i(),o(h,{key:0},P(3,n=>t(e(L),{class:"shadow-none"},{default:l(()=>[t(e(B),{class:"text-[14px]"},{default:l(()=>[t(de)]),_:1}),t(e(O),{class:"grid gap-4"},{default:l(()=>[t(te)]),_:1})]),_:1})),64)):(i(!0),o(h,{key:1},P(T.value,(n,m)=>(i(),$(e(L),{class:"shadow-none flex flex-col h-full"},{default:l(()=>[t(e(B),{class:"text-[14px]"},{default:l(()=>[t(e(ee),null,{default:l(()=>s[7]||(s[7]=[c("Ordinance Number")])),_:1}),t(e(A),null,{default:l(()=>[c(r(n.ordinanceNumber!=null?n.ordinanceNumber:"-"),1)]),_:2},1024),a("div",Pe,[a("img",{draggable:"false",src:"/storage/profile/"+n.author.photo,class:"w-10 h-10 rounded-full object-cover"},null,8,Se),a("div",Ce,[a("p",ke,r(n.author.name),1),a("p",Fe,r(n.author.position),1)]),t(e(V),{href:d.route("user.view-file",{id:n.encrypted_id}),prefetch:""},{default:l(()=>[t(e(M),{variant:"link",class:"ml-0 cursor-pointer"},{default:l(()=>[t(e(pe))]),_:1})]),_:2},1032,["href"])])]),_:2},1024),t(e(O),{class:"grid gap-4"},{default:l(()=>[a("div",null,[a("p",De,r(n.finalTitle==null?n.title:n.finalTitle),1)]),a("div",null,[s[9]||(s[9]=a("div",{class:"text-[14px] mb-4 font-bold text-blue-500"},"Co-Authors",-1)),(i(!0),o(h,null,P(n.coAuthors,(u,v)=>(i(),o("div",Ne,[s[8]||(s[8]=a("span",{class:"flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"},null,-1)),a("div",Le,[a("p",qe,r(u.official.name),1),a("p",Te,r(u.official.position),1)])]))),256))]),a("div",je,[n.municipalStatus==1?(i(),o("div",Ve,[t(e(k),{class:"w-5 h-5 text-red-500"})])):(i(),o("div",Ie,[t(e(E),{class:"w-5 h-5 text-green-500"})])),s[10]||(s[10]=c(" Municipal Status: ")),a("span",{class:I(n.municipalStatus==1?"text-red-500":"text-green-500")},r(n.municipalStatus==1?"Draft Ordinance":"Approved Ordinance"),3)]),a("div",Ae,[n.provincialStatus==null||n.provincialStatus==1?(i(),o("div",Be,[t(e(k),{class:"w-5 h-5 text-red-500"})])):(i(),o("div",Oe,[t(e(E),{class:"w-5 h-5 text-green-500"})])),s[11]||(s[11]=c(" Provincial Status: ")),a("span",{class:I([n.provincialStatus==1?"text-red-500":n.provincialStatus==2?"text-green-500":"text-gray-500"])},r(n.provincialStatus==1?"Disapproved":n.provincialStatus==2?"Approved Ordinance":"No Status Yet"),3)]),a("small",Ee,r(R(n.updated_at)),1)]),_:2},1024),t(e(ae),{class:"mt-auto"},{default:l(()=>[t(e(M),{class:"w-full text-[12px] cursor-pointer"},{default:l(()=>[a("a",{href:"/storage/files/"+n.file,class:"flex items-center gap-2",target:"_blank"},[t(e(ce)),s[12]||(s[12]=c(" Open PDF File "))],8,Me)]),_:2},1024)]),_:2},1024)]),_:2},1024))),256))]),t(fe,{"current-page":y.value.currentPage,"last-page":y.value.lastPage,onNext:K,onPrevious:Y},null,8,["current-page","last-page"])])]}),_:1})],64))}});export{at as default};
