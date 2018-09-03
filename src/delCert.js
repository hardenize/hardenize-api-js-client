module.exports = function delCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) throw 'Invalid SHA256';
    return this.apiCall('certs/' + encodeURIComponent(sha256.toLowerCase()), { method: 'delete' });
};