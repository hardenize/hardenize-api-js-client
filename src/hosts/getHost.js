module.exports = function getHost(hostname){
    if (typeof hostname !== 'string') throw 'Invalid hostname';
    return this.apiCall({ url: 'hosts/' + encodeURIComponent(hostname), validStatus: 200 });
};