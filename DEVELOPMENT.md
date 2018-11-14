# Development

If you are not a core developer of this library (you almost certainly aren't, unless you work for Hardenize Limited),
you probably don't need to look at any of the options here as they are not relevant to you.

## Changing the API URL

To change the API URL from `https://api.hardenize.com/org/demo/v1/something` to
`https://api.example.com:8443/org/demo/v1/something`, you would pass an additional `url` parameter to
the constructor:

```js
const api = new HardenizeApi({
    url:  'https://api.example.com:8443',
    ...
});
```

If there is a self signed certificate involved, you will need to disable TLS validation globally inside the
node process by running the following before you do any API calls:

```js
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
```

DO NOT LET THIS CODE FIND IT'S WAY INTO PRODUCTION!!!

When talking to a local dev environment, the URL path is slightly different because you don't have nginx
in front of it and there are not different URLs for www vs api. In that situation you should set
`legacy_path` to be true and URL paths will be constructed like `/org/demo/api/v1/something` instead of
`/org/demo/v1/something`:

```js
const api = new HardenizeApi({
    legacy_path: true,
    ...
});
```

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