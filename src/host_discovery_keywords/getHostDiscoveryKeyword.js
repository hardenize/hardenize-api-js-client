module.exports = function getHostDiscoveryKeyword(keyword){
    return this.apiCall({ path: 'hostDiscoveryKeywords/' + encodeURIComponent(keyword) });
};
