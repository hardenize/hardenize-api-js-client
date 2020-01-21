module.exports = function getHostDiscoveryKeyword(keyword){
    return this.apiCall({ url: 'hostDiscoveryKeywords/' + encodeURIComponent(keyword) });
};
