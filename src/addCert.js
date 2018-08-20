module.exports = function addCert(pem){
    if (typeof pem !== 'string') return Promise.reject(new Error('Invalid PEM supplied'));
    return this.apiCall('certs/', {
        method:  'put',
        headers: { 'Content-Type': 'application/x-pem-file' },
        body:    pem,
    });
};
