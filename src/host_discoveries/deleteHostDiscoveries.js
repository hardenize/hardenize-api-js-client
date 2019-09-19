module.exports = function deleteHostDiscoveries(ids, options){
    if (!options) options = {};

    var body = {
        ids: ids,
    };

    Object.keys(options).forEach(function(name){
        body[name] = options[name];
    });

    return this.apiCall({ path: 'hostDiscoveries/*/', validStatus: 200 }, {
        method:  'delete',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
