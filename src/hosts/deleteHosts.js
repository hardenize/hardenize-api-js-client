module.exports = function deleteHosts(hostnames, options){
    var body = {
        hostnames: hostnames,
    };   
    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('preview'))    body.preview    = options.preview;
        if (options.hasOwnProperty('subdomains')) body.subdomains = options.subdomains;
    }

    return this.apiCall({ url: 'hosts/', validStatus: 200 }, {
        method:  'delete',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
