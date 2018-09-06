module.exports = function getHost(hostname){
    if (typeof hostname !== 'string') throw 'Invalid hostname';
    return this.apiCall({ path: 'host/' + encodeURIComponent(hostname), validStatus: 200 });
};