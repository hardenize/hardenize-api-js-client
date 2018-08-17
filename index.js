var fetch   = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
var Headers = fetch.Headers || global.Headers;

var API_VERSION = 0;

function HardenizeApi(config) {

    this.__config = {
        org:  config.org,
        user: config.user,
        pass: config.pass,
        url:  config.url || (typeof window === 'undefined' ? 'https://www.hardenize.com' : ''),
    };
}

HardenizeApi.prototype.getCerts = function getCerts(options){
    return this.apiCall('certs/', {}, options);
};

HardenizeApi.prototype.getCert = function getCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) {
        return Promise.reject(new Error('Invalid SHA256'))
    }
    return this.apiCall('certs/' + sha256);
};

HardenizeApi.prototype.uploadCert = function uploadCert(pem){
    if (typeof pem !== 'string') return Promise.reject(new Error('Invalid PEM supplied'));
    return this.apiCall('certs/', {
        method:  'put',
        headers: { 'Content-Type': 'application/x-pem-file' },
        body:    pem,
    });
};

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
