module.exports = function createCert(pem){

    if (typeof pem !== 'string') pem = '';
    pem = pem.trim();
    if (pem.length === 0) throw 'Unable to parse certificate';

    return this.apiCall({ url: 'certs/', validStatus: [ 201, 202 ] }, {
        method:  'post',
        headers: { 'Content-Type': 'application/x-pem-file' },
        body:    pem,
    });
};
