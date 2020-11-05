module.exports = function getSingleSignOn(){
    return this.apiCall({ url: 'config/singleSignOn' });
};