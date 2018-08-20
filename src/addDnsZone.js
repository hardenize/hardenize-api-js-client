var statuses = [
    'monitored',
    'idle',
    'archive',
];

module.exports = function addDnsZone(root, zoneBody, options){

    if (typeof root     !== 'string') return Promise.reject(new Error('Invalid root param'));
    if (typeof zoneBody !== 'string') return Promise.reject(new Error('Invalid zone body param'));

    var qs = {};
    if (typeof options !== 'undefined' && options !== null) {
        if (options.hasOwnProperty('status')) {
            if (isValidStatus(options.status)) {
                qs.status = options.status;
            } else {
                return Promise.reject(new Error('Invalid status option supplied'));
            }
        }
    }

    return this.apiCall('dns/zone/' + encodeURIComponent(root), {
        method:  'post',
        headers: { 'Content-Type': 'text/plain' },
        body:    zoneBody,
    }, qs);
};

function isValidStatus(status) {
    for (var i = 0; i < statuses.length; ++i) {
        if (statuses[i] === status) return true;
    }
    return false;
}