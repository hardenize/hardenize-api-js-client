module.exports = function getCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) {
        return Promise.reject(new Error('Invalid SHA256'))
    }
    return this.apiCall('certs/' + sha256);
};