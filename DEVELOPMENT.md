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

## Dev mode

If you enable "dev mode" when constructing an API object, you will have access to additional methods
that are not useful to anybody unless they are working on a dev hardenize instance. 'delCert' is one
of the methods in question. Example:

```js
const api = new HardenizeApi({
    devMode: true,
});
const { data, res } = await api.delCert(sha256);
```