module.exports = function updateHosts(names, options){
    if (!options) options = {};

    var body = {
        names: names,
    };

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });
    
    return this.apiCall({ path: 'hosts/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
