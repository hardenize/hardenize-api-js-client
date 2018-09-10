module.exports = function getHost(hostname){
    if (typeof hostname !== 'string') throw 'Invalid hostname';
    return this.apiCall({ path: 'hosts/' + encodeURIComponent(hostname), validStatus: 200 });
};