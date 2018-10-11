module.exports = function createEventHook(options){
    return this.apiCall({ path: 'eventHooks/', validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(options),
    });
};