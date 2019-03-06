module.exports = function deleteHostDiscoveryKeyword(keyword){
    return this.apiCall({ path: 'hostDiscoveryKeywords/' + encodeURIComponent(keyword), validStatus: 204 }, {
        method: 'delete',
    });
};
