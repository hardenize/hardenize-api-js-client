module.exports = function delTag(name, options){

    name = name.trim();

    return this.apiCall({ path: 'tags/' + encodeURIComponent(name), validStatus: 204 }, {
        method: 'delete',
    }, options);
};
