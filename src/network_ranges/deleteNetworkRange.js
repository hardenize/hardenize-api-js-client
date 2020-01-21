module.exports = function deleteNetworkRange(networkRange){
    return this.apiCall({ url: 'networkRanges/' + networkRange, validStatus: 204 },  {
        method: 'delete'
    });
};