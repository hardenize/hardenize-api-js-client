module.exports = function updateUser(id, options){
    if (typeof options === 'undefined' || options === null) options = {};

    var body = {};

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });

    return this.apiCall({ url: 'users/' + encodeURIComponent(id), validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
