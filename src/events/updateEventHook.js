module.exports = function updateEventHook(id, options){
    return this.apiCall({ url: 'eventHooks/' + encodeURIComponent(id), validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};