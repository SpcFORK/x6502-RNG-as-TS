"use strict";var s=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var E=Object.prototype.hasOwnProperty;var A=(e,r)=>{for(var t in r)s(e,t,{get:r[t],enumerable:!0})},C=(e,r,t,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of S(r))!E.call(e,n)&&n!==t&&s(e,n,{get:()=>r[n],enumerable:!(o=h(r,n))||o.enumerable});return e};var R=e=>C(s({},"__esModule",{value:!0}),e);var L={};A(L,{default:()=>G});module.exports=R(L);function y(e,r=[]){if(!e)throw new Error("No object provided to eobj.");e?.name&&r.push(e.name),r.push("default");let t={};for(let o of r){t[o]=e;try{window[o]=e}catch{}}try{globalThis.eval("module").exports=t}catch{}return t}var w=y(y,["eobj"]).default;function*k(e,r){if(e===void 0||e===0)throw new Error("Seed cannot be 0 or Falsey!");if(e>255||e<0)throw new Error("Seed must be between 0 and 255!");function t(u,i){u&=255;let x=u>>7&1,m=u<<1&255;return i&&(m|=1),i=!!x,{result:m,carry:i}}let o,n,c,l;function F(){return l||=e&255,o=8,n=l&255,c=!1,d()}function d(){n<<=1;let{result:u,carry:i}=t(n>>1&255,c);return[n,c]=[u,i],c&&(n^=57),p()}function p(){return o--,o!==0?d():(l=l&-256|n&255,l)}let a,f,b=new class{on=!0;lastVal=()=>a;cross=()=>f};for(;b.on;)try{a=F(),f=yield a,r?.(b),typeof f=="boolean"?b.on=!1:typeof f=="number"&&(l=f)}catch(u){return{error:u,type:"error",LAST_VAL:a}}return{error:void 0,type:"success",LAST_VAL:a}}var G=w(k,["B8RNG255"]).default;
//# sourceMappingURL=rng.js.map