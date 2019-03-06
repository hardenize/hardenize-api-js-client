module.exports = function createHostDiscoveryKeyword(keyword, options){
    var body = {
        keyword: keyword,
    };
    if (typeof options === 'object' && options !== null) {
        if (options.hasOwnProperty('exclusions')) body.exclusions = options.exclusions;
    }

    return this.apiCall({ path: 'hostDiscoveryKeywords/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
