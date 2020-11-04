module.exports = function updateSingleSignOn(options){
    return this.apiCall({ url: 'config/singleSignOn', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};