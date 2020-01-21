module.exports = function updateHostDiscoveryKeyword(keyword, options){
    var body = {
        op: options.op,
    };
    if (options.hasOwnProperty('exclusions')) body.exclusions = options.exclusions;

    return this.apiCall({ url: 'hostDiscoveryKeywords/' + encodeURIComponent(keyword), validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
