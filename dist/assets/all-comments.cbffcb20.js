import{r as e,h as t,R as a,L as l}from"./vendor.cff9636d.js";import{q as s}from"./apiQuery.bb355e10.js";const o=()=>{const[o,r]=e.exports.useState([]),[m,c]=e.exports.useState(4),[n,u]=e.exports.useState(!1);let{postId:d}=t();return e.exports.useEffect((async()=>{let e=m<=4?0:m-4,t=await s.getAllComments(d,e,m);r([...o,...t]),u(!1)}),[m,s.getAllComments]),a.createElement("div",null,a.createElement("div",{className:"h-full w-full p-2 text-4xl border-b border-black-faded"},"All comments"),a.createElement("div",{className:"mt-5 px-2 h-auto w-auto text-md"},o.map((e=>a.createElement("p",{className:"pb-2"}," ",e.comment," ")))),a.createElement("button",{className:"bg-blue-medium flex justify-center items-center text-center text-white w-full h-8 \n              font-bold ",onClick:()=>{n||(c((e=>e+4)),u(!0))}},n?a.createElement(l,{type:"ThreeDots",color:"#00BFFF",height:20,width:20}):"Load More"))};export{o as default};