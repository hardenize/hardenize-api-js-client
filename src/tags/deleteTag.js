module.exports = function delTag(name, options){

    name = name.trim();

    return this.apiCall({ path: 'tag/' + encodeURIComponent(name), validStatus: 204 }, {
        method: 'delete',
    }, options);
};
