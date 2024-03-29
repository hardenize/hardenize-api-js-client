module.exports = function createServiceAccount(options){
    if (typeof options === 'undefined' || options === null) options = {};

    var body = {};

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });

    return this.apiCall({ url: 'users;serviceAccount', validStatus: 201 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
