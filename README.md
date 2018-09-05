# Hardenize API

This is an isomorphic javascript client library for accessing the [Hardenize Org API](https://www.hardenize.com/docs/api/v0/)

## Install

```shell
$ npm i @hardenize/api
```

Or:

```shell
$ git clone https://github.com/hardenize/hardenize-api
```

If you are targetting the browser and do not have a build pipeline using something like webpack or browserify,
you can grab a copy of `static.js` from the root of the git repository, place it on your website somewhere
and then include it using a script tag. This will expose `window.HardenizeApi`

If you are targetting old web browsers, ensure that `fetch` and `Promise` are polyfilled as this lib expects
them to exist.

### Setup

```js
import HardenizeApi from '@hardenize/api';

const api = new HardenizeApi({
    user: 'your_api_username',
    pass: 'your_api_password',
    org:  'your_org_label',
});
```

Once you have an api object, you can call a number of methods on it. Each one of them will return a `Promise`.

Successful API calls are resolved with an object containing `data` and `res`, where data is the API response body, and `res` is the HTTP Response object. `res` exists, so that you can do things like checking the HTTP response status code.

Failed API calls are rejected with an `Error` object containing the error message. It *MAY* also include a `res` HTTP Response object also if the call got as far as making a HTTP request and receiving a HTTP response.

A basic example:

```js
(async () => {
    try {
        const { data, res } = await api.getCerts();
        console.log(data.certs);
    } catch(err) {
        if (err.res) console.warn(`API Response Status: ${err.res.status} ${err.res.statusText}`);
        console.warn(err.message)
    }
})();
```

The above example uses `async`, `await` and appropriate error handling. The remainder of the examples
in this documentation will drop suitable error handling and ignore the `async` wrapper, for brevity.

### Methods

#### version()

Returns the api version string. Can also be called as a class function. E.g:

```js
import HardenizeApi from '@hardenize/api';

const api = new HardenizeApi({ config });

HardenizeApi.version() === api.version();
```

#### config(name, value)

Allows you to view or change configuration on an existing API object. Examples:

```js
api.config();                           // View all config
api.config('user');                     // View just config.user
api.config('user', 'foo');              // Change user to foo
api.config('user', null);               // Delete user from config
api.config({ pass: 'foo', org: null }); // Change pass to foo and delete org
```

#### getCerts(options)

See https://www.hardenize.com/docs/api/v0/#list-certificates

Example. Fetch all active certificates that have not yet expired, but will expire within the next 30 days.

```js
const { data: { certs } } = await api.getCerts({ active: true, expired: false, expireInDays: 30 });
```

#### getCert(sha256)

See https://www.hardenize.com/docs/api/v0/#retrieve-a-certificate

Example. Fetch a certificate with a particular SHA256.

```js
const { data: { cert } } = await api.getCert('3c8031d6af1dc0a557381318692f0d4ecb74508e2116d489fec9dcc16a0f1552');
```

#### addCert(pem)

See https://www.hardenize.com/docs/api/v0/#create-a-certificate

Example. Add a certificate with a particular PEM

```js
const { res } = await api.addCert('some pem content');
switch (res.status) {
    case 201: console.log('Certificate added'); break;
    case 204: console.log('Certificate already existed'); break;
    default: // Should not get as far as this
}
```

#### addDnsZone(root, zoneBody, options)

See https://www.hardenize.com/docs/api/v0/#update-dns-zone

Example. Add a dns zone for "example.com", setting the status of all found hosts to `idle`:

```js
const zoneBody = `$ORIGIN example.com.
$TTL 1h
@      IN  SOA   ns.example.com. admin.example.com. ( 2018081601 1d 2h 4w 1h )
@      IN  NS    ns
@      IN  MX    10 mx.example.com.
@      IN  A     192.0.2.1
       IN  AAAA  2001:db8:10::1
ns     IN  A     192.0.2.2
       IN  AAAA  2001:db8:10::2
www    IN  CNAME example.com.
mx     IN  A     192.0.2.3`;

const { res } = await api.addDnsZone('example.com', zoneBody, { status: 'idle' });
switch (res.status) {
    case 201: console.log('Zone added'); break;
    default: // Should not get as far as this
}
```

### Development

If you are a core developer of this library (you almost certainly aren't, unless you work for
Hardenize Limited), you should check out [./DEVELOPMENT.md](DEVELOPMENT.md)
