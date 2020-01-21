module.exports = function getHdbCertBySha256(sha256, options){
    var url = 'hdb/certs/certBySha256/' + encodeURIComponent(sha256.toLowerCase());
    if (options.unpacked) url += '?includeUnpacked=true';

    return this.apiCall({ url: url, validStatus: 200 });
};