module.exports = function getNetworkScanning(){
    return this.apiCall({ url: 'config/networkScanning' });
};