module.exports = function cancelInvite(id){
    return this.apiCall({ url: 'users/' + encodeURIComponent(id) + ';cancelInvite', validStatus: 204 }, {
        method:  'post',
        headers: { 'Content-Type': 'application/json' },
        body:    '{}',
    });
};
