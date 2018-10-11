module.exports = function deleteEventHook(id){
    return this.apiCall({ path: 'eventHooks/' + encodeURIComponent(id), validStatus: 204 }, { method: 'delete' });
};