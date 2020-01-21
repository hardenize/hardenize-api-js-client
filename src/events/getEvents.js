module.exports = function getEvents(options){
    return this.apiCall({ url: 'events/', validStatus: 200 }, {}, options);
};