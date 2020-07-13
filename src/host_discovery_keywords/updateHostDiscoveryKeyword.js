module.exports = function updateHostDiscoveryKeyword(keyword, options){
    var body = {};

    if (options.hasOwnProperty('enabled'))          body.enabled          = options.enabled;
    if (options.hasOwnProperty('keyword'))          body.keyword          = options.keyword;
    if (options.hasOwnProperty('matchScope'))       body.matchScope       = options.matchScope;
    if (options.hasOwnProperty('matchPosition'))    body.matchPosition    = options.matchPosition;
    if (options.hasOwnProperty('matchConfusables')) body.matchConfusables = options.matchConfusables;
    if (options.hasOwnProperty('matchFuzzy'))       body.matchFuzzy       = options.matchFuzzy;
    if (options.hasOwnProperty('exclusions'))       body.exclusions       = options.exclusions;

    return this.apiCall({ url: 'hostDiscoveryKeywords/' + encodeURIComponent(keyword), validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};
