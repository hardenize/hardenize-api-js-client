module.exports = function deleteTag(name, options){
    return this.apiCall({ path: 'tags/' + encodeURIComponent(name), validStatus: 204 }, {
        method: 'delete',
    }, options);
};
