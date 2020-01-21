module.exports = function deleteSubOrg(id){
    return this.apiCall({ url: 'suborgs/' + encodeURIComponent(id), validStatus: 204 }, {
        method: 'delete',
    });
};
