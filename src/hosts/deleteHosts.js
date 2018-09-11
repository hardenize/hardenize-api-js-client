module.exports = function deleteHosts(hostnames, options){
    var body = {
        hostnames: hostnames,
    };   
    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('preview')) body.preview = options.preview;
    }

    return this.apiCall({ path: 'hosts/', validStatus: 200 }, {
        method:  'delete',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
