module.exports = function getHdbCertsByHostSuffix(hostSuffix, options){

    var body = {
        host: hostSuffix,
    };

    if (typeof options === 'object' && options !== null) {
        if (options.exact)      body.includeExactMatch    = true;
        if (options.wildcard)   body.includeWildcardMatch = true;
        if (options.subdomains) body.includeSubDomains    = true;
    }

    if (Object.keys(body).length === 1) {
        throw new Error('No search filter options supplied');
    }

    if (options.pem)   body.includePem = true;
    if (options.limit) body.limit      = options.limit;

    return this.apiCall({ url: 'hdb/certs/certsByHostSuffix', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};