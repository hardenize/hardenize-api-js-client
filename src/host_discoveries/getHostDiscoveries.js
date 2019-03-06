module.exports = function getHostDiscoveries(options){
    return this.apiCall('hostDiscoveries', {}, options);
};