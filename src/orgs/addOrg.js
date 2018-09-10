module.exports = function addOrg(id, options){
    if (typeof options === 'undefined' || options === null) options = {};

    var body = {
        id: id,
    };

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });

    return this.apiCall({ path: 'suborgs/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
