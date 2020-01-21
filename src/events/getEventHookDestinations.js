module.exports = function getEventHookDestinations(){
    return this.apiCall({ url: 'eventDestinations/', validStatus: 200 });
};