(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,API_VERSION=1;function HardenizeApi(e){e||(e={}),this.__config={},e.hasOwnProperty("org")&&(this.__config.org=e.org),e.hasOwnProperty("user")&&(this.__config.user=e.user),e.hasOwnProperty("pass")&&(this.__config.pass=e.pass),this.__config.url=e.hasOwnProperty("url")?e.url:"https://www.hardenize.com"}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}function endpoint(e){return function(){try{var t=e.apply(this,arguments);return!t instanceof Promise&&(t=Promise.resolve(t)),t}catch(e){return e instanceof Error||(e=new Error(e)),Promise.reject(e)}}}HardenizeApi.version=function(){return String(API_VERSION)},HardenizeApi.prototype.version=function(){return HardenizeApi.version()},HardenizeApi.prototype.config=function(e,t){var r=this;if(void 0===e){var n={};return Object.keys(this.__config).forEach(function(e){n[e]=r.__config[e]}),n}if("object"==typeof e&&null!==e)Object.keys(e).forEach(function(t){r.config(t,e[t])});else if(null===t)delete this.__config[e];else{if(void 0===t)return this.__config[e];this.__config[e]=t}},HardenizeApi.prototype.getCerts=endpoint(require("./src/certs/getCerts")),HardenizeApi.prototype.getCert=endpoint(require("./src/certs/getCert")),HardenizeApi.prototype.addCert=endpoint(require("./src/certs/addCert")),HardenizeApi.prototype.addDnsZone=endpoint(require("./src/dns_zone/addDnsZone")),HardenizeApi.prototype.getTags=endpoint(require("./src/tags/getTags")),HardenizeApi.prototype.addTag=endpoint(require("./src/tags/addTag")),HardenizeApi.prototype.deleteTag=endpoint(require("./src/tags/deleteTag")),HardenizeApi.prototype.getHosts=endpoint(require("./src/hosts/getHosts")),HardenizeApi.prototype.getHost=endpoint(require("./src/hosts/getHost")),HardenizeApi.prototype.addHosts=endpoint(require("./src/hosts/addHosts")),HardenizeApi.prototype.updateHosts=endpoint(require("./src/hosts/updateHosts")),HardenizeApi.prototype.deleteHosts=endpoint(require("./src/hosts/deleteHosts")),HardenizeApi.wrapApiCall=function(e){var t=HardenizeApi.prototype.apiCall;HardenizeApi.prototype.apiCall=function(r,n,i){return n||(n={}),i||(i={}),e.call(this,r,n,i,t.bind(this))}},HardenizeApi.prototype.wrapApiCall=function(e){var t=this.apiCall;this.apiCall=function(r,n,i){return n||(n={}),i||(i={}),e.call(this,r,n,i,t.bind(this))}},HardenizeApi.prototype.apiCall=function(e,t,r){var n;"object"==typeof e&&(n=e.validStatus,e=e.path);var i=this.__config.url+"/org/"+this.__config.org+"/api/v"+API_VERSION+"/"+e.replace(/^\/+/,"");if("object"==typeof r&&null!==r){var o=Object.keys(r).reduce(function(e,t){return[].concat(r[t]).forEach(function(r){e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}),e},[]);if(o.length){var s=i.match(/\?(.*)$/);s?s[1].length&&(i+="&"):i+="?",i+=o.join("&")}}return t||(t={}),t.headers=new Headers(t.headers),t.hasOwnProperty("redirect")||(t.redirect="error"),this.__config.user&&this.__config.pass&&t.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass)),fetch(i,t).then(function(e){var t=!!(e.headers.get("content-type")||"").match(/^application\/json([\s;].*)?$/i);return e[t?"json":"text"]().then(function(r){var i=e.status>=400;if(n&&(i=!0,[].concat(n).forEach(function(t){e.status==t&&(i=!1)})),i){var o="string"==typeof e.statusText&&e.statusText.length?e.statusText:String(e.status);return t&&"object"==typeof r&&null!==r&&r.errors&&(o=r.errors.map(function(e){var t=e.message;return e.param&&(t='"'+e.param+'" param: '+t),t}).join(", ")),(o=new Error(o)).res=e,t&&(o.data=r),Promise.reject(o)}return{res:e,data:r}}).catch(function(t){return t.res=e,Promise.reject(t)})})},module.exports=HardenizeApi;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/certs/addCert":3,"./src/certs/getCert":4,"./src/certs/getCerts":5,"./src/dns_zone/addDnsZone":6,"./src/hosts/addHosts":7,"./src/hosts/deleteHosts":8,"./src/hosts/getHost":9,"./src/hosts/getHosts":10,"./src/hosts/updateHosts":11,"./src/tags/addTag":12,"./src/tags/deleteTag":13,"./src/tags/getTags":14,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t&&(t=""),0===(t=t.trim()).length)throw"Unable to parse certificate";return this.apiCall({path:"certs/",validStatus:[201,202]},{method:"put",headers:{"Content-Type":"application/x-pem-file"},body:t})};

},{}],4:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t||64!==t.length)throw"Invalid SHA256";return this.apiCall({path:"cert/"+encodeURIComponent(t.toLowerCase()),validStatus:200})};

},{}],5:[function(require,module,exports){
module.exports=function(t){var a={};return"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){var o=t[e];"host"!==e&&"spkiSha256"!==e||(o=o.toLowerCase()),a[e]=o}),this.apiCall({path:"certs/",validStatus:200},{},a)};

},{}],6:[function(require,module,exports){
var statuses=["monitored","idle","archive"];function isValidStatus(t){for(var a=0;a<statuses.length;++a)if(statuses[a]===t)return!0;return!1}module.exports=function(t,a,s){if("string"!=typeof t)throw"Invalid root param";if("string"!=typeof a)throw"Invalid zone body param";var e={};if(null!=s&&s.hasOwnProperty("status")){if(!isValidStatus(s.status))throw"Invalid status option supplied";e.status=s.status}var o="dns/zone/"+encodeURIComponent(t.toLowerCase());return this.apiCall({path:o,validStatus:201},{method:"put",headers:{"Content-Type":"text/plain"},body:a},e)};

},{}],7:[function(require,module,exports){
module.exports=function(t,s){var a={names:t};return"object"==typeof s&&null!==s&&(s.hasOwnProperty("status")&&(a.status=s.status),s.hasOwnProperty("tags")&&(a.tags=s.tags)),this.apiCall({path:"hosts/",validStatus:201},{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],8:[function(require,module,exports){
module.exports=function(e,t){var o={names:e};return"object"==typeof t&&null!==t&&t.hasOwnProperty("preview")&&(o.preview=t.preview),this.apiCall({path:"hosts/",validStatus:200},{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],9:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t)throw"Invalid hostname";return this.apiCall({path:"host/"+encodeURIComponent(t),validStatus:200})};

},{}],10:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"hosts/",validStatus:200},{},t)};

},{}],11:[function(require,module,exports){
module.exports=function(t,o){o||(o={});var a={names:t};return Object.keys(o).forEach(function(t){a[t]=o[t]}),this.apiCall({path:"hosts/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],12:[function(require,module,exports){
module.exports=function(t){return t=t.trim(),this.apiCall({path:"tags/",validStatus:201},{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t})})};

},{}],13:[function(require,module,exports){
module.exports=function(t,e){return t=t.trim(),this.apiCall({path:"tag/"+encodeURIComponent(t),validStatus:204},{method:"delete"},e)};

},{}],14:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"tags/",validStatus:200})};

},{}]},{},[1])(1)
});
