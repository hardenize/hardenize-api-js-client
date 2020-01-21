module.exports = function updateEventType(name, changes){
    return this.apiCall({ url: 'eventTypes/' + encodeURIComponent(name), validStatus: 200 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(changes),
    });
};
