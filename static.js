(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,API_VERSION=1;function HardenizeApi(e){e||(e={}),this.__config={},e.hasOwnProperty("org")&&(this.__config.org=e.org),e.hasOwnProperty("user")&&(this.__config.user=e.user),e.hasOwnProperty("pass")&&(this.__config.pass=e.pass),this.__config.url=e.hasOwnProperty("url")?e.url:"https://www.hardenize.com"}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}function endpoint(e){return function(){try{var r=e.apply(this,arguments);return!r instanceof Promise&&(r=Promise.resolve(r)),r}catch(e){return e instanceof Error||(e=new Error(e)),Promise.reject(e)}}}HardenizeApi.version=function(){return String(API_VERSION)},HardenizeApi.prototype.version=function(){return HardenizeApi.version()},HardenizeApi.prototype.config=function(e,r){var t=this;if(void 0===e){var i={};return Object.keys(this.__config).forEach(function(e){i[e]=t.__config[e]}),i}if("object"==typeof e&&null!==e)Object.keys(e).forEach(function(r){t.config(r,e[r])});else if(null===r)delete this.__config[e];else{if(void 0===r)return this.__config[e];this.__config[e]=r}},HardenizeApi.prototype.getCerts=endpoint(require("./src/certs/getCerts")),HardenizeApi.prototype.getCert=endpoint(require("./src/certs/getCert")),HardenizeApi.prototype.addCert=endpoint(require("./src/certs/addCert")),HardenizeApi.prototype.addDnsZone=endpoint(require("./src/dns_zones/addDnsZone")),HardenizeApi.prototype.getTags=endpoint(require("./src/tags/getTags")),HardenizeApi.prototype.addTag=endpoint(require("./src/tags/addTag")),HardenizeApi.prototype.deleteTag=endpoint(require("./src/tags/deleteTag")),HardenizeApi.prototype.getHosts=endpoint(require("./src/hosts/getHosts")),HardenizeApi.prototype.getHost=endpoint(require("./src/hosts/getHost")),HardenizeApi.prototype.addHosts=endpoint(require("./src/hosts/addHosts")),HardenizeApi.prototype.updateHosts=endpoint(require("./src/hosts/updateHosts")),HardenizeApi.prototype.deleteHosts=endpoint(require("./src/hosts/deleteHosts")),HardenizeApi.prototype.getOrgs=endpoint(require("./src/orgs/getOrgs")),HardenizeApi.prototype.addOrg=endpoint(require("./src/orgs/addOrg")),HardenizeApi.prototype.deleteOrg=endpoint(require("./src/orgs/deleteOrg")),HardenizeApi.prototype.updateOrg=endpoint(require("./src/orgs/updateOrg")),HardenizeApi.prototype.getReports0=endpoint(require("./src/reports0/getReports")),HardenizeApi.wrapApiCall=function(e){var r=HardenizeApi.prototype.apiCall;HardenizeApi.prototype.apiCall=function(t,i,n){return i||(i={}),n||(n={}),e.call(this,t,i,n,r.bind(this))}},HardenizeApi.prototype.wrapApiCall=function(e){var r=this.apiCall;this.apiCall=function(t,i,n){return i||(i={}),n||(n={}),e.call(this,t,i,n,r.bind(this))}},HardenizeApi.prototype.apiCall=function(e,r,t){var i;"object"==typeof e&&(i=e.validStatus,e=e.path);var n=this.__config.url+"/org/"+this.__config.org+"/api/v"+API_VERSION+"/"+e.replace(/^\/+/,"");if("object"==typeof t&&null!==t){var o=Object.keys(t).reduce(function(e,r){return[].concat(t[r]).forEach(function(t){e.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}),e},[]);if(o.length){var s=n.match(/\?(.*)$/);s?s[1].length&&(n+="&"):n+="?",n+=o.join("&")}}return r||(r={}),r.headers=new Headers(r.headers),r.hasOwnProperty("redirect")||(r.redirect="error"),this.__config.user&&this.__config.pass&&r.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass)),fetch(n,r).then(function(e){var r=!!(e.headers.get("content-type")||"").match(/^application\/json([\s;].*)?$/i);return e[r?"json":"text"]().then(function(t){var n=e.status>=400;if(i&&(n=!0,[].concat(i).forEach(function(r){e.status==r&&(n=!1)})),n){var o="string"==typeof e.statusText&&e.statusText.length?e.statusText:String(e.status);return r&&"object"==typeof t&&null!==t&&t.errors&&(o=t.errors.map(function(e){var r=e.message;return e.param&&(r='"'+e.param+'" param: '+r),r}).join(", ")),(o=new Error(o)).res=e,r&&(o.data=t),Promise.reject(o)}return{res:e,data:t}}).catch(function(r){return r.res=e,Promise.reject(r)})})},module.exports=HardenizeApi;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/certs/addCert":3,"./src/certs/getCert":4,"./src/certs/getCerts":5,"./src/dns_zones/addDnsZone":6,"./src/hosts/addHosts":7,"./src/hosts/deleteHosts":8,"./src/hosts/getHost":9,"./src/hosts/getHosts":10,"./src/hosts/updateHosts":11,"./src/orgs/addOrg":12,"./src/orgs/deleteOrg":13,"./src/orgs/getOrgs":14,"./src/orgs/updateOrg":15,"./src/reports0/getReports":16,"./src/tags/addTag":17,"./src/tags/deleteTag":18,"./src/tags/getTags":19,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t&&(t=""),0===(t=t.trim()).length)throw"Unable to parse certificate";return this.apiCall({path:"certs/",validStatus:[201,202]},{method:"post",headers:{"Content-Type":"application/x-pem-file"},body:t})};

},{}],4:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t||64!==t.length)throw"Invalid SHA256";return this.apiCall({path:"certs/"+encodeURIComponent(t.toLowerCase()),validStatus:200})};

},{}],5:[function(require,module,exports){
module.exports=function(t){var a={};return"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){var o=t[e];"host"!==e&&"spkiSha256"!==e||(o=o.toLowerCase()),a[e]=o}),this.apiCall({path:"certs/",validStatus:200},{},a)};

},{}],6:[function(require,module,exports){
module.exports=function(t,o){if("string"!=typeof t)throw"Invalid root param";if("string"!=typeof o)throw"Invalid zone body param";return this.apiCall({path:"dns/zones/",validStatus:204},{method:"post",headers:{"Content-Type":"text/plain"},body:o},{root:t})};

},{}],7:[function(require,module,exports){
module.exports=function(t,s){var a={names:t};return"object"==typeof s&&null!==s&&(s.hasOwnProperty("status")&&(a.status=s.status),s.hasOwnProperty("tags")&&(a.tags=s.tags)),this.apiCall({path:"hosts/",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],8:[function(require,module,exports){
module.exports=function(e,t){var o={names:e};return"object"==typeof t&&null!==t&&t.hasOwnProperty("preview")&&(o.preview=t.preview),this.apiCall({path:"hosts/",validStatus:200},{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],9:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t)throw"Invalid hostname";return this.apiCall({path:"hosts/"+encodeURIComponent(t),validStatus:200})};

},{}],10:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"hosts/",validStatus:200},{},t)};

},{}],11:[function(require,module,exports){
module.exports=function(t,o){o||(o={});var a={names:t};return Object.keys(o).forEach(function(t){a[t]=o[t]}),this.apiCall({path:"hosts/*/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],12:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={id:t};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({path:"suborgs/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],13:[function(require,module,exports){
module.exports=function(e){return this.apiCall({path:"suborgs/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],14:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"suborgs/",validStatus:200})};

},{}],15:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({path:"suborgs/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],16:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"reports0/",validStatus:200},{},t)};

},{}],17:[function(require,module,exports){
module.exports=function(a,t){var e={name:a};return"object"==typeof t&&null!==t&&t.hasOwnProperty("displayName")&&(e.displayName=t.displayName),this.apiCall({path:"tags/",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],18:[function(require,module,exports){
module.exports=function(t,e){return this.apiCall({path:"tags/"+encodeURIComponent(t),validStatus:204},{method:"delete"},e)};

},{}],19:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"tags/",validStatus:200})};

},{}]},{},[1])(1)
});
