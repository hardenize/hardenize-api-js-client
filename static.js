(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,API_VERSION=0;function HardenizeApi(e){this.__config={org:e.org,user:e.user,pass:e.pass,url:e.url||("undefined"==typeof window?"https://www.hardenize.com":"")},e.devMode&&(this.delCert=require("./src/delCert"))}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}HardenizeApi.prototype.getCerts=require("./src/getCerts"),HardenizeApi.prototype.getCert=require("./src/getCert"),HardenizeApi.prototype.addCert=require("./src/addCert"),HardenizeApi.prototype.addDnsZone=require("./src/addDnsZone"),HardenizeApi.prototype.apiCall=function(e,r,t){var n;"object"==typeof e&&(n=e.validStatus,e=e.path);var o=this.__config.url+"/org/"+this.__config.org+"/api/v"+API_VERSION+"/"+e.replace(/^\/+/,"");if("object"==typeof t&&null!==t){var i=Object.keys(t).reduce(function(e,r){return[].concat(t[r]).forEach(function(t){e.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}),e},[]);i.length&&(o+="?"+i.join("&"))}return r||(r={}),r.headers=new Headers(r.headers),r.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass)),fetch(o,r).then(function(e){var r=!!e.headers.get("content-type").match(/^application\/json([\s;].*)?$/i);return e[r?"json":"text"]().then(function(t){var o=e.status>=400;if(n&&(o=!0,[].concat(n).forEach(function(r){e.status==r&&(o=!1)})),o){var i=new Error(r?e.statusText:t);return i.res=e,r&&(i.data=t),Promise.reject(i)}return{res:e,data:t}}).catch(function(r){return r.res=e,Promise.reject(r)})})},module.exports=HardenizeApi;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/addCert":3,"./src/addDnsZone":4,"./src/delCert":5,"./src/getCert":6,"./src/getCerts":7,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(e){return"string"!=typeof e?Promise.reject(new Error("Invalid PEM supplied")):this.apiCall({path:"certs/",validStatus:[201,204]},{method:"put",headers:{"Content-Type":"application/x-pem-file"},body:e})};

},{}],4:[function(require,module,exports){
var statuses=["monitored","idle","archive"];function isValidStatus(t){for(var r=0;r<statuses.length;++r)if(statuses[r]===t)return!0;return!1}module.exports=function(t,r,e){if("string"!=typeof t)return Promise.reject(new Error("Invalid root param"));if("string"!=typeof r)return Promise.reject(new Error("Invalid zone body param"));var s={};if(null!=e&&e.hasOwnProperty("status")){if(!isValidStatus(e.status))return Promise.reject(new Error("Invalid status option supplied"));s.status=e.status}var a="dns/zone/"+encodeURIComponent(t);return this.apiCall({path:a,validStatus:201},{method:"post",headers:{"Content-Type":"text/plain"},body:r},s)};

},{}],5:[function(require,module,exports){
module.exports=function(e){return"string"!=typeof e||64!==e.length?Promise.reject(new Error("Invalid SHA256")):this.apiCall("certs/"+encodeURIComponent(e),{method:"delete"})};

},{}],6:[function(require,module,exports){
module.exports=function(e){return"string"!=typeof e||64!==e.length?Promise.reject(new Error("Invalid SHA256")):this.apiCall({path:"certs/"+encodeURIComponent(e),validStatus:200})};

},{}],7:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"certs/",validStatus:200},{},t)};

},{}]},{},[1])(1)
});
