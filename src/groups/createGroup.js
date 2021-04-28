module.exports = function createGroup(name, options){

    var body = {
        name: name,
    };

    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('auto')) body.auto = options.auto;
        if (options.hasOwnProperty('tags')) body.tags = options.tags;
    }

    return this.apiCall({ url: 'groups/', validStatus: 201 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
