module.exports = function getHostDiscovery(id){
    return this.apiCall('hostDiscoveries/' + encodeURIComponent(id));
};