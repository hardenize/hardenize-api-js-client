module.exports = function deleteHostDiscoveryKeyword(keyword){
    return this.apiCall({ url: 'hostDiscoveryKeywords/' + encodeURIComponent(keyword), validStatus: 204 }, {
        method: 'delete',
    });
};
