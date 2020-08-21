module.exports = function updateNetworkScanning(options){
    return this.apiCall({ url: 'config/networkScanning', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};