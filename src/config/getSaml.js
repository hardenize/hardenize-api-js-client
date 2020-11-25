module.exports = function getSaml(){
    return this.apiCall({ url: 'config/saml' });
};