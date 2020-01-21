module.exports = function updateManagementIpWhitelist(options){
    return this.apiCall({ url: 'config/managementIpWhitelist', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};