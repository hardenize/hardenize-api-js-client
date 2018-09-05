module.exports = function getCerts(options){
    var newOptions = {};

    if (typeof options === 'object' && options !== null) {
        Object.keys(options).forEach(function(name){
            var value = options[name];
            if (name === 'host' || name === 'spkiSha256') value = value.toLowerCase();
            newOptions[name] = value;
        });
    }

    return this.apiCall({ path: 'certs/', validStatus: 200 }, {}, newOptions);
};