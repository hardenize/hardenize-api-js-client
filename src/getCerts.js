module.exports = function getCerts(options){
    return this.apiCall('certs/', {}, options);
};