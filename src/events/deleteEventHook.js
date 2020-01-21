module.exports = function deleteEventHook(id){
    return this.apiCall({ url: 'eventHooks/' + encodeURIComponent(id), validStatus: 204 }, { method: 'delete' });
};