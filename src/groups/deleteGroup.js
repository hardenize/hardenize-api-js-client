module.exports = function deleteGroup(id, options){
    return this.apiCall({ path: 'groups/' + encodeURIComponent(id), validStatus: 204 }, {
        method: 'delete',
    }, options);
};
