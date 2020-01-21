module.exports = function getGroups(){
    return this.apiCall({ url: 'groups/', validStatus: 200 });
};