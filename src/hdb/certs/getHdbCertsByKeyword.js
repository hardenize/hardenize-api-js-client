module.exports = function getHdbCertsByKeyword(keyword, options){

    var body = {
        keyword: keyword,
    };

    if (options.pem)   body.includePem = true;
    if (options.limit) body.limit      = options.limit;

    return this.apiCall({ url: 'hdb/certs/certsByKeyword', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};