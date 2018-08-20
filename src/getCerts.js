module.exports = function getCerts(options){
    return this.apiCall({ path: 'certs/', validStatus: 200 }, {}, options);
};