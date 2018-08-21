module.exports = function delCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) {
        return Promise.reject(new Error('Invalid SHA256'))
    }
    return this.apiCall('certs/' + encodeURIComponent(sha256.toLowerCase()), { method: 'delete' });
};