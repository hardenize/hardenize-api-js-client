# Development

If you are not a core developer of this library (you almost certainly aren't, unless you work for Hardenize Limited),
you probably don't need to look at any of the options here as they are not relevant to you.

## Changing the API URL

To point the API at your local dev environment you need to change four things:

1. Change the hostname from api.hardenize.com to local.hardenizer.com
2. Change the port from 443 to 8443
3. Disable TLS validation (due to a self signed cert)
4. Change the path format from /org/$org/v1/endPoint to /org/$org/api/v1/endPoint

To do this:

```js
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const api = new HardenizeApi({
    url:  'https://local.hardenizer.com:8443/org/{org}/api/',
    ...
});
```

## Wrapping API calls

You may wish to wrap API calls to make changes to them before they are sent. You can do this
globally, or on a per HardenizeApi object basis. Examples:

```js
HardenizeApi.wrapApiCall((url, fetchOptions, data, next) => {
    // Look at and/or make modifications to fetch options and data here
    return next(url, fetchOptions, data)
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
api.wrapApiCall((url, fetchOptions, data, next) => {
    // Look at and/or make modifications to fetch options and data here
    return next(url, fetchOptions, data)
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