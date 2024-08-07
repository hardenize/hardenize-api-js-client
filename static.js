(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){(function (){
var fetch="undefined"==typeof window?require("node-fetch"):window.fetch,Headers=fetch.Headers||global.Headers,Request=fetch.Request||global.Request,API_VERSION=1;function HardenizeApi(e){e||(e={}),this.__eventListeners={},this.__config={},e.hasOwnProperty("org")&&(this.__config.org=e.org),e.hasOwnProperty("user")&&(this.__config.user=e.user),e.hasOwnProperty("pass")&&(this.__config.pass=e.pass),this.__config.url=e.hasOwnProperty("url")?e.url:"https://api.hardenize.com"}function checkValidStatus({validStatus:e,res:t,body:r,status:i}){i||(i=t.status);var o=i>=400;if(e&&(o=!0,[].concat(e).forEach(function(e){i==e&&(o=!1)})),o){var n="string"==typeof t.statusText&&t.statusText.length?t.statusText:String(i);return isJson(t)&&"object"==typeof r&&null!==r&&r.errors&&(n=r.errors.map(function(e){var t=e.message;return e.param&&(t='"'+e.param+'" param: '+t),t}).join(", ")),(n=new Error(n)).res=t,isJson(t)&&(n.data=r),n}}function isInitialAsyncResponse(e,t,r){return"POST"===e.method&&(202===t.status&&(!!t.headers.get("location")&&(!!isJson(t)&&("string"==typeof r.id&&"boolean"==typeof r.done))))}function isPollingAsyncResponse(e,t,r){return"GET"===e.method&&(200===t.status&&(!!e.url.match(/\/operations\/[^\/]+$/)&&(!!isJson(t)&&("string"==typeof r.id&&!1===r.done))))}function isFinalAsyncResponse(e,t,r){return"GET"===e.method&&(200===t.status&&(!!e.url.match(/\/operations\/[^\/]+$/)&&(!!isJson(t)&&("string"==typeof r.id&&!0===r.done))))}function isJson(e){return!!(e.headers.get("content-type")||"").match(/^application\/json([\s;].*)?$/i)}function base64(e){if("undefined"!=typeof window&&window.btoa)return btoa(e);if("undefined"!=typeof Buffer)return Buffer.from(e).toString("base64");throw new Error("Unable to use base64 to add Authorization header")}function endpoint(e){return function(){try{var t=e.apply(this,arguments);return!t instanceof Promise&&(t=Promise.resolve(t)),t}catch(e){return e instanceof Error||(e=new Error(e)),Promise.reject(e)}}}HardenizeApi.version=function(){return String(API_VERSION)},HardenizeApi.prototype.version=function(){return HardenizeApi.version()},HardenizeApi.prototype.config=function(e,t){var r=this;if(void 0===e){var i={};return Object.keys(this.__config).forEach(function(e){i[e]=r.__config[e]}),i}if("object"==typeof e&&null!==e)Object.keys(e).forEach(function(t){r.config(t,e[t])});else if(null===t)delete this.__config[e];else{if(void 0===t)return this.__config[e];this.__config[e]=t}},HardenizeApi.prototype.addEventListener=HardenizeApi.prototype.on=function(e,t){return this.__eventListeners[e]=this.__eventListeners[e]||[],this.__eventListeners[e].push(t),this},HardenizeApi.prototype.removeEventListener=HardenizeApi.prototype.off=function(e,t){return void 0===t?delete this.__eventListeners[e]:this.__eventListeners[e]&&(this.__eventListeners[e]=this.__eventListeners[e].filter(function(e){return e!==t}),0===this.__eventListeners[e].length&&delete this.__eventListeners[e]),this},HardenizeApi.prototype.emit=function(e,t){if(this.__eventListeners[e])for(var r=0;r<this.__eventListeners[e].length;++r)this.__eventListeners[e][r].call(this,t)},HardenizeApi.prototype.getHdbCertBySha256=endpoint(require("./src/hdb/certs/getHdbCertBySha256")),HardenizeApi.prototype.getHdbCertsByHostSuffix=endpoint(require("./src/hdb/certs/getHdbCertsByHostSuffix")),HardenizeApi.prototype.getHdbCertsByKeyword=endpoint(require("./src/hdb/certs/getHdbCertsByKeyword")),HardenizeApi.prototype.getHdbCertsBySpki=endpoint(require("./src/hdb/certs/getHdbCertsBySpki")),HardenizeApi.prototype.getCerts=endpoint(require("./src/certs/getCerts")),HardenizeApi.prototype.getCert=endpoint(require("./src/certs/getCert")),HardenizeApi.prototype.createCert=endpoint(require("./src/certs/createCert")),HardenizeApi.prototype.updateCert=endpoint(require("./src/certs/updateCert")),HardenizeApi.prototype.getAccessControlConfig=endpoint(require("./src/config/getAccessControl")),HardenizeApi.prototype.updateAccessControlConfig=endpoint(require("./src/config/updateAccessControl")),HardenizeApi.prototype.getNetworkScanningConfig=endpoint(require("./src/config/getNetworkScanning")),HardenizeApi.prototype.updateNetworkScanningConfig=endpoint(require("./src/config/updateNetworkScanning")),HardenizeApi.prototype.getMfaConfig=endpoint(require("./src/config/getMfa")),HardenizeApi.prototype.updateMfaConfig=endpoint(require("./src/config/updateMfa")),HardenizeApi.prototype.getSamlConfig=endpoint(require("./src/config/getSaml")),HardenizeApi.prototype.updateSamlConfig=endpoint(require("./src/config/updateSaml")),HardenizeApi.prototype.createDnsZone=endpoint(require("./src/dns_zones/createDnsZone")),HardenizeApi.prototype.getGroups=endpoint(require("./src/groups/getGroups")),HardenizeApi.prototype.createGroup=endpoint(require("./src/groups/createGroup")),HardenizeApi.prototype.deleteGroup=endpoint(require("./src/groups/deleteGroup")),HardenizeApi.prototype.getHosts=endpoint(require("./src/hosts/getHosts")),HardenizeApi.prototype.getHost=endpoint(require("./src/hosts/getHost")),HardenizeApi.prototype.createHosts=endpoint(require("./src/hosts/createHosts")),HardenizeApi.prototype.updateHosts=endpoint(require("./src/hosts/updateHosts")),HardenizeApi.prototype.deleteHosts=endpoint(require("./src/hosts/deleteHosts")),HardenizeApi.prototype.getHostDiscoveries=endpoint(require("./src/host_discoveries/getHostDiscoveries")),HardenizeApi.prototype.getHostDiscovery=endpoint(require("./src/host_discoveries/getHostDiscovery")),HardenizeApi.prototype.updateHostDiscovery=endpoint(require("./src/host_discoveries/updateHostDiscovery")),HardenizeApi.prototype.updateHostDiscoveries=endpoint(require("./src/host_discoveries/updateHostDiscoveries")),HardenizeApi.prototype.deleteHostDiscoveries=endpoint(require("./src/host_discoveries/deleteHostDiscoveries")),HardenizeApi.prototype.getHostDiscoveryKeywords=endpoint(require("./src/host_discovery_keywords/getHostDiscoveryKeywords")),HardenizeApi.prototype.getHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/getHostDiscoveryKeyword")),HardenizeApi.prototype.createHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/createHostDiscoveryKeyword")),HardenizeApi.prototype.deleteHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/deleteHostDiscoveryKeyword")),HardenizeApi.prototype.updateHostDiscoveryKeyword=endpoint(require("./src/host_discovery_keywords/updateHostDiscoveryKeyword")),HardenizeApi.prototype.getNetworkRanges=endpoint(require("./src/network_ranges/getNetworkRanges")),HardenizeApi.prototype.createNetworkRange=endpoint(require("./src/network_ranges/createNetworkRange")),HardenizeApi.prototype.deleteNetworkRange=endpoint(require("./src/network_ranges/deleteNetworkRange")),HardenizeApi.prototype.updateNetworkRange=endpoint(require("./src/network_ranges/updateNetworkRange")),HardenizeApi.prototype.getSubOrgs=endpoint(require("./src/suborgs/getSubOrgs")),HardenizeApi.prototype.createSubOrg=endpoint(require("./src/suborgs/createSubOrg")),HardenizeApi.prototype.deleteSubOrg=endpoint(require("./src/suborgs/deleteSubOrg")),HardenizeApi.prototype.updateSubOrg=endpoint(require("./src/suborgs/updateSubOrg")),HardenizeApi.prototype.getReports0=endpoint(require("./src/reports0/getReports")),HardenizeApi.prototype.getEventTypes=endpoint(require("./src/events/getEventTypes")),HardenizeApi.prototype.updateEventType=endpoint(require("./src/events/updateEventType")),HardenizeApi.prototype.getEvents=endpoint(require("./src/events/getEvents")),HardenizeApi.prototype.getEvent=endpoint(require("./src/events/getEvent")),HardenizeApi.prototype.getEventHooks=endpoint(require("./src/events/getEventHooks")),HardenizeApi.prototype.getEventHookDestinations=endpoint(require("./src/events/getEventHookDestinations")),HardenizeApi.prototype.createEventHook=endpoint(require("./src/events/createEventHook")),HardenizeApi.prototype.deleteEventHook=endpoint(require("./src/events/deleteEventHook")),HardenizeApi.prototype.updateEventHook=endpoint(require("./src/events/updateEventHook")),HardenizeApi.prototype.testEventHook=endpoint(require("./src/events/testEventHook")),HardenizeApi.prototype.getUser=endpoint(require("./src/users/getUser")),HardenizeApi.prototype.getUsers=endpoint(require("./src/users/getUsers")),HardenizeApi.prototype.inviteUser=endpoint(require("./src/users/inviteUser")),HardenizeApi.prototype.cancelUserInvite=endpoint(require("./src/users/cancelInvite")),HardenizeApi.prototype.createServiceAccount=endpoint(require("./src/users/createServiceAccount")),HardenizeApi.prototype.updateUser=endpoint(require("./src/users/updateUser")),HardenizeApi.wrapApiCall=function(e){var t=HardenizeApi.prototype.apiCall;HardenizeApi.prototype.apiCall=function(r,i,o){return i||(i={}),o||(o={}),e.call(this,r,i,o,t.bind(this))}},HardenizeApi.prototype.wrapApiCall=function(e){var t=this.apiCall;this.apiCall=function(r,i,o){return i||(i={}),o||(o={}),e.call(this,r,i,o,t.bind(this))}},HardenizeApi.prototype.baseUrl=function(e){var t=this.__config.url.match(/^https?:\/\/[^\/]+\/*$/i)?this.__config.url.replace(/\/+$/,"")+"/v"+API_VERSION+"/org/"+this.__config.org:this.__config.url.replace(/\{org\}/g,this.__config.org).replace(/\/+$/,"")+"/v"+API_VERSION;return"string"==typeof e&&(t=t.replace("/+$","")+"/"+e.replace(/^\/+/,"")),t},HardenizeApi.prototype.absoluteLocation=function(e){return"string"!=typeof e||e.match(/^https?:\/\//)||(e=this.baseUrl().replace(/^((https?:)?\/\/[^/]+).*/,"$1")+"/"+e.replace(/^\/+/,"")),e},HardenizeApi.prototype.apiCall=function(e,t,r){"string"==typeof e&&(e={url:e});var i=e.validStatus,o=e.url.match(/^https?:\/\//i)?e.url:this.baseUrl(e.url);if("object"==typeof r&&null!==r){var n=Object.keys(r).reduce(function(e,t){return[].concat(r[t]).forEach(function(r){e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}),e},[]);if(n.length){var s=o.match(/\?(.*)$/);s?s[1].length&&(o+="&"):o+="?",o+=n.join("&")}}t||(t={}),t.headers=new Headers(t.headers),t.hasOwnProperty("redirect")||(t.redirect="manual"),this.__config.user&&this.__config.pass&&t.headers.set("Authorization","Basic "+base64(this.__config.user+":"+this.__config.pass));var p=new Request(o,t);this.emit("request",p);var a=this;return fetch(p).then(function(t){return a.emit("response",t),(t.headers.get("content-type")||"").match(/^(image\/.+|application\/(zip|octet-stream))([\s;].*)?$/)?"function"==typeof t.buffer?t.buffer().then(function(e){return a.emit("body",e),{res:t,data:e}}):t.blob().then(function(e){return a.emit("body",e),{res:t,data:e}}):t.text().then(function(r){if(a.emit("body",r),isJson(t))try{r=JSON.parse(r)}catch(d){return Promise.reject(d)}const n=r.contentDisposition||t.headers.get("Content-Disposition");if(isInitialAsyncResponse(p,t,r)){var s=a.absoluteLocation(t.headers.get("location"));return a.apiCall({url:s,validStatus:i})}if(isPollingAsyncResponse(p,t,r))return new Promise(function(e){setTimeout(e,1e3)}).then(function(){return a.apiCall({url:o,validStatus:i})});if(isFinalAsyncResponse(p,t,r)){const e=`operations/${r.id}/results`;return r.pages&&r.rows?{pages:r.pages,rowsPerPage:r.rowsPerPage,rows:r.rows,url:e,contentDisposition:n,fetchResults:function(t,o){return void 0===t&&void 0===o&&(t=1,o=r.pages),t<1||o<t||o>r.pages?Promise.reject(new Error("Invalid page range")):a.apiCall({url:e,validStatus:i,getPage:!0},{headers:{Range:"pages="+t+"-"+o}})}}:a.apiCall({url:e,validStatus:i})}if(!e.getPage&&206!==t.status){var d=checkValidStatus({validStatus:i,res:t,body:r});if(d)return Promise.reject(d)}return e.getPage?{res:t,data:r}:{pages:1,contentDisposition:n,fetchResults:function(e,i){return void 0===e&&void 0===i&&(e=1,i=1),1!==e||1!==i?Promise.reject(new Error("Invalid page range")):Promise.resolve({res:t,data:r})}}}).catch(function(e){return e.res=t,Promise.reject(e)})})},module.exports=HardenizeApi;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/certs/createCert":3,"./src/certs/getCert":4,"./src/certs/getCerts":5,"./src/certs/updateCert":6,"./src/config/getAccessControl":7,"./src/config/getMfa":8,"./src/config/getNetworkScanning":9,"./src/config/getSaml":10,"./src/config/updateAccessControl":11,"./src/config/updateMfa":12,"./src/config/updateNetworkScanning":13,"./src/config/updateSaml":14,"./src/dns_zones/createDnsZone":15,"./src/events/createEventHook":16,"./src/events/deleteEventHook":17,"./src/events/getEvent":18,"./src/events/getEventHookDestinations":19,"./src/events/getEventHooks":20,"./src/events/getEventTypes":21,"./src/events/getEvents":22,"./src/events/testEventHook":23,"./src/events/updateEventHook":24,"./src/events/updateEventType":25,"./src/groups/createGroup":26,"./src/groups/deleteGroup":27,"./src/groups/getGroups":28,"./src/hdb/certs/getHdbCertBySha256":29,"./src/hdb/certs/getHdbCertsByHostSuffix":30,"./src/hdb/certs/getHdbCertsByKeyword":31,"./src/hdb/certs/getHdbCertsBySpki":32,"./src/host_discoveries/deleteHostDiscoveries":33,"./src/host_discoveries/getHostDiscoveries":34,"./src/host_discoveries/getHostDiscovery":35,"./src/host_discoveries/updateHostDiscoveries":36,"./src/host_discoveries/updateHostDiscovery":37,"./src/host_discovery_keywords/createHostDiscoveryKeyword":38,"./src/host_discovery_keywords/deleteHostDiscoveryKeyword":39,"./src/host_discovery_keywords/getHostDiscoveryKeyword":40,"./src/host_discovery_keywords/getHostDiscoveryKeywords":41,"./src/host_discovery_keywords/updateHostDiscoveryKeyword":42,"./src/hosts/createHosts":43,"./src/hosts/deleteHosts":44,"./src/hosts/getHost":45,"./src/hosts/getHosts":46,"./src/hosts/updateHosts":47,"./src/network_ranges/createNetworkRange":48,"./src/network_ranges/deleteNetworkRange":49,"./src/network_ranges/getNetworkRanges":50,"./src/network_ranges/updateNetworkRange":51,"./src/reports0/getReports":52,"./src/suborgs/createSubOrg":53,"./src/suborgs/deleteSubOrg":54,"./src/suborgs/getSubOrgs":55,"./src/suborgs/updateSubOrg":56,"./src/users/cancelInvite":57,"./src/users/createServiceAccount":58,"./src/users/getUser":59,"./src/users/getUsers":60,"./src/users/inviteUser":61,"./src/users/updateUser":62,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t&&(t=""),0===(t=t.trim()).length)throw"Unable to parse certificate";return this.apiCall({url:"certs/",validStatus:[201,202]},{method:"post",headers:{"Content-Type":"application/x-pem-file"},body:t})};

},{}],4:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t||64!==t.length)throw"Invalid SHA256";return this.apiCall({url:"certs/"+encodeURIComponent(t.toLowerCase()),validStatus:200})};

},{}],5:[function(require,module,exports){
module.exports=function(t){var e={};return"object"==typeof t&&null!==t&&Object.keys(t).forEach(function(o){var a=t[o];"host"!==o&&"spkiSha256"!==o||(a=a.toLowerCase()),e[o]=a}),this.apiCall({url:"certs/",validStatus:200},{},e)};

},{}],6:[function(require,module,exports){
module.exports=function(t,e){return this.apiCall({url:"certs/"+t,validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],7:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"config/accessControl"})};

},{}],8:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"config/mfa"})};

},{}],9:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"config/networkScanning"})};

},{}],10:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"config/saml"})};

},{}],11:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"config/accessControl",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],12:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"config/mfa",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],13:[function(require,module,exports){
module.exports=function(n){return this.apiCall({url:"config/networkScanning",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],14:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"config/saml",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],15:[function(require,module,exports){
module.exports=function(t,o){if("string"!=typeof t)throw"Invalid root param";if("string"!=typeof o)throw"Invalid zone body param";return this.apiCall({url:"dns/zones/",validStatus:204},{method:"post",headers:{"Content-Type":"text/plain"},body:o},{root:t})};

},{}],16:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"eventHooks/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],17:[function(require,module,exports){
module.exports=function(e){return this.apiCall({url:"eventHooks/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],18:[function(require,module,exports){
module.exports=function(e){switch(typeof e){case"string":case"number":break;default:throw"Invalid ID"}return this.apiCall({url:"events/"+encodeURIComponent(e),validStatus:200})};

},{}],19:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"eventDestinations/",validStatus:200})};

},{}],20:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"eventHooks/",validStatus:200})};

},{}],21:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"eventTypes/",validStatus:200},{})};

},{}],22:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"events/",validStatus:200},{},t)};

},{}],23:[function(require,module,exports){
module.exports=function(t,e){return this.apiCall({url:"eventHooks/"+encodeURIComponent(t)+";test",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)},e)};

},{}],24:[function(require,module,exports){
module.exports=function(o,t){return this.apiCall({url:"eventHooks/"+encodeURIComponent(o),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],25:[function(require,module,exports){
module.exports=function(e,t){return this.apiCall({url:"eventTypes/"+encodeURIComponent(e),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],26:[function(require,module,exports){
module.exports=function(t,a){var o={name:t};return"object"==typeof a&&null!==a&&(a.hasOwnProperty("auto")&&(o.auto=a.auto),a.hasOwnProperty("tags")&&(o.tags=a.tags)),this.apiCall({url:"groups/",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})};

},{}],27:[function(require,module,exports){
module.exports=function(e,t){return this.apiCall({url:"groups/"+encodeURIComponent(e),validStatus:204},{method:"delete"},t)};

},{}],28:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"groups/",validStatus:200})};

},{}],29:[function(require,module,exports){
module.exports=function(e,t){var a="hdb/certs/certBySha256/"+encodeURIComponent(e.toLowerCase());return t&&t.unpacked&&(a+="?includeUnpacked=true"),this.apiCall({url:a,validStatus:200})};

},{}],30:[function(require,module,exports){
module.exports=function(t,i){var e={host:t};if("object"==typeof i&&null!==i&&(i.exact&&(e.includeExactMatch=!0),i.wildcard&&(e.includeWildcardMatch=!0),i.subdomains&&(e.includeSubDomains=!0)),1===Object.keys(e).length)throw new Error("No search filter options supplied");return i.pem&&(e.includePem=!0),i.limit&&(e.limit=i.limit),this.apiCall({url:"hdb/certs/certsByHostSuffix",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],31:[function(require,module,exports){
module.exports=function(t,e){var i={keyword:t};return e.pem&&(i.includePem=!0),e.limit&&(i.limit=e.limit),this.apiCall({url:"hdb/certs/certsByKeyword",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})};

},{}],32:[function(require,module,exports){
module.exports=function(i,t){var e={spki:i};return t.pem&&(e.includePem=!0),t.limit&&(e.limit=t.limit),this.apiCall({url:"hdb/certs/certsBySpki",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],33:[function(require,module,exports){
module.exports=function(e,t){t||(t={});var i={ids:e};return Object.keys(t).forEach(function(e){i[e]=t[e]}),this.apiCall({url:"hostDiscoveries/*/",validStatus:200},{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})};

},{}],34:[function(require,module,exports){
module.exports=function(e){return this.apiCall("hostDiscoveries",{},e)};

},{}],35:[function(require,module,exports){
module.exports=function(e){return this.apiCall("hostDiscoveries/"+encodeURIComponent(e))};

},{}],36:[function(require,module,exports){
module.exports=function(t,e,o){o||(o={});var s={ids:t,changes:e};return Object.keys(o).forEach(function(t){s[t]=o[t]}),this.apiCall({url:"hostDiscoveries/*/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})};

},{}],37:[function(require,module,exports){
module.exports=function(o,t){return this.apiCall({url:"hostDiscoveries/"+encodeURIComponent(o),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],38:[function(require,module,exports){
module.exports=function(t,a){var e={keyword:t};return"object"==typeof a&&null!==a||(a={}),e.enabled=!a.hasOwnProperty("enabled")||a.enabled,e.matchScope=a.hasOwnProperty("matchScope")?a.matchScope:"all",e.matchPosition=a.hasOwnProperty("matchPosition")?a.matchPosition:"anywhere",e.exclusions=a.hasOwnProperty("exclusions")?a.exclusions:[],e.matchConfusables=!!a.matchConfusables,e.matchFuzzy=!!a.matchFuzzy,e.matchExact=!!a.matchExact,this.apiCall({url:"hostDiscoveryKeywords/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],39:[function(require,module,exports){
module.exports=function(e){return this.apiCall({url:"hostDiscoveryKeywords/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],40:[function(require,module,exports){
module.exports=function(o){return this.apiCall({url:"hostDiscoveryKeywords/"+encodeURIComponent(o)})};

},{}],41:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"hostDiscoveryKeywords"})};

},{}],42:[function(require,module,exports){
module.exports=function(t,o){var a={};return o.hasOwnProperty("enabled")&&(a.enabled=o.enabled),o.hasOwnProperty("keyword")&&(a.keyword=o.keyword),o.hasOwnProperty("matchScope")&&(a.matchScope=o.matchScope),o.hasOwnProperty("matchPosition")&&(a.matchPosition=o.matchPosition),o.hasOwnProperty("matchConfusables")&&(a.matchConfusables=o.matchConfusables),o.hasOwnProperty("matchFuzzy")&&(a.matchFuzzy=o.matchFuzzy),o.hasOwnProperty("matchExact")&&(a.matchExact=o.matchExact),o.hasOwnProperty("exclusions")&&(a.exclusions=o.exclusions),this.apiCall({url:"hostDiscoveryKeywords/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})};

},{}],43:[function(require,module,exports){
module.exports=function(t,o){var e={hostnames:t};return"object"==typeof o&&null!==o&&Object.keys(o).forEach(function(t){e[t]=o[t]}),this.apiCall({url:"hosts/",validStatus:204},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],44:[function(require,module,exports){
module.exports=function(e,s){var t={hostnames:e};return"object"==typeof s&&null!==s&&(s.hasOwnProperty("preview")&&(t.preview=s.preview),s.hasOwnProperty("subdomains")&&(t.subdomains=s.subdomains)),this.apiCall({url:"hosts/",validStatus:200},{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})};

},{}],45:[function(require,module,exports){
module.exports=function(t){if("string"!=typeof t)throw"Invalid hostname";return this.apiCall({url:"hosts/"+encodeURIComponent(t),validStatus:200})};

},{}],46:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"hosts/",validStatus:200},{},t)};

},{}],47:[function(require,module,exports){
module.exports=function(t,o,s){s||(s={});var e={hostnames:t,changes:o};return Object.keys(s).forEach(function(t){e[t]=s[t]}),this.apiCall({url:"hosts/*/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],48:[function(require,module,exports){
module.exports=function(t,e){var n={};return Object.keys(e).forEach(function(t){n[t]=e[t]}),n.range=t,this.apiCall({url:"networkRanges/",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],49:[function(require,module,exports){
module.exports=function(e){return this.apiCall({url:"networkRanges/"+e,validStatus:204},{method:"delete"})};

},{}],50:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"networkRanges/",validStatus:200})};

},{}],51:[function(require,module,exports){
module.exports=function(t,e){var n={};return Object.keys(e).forEach(function(t){n[t]=e[t]}),this.apiCall({url:"networkRanges/"+t,validStatus:204},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],52:[function(require,module,exports){
module.exports=function(r){return this.apiCall("reports0/",{},r)};

},{}],53:[function(require,module,exports){
module.exports=function(t,o){null==o&&(o={});var n={id:t};return Object.keys(o).forEach(function(t){n[t]=o[t]}),this.apiCall({url:"suborgs/",validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],54:[function(require,module,exports){
module.exports=function(e){return this.apiCall({url:"suborgs/"+encodeURIComponent(e),validStatus:204},{method:"delete"})};

},{}],55:[function(require,module,exports){
module.exports=function(){return this.apiCall({url:"suborgs/",validStatus:200})};

},{}],56:[function(require,module,exports){
module.exports=function(o,t){null==t&&(t={});var n={};return Object.keys(t).forEach(function(o){n[o]=t[o]}),this.apiCall({url:"suborgs/"+encodeURIComponent(o),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}],57:[function(require,module,exports){
module.exports=function(e){return this.apiCall({url:"users/"+encodeURIComponent(e)+";cancelInvite",validStatus:204},{method:"post",headers:{"Content-Type":"application/json"},body:"{}"})};

},{}],58:[function(require,module,exports){
module.exports=function(t){null==t&&(t={});var e={};return Object.keys(t).forEach(function(n){e[n]=t[n]}),this.apiCall({url:"users;serviceAccount",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],59:[function(require,module,exports){
module.exports=function(e){return this.apiCall({url:"users/"+encodeURIComponent(e),validStatus:200})};

},{}],60:[function(require,module,exports){
module.exports=function(t){return this.apiCall({url:"users/",validStatus:200},{},t)};

},{}],61:[function(require,module,exports){
module.exports=function(t){null==t&&(t={});var e={};return Object.keys(t).forEach(function(n){e[n]=t[n]}),this.apiCall({url:"users;invite",validStatus:201},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})};

},{}],62:[function(require,module,exports){
module.exports=function(t,e){null==e&&(e={});var n={};return Object.keys(e).forEach(function(t){n[t]=e[t]}),this.apiCall({url:"users/"+encodeURIComponent(t),validStatus:200},{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})};

},{}]},{},[1])(1)
});
