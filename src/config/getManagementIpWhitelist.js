module.exports = function getManagementIpWhitelist(){
    return this.apiCall({ url: 'config/managementIpWhitelist' });
};