module.exports = function createNetworkRange(networkRange, options){

    var body = {};
    Object.keys(options).forEach(function(k){
        body[k] = options[k];
    });
    body.range = networkRange;

    return this.apiCall({ url: 'networkRanges/', validStatus: 201 }, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};