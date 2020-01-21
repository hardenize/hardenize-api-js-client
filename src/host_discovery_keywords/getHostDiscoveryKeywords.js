module.exports = function getHostDiscoveryKeywords(){
    return this.apiCall({ url: 'hostDiscoveryKeywords' });
};
