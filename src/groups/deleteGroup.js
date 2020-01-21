module.exports = function deleteGroup(id, options){
    return this.apiCall({ url: 'groups/' + encodeURIComponent(id), validStatus: 204 }, {
        method: 'delete',
    }, options);
};
