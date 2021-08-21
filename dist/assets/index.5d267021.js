import{C as e}from"./vendor.faa86016.js";import{d as t,a as s,A as a}from"./index.2c7b21bb.js";import{D as l,S as r}from"./index.40950192.js";import{q as n}from"./apiQuery.a11a7db1.js";const o=({username:t,profile_pic:a})=>t||a?e.createElement(s,{to:`/p/${t}`,className:"flex justify-between space-x-4 mb-3 "},e.createElement("div",{className:"flex items-center cursor-pointer"},e.createElement("img",{className:"rounded-full h-12 w-12 flex",src:`${a}`,alt:"",onError:e=>{e.target.src=l}})),e.createElement("div",null,e.createElement("p",{className:"font-bold text-base"},t.split(" ")[0]),e.createElement("p",{className:"text-base"},t))):" ";var i=e.memo(o);o.propTypes={username:t.string.isRequired,profile_pic:t.string.isRequired},console.log(n);const m=({profile:t})=>{var r,o;const[i,m]=e.useState(1);return e.useContext(a),e.useEffect((async()=>{const e=await n.isUserFollowing(t.id);m(e)}),[]),i?null:e.createElement("div",{className:"flex flex-row items-center justify-between space-x-2"},e.createElement("div",{className:"flex items-center justify-between"},e.createElement("img",{className:"rounded-full w-8 h-8 flex mr-3",src:`${null==(o=null==(r=null==t?void 0:t.profile_pic)?void 0:r.profile_pic)?void 0:o.url}`,alt:"",onError:e=>{e.target.src=l}}),e.createElement(s,{to:`/p/${t.username}`},e.createElement("p",{className:"font-bold text-sm"},t.username))),e.createElement("button",{className:"text-xs  font-bold text-blue-medium",type:"button",onClick:()=>{n.handleFollow(t.id),m(1)}},"Follow"))},c=()=>{const[t,s]=e.useState(null),{auth:{getUserDetails:l}}=e.useContext(a);return e.useEffect((async()=>{const e=l().id,t=await n.getMultipleUsers(e);s(t)}),[]),e.createElement("div",{className:"rounded flex flex-col"},e.createElement("div",{className:"text-sm flex items-center align-items justify-between mb-2"},e.createElement("p",{className:"font-bold text-gray-base"},"Suggestions for you")),e.createElement("div",{className:"space-y-2"},t?t.map((t=>e.createElement(m,{key:t.id,profile:t}))):e.createElement(r,{count:4,width:300,height:65})))},u=()=>{const{auth:{getUserDetails:t}}=e.useContext(a),{id:s,username:l,profile_pic:r}=t();return e.createElement("div",{className:"w-3/12 h-auto p-4 mr-0 md:flex items-start hidden flex-col"},e.createElement(i,{username:l,profile_pic:r}),e.createElement(c,{userId:s}))};u.whyDidYouRender=!0;var d=e.memo(u);export default d;
