module.exports = function getCert(sha256){
    if (typeof sha256 !== 'string' || sha256.length !== 64) throw 'Invalid SHA256';
    return this.apiCall({ url: 'certs/' + encodeURIComponent(sha256.toLowerCase()), validStatus: 200 });
};