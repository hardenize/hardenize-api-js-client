module.exports = function getHdbCertsBySpki(spki, options){
    var body = {
        spki: spki,
    };

    if (options.pem)     body.includePem     = true;
    if (options.expired) body.includeExpired = true;
    if (options.limit)   body.limit          = options.limit;

    return this.apiCall({ url: 'hdb/certs/certsBySpki', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};