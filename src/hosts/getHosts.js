module.exports = function getHosts(options){
    return this.apiCall({ path: 'hosts/', validStatus: 200 }, {}, options);
};