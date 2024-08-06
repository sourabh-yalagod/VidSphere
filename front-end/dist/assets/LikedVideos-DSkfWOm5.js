import{c as f,w as g,r as i,j as a,d as k}from"./index-CUUtNcNW.js";import{V as h}from"./Video-DAgvmyY3.js";import{A as j}from"./APIError-C6cJdpKe.js";import{V as y}from"./VideoNotFound-BSphAVR0.js";import{u as V}from"./HandleLikes-SxB8V9Im.js";import{S as L}from"./Skeleton-BDh6volp.js";import{u as b}from"./useQuery-B7kd2tvV.js";import{L as w}from"./loader-circle-BikDHext.js";import"./useMutation-_dJQ1s6T.js";import"./utils-km2FGkQ4.js";import"./ellipsis-vertical-B86Ul6eJ.js";import"./eye-off-CstR6SCG.js";import"./useBaseQuery-CKRofIbR.js";/**
 * @license lucide-react v0.381.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=f("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]),z=()=>{const{handleLikes:o,likeLoading:c}=V(),{userId:t}=g(),[e,d]=i.useState(""),u=async()=>{const r=await k.get(`https://videotube-auro.onrender.com/api/v1/likes/all-favourate-videos/${t}`);return r==null?void 0:r.data},{data:s,isPending:p,error:x}=b({queryKey:["likedVideos"],queryFn:u,staleTime:5*60*1e3});return i.useEffect(()=>{d(s==null?void 0:s.data)},[s]),p?a.jsx(L,{cards:15}):x?a.jsx(j,{}):a.jsxs("div",{className:"min-h-screen w-full px-3 space-y-6 bg-white dark:bg-black",children:[a.jsxs("div",{className:"text-2xl flex gap-2 items-center sm:text-3xl py-5 font-mono text-gray-800 dark:text-slate-400 font-semibold",children:[a.jsx(N,{className:"size-8 border-none animate-pulse"}),a.jsx("p",{children:"Favorite Videos :"})]}),a.jsx("div",{className:"w-full min-h-auto grid place-items-center",children:(e==null?void 0:e.length)>0?a.jsx("ul",{className:"grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:e==null?void 0:e.map(r=>{var l,n,m;return a.jsx("div",{className:"border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]",children:a.jsx(h,{video:r,avatar:(l=r==null?void 0:r.Uploader)==null?void 0:l.avatar,username:(n=r==null?void 0:r.Uploader)==null?void 0:n.username,userId:(m=r==null?void 0:r.Uploader)==null?void 0:m._id,dropMenuBar:[{name:c?a.jsx(w,{className:"animate-spin"}):"Remove video",operation:()=>o({userId:t,videoId:r==null?void 0:r._id})}]},r==null?void 0:r._id)},r==null?void 0:r._id)})}):a.jsx(y,{})})]})};export{z as default};
