(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,API_VERSION=0;function HardenizeApi(e){e||(e={}),this.__config={},e.hasOwnProperty("org")&&(this.__config.org=e.org),e.hasOwnProperty("user")&&(this.__config.user=e.user),e.hasOwnProperty("pass")&&(this.__config.pass=e.pass),this.__config.url=e.hasOwnProperty("url")?e.url:"https://www.hardenize.com",e.devMode&&(this.delCert=endpoint(require("./src/certs/delCert")))}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}function endpoint(e){return function(){try{var r=e.apply(this,arguments);return!r instanceof Promise&&(r=Promise.resolve(r)),r}catch(e){return e instanceof Error||(e=new Error(e)),Promise.reject(e)}}}HardenizeApi.version=function(){return String(API_VERSION)},HardenizeApi.prototype.version=function(){return HardenizeApi.version()},HardenizeApi.prototype.config=function(e,r){var t=this;if(void 0===e){var n={};return Object.keys(this.__config).forEach(function(e){n[e]=t.__config[e]}),n}if("object"==typeof e&&null!==e)Object.keys(e).forEach(function(r){t.config(r,e[r])});else if(null===r)delete this.__config[e];else{if(void 0===r)return this.__config[e];this.__config[e]=r}},HardenizeApi.prototype.getCerts=endpoint(require("./src/certs/getCerts")),HardenizeApi.prototype.getCert=endpoint(require("./src/certs/getCert")),HardenizeApi.prototype.addCert=endpoint(require("./src/certs/addCert")),HardenizeApi.prototype.addDnsZone=endpoint(require("./src/dns_zone/addDnsZone")),HardenizeApi.wrapApiCall=function(e){var r=HardenizeApi.prototype.apiCall;HardenizeApi.prototype.apiCall=function(t,n,i){return n||(n={}),i||(i={}),e.call(this,t,n,i,r.bind(this))}},HardenizeApi.prototype.wrapApiCall=function(e){var r=this.apiCall;this.apiCall=function(t,n,i){return n||(n={}),i||(i={}),e.call(this,t,n,i,r.bind(this))}},HardenizeApi.prototype.apiCall=function(e,r,t){var n;"object"==typeof e&&(n=e.validStatus,e=e.path);var i=this.__config.url+"/org/"+this.__config.org+"/api/v"+API_VERSION+"/"+e.replace(/^\/+/,"");if("object"==typeof t&&null!==t){var o=Object.keys(t).reduce(function(e,r){return[].concat(t[r]).forEach(function(t){e.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}),e},[]);if(o.length){var s=i.match(/\?(.*)$/);s?s[1].length&&(i+="&"):i+="?",i+=o.join("&")}}return r||(r={}),r.headers=new Headers(r.headers),r.hasOwnProperty("redirect")||(r.redirect="error"),this.__config.user&&this.__config.pass&&r.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass)),fetch(i,r).then(function(e){var r=!!(e.headers.get("content-type")||"").match(/^application\/json([\s;].*)?$/i);return e[r?"json":"text"]().then(function(t){var i=e.status>=400;if(n&&(i=!0,[].concat(n).forEach(function(r){e.status==r&&(i=!1)})),i){var o="string"==typeof e.statusText&&e.statusText.length?e.statusText:String(e.status);return r&&"object"==typeof t&&null!==t&&t.errors&&(o=t.errors.map(function(e){return e.message}).join(", ")),(o=new Error(o)).res=e,r&&(o.data=t),Promise.reject(o)}return{res:e,data:t}}).catch(function(r){return r.res=e,Promise.reject(r)})})},module.exports=HardenizeApi;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/certs/addCert":3,"./src/certs/delCert":4,"./src/certs/getCert":5,"./src/certs/getCerts":6,"./src/dns_zone/addDnsZone":7,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t)throw"Invalid PEM supplied";return this.apiCall({path:"certs/",validStatus:[201,204]},{method:"put",headers:{"Content-Type":"application/x-pem-file"},body:t})};

},{}],4:[function(require,module,exports){
module.exports=function(e){if("string"!=typeof e||64!==e.length)throw"Invalid SHA256";return this.apiCall("certs/"+encodeURIComponent(e.toLowerCase()),{method:"delete"})};

},{}],5:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t||64!==t.length)throw"Invalid SHA256";return this.apiCall({path:"cert/"+encodeURIComponent(t.toLowerCase()),validStatus:200})};

},{}],6:[function(require,module,exports){
module.exports=function(t){var a={};return"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){var o=t[e];"host"!==e&&"spkiSha256"!==e||(o=o.toLowerCase()),a[e]=o}),this.apiCall({path:"certs/",validStatus:200},{},a)};

},{}],7:[function(require,module,exports){
var statuses=["monitored","idle","archive"];function isValidStatus(t){for(var s=0;s<statuses.length;++s)if(statuses[s]===t)return!0;return!1}module.exports=function(t,s,a){if("string"!=typeof t)throw"Invalid root param";if("string"!=typeof s)throw"Invalid zone body param";var e={};if(null!=a&&a.hasOwnProperty("status")){if(!isValidStatus(a.status))throw"Invalid status option supplied";e.status=a.status}var o="dns/zone/"+encodeURIComponent(t.toLowerCase());return this.apiCall({path:o,validStatus:201},{method:"post",headers:{"Content-Type":"text/plain"},body:s},e)};

},{}]},{},[1])(1)
});
