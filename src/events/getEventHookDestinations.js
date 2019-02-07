module.exports = function getEventHookDestinations(){
    return this.apiCall({ path: 'eventDestinations/', validStatus: 200 });
};