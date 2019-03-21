(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,Request=fetch.Request||global.Request,API_VERSION=1;function HardenizeApi(e){e||(e={}),this.__eventListeners={},this.__config={},e.hasOwnProperty("org")&&(this.__config.org=e.org),e.hasOwnProperty("user")&&(this.__config.user=e.user),e.hasOwnProperty("pass")&&(this.__config.pass=e.pass),this.__config.url=e.hasOwnProperty("url")?e.url:"https://api.hardenize.com"}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}function endpoint(e){return function(){try{var t=e.apply(this,arguments);return!t instanceof Promise&&(t=Promise.resolve(t)),t}catch(e){return e instanceof Error||(e=new Error(e)),Promise.reject(e)}}}HardenizeApi.version=function(){return String(API_VERSION)},HardenizeApi.prototype.version=function(){return HardenizeApi.version()},HardenizeApi.prototype.config=function(e,t){var r=this;if(void 0===e){var o={};return Object.keys(this.__config).forEach(function(e){o[e]=r.__config[e]}),o}if("object"==typeof e&&null!==e)Object.keys(e).forEach(function(t){r.config(t,e[t])});else if(null===t)delete this.__config[e];else{if(void 0===t)return this.__config[e];this.__config[e]=t}},HardenizeApi.prototype.addEventListener=HardenizeApi.prototype.on=function(e,t){return this.__eventListeners[e]=this.__eventListeners[e]||[],this.__eventListeners[e].push(t),this},HardenizeApi.prototype.removeEventListener=HardenizeApi.prototype.off=function(e,t){return void 0===t?delete this.__eventListeners[e]:this.__eventListeners[e]&&(this.__eventListeners[e]=this.__eventListeners[e].filter(function(e){return e!==t}),0===this.__eventListeners[e].length&&delete this.__eventListeners[e]),this},HardenizeApi.prototype.emit=function(e,t){if(this.__eventListeners[e])for(var r=0;r<this.__eventListeners[e].length;++r)this.__eventListeners[e][r].call(this,t)},HardenizeApi.prototype.getCerts=endpoint(require("./src/certs/getCerts")),HardenizeApi.prototype.getCert=endpoint(require("./src/certs/getCert")),HardenizeApi.prototype.createCert=endpoint(require("./src/certs/createCert")),HardenizeApi.prototype.createDnsZone=endpoint(require("./src/dns_zones/createDnsZone")),HardenizeApi.prototype.getGroups=endpoint(require("./src/groups/getGroups")),HardenizeApi.prototype.createGroup=endpoint(require("./src/groups/createGroup")),HardenizeApi.prototype.deleteGroup=endpoint(require("./src/groups/deleteGroup")),HardenizeApi.prototype.getHosts=endpoint(require("./src/hosts/getHosts")),HardenizeApi.prototype.getHost=endpoint(require("./src/hosts/getHost")),HardenizeApi.prototype.createHosts=endpoint(require("./src/hosts/createHosts")),HardenizeApi.prototype.updateHosts=endpoint(require("./src/hosts/updateHosts")),HardenizeApi.prototype.deleteHosts=endpoint(require("./src/hosts/deleteHosts")),HardenizeApi.prototype.getHostDiscoveries=endpoint(require("./src/host_discoveries/getHostDiscoveries")),HardenizeApi.prototype.getHostDiscovery=endpoint(require("./src/host_discoveries/getHostDiscovery")),HardenizeApi.prototype.updateHostDiscovery=endpoint(require("./src/host_discoveries/updateHostDiscovery")),HardenizeApi.prototype.getHostDiscoveryKeywords=endpoint(require("./src/host_discovery_keywords/getHostDiscoveryKeywords")),HardenizeApi.prototype.getHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/getHostDiscoveryKeyword")),HardenizeApi.prototype.createHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/createHostDiscoveryKeyword")),HardenizeApi.prototype.deleteHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/deleteHostDiscoveryKeyword")),HardenizeApi.prototype.getSubOrgs=endpoint(require("./src/suborgs/getSubOrgs")),HardenizeApi.prototype.createSubOrg=endpoint(require("./src/suborgs/createSubOrg")),HardenizeApi.prototype.deleteSubOrg=endpoint(require("./src/suborgs/deleteSubOrg")),HardenizeApi.prototype.updateSubOrg=endpoint(require("./src/suborgs/updateSubOrg")),HardenizeApi.prototype.getReports0=endpoint(require("./src/reports0/getReports")),HardenizeApi.prototype.getEventTypes=endpoint(require("./src/events/getEventTypes")),HardenizeApi.prototype.updateEventType=endpoint(require("./src/events/updateEventType")),HardenizeApi.prototype.getEvents=endpoint(require("./src/events/getEvents")),HardenizeApi.prototype.getEvent=endpoint(require("./src/events/getEvent")),HardenizeApi.prototype.getEventHooks=endpoint(require("./src/events/getEventHooks")),HardenizeApi.prototype.getEventHookDestinations=endpoint(require("./src/events/getEventHookDestinations")),HardenizeApi.prototype.createEventHook=endpoint(require("./src/events/createEventHook")),HardenizeApi.prototype.deleteEventHook=endpoint(require("./src/events/deleteEventHook")),HardenizeApi.prototype.updateEventHook=endpoint(require("./src/events/updateEventHook")),HardenizeApi.prototype.testEventHook=endpoint(require("./src/events/testEventHook")),HardenizeApi.prototype.updateUser=endpoint(require("./src/users/updateUser")),HardenizeApi.wrapApiCall=function(e){var t=HardenizeApi.prototype.apiCall;HardenizeApi.prototype.apiCall=function(r,o,i){return o||(o={}),i||(i={}),e.call(this,r,o,i,t.bind(this))}},HardenizeApi.prototype.wrapApiCall=function(e){var t=this.apiCall;this.apiCall=function(r,o,i){return o||(o={}),i||(i={}),e.call(this,r,o,i,t.bind(this))}},HardenizeApi.prototype.apiCall=function(e,t,r){var o;"object"==typeof e&&(o=e.validStatus,e=e.path);var i=this.__config.url.match(/^https?:\/\/[^\/]+\/*$/i)?this.__config.url.replace(/\/+$/,"")+"/v"+API_VERSION+"/org/"+this.__config.org:this.__config.url.replace(/\{org\}/g,this.__config.org).replace(/\/+$/,"")+"/v"+API_VERSION;if(i+="/"+e.replace(/^\/+/,""),"object"==typeof r&&null!==r){var n=Object.keys(r).reduce(function(e,t){return[].concat(r[t]).forEach(function(r){e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}),e},[]);if(n.length){var s=i.match(/\?(.*)$/);s?s[1].length&&(i+="&"):i+="?",i+=n.join("&")}}t||(t={}),t.headers=new Headers(t.headers),t.hasOwnProperty("redirect")||(t.redirect="error"),this.__config.user&&this.__config.pass&&t.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass));var p=new Request(i,t);this.emit("request",p);var a=this;return fetch(p).then(function(e){a.emit("response",e);var t=!!(e.headers.get("content-type")||"").match(/^application\/json([\s;].*)?$/i);return e.text().then(function(r){if(a.emit("body",r),t)try{r=JSON.parse(r)}catch(n){return Promise.reject(n)}var i=e.status>=400;if(o&&(i=!0,[].concat(o).forEach(function(t){e.status==t&&(i=!1)})),i){var n="string"==typeof e.statusText&&e.statusText.length?e.statusText:String(e.status);return t&&"object"==typeof r&&null!==r&&r.errors&&(n=r.errors.map(function(e){var t=e.message;return e.param&&(t='"'+e.param+'" param: '+t),t}).join(", ")),(n=new Error(n)).res=e,t&&(n.data=r),Promise.reject(n)}return{res:e,data:r}}).catch(function(t){return t.res=e,Promise.reject(t)})})},module.exports=HardenizeApi;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/certs/createCert":3,"./src/certs/getCert":4,"./src/certs/getCerts":5,"./src/dns_zones/createDnsZone":6,"./src/events/createEventHook":7,"./src/events/deleteEventHook":8,"./src/events/getEvent":9,"./src/events/getEventHookDestinations":10,"./src/events/getEventHooks":11,"./src/events/getEventTypes":12,"./src/events/getEvents":13,"./src/events/testEventHook":14,"./src/events/updateEventHook":15,"./src/events/updateEventType":16,"./src/groups/createGroup":17,"./src/groups/deleteGroup":18,"./src/groups/getGroups":19,"./src/host_discoveries/getHostDiscoveries":20,"./src/host_discoveries/getHostDiscovery":21,"./src/host_discoveries/updateHostDiscovery":22,"./src/host_discovery_keywords/createHostDiscoveryKeyword":23,"./src/host_discovery_keywords/deleteHostDiscoveryKeyword":24,"./src/host_discovery_keywords/getHostDiscoveryKeyword":25,"./src/host_discovery_keywords/getHostDiscoveryKeywords":26,"./src/hosts/createHosts":27,"./src/hosts/deleteHosts":28,"./src/hosts/getHost":29,"./src/hosts/getHosts":30,"./src/hosts/updateHosts":31,"./src/reports0/getReports":32,"./src/suborgs/createSubOrg":33,"./src/suborgs/deleteSubOrg":34,"./src/suborgs/getSubOrgs":35,"./src/suborgs/updateSubOrg":36,"./src/users/updateUser":37,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t&&(t=""),0===(t=t.trim()).length)throw"Unable to parse certificate";return this.apiCall({path:"certs/",validStatus:[201,202]},{method:"post",headers:{"Content-Type":"application/x-pem-file"},body:t})};

},{}],4:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t||64!==t.length)throw"Invalid SHA256";return this.apiCall({path:"certs/"+encodeURIComponent(t.toLowerCase()),validStatus:200})};

},{}],5:[function(require,module,exports){
module.exports=function(t){var a={};return"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(e){var o=t[e];"host"!==e&&"spkiSha256"!==e||(o=o.toLowerCase()),a[e]=o}),this.apiCall({path:"certs/",validStatus:200},{},a)};

},{}],6:[function(require,module,exports){
module.exports=function(t,o){if("string"!=typeof t)throw"Invalid root param";if("string"!=typeof o)throw"Invalid zone body param";return this.apiCall({path:"dns/zones/",validStatus:204},{method:"post",headers:{"Content-Type":"text/plain"},body:o},{root:t})};

},{}],7:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"eventHooks/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],8:[function(require,module,exports){
module.exports=function(e){return this.apiCall({path:"eventHooks/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],9:[function(require,module,exports){
module.exports=function(e){switch(typeof e){case"string":case"number":break;default:throw"Invalid ID"}return this.apiCall({path:"events/"+encodeURIComponent(e),validStatus:200})};

},{}],10:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"eventDestinations/",validStatus:200})};

},{}],11:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"eventHooks/",validStatus:200})};

},{}],12:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"eventTypes/",validStatus:200},{})};

},{}],13:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"events/",validStatus:200},{},t)};

},{}],14:[function(require,module,exports){
module.exports=function(t,e){return this.apiCall({path:"eventHooks/"+encodeURIComponent(t)+";test",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)},e)};

},{}],15:[function(require,module,exports){
module.exports=function(t,o){return this.apiCall({path:"eventHooks/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],16:[function(require,module,exports){
module.exports=function(t,e){return this.apiCall({path:"eventTypes/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],17:[function(require,module,exports){
module.exports=function(t,e){var a={id:t};return"object"==typeof e&&null!==e&&e.hasOwnProperty("name")&&(a.name=e.name),this.apiCall({path:"groups/",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],18:[function(require,module,exports){
module.exports=function(e,t){return this.apiCall({path:"groups/"+encodeURIComponent(e),validStatus:204},{method:"delete"},t)};

},{}],19:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"groups/",validStatus:200})};

},{}],20:[function(require,module,exports){
module.exports=function(e){return this.apiCall("hostDiscoveries",{},e)};

},{}],21:[function(require,module,exports){
module.exports=function(e){return this.apiCall("hostDiscoveries/"+encodeURIComponent(e))};

},{}],22:[function(require,module,exports){
module.exports=function(t,o){return this.apiCall({path:"hostDiscoveries/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],23:[function(require,module,exports){
module.exports=function(o,e){var s={keyword:o};return"object"==typeof e&&null!==e&&e.hasOwnProperty("exclusions")&&(s.exclusions=e.exclusions),this.apiCall({path:"hostDiscoveryKeywords/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})};

},{}],24:[function(require,module,exports){
module.exports=function(e){return this.apiCall({path:"hostDiscoveryKeywords/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],25:[function(require,module,exports){
module.exports=function(o){return this.apiCall({path:"hostDiscoveryKeywords/"+encodeURIComponent(o)})};

},{}],26:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"hostDiscoveryKeywords"})};

},{}],27:[function(require,module,exports){
module.exports=function(t,s){var o={hostnames:t};return"object"==typeof s&&null!==s&&(s.hasOwnProperty("status")&&(o.status=s.status),s.hasOwnProperty("groups")&&(o.groups=s.groups)),this.apiCall({path:"hosts/",validStatus:204},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],28:[function(require,module,exports){
module.exports=function(e,t){var o={hostnames:e};return"object"==typeof t&&null!==t&&t.hasOwnProperty("preview")&&(o.preview=t.preview),this.apiCall({path:"hosts/",validStatus:200},{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],29:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t)throw"Invalid hostname";return this.apiCall({path:"hosts/"+encodeURIComponent(t),validStatus:200})};

},{}],30:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"hosts/",validStatus:200},{},t)};

},{}],31:[function(require,module,exports){
module.exports=function(t,o,s){s||(s={});var a={hostnames:t,changes:o};return Object.keys(s).forEach(function(t){a[t]=s[t]}),this.apiCall({path:"hosts/*/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],32:[function(require,module,exports){
module.exports=function(t){return this.apiCall({path:"reports0/",validStatus:200},{},t)};

},{}],33:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={id:t};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({path:"suborgs/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],34:[function(require,module,exports){
module.exports=function(e){return this.apiCall({path:"suborgs/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],35:[function(require,module,exports){
module.exports=function(){return this.apiCall({path:"suborgs/",validStatus:200})};

},{}],36:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({path:"suborgs/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],37:[function(require,module,exports){
module.exports=function(t,e){null==e&&(e={});var n={};return Object.keys(e).forEach(function(t){n[t]=e[t]}),this.apiCall({path:"users/"+encodeURIComponent(t),validStatus:204},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}]},{},[1])(1)
});
