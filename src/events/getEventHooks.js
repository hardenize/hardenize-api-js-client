module.exports = function getEventHooks(){
    return this.apiCall({ path: 'eventHooks/', validStatus: 200 });
};