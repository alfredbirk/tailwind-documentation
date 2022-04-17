var Te=Object.create;var M=Object.defineProperty;var Pe=Object.getOwnPropertyDescriptor;var Se=Object.getOwnPropertyNames;var xe=Object.getPrototypeOf,Ee=Object.prototype.hasOwnProperty;var Oe=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Ce=(t,e)=>{for(var r in e)M(t,r,{get:e[r],enumerable:!0})},se=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Se(e))!Ee.call(t,n)&&n!==r&&M(t,n,{get:()=>e[n],enumerable:!(o=Pe(e,n))||o.enumerable});return t};var K=(t,e,r)=>(r=t!=null?Te(xe(t)):{},se(e||!t||!t.__esModule?M(r,"default",{value:t,enumerable:!0}):r,t)),Be=t=>se(M({},"__esModule",{value:!0}),t);var ie=(t,e,r)=>new Promise((o,n)=>{var s=i=>{try{a(r.next(i))}catch(u){n(u)}},l=i=>{try{a(r.throw(i))}catch(u){n(u)}},a=i=>i.done?o(i.value):Promise.resolve(i.value).then(s,l);a((r=r.apply(t,e)).next())});var be=Oe((T,ye)=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});function F(t){return t&&typeof t=="object"&&"default"in t?t.default:t}var w=F(require("stream")),ce=F(require("http")),ne=F(require("url")),Ae=F(require("https")),_=F(require("zlib")),$e=w.Readable,P=Symbol("buffer"),Z=Symbol("type"),B=class{constructor(){this[Z]="";let e=arguments[0],r=arguments[1],o=[],n=0;if(e){let l=e,a=Number(l.length);for(let i=0;i<a;i++){let u=l[i],g;u instanceof Buffer?g=u:ArrayBuffer.isView(u)?g=Buffer.from(u.buffer,u.byteOffset,u.byteLength):u instanceof ArrayBuffer?g=Buffer.from(u):u instanceof B?g=u[P]:g=Buffer.from(typeof u=="string"?u:String(u)),n+=g.length,o.push(g)}}this[P]=Buffer.concat(o);let s=r&&r.type!==void 0&&String(r.type).toLowerCase();s&&!/[^\u0020-\u007E]/.test(s)&&(this[Z]=s)}get size(){return this[P].length}get type(){return this[Z]}text(){return Promise.resolve(this[P].toString())}arrayBuffer(){let e=this[P],r=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(r)}stream(){let e=new $e;return e._read=function(){},e.push(this[P]),e.push(null),e}toString(){return"[object Blob]"}slice(){let e=this.size,r=arguments[0],o=arguments[1],n,s;r===void 0?n=0:r<0?n=Math.max(e+r,0):n=Math.min(r,e),o===void 0?s=e:o<0?s=Math.max(e+o,0):s=Math.min(o,e);let l=Math.max(s-n,0),i=this[P].slice(n,n+l),u=new B([],{type:arguments[2]});return u[P]=i,u}};Object.defineProperties(B.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}});Object.defineProperty(B.prototype,Symbol.toStringTag,{value:"Blob",writable:!1,enumerable:!1,configurable:!0});function d(t,e,r){Error.call(this,t),this.message=t,this.type=e,r&&(this.code=this.errno=r.code),Error.captureStackTrace(this,this.constructor)}d.prototype=Object.create(Error.prototype);d.prototype.constructor=d;d.prototype.name="FetchError";var Q;try{Q=require("encoding").convert}catch{}var x=Symbol("Body internals"),ae=w.PassThrough;function h(t){var e=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=r.size;let n=o===void 0?0:o;var s=r.timeout;let l=s===void 0?0:s;t==null?t=null:fe(t)?t=Buffer.from(t.toString()):q(t)||Buffer.isBuffer(t)||(Object.prototype.toString.call(t)==="[object ArrayBuffer]"?t=Buffer.from(t):ArrayBuffer.isView(t)?t=Buffer.from(t.buffer,t.byteOffset,t.byteLength):t instanceof w||(t=Buffer.from(String(t)))),this[x]={body:t,disturbed:!1,error:null},this.size=n,this.timeout=l,t instanceof w&&t.on("error",function(a){let i=a.name==="AbortError"?a:new d(`Invalid response body while trying to fetch ${e.url}: ${a.message}`,"system",a);e[x].error=i})}h.prototype={get body(){return this[x].body},get bodyUsed(){return this[x].disturbed},arrayBuffer(){return j.call(this).then(function(t){return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)})},blob(){let t=this.headers&&this.headers.get("content-type")||"";return j.call(this).then(function(e){return Object.assign(new B([],{type:t.toLowerCase()}),{[P]:e})})},json(){var t=this;return j.call(this).then(function(e){try{return JSON.parse(e.toString())}catch(r){return h.Promise.reject(new d(`invalid json response body at ${t.url} reason: ${r.message}`,"invalid-json"))}})},text(){return j.call(this).then(function(t){return t.toString()})},buffer(){return j.call(this)},textConverted(){var t=this;return j.call(this).then(function(e){return _e(e,t.headers)})}};Object.defineProperties(h.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0}});h.mixIn=function(t){for(let e of Object.getOwnPropertyNames(h.prototype))if(!(e in t)){let r=Object.getOwnPropertyDescriptor(h.prototype,e);Object.defineProperty(t,e,r)}};function j(){var t=this;if(this[x].disturbed)return h.Promise.reject(new TypeError(`body used already for: ${this.url}`));if(this[x].disturbed=!0,this[x].error)return h.Promise.reject(this[x].error);let e=this.body;if(e===null)return h.Promise.resolve(Buffer.alloc(0));if(q(e)&&(e=e.stream()),Buffer.isBuffer(e))return h.Promise.resolve(e);if(!(e instanceof w))return h.Promise.resolve(Buffer.alloc(0));let r=[],o=0,n=!1;return new h.Promise(function(s,l){let a;t.timeout&&(a=setTimeout(function(){n=!0,l(new d(`Response timeout while trying to fetch ${t.url} (over ${t.timeout}ms)`,"body-timeout"))},t.timeout)),e.on("error",function(i){i.name==="AbortError"?(n=!0,l(i)):l(new d(`Invalid response body while trying to fetch ${t.url}: ${i.message}`,"system",i))}),e.on("data",function(i){if(!(n||i===null)){if(t.size&&o+i.length>t.size){n=!0,l(new d(`content size at ${t.url} over limit: ${t.size}`,"max-size"));return}o+=i.length,r.push(i)}}),e.on("end",function(){if(!n){clearTimeout(a);try{s(Buffer.concat(r,o))}catch(i){l(new d(`Could not create Buffer from response body for ${t.url}: ${i.message}`,"system",i))}}})})}function _e(t,e){if(typeof Q!="function")throw new Error("The package `encoding` must be installed to use the textConverted() function");let r=e.get("content-type"),o="utf-8",n,s;return r&&(n=/charset=([^;]*)/i.exec(r)),s=t.slice(0,1024).toString(),!n&&s&&(n=/<meta.+?charset=(['"])(.+?)\1/i.exec(s)),!n&&s&&(n=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(s),n||(n=/<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(s),n&&n.pop()),n&&(n=/charset=(.*)/i.exec(n.pop()))),!n&&s&&(n=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(s)),n&&(o=n.pop(),(o==="gb2312"||o==="gbk")&&(o="gb18030")),Q(t,"UTF-8",o).toString()}function fe(t){return typeof t!="object"||typeof t.append!="function"||typeof t.delete!="function"||typeof t.get!="function"||typeof t.getAll!="function"||typeof t.has!="function"||typeof t.set!="function"?!1:t.constructor.name==="URLSearchParams"||Object.prototype.toString.call(t)==="[object URLSearchParams]"||typeof t.sort=="function"}function q(t){return typeof t=="object"&&typeof t.arrayBuffer=="function"&&typeof t.type=="string"&&typeof t.stream=="function"&&typeof t.constructor=="function"&&typeof t.constructor.name=="string"&&/^(Blob|File)$/.test(t.constructor.name)&&/^(Blob|File)$/.test(t[Symbol.toStringTag])}function he(t){let e,r,o=t.body;if(t.bodyUsed)throw new Error("cannot clone body after it is used");return o instanceof w&&typeof o.getBoundary!="function"&&(e=new ae,r=new ae,o.pipe(e),o.pipe(r),t[x].body=e,o=r),o}function de(t){return t===null?null:typeof t=="string"?"text/plain;charset=UTF-8":fe(t)?"application/x-www-form-urlencoded;charset=UTF-8":q(t)?t.type||null:Buffer.isBuffer(t)||Object.prototype.toString.call(t)==="[object ArrayBuffer]"||ArrayBuffer.isView(t)?null:typeof t.getBoundary=="function"?`multipart/form-data;boundary=${t.getBoundary()}`:t instanceof w?null:"text/plain;charset=UTF-8"}function pe(t){let e=t.body;return e===null?0:q(e)?e.size:Buffer.isBuffer(e)?e.length:e&&typeof e.getLengthSync=="function"&&(e._lengthRetrievers&&e._lengthRetrievers.length==0||e.hasKnownLength&&e.hasKnownLength())?e.getLengthSync():null}function ke(t,e){let r=e.body;r===null?t.end():q(r)?r.stream().pipe(t):Buffer.isBuffer(r)?(t.write(r),t.end()):r.pipe(t)}h.Promise=global.Promise;var me=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,ee=/[^\t\x20-\x7e\x80-\xff]/;function N(t){if(t=`${t}`,me.test(t)||t==="")throw new TypeError(`${t} is not a legal HTTP header name`)}function le(t){if(t=`${t}`,ee.test(t))throw new TypeError(`${t} is not a legal HTTP header value`)}function R(t,e){e=e.toLowerCase();for(let r in t)if(r.toLowerCase()===e)return r}var c=Symbol("map"),p=class{constructor(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:void 0;if(this[c]=Object.create(null),e instanceof p){let r=e.raw(),o=Object.keys(r);for(let n of o)for(let s of r[n])this.append(n,s);return}if(e!=null)if(typeof e=="object"){let r=e[Symbol.iterator];if(r!=null){if(typeof r!="function")throw new TypeError("Header pairs must be iterable");let o=[];for(let n of e){if(typeof n!="object"||typeof n[Symbol.iterator]!="function")throw new TypeError("Each header pair must be iterable");o.push(Array.from(n))}for(let n of o){if(n.length!==2)throw new TypeError("Each header pair must be a name/value tuple");this.append(n[0],n[1])}}else for(let o of Object.keys(e)){let n=e[o];this.append(o,n)}}else throw new TypeError("Provided initializer must be an object")}get(e){e=`${e}`,N(e);let r=R(this[c],e);return r===void 0?null:this[c][r].join(", ")}forEach(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:void 0,o=te(this),n=0;for(;n<o.length;){var s=o[n];let l=s[0],a=s[1];e.call(r,a,l,this),o=te(this),n++}}set(e,r){e=`${e}`,r=`${r}`,N(e),le(r);let o=R(this[c],e);this[c][o!==void 0?o:e]=[r]}append(e,r){e=`${e}`,r=`${r}`,N(e),le(r);let o=R(this[c],e);o!==void 0?this[c][o].push(r):this[c][e]=[r]}has(e){return e=`${e}`,N(e),R(this[c],e)!==void 0}delete(e){e=`${e}`,N(e);let r=R(this[c],e);r!==void 0&&delete this[c][r]}raw(){return this[c]}keys(){return J(this,"key")}values(){return J(this,"value")}[Symbol.iterator](){return J(this,"key+value")}};p.prototype.entries=p.prototype[Symbol.iterator];Object.defineProperty(p.prototype,Symbol.toStringTag,{value:"Headers",writable:!1,enumerable:!1,configurable:!0});Object.defineProperties(p.prototype,{get:{enumerable:!0},forEach:{enumerable:!0},set:{enumerable:!0},append:{enumerable:!0},has:{enumerable:!0},delete:{enumerable:!0},keys:{enumerable:!0},values:{enumerable:!0},entries:{enumerable:!0}});function te(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"key+value";return Object.keys(t[c]).sort().map(e==="key"?function(o){return o.toLowerCase()}:e==="value"?function(o){return t[c][o].join(", ")}:function(o){return[o.toLowerCase(),t[c][o].join(", ")]})}var re=Symbol("internal");function J(t,e){let r=Object.create(oe);return r[re]={target:t,kind:e,index:0},r}var oe=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==oe)throw new TypeError("Value of `this` is not a HeadersIterator");var t=this[re];let e=t.target,r=t.kind,o=t.index,n=te(e,r),s=n.length;return o>=s?{value:void 0,done:!0}:(this[re].index=o+1,{value:n[o],done:!1})}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));Object.defineProperty(oe,Symbol.toStringTag,{value:"HeadersIterator",writable:!1,enumerable:!1,configurable:!0});function Le(t){let e=Object.assign({__proto__:null},t[c]),r=R(t[c],"Host");return r!==void 0&&(e[r]=e[r][0]),e}function je(t){let e=new p;for(let r of Object.keys(t))if(!me.test(r))if(Array.isArray(t[r]))for(let o of t[r])ee.test(o)||(e[c][r]===void 0?e[c][r]=[o]:e[c][r].push(o));else ee.test(t[r])||(e[c][r]=[t[r]]);return e}var O=Symbol("Response internals"),Re=ce.STATUS_CODES,b=class{constructor(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};h.call(this,e,r);let o=r.status||200,n=new p(r.headers);if(e!=null&&!n.has("Content-Type")){let s=de(e);s&&n.append("Content-Type",s)}this[O]={url:r.url,status:o,statusText:r.statusText||Re[o],headers:n,counter:r.counter}}get url(){return this[O].url||""}get status(){return this[O].status}get ok(){return this[O].status>=200&&this[O].status<300}get redirected(){return this[O].counter>0}get statusText(){return this[O].statusText}get headers(){return this[O].headers}clone(){return new b(he(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}};h.mixIn(b.prototype);Object.defineProperties(b.prototype,{url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}});Object.defineProperty(b.prototype,Symbol.toStringTag,{value:"Response",writable:!1,enumerable:!1,configurable:!0});var S=Symbol("Request internals"),X=ne.parse,ze=ne.format,Ue="destroy"in w.Readable.prototype;function V(t){return typeof t=="object"&&typeof t[S]=="object"}function He(t){let e=t&&typeof t=="object"&&Object.getPrototypeOf(t);return!!(e&&e.constructor.name==="AbortSignal")}var v=class{constructor(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o;V(e)?o=X(e.url):(e&&e.href?o=X(e.href):o=X(`${e}`),e={});let n=r.method||e.method||"GET";if(n=n.toUpperCase(),(r.body!=null||V(e)&&e.body!==null)&&(n==="GET"||n==="HEAD"))throw new TypeError("Request with GET/HEAD method cannot have body");let s=r.body!=null?r.body:V(e)&&e.body!==null?he(e):null;h.call(this,s,{timeout:r.timeout||e.timeout||0,size:r.size||e.size||0});let l=new p(r.headers||e.headers||{});if(s!=null&&!l.has("Content-Type")){let i=de(s);i&&l.append("Content-Type",i)}let a=V(e)?e.signal:null;if("signal"in r&&(a=r.signal),a!=null&&!He(a))throw new TypeError("Expected signal to be an instanceof AbortSignal");this[S]={method:n,redirect:r.redirect||e.redirect||"follow",headers:l,parsedURL:o,signal:a},this.follow=r.follow!==void 0?r.follow:e.follow!==void 0?e.follow:20,this.compress=r.compress!==void 0?r.compress:e.compress!==void 0?e.compress:!0,this.counter=r.counter||e.counter||0,this.agent=r.agent||e.agent}get method(){return this[S].method}get url(){return ze(this[S].parsedURL)}get headers(){return this[S].headers}get redirect(){return this[S].redirect}get signal(){return this[S].signal}clone(){return new v(this)}};h.mixIn(v.prototype);Object.defineProperty(v.prototype,Symbol.toStringTag,{value:"Request",writable:!1,enumerable:!1,configurable:!0});Object.defineProperties(v.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0}});function Ne(t){let e=t[S].parsedURL,r=new p(t[S].headers);if(r.has("Accept")||r.set("Accept","*/*"),!e.protocol||!e.hostname)throw new TypeError("Only absolute URLs are supported");if(!/^https?:$/.test(e.protocol))throw new TypeError("Only HTTP(S) protocols are supported");if(t.signal&&t.body instanceof w.Readable&&!Ue)throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");let o=null;if(t.body==null&&/^(POST|PUT)$/i.test(t.method)&&(o="0"),t.body!=null){let s=pe(t);typeof s=="number"&&(o=String(s))}o&&r.set("Content-Length",o),r.has("User-Agent")||r.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"),t.compress&&!r.has("Accept-Encoding")&&r.set("Accept-Encoding","gzip,deflate");let n=t.agent;return typeof n=="function"&&(n=n(e)),!r.has("Connection")&&!n&&r.set("Connection","close"),Object.assign({},e,{method:t.method,headers:Le(r),agent:n})}function D(t){Error.call(this,t),this.type="aborted",this.message=t,Error.captureStackTrace(this,this.constructor)}D.prototype=Object.create(Error.prototype);D.prototype.constructor=D;D.prototype.name="AbortError";var ue=w.PassThrough,De=ne.resolve;function C(t,e){if(!C.Promise)throw new Error("native promise missing, set fetch.Promise to your favorite alternative");return h.Promise=C.Promise,new C.Promise(function(r,o){let n=new v(t,e),s=Ne(n),l=(s.protocol==="https:"?Ae:ce).request,a=n.signal,i=null,u=function(){let E=new D("The user aborted a request.");o(E),n.body&&n.body instanceof w.Readable&&n.body.destroy(E),!(!i||!i.body)&&i.body.emit("error",E)};if(a&&a.aborted){u();return}let g=function(){u(),$()},U=l(s),G;a&&a.addEventListener("abort",g);function $(){U.abort(),a&&a.removeEventListener("abort",g),clearTimeout(G)}n.timeout&&U.once("socket",function(f){G=setTimeout(function(){o(new d(`network timeout at: ${n.url}`,"request-timeout")),$()},n.timeout)}),U.on("error",function(f){o(new d(`request to ${n.url} failed, reason: ${f.message}`,"system",f)),$()}),U.on("response",function(f){clearTimeout(G);let E=je(f.headers);if(C.isRedirect(f.statusCode)){let W=E.get("Location"),L=W===null?null:De(n.url,W);switch(n.redirect){case"error":o(new d(`uri requested responds with a redirect, redirect mode is set to error: ${n.url}`,"no-redirect")),$();return;case"manual":if(L!==null)try{E.set("Location",L)}catch(ve){o(ve)}break;case"follow":if(L===null)break;if(n.counter>=n.follow){o(new d(`maximum redirect reached at: ${n.url}`,"max-redirect")),$();return}let I={headers:new p(n.headers),follow:n.follow,counter:n.counter+1,agent:n.agent,compress:n.compress,method:n.method,body:n.body,signal:n.signal,timeout:n.timeout,size:n.size};if(f.statusCode!==303&&n.body&&pe(n)===null){o(new d("Cannot follow redirect with body being a readable stream","unsupported-redirect")),$();return}(f.statusCode===303||(f.statusCode===301||f.statusCode===302)&&n.method==="POST")&&(I.method="GET",I.body=void 0,I.headers.delete("content-length")),r(C(new v(L,I))),$();return}}f.once("end",function(){a&&a.removeEventListener("abort",g)});let y=f.pipe(new ue),H={url:n.url,status:f.statusCode,statusText:f.statusMessage,headers:E,size:n.size,timeout:n.timeout,counter:n.counter},k=E.get("Content-Encoding");if(!n.compress||n.method==="HEAD"||k===null||f.statusCode===204||f.statusCode===304){i=new b(y,H),r(i);return}let we={flush:_.Z_SYNC_FLUSH,finishFlush:_.Z_SYNC_FLUSH};if(k=="gzip"||k=="x-gzip"){y=y.pipe(_.createGunzip(we)),i=new b(y,H),r(i);return}if(k=="deflate"||k=="x-deflate"){f.pipe(new ue).once("data",function(L){(L[0]&15)===8?y=y.pipe(_.createInflate()):y=y.pipe(_.createInflateRaw()),i=new b(y,H),r(i)});return}if(k=="br"&&typeof _.createBrotliDecompress=="function"){y=y.pipe(_.createBrotliDecompress()),i=new b(y,H),r(i);return}i=new b(y,H),r(i)}),ke(U,n)})}C.isRedirect=function(t){return t===301||t===302||t===303||t===307||t===308};C.Promise=global.Promise;ye.exports=T=C;Object.defineProperty(T,"__esModule",{value:!0});T.default=T;T.Headers=p;T.Request=v;T.Response=b;T.FetchError=d});var Ie={};Ce(Ie,{activate:()=>Fe});module.exports=Be(Ie);var z=K(require("path")),m=K(require("vscode")),ge=K(be());function Fe(t){t.subscriptions.push(m.commands.registerCommand("tailwind-documentation.search",()=>{Y.createOrShow(t.extensionPath)}))}var A=class{constructor(e,r){this._disposables=[];this._extensionPath=e,this._panel=m.window.createWebviewPanel(A.viewType,"Tailwind documentation",r,{enableScripts:!0,localResourceRoots:[m.Uri.file(z.join(this._extensionPath,"build"))]}),this._panel.webview.html=this._getHtmlForWebview(),this._panel.onDidDispose(()=>this.dispose(),null,this._disposables),this._panel.webview.onDidReceiveMessage(o=>ie(this,null,function*(){switch(console.log(o),o.command){case"query":let n=`{"requests":[{"indexName":"tailwindcss","query":"${o.value}","params":"hitsPerPage=20&highlightPreTag=%3Cmark%3E&highlightPostTag=%3C%2Fmark%3E&attributesToRetrieve=%5B%22hierarchy.lvl0%22%2C%22hierarchy.lvl1%22%2C%22hierarchy.lvl2%22%2C%22hierarchy.lvl3%22%2C%22hierarchy.lvl4%22%2C%22hierarchy.lvl5%22%2C%22hierarchy.lvl6%22%2C%22content%22%2C%22type%22%2C%22url%22%5D&attributesToSnippet=%5B%22hierarchy.lvl1%3A10%22%2C%22hierarchy.lvl2%3A10%22%2C%22hierarchy.lvl3%3A10%22%2C%22hierarchy.lvl4%3A10%22%2C%22hierarchy.lvl5%3A10%22%2C%22hierarchy.lvl6%3A10%22%2C%22content%3A10%22%5D&snippetEllipsisText=%E2%80%A6&facetFilters=version%3Av3&distinct=1"}]}`;console.log("HEY:",typeof n);let s=yield(0,ge.default)("https://knpxzi5b0m-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.9.2)%3B%20Browser%20(lite)%3B%20docsearch%20(1.0.0-alpha.27)%3B%20docsearch-react%20(1.0.0-alpha.27)%3B%20autocomplete-core%20(1.0.0-alpha.28)&x-algolia-api-key=5fc87cef58bb80203d2207578309fab6&x-algolia-application-id=KNPXZI5B0M",{headers:{},body:n,method:"POST"});console.log("after?");let l=yield s.json();console.log("data 123",l),this._panel.webview.postMessage(l.results);case"alert":m.window.showErrorMessage(o.text);return}}),null,this._disposables)}static createOrShow(e){let r=m.window.activeTextEditor?m.window.activeTextEditor.viewColumn:void 0;A.currentPanel?A.currentPanel._panel.reveal(r):A.currentPanel=new A(e,m.ViewColumn.Two)}doRefactor(){this._panel.webview.postMessage({command:"refactor"})}dispose(){for(A.currentPanel=void 0,this._panel.dispose();this._disposables.length;){let e=this._disposables.pop();e&&e.dispose()}}_getHtmlForWebview(){let e=require(z.join(this._extensionPath,"build","asset-manifest.json")),r=e.files["main.js"],o=e.files["main.css"],s=m.Uri.file(z.join(this._extensionPath,"build",r)).with({scheme:"vscode-resource"}),a=m.Uri.file(z.join(this._extensionPath,"build",o)).with({scheme:"vscode-resource"}),i=qe();return`<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>Tailwind Documentation</title>
				<link rel="stylesheet" type="text/css" href="${a}">
				<base href="${this._panel.webview.asWebviewUri(m.Uri.file(z.join(this._extensionPath,"build")))}/">
				<meta http-equiv="Content-Security-Policy" content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;">

			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				
				<script nonce="${i}" src="${s}"><\/script>
			</body>
			</html>`}},Y=A;Y.viewType="react";function qe(){let t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let r=0;r<32;r++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}0&&(module.exports={activate});
