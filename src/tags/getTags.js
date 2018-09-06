module.exports = function getTags(){
    return this.apiCall({ path: 'tags/', validStatus: 200 });
};