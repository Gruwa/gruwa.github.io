!function(e){function n(e){delete T[e]}function r(e){var n=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.charset="utf-8",r.src=f.p+""+e+"."+O+".hot-update.js",n.appendChild(r)}function t(){return new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,t=f.p+""+O+".hot-update.json";r.open("GET",t,!0),r.timeout=1e4,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+t+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+t+" failed."));else{try{var o=JSON.parse(r.responseText)}catch(e){return void n(e)}e(o)}}})}function o(e){var n=M[e];if(!n)return f;var r=function(r){return n.hot.active?(M[r]?M[r].parents.indexOf(e)<0&&M[r].parents.push(e):(E=[e],y=r),n.children.indexOf(r)<0&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),E=[]),f(r)};for(var t in f)Object.prototype.hasOwnProperty.call(f,t)&&"e"!==t&&Object.defineProperty(r,t,function(e){return{configurable:!0,enumerable:!0,get:function(){return f[e]},set:function(n){f[e]=n}}}(t));return r.e=function(e){function n(){P--,"prepare"===x&&(I[e]||p(e),0===P&&0===H&&l())}return"ready"===x&&c("prepare"),P++,f.e(e).then(n,function(e){throw n(),e})},r}function i(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:y!==e,active:!0,accept:function(e,r){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._acceptedDependencies[e[t]]=r||function(){};else n._acceptedDependencies[e]=r||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._declinedDependencies[e[r]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=n._disposeHandlers.indexOf(e);r>=0&&n._disposeHandlers.splice(r,1)},check:a,apply:u,status:function(e){if(!e)return x;j.push(e)},addStatusHandler:function(e){j.push(e)},removeStatusHandler:function(e){var n=j.indexOf(e);n>=0&&j.splice(n,1)},data:_[e]};return y=void 0,n}function c(e){x=e;for(var n=0;n<j.length;n++)j[n].call(null,e)}function d(e){return+e+""===e?+e:e}function a(e){if("idle"!==x)throw new Error("check() is only allowed in idle status");return g=e,c("check"),t().then(function(e){if(!e)return c("idle"),null;k={},I={},A=e.c,b=e.h,c("prepare");var n=new Promise(function(e,n){w={resolve:e,reject:n}});m={};for(var r in T)p(r);return"prepare"===x&&0===P&&0===H&&l(),n})}function s(e,n){if(A[e]&&k[e]){k[e]=!1;for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(m[r]=n[r]);0==--H&&0===P&&l()}}function p(e){A[e]?(k[e]=!0,H++,r(e)):I[e]=!0}function l(){c("ready");var e=w;if(w=null,e)if(g)u(g).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var r in m)Object.prototype.hasOwnProperty.call(m,r)&&n.push(d(r));e.resolve(n)}}function u(r){function t(e,n){for(var r=0;r<n.length;r++){var t=n[r];e.indexOf(t)<0&&e.push(t)}}if("ready"!==x)throw new Error("apply() is only allowed in ready status");r=r||{};var o,i,a,s,p,l={},u=[],h={},v=function(){console.warn("[HMR] unexpected require("+w.moduleId+") to disposed module")};for(var y in m)if(Object.prototype.hasOwnProperty.call(m,y)){p=d(y);var w;w=m[y]?function(e){for(var n=[e],r={},o=n.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var i=o.pop(),c=i.id,d=i.chain;if((s=M[c])&&!s.hot._selfAccepted){if(s.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:c};if(s.hot._main)return{type:"unaccepted",chain:d,moduleId:c};for(var a=0;a<s.parents.length;a++){var p=s.parents[a],l=M[p];if(l){if(l.hot._declinedDependencies[c])return{type:"declined",chain:d.concat([p]),moduleId:c,parentId:p};n.indexOf(p)>=0||(l.hot._acceptedDependencies[c]?(r[p]||(r[p]=[]),t(r[p],[c])):(delete r[p],n.push(p),o.push({chain:d.concat([p]),id:p})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}(p):{type:"disposed",moduleId:y};var g=!1,D=!1,j=!1,H="";switch(w.chain&&(H="\nUpdate propagation: "+w.chain.join(" -> ")),w.type){case"self-declined":r.onDeclined&&r.onDeclined(w),r.ignoreDeclined||(g=new Error("Aborted because of self decline: "+w.moduleId+H));break;case"declined":r.onDeclined&&r.onDeclined(w),r.ignoreDeclined||(g=new Error("Aborted because of declined dependency: "+w.moduleId+" in "+w.parentId+H));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(w),r.ignoreUnaccepted||(g=new Error("Aborted because "+p+" is not accepted"+H));break;case"accepted":r.onAccepted&&r.onAccepted(w),D=!0;break;case"disposed":r.onDisposed&&r.onDisposed(w),j=!0;break;default:throw new Error("Unexception type "+w.type)}if(g)return c("abort"),Promise.reject(g);if(D){h[p]=m[p],t(u,w.outdatedModules);for(p in w.outdatedDependencies)Object.prototype.hasOwnProperty.call(w.outdatedDependencies,p)&&(l[p]||(l[p]=[]),t(l[p],w.outdatedDependencies[p]))}j&&(t(u,[w.moduleId]),h[p]=v)}var P=[];for(i=0;i<u.length;i++)p=u[i],M[p]&&M[p].hot._selfAccepted&&P.push({module:p,errorHandler:M[p].hot._selfAccepted});c("dispose"),Object.keys(A).forEach(function(e){!1===A[e]&&n(e)});for(var I,k=u.slice();k.length>0;)if(p=k.pop(),s=M[p]){var T={},q=s.hot._disposeHandlers;for(a=0;a<q.length;a++)(o=q[a])(T);for(_[p]=T,s.hot.active=!1,delete M[p],a=0;a<s.children.length;a++){var U=M[s.children[a]];U&&((I=U.parents.indexOf(p))>=0&&U.parents.splice(I,1))}}var R,L;for(p in l)if(Object.prototype.hasOwnProperty.call(l,p)&&(s=M[p]))for(L=l[p],a=0;a<L.length;a++)R=L[a],(I=s.children.indexOf(R))>=0&&s.children.splice(I,1);c("apply"),O=b;for(p in h)Object.prototype.hasOwnProperty.call(h,p)&&(e[p]=h[p]);var N=null;for(p in l)if(Object.prototype.hasOwnProperty.call(l,p)){s=M[p],L=l[p];var S=[];for(i=0;i<L.length;i++)R=L[i],o=s.hot._acceptedDependencies[R],S.indexOf(o)>=0||S.push(o);for(i=0;i<S.length;i++){o=S[i];try{o(L)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:p,dependencyId:L[i],error:e}),r.ignoreErrored||N||(N=e)}}}for(i=0;i<P.length;i++){var X=P[i];p=X.module,E=[p];try{f(p)}catch(e){if("function"==typeof X.errorHandler)try{X.errorHandler(e)}catch(n){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:p,error:n,orginalError:e}),r.ignoreErrored||N||(N=n),N||(N=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:p,error:e}),r.ignoreErrored||N||(N=e)}}return N?(c("fail"),Promise.reject(N)):(c("idle"),new Promise(function(e){e(u)}))}function f(n){if(M[n])return M[n].exports;var r=M[n]={i:n,l:!1,exports:{},hot:i(n),parents:(D=E,E=[],D),children:[]};return e[n].call(r.exports,r,r.exports,o(n)),r.l=!0,r.exports}var h=window.webpackJsonp;window.webpackJsonp=function(n,r,t){for(var o,i,c,d=0,a=[];d<n.length;d++)i=n[d],T[i]&&a.push(T[i][0]),T[i]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);for(h&&h(n,r,t);a.length;)a.shift()();if(t)for(d=0;d<t.length;d++)c=f(f.s=t[d]);return c};var v=this.webpackHotUpdate;this.webpackHotUpdate=function(e,n){s(e,n),v&&v(e,n)};var y,w,m,b,g=!0,O="b706d2545c471bda35d5",_={},E=[],D=[],j=[],x="idle",H=0,P=0,I={},k={},A={},M={},T={1:0},q=new Promise(function(e){e()});f.e=function(e){function n(){o.onerror=o.onload=null,clearTimeout(i);var n=T[e];0!==n&&(n&&n[1](new Error("Loading chunk "+e+" failed.")),T[e]=void 0)}if(0===T[e])return q;if(T[e])return T[e][2];var r=new Promise(function(n,r){T[e]=[n,r]});T[e][2]=r;var t=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.charset="utf-8",o.async=!0,o.timeout=12e4,f.nc&&o.setAttribute("nonce",f.nc),o.src=f.p+"js/"+e+".js";var i=setTimeout(n,12e4);return o.onerror=o.onload=n,t.appendChild(o),r},f.m=e,f.c=M,f.i=function(e){return e},f.d=function(e,n,r){f.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},f.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(n,"a",n),n},f.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},f.p="https://gruwa.github.io/practice/hw_ang_wunderlist/build/",f.oe=function(e){throw console.error(e),e},f.h=function(){return O},o(4)(f.s=4)}([,,,function(e,n){var r=function(e){var n=!1,r=void 0;if(e&&e.filename&&(n=e.filename),!n)return!1;var t,o=new XMLHttpRequest;"undefined"!=typeof XDomainRequest&&(o=new XDomainRequest),void 0===r&&(r=void 0!==window.baseUrl?window.baseUrl:window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")),t=(r+"/"+n).replace(/([^:]\/)\/+/g,"$1"),o.open("GET",t,!0),o.onprogress=function(){},o.onload=function(){if(!o.responseText||"<svg"!==o.responseText.substr(0,4))throw Error("Invalid SVG Response");if(!(o.status<200||o.status>=300)){var e=document.createElement("div");e.innerHTML=o.responseText,document.body.insertBefore(e,document.body.childNodes[0])}},o.send()};e.exports=r},function(e,n,r){var t={filename:r.p+"img/sprite__icon.svg?1498778061533"};r(3)(t)}]);