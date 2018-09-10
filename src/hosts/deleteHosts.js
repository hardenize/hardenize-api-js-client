module.exports = function deleteHosts(names, options){
    var body = {
        names: names,
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