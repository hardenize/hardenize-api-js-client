var statuses = [
    'monitored',
    'idle',
    'archive',
];

module.exports = function addDnsZone(root, zoneBody, options){

    if (typeof root     !== 'string') throw 'Invalid root param';
    if (typeof zoneBody !== 'string') throw 'Invalid zone body param';

    var qs = {};
    if (typeof options !== 'undefined' && options !== null) {
        if (options.hasOwnProperty('status')) {
            if (isValidStatus(options.status)) {
                qs.status = options.status;
            } else {
                throw 'Invalid status option supplied';
            }
        }
    }

    var path = 'dns/zones/' + encodeURIComponent(root.toLowerCase());
    return this.apiCall({ path: path, validStatus: 201 }, {
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