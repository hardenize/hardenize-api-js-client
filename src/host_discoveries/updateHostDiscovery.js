module.exports = function updateHostDiscovery(id, options){
    return this.apiCall({ path: 'hostDiscoveries/' + encodeURIComponent(id), validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};
