# Development

If you are not a core developer of this library (you almost certainly aren't, unless you work for Hardenize Limited),
you probably don't need to look at any of the options here as they are not relevant to you.

## Changing the API URL

To change the API URL from `https://www.hardenize.com/org/demo/api/v0/something` to
`https://www.example.com:8443/org/demo/api/v0/something`, you would pass an additional `url` parameter to
the constructor:

```js
const api = new HardenizeApi({
    url:  'https://www.example.com:8443',
    ...
});
```

If there is a self signed certificate involved, you will need to disable TLS validation globally inside the
node process by running the following before you do any API calls:

```js
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
```

DO NOT LET THIS CODE FIND IT'S WAY INTO PRODUCTION!!!

## Wrapping API calls

You may wish to wrap API calls to make changes to them before they are sent. You can do this
globally, or on a per HardenizeApi object basis. Examples:

```js
HardenizeApi.wrapApiCall((path, fetchOptions, data, next) => {
    // Look at and/or make modifications to fetch options and data here
    return next(path, fetchOptions, data)
        .then(res => {
            // Look at response
            return res;
        })
        .catch(err => {
            // Look at errors
            return Promise.reject(err);
        });
});
```

Or:

```js
const api = new HardenizeApi(config);
api.wrapApiCall((path, fetchOptions, data, next) => {
    // Look at and/or make modifications to fetch options and data here
    return next(path, fetchOptions, data)
        .then(res => {
            // Look at response
            return res;
        })
        .catch(err => {
            // Look at errors
            return Promise.reject(err);
        });
});
```

Do not forget to "return" the result of next as it is a promise that the calling method needs access to.