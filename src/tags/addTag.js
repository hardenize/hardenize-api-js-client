module.exports = function addTag(name){

    name = name.trim();

    return this.apiCall({ path: 'tags/', validStatus: 201 }, {
        method:  'put',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name }),
    });
};
