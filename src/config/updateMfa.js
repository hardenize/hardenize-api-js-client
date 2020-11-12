module.exports = function updateMfa(options){
    return this.apiCall({ url: 'config/mfa', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};