import{b as n,m as r,d as c}from"./index-UvYE2vCo.js";import{u as d}from"./useMutation-CwDNoP1B.js";const m=()=>{const{toast:o}=n(),s=r(),i=new Date,a=d({mutationFn:async t=>{const e=await c.post("https://videotube-auro.onrender.com/api/v1/users/watch-later",{videoId:t});return e==null?void 0:e.data},onSuccess:()=>{s.invalidateQueries({queryKey:["watchlaterVideos"]}),o({title:"Video added to watch later list . . . !",description:"At "+i.toLocaleTimeString(),duration:3e3})},onError:t=>{o({title:(t==null?void 0:t.message)||"failed please try again . . . . . !",description:"At "+i.toLocaleTimeString(),variant:"destructive",duration:3e3})}});return{watchLaterLoading:a.isPending,watchLaterError:a.error,watchLaterResponse:a.data,addToWatchLater:a.mutate}};export{m as u};
