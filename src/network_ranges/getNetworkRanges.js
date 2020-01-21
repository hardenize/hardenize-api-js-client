module.exports = function getNetworkRanges(){
    return this.apiCall({ url: 'networkRanges/', validStatus: 200 });
};