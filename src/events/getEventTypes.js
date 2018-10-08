module.exports = function getEventTypes(){
    return this.apiCall({ path: 'eventTypes/', validStatus: 200 }, {});
};