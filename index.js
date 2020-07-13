var fetch   = typeof window === 'undefined' ? require('node-fetch') : window.fetch;
var Headers = fetch.Headers || global.Headers;
var Request = fetch.Request || global.Request;

var API_VERSION = 1;

function HardenizeApi(config) {
    if (!config) config = {};

    this.__eventListeners = {};
    this.__config = {};
    if (config.hasOwnProperty('org'))  this.__config.org  = config.org;
    if (config.hasOwnProperty('user')) this.__config.user = config.user;
    if (config.hasOwnProperty('pass')) this.__config.pass = config.pass;
    this.__config.url = config.hasOwnProperty('url') ? config.url : 'https://api.hardenize.com';
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

HardenizeApi.prototype.addEventListener = HardenizeApi.prototype.on = function(type, callback) {
    this.__eventListeners[type] = this.__eventListeners[type] || [];
    this.__eventListeners[type].push(callback);
    return this;
};

HardenizeApi.prototype.removeEventListener = HardenizeApi.prototype.off = function(type, callback) {
    if (typeof callback === 'undefined') {
        delete this.__eventListeners[type]
    } else if (this.__eventListeners[type]) {
        this.__eventListeners[type] = this.__eventListeners[type].filter(function(c){
            return c !== callback;
        });
        if (this.__eventListeners[type].length === 0) delete this.__eventListeners[type];
    }
    return this;
};

HardenizeApi.prototype.emit = function(type, data) {
    if (!this.__eventListeners[type]) return;
    for (var i = 0; i < this.__eventListeners[type].length; ++i) {
        this.__eventListeners[type][i].call(this, data);
    }
};

HardenizeApi.prototype.getHdbCertBySha256          = endpoint(require('./src/hdb/certs/getHdbCertBySha256'));
HardenizeApi.prototype.getHdbCertsByHostSuffix     = endpoint(require('./src/hdb/certs/getHdbCertsByHostSuffix'));
HardenizeApi.prototype.getHdbCertsByKeyword        = endpoint(require('./src/hdb/certs/getHdbCertsByKeyword'));
HardenizeApi.prototype.getHdbCertsBySpki           = endpoint(require('./src/hdb/certs/getHdbCertsBySpki'));
HardenizeApi.prototype.getCerts                    = endpoint(require('./src/certs/getCerts'));
HardenizeApi.prototype.getCert                     = endpoint(require('./src/certs/getCert'));
HardenizeApi.prototype.createCert                  = endpoint(require('./src/certs/createCert'));
HardenizeApi.prototype.getManagementIpWhitelist    = endpoint(require('./src/config/getManagementIpWhitelist'));
HardenizeApi.prototype.updateManagementIpWhitelist = endpoint(require('./src/config/updateManagementIpWhitelist'));
HardenizeApi.prototype.createDnsZone               = endpoint(require('./src/dns_zones/createDnsZone'));
HardenizeApi.prototype.getGroups                   = endpoint(require('./src/groups/getGroups'));
HardenizeApi.prototype.createGroup                 = endpoint(require('./src/groups/createGroup'));
HardenizeApi.prototype.deleteGroup                 = endpoint(require('./src/groups/deleteGroup'));
HardenizeApi.prototype.getHosts                    = endpoint(require('./src/hosts/getHosts'));
HardenizeApi.prototype.getHost                     = endpoint(require('./src/hosts/getHost'));
HardenizeApi.prototype.createHosts                 = endpoint(require('./src/hosts/createHosts'));
HardenizeApi.prototype.updateHosts                 = endpoint(require('./src/hosts/updateHosts'));
HardenizeApi.prototype.deleteHosts                 = endpoint(require('./src/hosts/deleteHosts'));
HardenizeApi.prototype.getHostDiscoveries          = endpoint(require('./src/host_discoveries/getHostDiscoveries'));
HardenizeApi.prototype.getHostDiscovery            = endpoint(require('./src/host_discoveries/getHostDiscovery'));
HardenizeApi.prototype.updateHostDiscovery         = endpoint(require('./src/host_discoveries/updateHostDiscovery'));
HardenizeApi.prototype.updateHostDiscoveries       = endpoint(require('./src/host_discoveries/updateHostDiscoveries'));
HardenizeApi.prototype.deleteHostDiscoveries       = endpoint(require('./src/host_discoveries/deleteHostDiscoveries'));
HardenizeApi.prototype.getHostDiscoveryKeywords    = endpoint(require('./src/host_discovery_keywords/getHostDiscoveryKeywords'));
HardenizeApi.prototype.getHostDiscoveryKeyword     = endpoint(require('./src/host_discovery_keywords/getHostDiscoveryKeyword'));
HardenizeApi.prototype.createHostDiscoveryKeyword  = endpoint(require('./src/host_discovery_keywords/createHostDiscoveryKeyword'));
HardenizeApi.prototype.deleteHostDiscoveryKeyword  = endpoint(require('./src/host_discovery_keywords/deleteHostDiscoveryKeyword'));
HardenizeApi.prototype.updateHostDiscoveryKeyword  = endpoint(require('./src/host_discovery_keywords/updateHostDiscoveryKeyword'));
HardenizeApi.prototype.getNetworkRanges            = endpoint(require('./src/network_ranges/getNetworkRanges'));
HardenizeApi.prototype.createNetworkRange          = endpoint(require('./src/network_ranges/createNetworkRange'));
HardenizeApi.prototype.deleteNetworkRange          = endpoint(require('./src/network_ranges/deleteNetworkRange'));
HardenizeApi.prototype.updateNetworkRange          = endpoint(require('./src/network_ranges/updateNetworkRange'));
HardenizeApi.prototype.getSubOrgs                  = endpoint(require('./src/suborgs/getSubOrgs'));
HardenizeApi.prototype.createSubOrg                = endpoint(require('./src/suborgs/createSubOrg'));
HardenizeApi.prototype.deleteSubOrg                = endpoint(require('./src/suborgs/deleteSubOrg'));
HardenizeApi.prototype.updateSubOrg                = endpoint(require('./src/suborgs/updateSubOrg'));
HardenizeApi.prototype.getReports0                 = endpoint(require('./src/reports0/getReports'));
HardenizeApi.prototype.getEventTypes               = endpoint(require('./src/events/getEventTypes'));
HardenizeApi.prototype.updateEventType             = endpoint(require('./src/events/updateEventType'));
HardenizeApi.prototype.getEvents                   = endpoint(require('./src/events/getEvents'));
HardenizeApi.prototype.getEvent                    = endpoint(require('./src/events/getEvent'));
HardenizeApi.prototype.getEventHooks               = endpoint(require('./src/events/getEventHooks'));
HardenizeApi.prototype.getEventHookDestinations    = endpoint(require('./src/events/getEventHookDestinations'));
HardenizeApi.prototype.createEventHook             = endpoint(require('./src/events/createEventHook'));
HardenizeApi.prototype.deleteEventHook             = endpoint(require('./src/events/deleteEventHook'));
HardenizeApi.prototype.updateEventHook             = endpoint(require('./src/events/updateEventHook'));
HardenizeApi.prototype.testEventHook               = endpoint(require('./src/events/testEventHook'));
HardenizeApi.prototype.updateUser                  = endpoint(require('./src/users/updateUser'));

HardenizeApi.wrapApiCall = function(wrapper) {
    var apiCall = HardenizeApi.prototype.apiCall;
    HardenizeApi.prototype.apiCall = function(request, fetchOptions, qsOptions) {
        if (!fetchOptions) fetchOptions = {};
        if (!qsOptions)    qsOptions    = {};
        return wrapper.call(this, request, fetchOptions, qsOptions, apiCall.bind(this));
    };
};

HardenizeApi.prototype.wrapApiCall = function(wrapper) {
    var apiCall = this.apiCall;
    this.apiCall = function(request, fetchOptions, qsOptions) {
        if (!fetchOptions) fetchOptions = {};
        if (!qsOptions)    qsOptions    = {};
        return wrapper.call(this, request, fetchOptions, qsOptions, apiCall.bind(this));
    };
};

HardenizeApi.prototype.baseUrl = function baseUrl(path) {
    var url = this.__config.url.match(/^https?:\/\/[^\/]+\/*$/i)
        ? this.__config.url.replace(/\/+$/, '') + '/v' + API_VERSION + '/org/' + this.__config.org
        : this.__config.url.replace(/\{org\}/g, this.__config.org)
            .replace(/\/+$/, '') + '/v' + API_VERSION;

    if (typeof path === 'string') {
        url = url.replace('/+$', '') + '/' + path.replace(/^\/+/,'');
    }
    return url;
};

HardenizeApi.prototype.absoluteLocation = function absoluteLocation(location) {
    if (typeof location === 'string' && !location.match(/^https?:\/\//)) {
        location = this.baseUrl().replace(/^((https?:)?\/\/[^/]+).*/, '$1')
            + '/' + location.replace(/^\/+/, '');
    }
    return location;
};

HardenizeApi.prototype.apiCall = function apiCall(request, fetchOptions, qsOptions) {
    if (typeof request === 'string') {
        request = {
            url: request,
        };
    }

    var validStatus = request.validStatus;
    var url = request.url.match(/^https?:\/\//i)
        ? request.url
        : this.baseUrl(request.url);

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
    if (!fetchOptions.hasOwnProperty('redirect')) fetchOptions.redirect = 'manual';

    // Add Basic authentication if a user and pass were supplied
    if (this.__config.user && this.__config.pass) {
        fetchOptions.headers.set('Authorization', 'Basic ' + base64(this.__config.user + ':' + this.__config.pass));
    }

    var req = new Request(url, fetchOptions);
    this.emit('request', req);

    var self = this;
    return fetch(req).then(function(res){
        self.emit('response', res);

        return res.text().then(function(body){
            self.emit('body', body);
            if (isJson(res)) {
                try {
                    body = JSON.parse(body);
                } catch(err) {
                    return Promise.reject(err);
                }
            }

            if (isInitialAsyncResponse(req, res, body)) {
                var nextUrl = self.absoluteLocation(res.headers.get('location'));
                return self.apiCall({
                    url:         nextUrl,
                    validStatus: validStatus,
                });
            }

            if (isPollingAsyncResponse(req, res, body)) {
                return new Promise(function(r){
                    setTimeout(r, 1000);
                }).then(function(){
                    return self.apiCall({
                        url:         url,
                        validStatus: validStatus,
                    });
                });
            }

            if (isFinalAsyncResponse(req, res, body)) {

                if (!body.pages || !body.rows) {
                    return self.apiCall({
                        url:         body.resultsLocation,
                        validStatus: validStatus,
                    });
                }

                return {
                    pages:       body.pages,
                    rowsPerPage: body.rowsPerPage,
                    rows:        body.rows,
                    fetchResults: function fetchResults(startPage, endPage) {
                        if (typeof startPage === 'undefined' && typeof endPage === 'undefined') {
                            startPage = 1;
                            endPage = body.pages;
                        }
                        if (startPage < 1 || endPage < startPage || endPage > body.pages) {
                            return Promise.reject(new Error('Invalid page range'));
                        }
                        return self.apiCall({ url: body.resultsLocation, validStatus: validStatus, getPage: true }, {
                            headers: {
                                'Range': 'pages=' + startPage + '-' + endPage,
                            }
                        });
                    }
                };
            }

            if (!request.getPage && res.status !== 206) {
                var err = checkValidStatus({ validStatus, res, body });
                if (err) return Promise.reject(err);
            }

            if (request.getPage) {
                return { res: res, data: body };
            } else {
                return {
                    pages: 1,
                    fetchResults: function fetchResults(startPage, endPage) {
                        if (typeof startPage === 'undefined' && typeof endPage === 'undefined') {
                            startPage = 1;
                            endPage   = 1;
                        }
                        if (startPage !== 1 || endPage !== 1) {
                            return Promise.reject(new Error('Invalid page range'));
                        }
                        return Promise.resolve({ res: res, data: body });
                    }
                }
            }

        }).catch(function(err){
            err.res = res;
            return Promise.reject(err);
        });
    });
};

function checkValidStatus({ validStatus, res, body, status }) {
    if (!status) status = res.status;
    var badStatus = status >= 400;

    if (validStatus) {
        badStatus = true;
        [].concat(validStatus).forEach(function(testStatus){
            if (status == testStatus) badStatus = false;
        });
    }

    if (badStatus) {
        var err = typeof res.statusText === 'string' && res.statusText.length ? res.statusText : String(status);
        if (isJson(res) && typeof body === 'object' && body !== null && body.errors) {
            err = body.errors.map(function(err){
                var item = err.message;
                if (err.param) item = '"' + err.param + '" param: ' + item;
                return item;
            }).join(', ');
        }
        err     = new Error(err);
        err.res = res;
        if (isJson(res)) err.data = body;
        return err;
    }

}

function isInitialAsyncResponse(req, res, body) {
    if (req.method !== 'POST')        return false;
    if (res.status !== 202)           return false;
    if (!res.headers.get('location')) return false;
    if (!isJson(res)) return false;
    if (typeof body.id         !== 'string')  return false;
    if (typeof body.statusCode !== 'number')  return false;
    if (typeof body.done       !== 'boolean') return false;
    return true;
}

function isPollingAsyncResponse(req, res, body) {
    if (req.method !== 'GET') return false;
    if (res.status !== 200)   return false;
    if (!req.url.match(/\/operations\/[^\/]+$/)) return false;
    if (!isJson(res)) return false;
    if (typeof body.id         !== 'string')  return false;
    if (typeof body.statusCode !== 'number')  return false;
    if (body.done              !== false)     return false;
    return true;
}

function isFinalAsyncResponse(req, res, body) {
    if (req.method !== 'GET') return false;
    if (res.status !== 200)   return false;
    if (!req.url.match(/\/operations\/[^\/]+$/)) return false;
    if (!isJson(res)) return false;
    if (typeof body.id              !== 'string') return false;
    if (typeof body.statusCode      !== 'number') return false;
    if (typeof body.resultsLocation !== 'string') return false;
    if (body.done                   !== true)     return false;
    return true;
}

function isJson(res) {
    return!!(res.headers.get('content-type')||'').match(/^application\/json([\s;].*)?$/i);
}

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