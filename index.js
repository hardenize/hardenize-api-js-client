var fetch   = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
var Headers = fetch.Headers || global.Headers;

var API_VERSION = 1;

function HardenizeApi(config) {
    if (!config) config = {};

    this.__config = {};
    if (config.hasOwnProperty('org'))  this.__config.org  = config.org;
    if (config.hasOwnProperty('user')) this.__config.user = config.user;
    if (config.hasOwnProperty('pass')) this.__config.pass = config.pass;
    this.__config.url = config.hasOwnProperty('url') ? config.url : 'https://www.hardenize.com';
}

HardenizeApi.version = function apiVersion() {
    return String(API_VERSION);
}

HardenizeApi.prototype.version = function apiVersion(){
    return HardenizeApi.version();
};

HardenizeApi.prototype.config = function config(name, value){
    var self = this;
    if (typeof name === 'undefined') {
        var config = {};
        Object.keys(this.__config).forEach(function(name){
            config[name] = self.__config[name];
        });
        return config;
    } else if (typeof name === 'object' && name !== null) {
        Object.keys(name).forEach(function(n){
            self.config(n, name[n]);
        });
    } else if (value === null) {
        delete this.__config[name];
    } else if (typeof value !== 'undefined') {
        this.__config[name] = value;
    } else {
        return this.__config[name];
    }
};

HardenizeApi.prototype.getCerts   = endpoint(require('./src/certs/getCerts'));
HardenizeApi.prototype.getCert    = endpoint(require('./src/certs/getCert'));
HardenizeApi.prototype.addCert    = endpoint(require('./src/certs/addCert'));
HardenizeApi.prototype.addDnsZone = endpoint(require('./src/dns_zone/addDnsZone'));
HardenizeApi.prototype.getTags    = endpoint(require('./src/tags/getTags'));
HardenizeApi.prototype.addTag     = endpoint(require('./src/tags/addTag'));
HardenizeApi.prototype.deleteTag  = endpoint(require('./src/tags/deleteTag'));

HardenizeApi.wrapApiCall = function(wrapper) {
    var apiCall = HardenizeApi.prototype.apiCall;
    HardenizeApi.prototype.apiCall = function(path, fetchOptions, qsOptions) {
        if (!fetchOptions) fetchOptions = {};
        if (!qsOptions)    qsOptions    = {};
        return wrapper.call(this, path, fetchOptions, qsOptions, apiCall.bind(this));
    };
};

HardenizeApi.prototype.wrapApiCall = function(wrapper) {
    var apiCall = this.apiCall;
    this.apiCall = function(path, fetchOptions, qsOptions) {
        if (!fetchOptions) fetchOptions = {};
        if (!qsOptions)    qsOptions    = {};
        return wrapper.call(this, path, fetchOptions, qsOptions, apiCall.bind(this));
    };
};

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
        if (qs.length) {
            var m = url.match(/\?(.*)$/);
            if (m) {
                if (m[1].length) url += '&';
            } else {
                url += '?';
            }
            url += qs.join('&');
        }
    }

    if (!fetchOptions) fetchOptions = {};

    fetchOptions.headers = new Headers(fetchOptions.headers);
    if (!fetchOptions.hasOwnProperty('redirect')) fetchOptions.redirect = 'error';

    // Add Basic authentication if a user and pass were supplied
    if (this.__config.user && this.__config.pass) {
        fetchOptions.headers.set('Authorization', 'Basic ' + base64(this.__config.user + ':' + this.__config.pass));
    }

    return fetch(url, fetchOptions).then(function(res){

        var isJson = !!(res.headers.get('content-type')||'').match(/^application\/json([\s;].*)?$/i);

        return res[isJson ? 'json' : 'text']().then(function(body){
            var badStatus = res.status >= 400;

            if (validStatus) {
                badStatus = true;
                [].concat(validStatus).forEach(function(status){
                    if (res.status == status) badStatus = false;
                });
            }

            if (badStatus) {

                var err = typeof res.statusText === 'string' && res.statusText.length ? res.statusText : String(res.status);
                if (isJson && typeof body === 'object' && body !== null && body.errors) {
                    err = body.errors.map(function(err){
                        var item = err.message;
                        if (err.param) item = '"' + err.param + '" param: ' + item;
                        return item;
                    }).join(', ');
                }
                err     = new Error(err);
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

function endpoint(func) {
    return function(){
        try {
            var result = func.apply(this, arguments);
            if (!result instanceof Promise) result = Promise.resolve(result);
            return result;
        } catch(err) {
            if (!(err instanceof Error)) err = new Error(err);
            return Promise.reject(err);
        }
    };
}