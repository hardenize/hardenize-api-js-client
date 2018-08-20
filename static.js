(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HardenizeApi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){
var fetch   = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
var Headers = fetch.Headers || global.Headers;

var API_VERSION = 0;

function HardenizeApi(config) {

    this.__config = {
        org:     config.org,
        user:    config.user,
        pass:    config.pass,
        url:     config.url || (typeof window === 'undefined' ? 'https://www.hardenize.com' : ''),
    };

    if (config.devMode) {
        this.delCert = require('./src/delCert');
    }
}

HardenizeApi.prototype.getCerts = require('./src/getCerts');
HardenizeApi.prototype.getCert  = require('./src/getCert');
HardenizeApi.prototype.addCert  = require('./src/addCert');

HardenizeApi.prototype.addDnsZone = require('./src/addDnsZone');

HardenizeApi.prototype.apiCall = function apiCall(path, fetchOptions, qsOptions) {

    var validStatus;
    if (typeof path === 'object') {
        validStatus = path.validStatus;
        path        = path.path;
    }

    var url = this.__config.url + '/org/' + this.__config.org + '/api/v' + API_VERSION + '/' + path.replace(/^\/+/,'');

    if (typeof qsOptions === 'object' && qsOptions !== null) {
        var qs = Object.keys(qsOptions).reduce(function(o, name){
            [].concat(qsOptions[name]).forEach(function(value){
                o.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
            });
            return o;
        }, []);
        if (qs.length) url += '?' + qs.join('&');
    }

    if (!fetchOptions) fetchOptions = {};
    fetchOptions.headers = new Headers(fetchOptions.headers);
    fetchOptions.headers.set('Authorization', 'Basic ' + base64(this.__config.user + ':' + this.__config.pass));

    return fetch(url, fetchOptions).then(function(res){

        var isJson = !!res.headers.get('content-type').match(/^application\/json([\s;].*)?$/i);

        return res[isJson ? 'json' : 'text']().then(function(body){
            var badStatus = res.status >= 400;

            if (validStatus) {
                badStatus = true;
                [].concat(validStatus).forEach(function(status){
                    if (res.status == status) badStatus = false;
                });
            }

            if (badStatus) {
                var err = new Error(isJson ? res.statusText : body);
                err.res = res;
                if (isJson) err.data = body;
                return Promise.reject(err);
            }
            return { res: res, data: body };
        }).catch(function(err){
            err.res = res;
            return Promise.reject(err);
        });
    });
};

module.exports = HardenizeApi;

function base64(str) {
    if (typeof window !== 'undefined' && window.btoa) return btoa(str);
    if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');
    throw new Error('Unable to use base64 to add Authorization header');
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./src/addCert":3,"./src/addDnsZone":4,"./src/delCert":5,"./src/getCert":6,"./src/getCerts":7,"buffer":2,"node-fetch":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports = function addCert(pem){
    if (typeof pem !== 'string') return Promise.reject(new Error('Invalid PEM supplied'));
    return this.apiCall({ path: 'certs/', validStatus: [ 201, 204 ] }, {
        method:  'put',
        headers: { 'Content-Type': 'application/x-pem-file' },
        body:    pem,
    });
};

},{}],4:[function(require,module,exports){
var statuses = [
    'monitored',
    'idle',
    'archive',
];

module.exports = function addDnsZone(root, zoneBody, options){

    if (typeof root     !== 'string') return Promise.reject(new Error('Invalid root param'));
    if (typeof zoneBody !== 'string') return Promise.reject(new Error('Invalid zone body param'));

    var qs = {};
    if (typeof options !== 'undefined' && options !== null) {
        if (options.hasOwnProperty('status')) {
            if (isValidStatus(options.status)) {
                qs.status = options.status;
            } else {
                return Promise.reject(new Error('Invalid status option supplied'));
            }
        }
    }

    var path = 'dns/zone/' + encodeURIComponent(root);
    return this.apiCall({ path: path, validStatus: 201 }, {
        method:  'post',
        headers: { 'Content-Type': 'text/plain' },
        body:    zoneBody,
    }, qs);
};

function isValidStatus(status) {
    for (var i = 0; i < statuses.length; ++i) {
        if (statuses[i] === status) return true;
    }
    return false;
}
},{}],5:[function(require,module,exports){
module.exports = function delCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) {
        return Promise.reject(new Error('Invalid SHA256'))
    }
    return this.apiCall('certs/' + encodeURIComponent(sha256), { method: 'delete' });
};
},{}],6:[function(require,module,exports){
module.exports = function getCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) {
        return Promise.reject(new Error('Invalid SHA256'))
    }
    return this.apiCall({ path: 'certs/' + encodeURIComponent(sha256), validStatus: 200 });
};
},{}],7:[function(require,module,exports){
module.exports = function getCerts(options){
    return this.apiCall({ path: 'certs/', validStatus: 200 }, {}, options);
};
},{}]},{},[1])(1)
});
