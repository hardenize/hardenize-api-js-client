module.exports = function getManagementIpWhitelist(){
    return this.apiCall({ path: 'config/managementIpWhitelist' });
};