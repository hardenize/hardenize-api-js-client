module.exports = function deleteSubOrg(id){
    return this.apiCall({ path: 'suborgs/' + encodeURIComponent(id), validStatus: 204 }, {
        method: 'delete',
    });
};
