module.exports = function updateCert(sha256, changes){
    return this.apiCall({ url: 'certs/' + sha256, validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(changes),
    });
};
