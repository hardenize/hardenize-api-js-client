module.exports = function addTag(name, options){

    var body = {
        name: name,
    };

    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('displayName')) body.displayName = options.displayName;
    }

    return this.apiCall({ path: 'tags/', validStatus: 201 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
