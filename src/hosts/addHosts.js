module.exports = function addHosts(hostnames, options){
    var body = {
        hostnames: hostnames,
    };
    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('status')) body.status = options.status;
        if (options.hasOwnProperty('groups')) body.groups = options.groups;
    }

    return this.apiCall({ path: 'hosts/', validStatus: 204 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
