(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,API_VERSION=1;function HardenizeApi(e){e||(e={}),this.__config={},e.hasOwnProperty("org")&&(this.__config.org=e.org),e.hasOwnProperty("user")&&(this.__config.user=e.user),e.hasOwnProperty("pass")&&(this.__config.pass=e.pass),this.__config.url=e.hasOwnProperty("url")?e.url:"https://www.hardenize.com"}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}function endpoint(e){return function(){try{var r=e.apply(this,arguments);return!r instanceof Promise&&(r=Promise.resolve(r)),r}catch(e){return e instanceof Error||(e=new Error(e)),Promise.reject(e)}}}HardenizeApi.version=function(){return String(API_VERSION)},HardenizeApi.prototype.version=function(){return HardenizeApi.version()},HardenizeApi.prototype.config=function(e,r){var t=this;if(void 0===e){var o={};return Object.keys(this.__config).forEach(function(e){o[e]=t.__config[e]}),o}if("object"==typeof e&&null!==e)Object.keys(e).forEach(function(r){t.config(r,e[r])});else if(null===r)delete this.__config[e];else{if(void 0===r)return this.__config[e];this.__config[e]=r}},HardenizeApi.prototype.getCerts=endpoint(require("./src/certs/getCerts")),HardenizeApi.prototype.getCert=endpoint(require("./src/certs/getCert")),HardenizeApi.prototype.addCert=endpoint(require("./src/certs/addCert")),HardenizeApi.prototype.addDnsZone=endpoint(require("./src/dns_zones/addDnsZone")),HardenizeApi.prototype.getGroups=endpoint(require("./src/groups/getGroups")),HardenizeApi.prototype.addGroup=endpoint(require("./src/groups/addGroup")),HardenizeApi.prototype.deleteGroup=endpoint(require("./src/groups/deleteGroup")),HardenizeApi.prototype.getHosts=endpoint(require("./src/hosts/getHosts")),HardenizeApi.prototype.getHost=endpoint(require("./src/hosts/getHost")),HardenizeApi.prototype.addHosts=endpoint(require("./src/hosts/addHosts")),HardenizeApi.prototype.updateHosts=endpoint(require("./src/hosts/updateHosts")),HardenizeApi.prototype.deleteHosts=endpoint(require("./src/hosts/deleteHosts")),HardenizeApi.prototype.getOrgs=endpoint(require("./src/orgs/getOrgs")),HardenizeApi.prototype.addOrg=endpoint(require("./src/orgs/addOrg")),HardenizeApi.prototype.deleteOrg=endpoint(require("./src/orgs/deleteOrg")),HardenizeApi.prototype.updateOrg=endpoint(require("./src/orgs/updateOrg")),HardenizeApi.prototype.getReports0=endpoint(require("./src/reports0/getReports")),HardenizeApi.wrapApiCall=function(e){var r=HardenizeApi.prototype.apiCall;HardenizeApi.prototype.apiCall=function(t,o,i){return o||(o={}),i||(i={}),e.call(this,t,o,i,r.bind(this))}},HardenizeApi.prototype.wrapApiCall=function(e){var r=this.apiCall;this.apiCall=function(t,o,i){return o||(o={}),i||(i={}),e.call(this,t,o,i,r.bind(this))}},HardenizeApi.prototype.apiCall=function(e,r,t){var o;"object"==typeof e&&(o=e.validStatus,e=e.path);var i=this.__config.url+"/org/"+this.__config.org+"/api/v"+API_VERSION+"/"+e.replace(/^\/+/,"");if("object"==typeof t&&null!==t){var n=Object.keys(t).reduce(function(e,r){return[].concat(t[r]).forEach(function(t){e.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}),e},[]);if(n.length){var s=i.match(/\?(.*)$/);s?s[1].length&&(i+="&"):i+="?",i+=n.join("&")}}return r||(r={}),r.headers=new Headers(r.headers),r.hasOwnProperty("redirect")||(r.redirect="error"),this.__config.user&&this.__config.pass&&r.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass)),fetch(i,r).then(function(e){var r=!!(e.headers.get("content-type")||"").match(/^application\/json([\s;].*)?$/i);return e[r?"json":"text"]().then(function(t){var i=e.status>=400;if(o&&(i=!0,[].concat(o).forEach(function(r){e.status==r&&(i=!1)})),i){var n="string"==typeof e.statusText&&e.statusText.length?e.statusText:String(e.status);return r&&"object"==typeof t&&null!==t&&t.errors&&(n=t.errors.map(function(e){var r=e.message;return e.param&&(r='"'+e.param+'" param: '+r),r}).join(", ")),(n=new Error(n)).res=e,r&&(n.data=t),Promise.reject(n)}return{res:e,data:t}}).catch(function(r){return r.res=e,Promise.reject(r)})})},module.exports=HardenizeApi;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/certs/addCert":3,"./src/certs/getCert":4,"./src/certs/getCerts":5,"./src/dns_zones/addDnsZone":6,"./src/groups/addGroup":7,"./src/groups/deleteGroup":8,"./src/groups/getGroups":9,"./src/hosts/addHosts":10,"./src/hosts/deleteHosts":11,"./src/hosts/getHost":12,"./src/hosts/getHosts":13,"./src/hosts/updateHosts":14,"./src/orgs/addOrg":15,"./src/orgs/deleteOrg":16,"./src/orgs/getOrgs":17,"./src/orgs/updateOrg":18,"./src/reports0/getReports":19,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t&&(t=""),0===(t=t.trim()).length)throw"Unable to parse certificate";return this.apiCall({path:"certs/",validStatus:[201,202]},{method:"post",headers:{"Content-Type":"application/x-pem-file"},body:t})};

},{}],4:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t||64!==t.length)throw"Invalid SHA256";return this.apiCall({path:"certs/"+encodeURIComponent(t.toLowerCase()),validStatus:200})};

},{}],5:[function(require,module,exports){
module.exports=function(t){var a={};return"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){var o=t[e];"host"!==e&&"spkiSha256"!==e||(o=o.toLowerCase()),a[e]=o}),this.apiCall({path:"certs/",validStatus:200},{},a)};

},{}],6:[function(require,module,exports){
module.exports=function(t,o){if("string"!=typeof t)throw"Invalid root param";if("string"!=typeof o)throw"Invalid zone body param";return this.apiCall({path:"dns/zones/",validStatus:204},{method:"post",headers:{"Content-Type":"text/plain"},body:o},{root:t})};

},{}],7:[function(require,module,exports){
module.exports=function(t,e){var a={id:t};return"object"==typeof e&&null!==e&&e.hasOwnProperty("name")&&(a.name=e.name),this.apiCall({path:"groups/",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],8:[function(require,module,exports){
module.exports=function(e,t){return this.apiCall({path:"groups/"+encodeURIComponent(e),validStatus:204},{method:"delete"},t)};

},{}],9:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"groups/",validStatus:200})};

},{}],10:[function(require,module,exports){
module.exports=function(t,s){var o={hostnames:t};return"object"==typeof s&&null!==s&&(s.hasOwnProperty("status")&&(o.status=s.status),s.hasOwnProperty("groups")&&(o.groups=s.groups)),this.apiCall({path:"hosts/",validStatus:204},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],11:[function(require,module,exports){
module.exports=function(e,t){var o={hostnames:e};return"object"==typeof t&&null!==t&&t.hasOwnProperty("preview")&&(o.preview=t.preview),this.apiCall({path:"hosts/",validStatus:200},{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],12:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t)throw"Invalid hostname";return this.apiCall({path:"hosts/"+encodeURIComponent(t),validStatus:200})};

},{}],13:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"hosts/",validStatus:200},{},t)};

},{}],14:[function(require,module,exports){
module.exports=function(t,o,s){s||(s={});var a={hostnames:t,changes:o};return Object.keys(s).forEach(function(t){a[t]=s[t]}),this.apiCall({path:"hosts/*/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],15:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={id:t};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({path:"suborgs/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],16:[function(require,module,exports){
module.exports=function(e){return this.apiCall({path:"suborgs/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],17:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"suborgs/",validStatus:200})};

},{}],18:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({path:"suborgs/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],19:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"reports0/",validStatus:200},{},t)};

},{}]},{},[1])(1)
});
