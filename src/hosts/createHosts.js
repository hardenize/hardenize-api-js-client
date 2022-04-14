module.exports = function createHosts(hostnames, options){
    var body = {
        hostnames: hostnames,
    };
    if (typeof options === 'object' && options !== null) {
        Object.keys(options).forEach(function(key){
            body[key] = options[key];
        });
    }

    return this.apiCall({ url: 'hosts/', validStatus: 204 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
