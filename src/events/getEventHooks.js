module.exports = function getEventHooks(){
    return this.apiCall({ url: 'eventHooks/', validStatus: 200 });
};