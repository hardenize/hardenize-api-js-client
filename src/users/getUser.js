module.exports = function getUser(userId){
    return this.apiCall({ url: 'users/' + encodeURIComponent(userId), validStatus: 200 });
};