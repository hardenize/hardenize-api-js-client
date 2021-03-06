module.exports = function updateNetworkRange(networkRange, options){

    var body = {};
    Object.keys(options).forEach(function(k){
        body[k] = options[k];
    });

    return this.apiCall({ url: 'networkRanges/' + networkRange, validStatus: 204 }, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
    });
};