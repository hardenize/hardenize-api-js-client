module.exports = function getEvent(id){
    switch (typeof id) {
        case 'string': break;
        case 'number': break;
        default: throw 'Invalid ID';
    }
    return this.apiCall({ path: 'events/' + encodeURIComponent(id), validStatus: 200 })
        .then(function(res){
            // Deserialise "data"
            try {
                res.data.event.data = JSON.parse(res.data.event.data);
            } catch(err){/* If not JSON, just return the original data */}
            return res;
        });
};