module.exports = function getEventTypes(){
    return this.apiCall({ url: 'eventTypes/', validStatus: 200 }, {});
};