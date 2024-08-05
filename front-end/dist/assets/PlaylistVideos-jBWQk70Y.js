import{c as v,w as j,b,u as V,f as w,m as P,j as t,d as u}from"./index-UvYE2vCo.js";import{V as k}from"./Video-zesbP1DF.js";import{V as N}from"./VideoNotFound-C0CD3_Av.js";import{A as I}from"./APIloading-BGMmLoYL.js";import{A}from"./APIError-D9d9TDrV.js";import{u as F}from"./useQuery-CrBritpR.js";import{u as $}from"./useMutation-CwDNoP1B.js";import{C as q}from"./circle-plus-BtVbFXEv.js";import{L as C}from"./loader-circle-DSk3sBJA.js";import"./ellipsis-vertical-BigcdGfO.js";import"./eye-off-8sHzMaHp.js";import"./useBaseQuery-HSbBb3vM.js";import"./utils-km2FGkQ4.js";/**
 * @license lucide-react v0.381.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=v("FileVideo",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]),J=()=>{var d,c;const i=new Date,{playlistId:o}=j(),{toast:l}=b(),p=V(),x=w().userId,h=P(),y=async()=>{var a;const e=await u.get(`https://videotube-auro.onrender.com/api/v1/video-play-list/all-playlist-videos/${o}`);return(a=e==null?void 0:e.data)==null?void 0:a.data},{data:s,isPending:f,error:g}=F({queryKey:["fetchPlaylistVideos"],queryFn:y,staleTime:10*60*1e3}),n=$({mutationFn:async({videoId:e,playlistId:a})=>{const r=await u.delete(`https://videotube-auro.onrender.com/api/v1/video-play-list/delete-video/${e}/${a}`);return r==null?void 0:r.data},onSuccess:()=>{h.invalidateQueries({queryKey:["fetchPlaylistVideos"]}),l({title:"Videos Removed succesfully.",description:`At : ${i.toLocaleDateString()}`,variant:"default",duration:2e3})},onError:e=>{l({title:e==null?void 0:e.message,description:`At : ${i.toLocaleDateString()}`,variant:"destructive",duration:2e3})}});return f?t.jsx(I,{}):g?t.jsx(A,{}):t.jsx("div",{className:"min-h-screen w-full px-3 bg-white dark:bg-black pt-16 relative",children:t.jsxs("div",{children:[t.jsxs("p",{onClick:()=>p(`/signin/user-profile/${x}`),className:"flex gap-3 dark:border-slate-400 border-slate-900 border-[1px] p-2 w-fit hover:bg-blue-700 hover:border-none hover:scale-95 rounded-xl hover:text-white transition-all items-center text-center text-slate-800 dark:text-slate-300 cursor-pointer",children:[t.jsx(q,{}),"Add Videos"]}),t.jsxs("div",{className:"flex gap-3 items-center py-10 animate-pulse text-gray-800 dark:text-white text-2xl font-black",children:[t.jsx(L,{className:"size-10"}),t.jsx("p",{children:"Playlist Videos"})]}),((d=s==null?void 0:s.videos)==null?void 0:d.length)>0?t.jsx("ul",{className:"grid w-full gap-2 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative",children:(c=s==null?void 0:s.videos)==null?void 0:c.map(e=>{var a,r,m;return t.jsx("div",{className:"border-slate-700 w-full border p-2 rounded-xl relative max-w-[450px]",children:t.jsx(k,{video:e,userId:(a=e==null?void 0:e.owner)==null?void 0:a._id,username:(r=e==null?void 0:e.owner)==null?void 0:r.username,avatar:(m=e==null?void 0:e.owner)==null?void 0:m.avatar,dropMenuBar:[{name:n.isPending?t.jsx(C,{className:"animate-spin"}):"Remove video",operation:()=>n.mutate({videoId:e==null?void 0:e._id,playlistId:o})}]})},e._id)})}):t.jsx("div",{className:"relative grid place-items-center",children:t.jsx(N,{})})]})})};export{J as default};
