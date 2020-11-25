module.exports = function updateSaml(options){
    return this.apiCall({ url: 'config/saml', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};