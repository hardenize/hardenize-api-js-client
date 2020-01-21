module.exports = function testEventHook(id, options){
    return this.apiCall({ url: 'eventHooks/' + encodeURIComponent(id) + ';test', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    }, options);
};