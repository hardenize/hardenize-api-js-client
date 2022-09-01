module.exports = function getUsers(options){
    return this.apiCall({ url: 'users/', validStatus: 200 }, {}, options);
};