module.exports = function getAccessControl(){
    return this.apiCall({ url: 'config/accessControl' });
};