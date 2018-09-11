module.exports = function addGroup(id, options){

    var body = {
        id: id,
    };

    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('name')) body.name = options.name;
    }

    return this.apiCall({ path: 'groups/', validStatus: 201 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
