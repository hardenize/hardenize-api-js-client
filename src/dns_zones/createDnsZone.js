module.exports = function createDnsZone(root, zoneBody){

    if (typeof root     !== 'string') throw 'Invalid root param';
    if (typeof zoneBody !== 'string') throw 'Invalid zone body param';

    return this.apiCall({ url: 'dns/zones/', validStatus: 204 }, {
        method:  'post',
        headers: { 'Content-Type': 'text/plain' },
        body:    zoneBody,
    }, { root: root });
};