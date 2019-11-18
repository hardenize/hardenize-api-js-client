module.exports = function deleteNetworkRange(networkRange){
    return this.apiCall({ path: 'networkRanges/' + networkRange, validStatus: 204 },  {
        method: 'delete'
    });
};