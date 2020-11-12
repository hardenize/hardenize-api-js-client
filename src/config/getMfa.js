module.exports = function getMfa(){
    return this.apiCall({ url: 'config/mfa' });
};