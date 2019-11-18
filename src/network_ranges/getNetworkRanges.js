module.exports = function getNetworkRanges(){
    return this.apiCall({ path: 'networkRanges/', validStatus: 200 });
};