module.exports = function updateHostDiscoveries(ids, changes, options){
    if (!options) options = {};

    var body = {
        ids: ids,
        changes: changes,
    };

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });

    return this.apiCall({ url: 'hostDiscoveries/*/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
