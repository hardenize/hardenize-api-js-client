module.exports = function createGroup(id, options){

    var body = {
        id: id,
    };

    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('name')) body.name = options.name;
    }

    return this.apiCall({ url: 'groups/', validStatus: 201 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
