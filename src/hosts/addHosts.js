module.exports = function addHosts(names, options){
    var body = {
        names: names,
    };
    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('status')) body.status = options.status;
        if (options.hasOwnProperty('tags'))   body.tags   = options.tags;
    }

    return this.apiCall({ path: 'hosts/', validStatus: 201 }, {
        method:  'put',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
