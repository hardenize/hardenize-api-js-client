module.exports = function getEvents(options){
    return this.apiCall({ path: 'events/', validStatus: 200 }, {}, options)
        .then(function(res){
            // Deserialise "data"
            res.data.events.forEach(function(event){
                try {
                    event.data = JSON.parse(event.data);
                } catch(err){/* If not JSON, just return the original data */}
            });
            return res;
        });
};