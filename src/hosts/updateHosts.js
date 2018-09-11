module.exports = function updateHosts(hostnames, changes, options){
    if (!options) options = {};

    var body = {
        hostnames: hostnames,
        changes:   changes,
    };

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });
    
    return this.apiCall({ path: 'hosts/*/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
