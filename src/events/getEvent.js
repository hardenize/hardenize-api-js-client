module.exports = function getEvent(id){
    switch (typeof id) {
        case 'string': break;
        case 'number': break;
        default: throw 'Invalid ID';
    }
    return this.apiCall({ url: 'events/' + encodeURIComponent(id), validStatus: 200 });
};