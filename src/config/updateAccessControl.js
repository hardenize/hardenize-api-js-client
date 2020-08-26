module.exports = function updateAccessControl(options){
    return this.apiCall({ url: 'config/accessControl', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};