module.exports = function createHostDiscoveryKeyword(keyword, options){

    var body = {
        keyword: keyword,
    };

    if (typeof options !== 'object' || options === null) {
        options = {};
    }

    body.enabled          = options.hasOwnProperty('enabled')       ? options.enabled       : true;
    body.matchScope       = options.hasOwnProperty('matchScope')    ? options.matchScope    : 'all';
    body.matchPosition    = options.hasOwnProperty('matchPosition') ? options.matchPosition : 'anywhere';
    body.exclusions       = options.hasOwnProperty('exclusions')    ? options.exclusions    : [];
    body.matchConfusables = !!options.matchConfusables;
    body.matchFuzzy       = !!options.matchFuzzy;

    return this.apiCall({ url: 'hostDiscoveryKeywords/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
