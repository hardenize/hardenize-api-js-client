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

HardenizeApi.prototype.apiCall = function apiCall(path, fetchOptions, qsOptions) {

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
            if (res.status >= 400) {
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
