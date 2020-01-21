module.exports = function getHosts(options){
    return this.apiCall({ url: 'hosts/', validStatus: 200 }, {}, options);
};