module.exports = function getHostDiscoveryKeywords(){
    return this.apiCall({ path: 'hostDiscoveryKeywords' });
};
