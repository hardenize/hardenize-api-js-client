module.exports = function getEvents(options){
    return this.apiCall({ path: 'events/', validStatus: 200 }, {}, options);
};