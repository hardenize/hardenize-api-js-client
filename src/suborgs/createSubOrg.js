module.exports = function createSubOrg(id, options){
    if (typeof options === 'undefined' || options === null) options = {};

    var body = {
        id: id,
    };

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });

    return this.apiCall({ url: 'suborgs/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
