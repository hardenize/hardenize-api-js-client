module.exports = function getGroups(){
    return this.apiCall({ path: 'groups/', validStatus: 200 });
};