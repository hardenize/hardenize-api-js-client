# Hardenize API

This is an isomorphic javascript client library for accessing the [Hardenize Org API](https://www.hardenize.com/docs/api/v1/)

Although it is isomorphic, you will almost always only want to use it from inside NodeJS. That is because
if you use it from a web browser, you will expose your Hardenize API credentials, which you *MUST* keep
secret.

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

Failed API calls are rejected with an `Error` object containing the error message. It *MAY* also include a `res` HTTP Response object also if the call got as far as making a HTTP request and receiving a HTTP response.

Successful API calls are resolved with an object containing both a `fetchResults` function and a `pages` number. `pages` is the number of pages of results that can be retrieved, and exists due to pagination. When you call `fetchResults` it returns a Promise which resolves to an object containing `data` and `res`, where data is the API response body, and `res` is the HTTP Response object. `res` exists, so that you can do things like checking the HTTP response status code. You can call `fetchResults` with no arguments, to retrieve all results, or with a startPage and endPage number to only fetch a subset of the results. E.g:

```js
(async () => {
    try {
        const response      = await api.someApiCall(...someArgs);
        const { data, res } = await response.fetchResults(1, response.pages);
        const { data, res } = await response.fetchResults(); // Same as the above call
    } catch(err) {
        if (err.res) console.warn(`API Response Status: ${err.res.status} ${err.res.statusText}`);
        console.warn(err.message)
    }
})();
```

The above example uses `async`, `await` and appropriate error handling. The remainder of the examples
in this documentation will drop suitable error handling and ignore the `async` wrapper, for brevity.

Not all of the Hardenize API end-points are async, or paginated, but this simple interface applies to
all of the methods in this javascript library, so you don't have to differentiate.

### Events

For tracing/debugging, it can sometimes be useful to track all API requests sent and responses received. You can add listeners for these events on a HardenizeAPI object. Your callback will be passed a Request or Response object as an argument. Examples:

```js
const api = new HardenizeApi({ ...options });

const onRequest      = req  => console.log("Sending API request",        req);
const onResponse     = res  => console.log("Received API response",      res);
const onResponseBody = body => console.log("Received API response body", body);

api.addEventListener('request',  onRequest);
api.addEventListener('response', onResponse);
api.addEventListener('body',     onResponseBody);

// Or:
api.on('request',  onRequest);
api.on('response', onResponse);
api.on('body',     onResponseBody);
```

To remove the event listeners:

```js
api.removeEventListener('request',  onRequest);
api.removeEventListener('response', onResponse);
api.removeEventListener('body',     onResponseBody);

// Or:
api.off('request',  onRequest);
api.off('response', onResponse);
api.off('body',     onResponseBody);
```

If you want to remove all of the event listeners of a particular type, just don't pass the callback function argument:

```js
api.removeEventListener('request');
api.removeEventListener('response');
api.removeEventListener('body');

// Or:
api.off('request');
api.off('response');
api.off('body');
```

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

See https://www.hardenize.com/docs/api/v1/#list-certificates

Example. Fetch all active certificates that have not yet expired, but will expire within the next 30 days.

```js
const { data: { certs } } = await api.getCerts({ active: true, expired: false, expireInDays: 30 })
    .then(response => response.fetchResults());
```

#### getCert(sha256)

See https://www.hardenize.com/docs/api/v1/#retrieve-certificate

Example. Fetch a certificate with a particular SHA256.

```js
const { data: { cert } } = await api.getCert('3c8031d6af1dc0a557381318692f0d4ecb74508e2116d489fec9dcc16a0f1552')
    .then(response => response.fetchResults());
```

#### createCert(pem)

See https://www.hardenize.com/docs/api/v1/#create-certificate

Example. Create a certificate with a particular PEM

```js
const { res, data: { sha256 } } = await api.createCert('some pem content')
    .then(response => response.fetchResults());
switch (res.status) {
    case 201: console.log('Certificate created',         sha256); break;
    case 202: console.log('Certificate already existed', sha256); break;
    default: // Should not get as far as this
}
```

#### updateCert(pem)

See https://www.hardenize.com/docs/api/v1/#update-certificate

Example. Mute a certificate

```js
const { res, data: { cert } } = await api.updateCert(sha256, { muted: true })
    .then(response => response.fetchResults());
```

#### getAccessControlConfig()

See https://www.hardenize.com/docs/api/v1/#get-access-control-configuration

Example. Fetch access control config.

```js
const { data: config } = await api.getAccessControlConfig()
    .then(response => response.fetchResults());
```

#### updateAccessControlConfig(changes)

See https://www.hardenize.com/docs/api/v1/#update-access-control-configuration

Example. Change the appNetworks config, leaving the apiNetworks config as it is.

```js
const { data: newConfig } = await api.updateAccessControlConfig({
    appNetworks: ["127.0.0.0/8"],
    appNetworksCascade: "enabled",
}).then(response => response.fetchResults());
```

#### getNetworkScanningConfig()

See https://www.hardenize.com/docs/api/v1/#get-network-scanning-configuration

Example. Fetch network scanning configuration

```js
const { data: config } = await api.getNetworkScanningConfig()
    .then(response => response.fetchResults());
```

#### updateNetworkScanningConfig()

See https://www.hardenize.com/docs/api/v1/#update-network-scanning-configuration

Example. Disable dynamic network scanning

```js
const { data: newConfig } = await api.updateNetworkScanningConfig({
    netscanDynamic: false,
}).then(response => response.fetchResults());
```

#### createDnsZone(root, zoneBody)

See https://www.hardenize.com/docs/api/v1/#upload-dns-zone

Example. Create a dns zone for "example.com"

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

await api.createDnsZone('example.com', zoneBody)
    .then(response => response.fetchResults());
```

#### getGroups()

See https://www.hardenize.com/docs/api/v1/#list-groups

Fetch a list of groups.

```js
const { data: { groups } } = await api.getGroups()
    .then(response => response.fetchResults());
```

#### createGroup(id, options)

See https://www.hardenize.com/docs/api/v1/#create-group

Create a new group

```js
await api.createGroup('groupid', { name: 'Group Name' })
    .then(response => response.fetchResults());
```

#### deleteGroup(id, options)

See https://www.hardenize.com/docs/api/v1/#delete-group

Delete a group

```js
await api.deleteGroup('groupid')
    .then(response => response.fetchResults());
```

This will fail if the group is in use. If you want to force removal even if the group is in use,
pass an additional object with `force` set to true:

```js
await api.deleteGroup('groupid', { force: true })
    .then(response => response.fetchResults());
```

#### getHosts(options)

See https://www.hardenize.com/docs/api/v1/#list-hosts

Fetch a list of hosts

```js
const { data: { hosts } } = await api.getHosts()
    .then(response => response.fetchResults());
```

#### getHost(hostname)

See https://www.hardenize.com/docs/api/v1/#retrieve-host

Fetch details about a host

```js
const { data: { host } } = await api.getHost('example.com')
    .then(response => response.fetchResults());
```

#### createHosts(hostnames, options)

See https://www.hardenize.com/docs/api/v1/#create-hosts

Create new hosts

```js
await api.createHosts([ 'example.com', 'example.org' ], {
    status: 'monitored',
    groups: ['Production'],
}).then(response => response.fetchResults());
```

#### updateHosts(hostnames, changes, options)

See https://www.hardenize.com/docs/api/v1/#update-hosts

Update hosts.

Example: Update example.com, example.org and all hosts that are subdomains of those two
hostnames. Set their statuses to 'idle', and add a group named "New" to each of them.

```js
await api.updateHosts([ 'example.com', 'example.org' ], {
    status:  'idle',
    groups:  ['New'],
    groupOp: 'add',
}, {
    subdomains: true,
}).then(response => response.fetchResults());
```

#### deleteHosts(hostnames, options)

See https://www.hardenize.com/docs/api/v1/#delete-hosts

Delete hosts

```js
await api.deleteHosts([ 'example.com', 'example.org' ])
    .then(response => response.fetchResults());
```

#### getHostDiscoveries()

See https://www.hardenize.com/docs/api/v1/#list-host-discoveries

Gets a list of host discoveries.

Example: Fetch keyword related pending discoveries.

```js
const { data: { hostDiscoveries } } = await api.getHostDiscoveries({
    resolution: 'pending',
    matchReason:      'keyword',
}).then(response => response.fetchResults());
```

#### getHostDiscovery(id)

See https://www.hardenize.com/docs/api/v1/#retrieve-host-discovery

Retrieves a host discovery, by ID. Id's can be seen in the results of
calling getHostDiscoveries().

```js
const { data: { hostDiscovery } } = await api.getHostDiscovery(id)
    .then(response => response.fetchResults());
```

#### updateHostDiscovery(id, options)

See https://www.hardenize.com/docs/api/v1/#update-host-discovery

Updates an existing host discovery. Allows setting the triage resolution.

```js
await api.updateHostDiscovery(id, {
    resolution: 'own'
}).then(response => response.fetchResults());
```

#### updateHostDiscoveries(ids, changes, options)

See https://www.hardenize.com/docs/api/v1/#update-host-discoveries

Updates existing host discoveries. Allows setting the triage resolution.
Supply the optional argument {"preview": true}, if you only want to
see what would be changed.

```js
await api.updateHostDiscoveries(ids, {
    resolution: 'own',
}, {
    preview: true,
}).then(response => response.fetchResults());
```

#### deleteHostDiscoveries(ids, options)

See https://www.hardenize.com/docs/api/v1/#delete-host-discoveries

Deletes existing host discoveries. Supply the optional argument
{"preview": true}, if you only want to see what would be deleted.

```js
await api.deleteHostDiscoveries(ids, {
    preview: true,
}).then(response => response.fetchResults());
```

#### createHostDiscoveryKeyword(keyword, options)

See https://www.hardenize.com/docs/api/v1/#create-host-discovery-keyword

Create a new host discovery keyword.

Example: Create a host discovery keyword of "hardenize", excluding matching
hosts if they contain the substring "test".

```js
await api.createHostDiscoveryKeyword('hardenize', {
    keyword:    'hardenize',
    exclusions: [ 'test' ]
}).then(response => response.fetchResults());
```

#### deleteHostDiscoveryKeyword(keyword)

See https://www.hardenize.com/docs/api/v1/#delete-host-discovery-keyword

Delete a host discovery keyword.

```js
await api.deleteHostDiscoveryKeyword('hardenize')
    .then(response => response.fetchResults());
```

#### updateHostDiscoveryKeyword(keyword, options)

See https://www.hardenize.com/docs/api/v1/#update-host-discovery-keyword

Update an existing host discovery keyword.

Example: Enable confusables matching on the "hardenize" keyword.

```js
await api.updateHostDiscoveryKeyword('hardenize', {
    keyword:    'hardenize',
    confusables: true
}).then(response => response.fetchResults());
```

#### getHostDiscoveryKeywords()

See https://www.hardenize.com/docs/api/v1/#list-host-discovery-keywords

Gets the list of host discovery keywords.

```js
const { data: { hostDiscoveryKeywords } } = await api.getHostDiscoveryKeywords()
    .then(response => response.fetchResults());
```

#### getHostDiscoveryKeyword(keyword)

See https://www.hardenize.com/docs/api/v1/#retrieve-host-discovery-keyword

Gets a host discovery keyword.

```js
const { data: { hostDiscoveryKeyword } } = await api.getHostDiscoveryKeyword('hardenize')
    .then(response => response.fetchResults());
```

#### createNetworkRange(networkRange, options)

See https://www.hardenize.com/docs/api/v1/#create-network-range

Create a new network range.

Example: Create a network range of "192.168.100.0/24" and enable scanning

```js
await api.createNetworkRange('192.168.100.0/24', {
    label: 'My Network Range',
    description: 'A bunch of random hosts',
    scan: true,
}).then(response => response.fetchResults());
```

#### deleteNetworkRange(networkRange)

See https://www.hardenize.com/docs/api/v1/#delete-network-range

Delete a network range.

```js
await api.deleteNetworkRange('192.168.100.0/24')
    .then(response => response.fetchResults());
```

#### getNetworkRanges()

See https://www.hardenize.com/docs/api/v1/#list-network-ranges

Gets the list of network ranges.

```js
const { data: { networkRanges } } = await api.getNetworkRanges()
    .then(response => response.fetchResults());
```

#### updateNetworkRange(networkRange, options)

See https://www.hardenize.com/docs/api/v1/#update-network-range

Update a network range.

Example: Disable scanning of "192.168.100.0/24"

```js
await api.updateNetworkRange('192.168.100.0/24', {
    scan: false,
}).then(response => response.fetchResults());
```

#### getReports0(options)

See https://www.hardenize.com/docs/api/v1/#list-report-summaries

Fetch a list of reports.

Example: Fetch a list of reports for `example.com` and it's subdomains. Only
include those with the `production` group.

```js
const { data: { reports } } = await api.getReports0({
    name:       'example.com',
    subdomains: true,
    group:      'production'
}).then(response => response.fetchResults());
```

#### getSubOrgs()

See https://www.hardenize.com/docs/api/v1/#list-organizations

Fetch a list of organizations.

Example:

```js
const { data: { orgs } } = await api.getSubOrgs()
    .then(response => response.fetchResults());
```

#### createSubOrg(id, options)

See https://www.hardenize.com/docs/api/v1/#create-organization

Create a sub organization to your account.

Example: Create an organization with an id of `example`, a display name
of `Example Ltd`. Set its initial status to `dormant`, and generate api credentials for it.

```js
const { data: { org } } = await api.createSubOrg('example', {
    name:                   'Example Ltd',
    status:                 'dormant',
    generateApiCredentials: true,
}).then(response => response.fetchResults());
```

#### updateSubOrg

See https://www.hardenize.com/docs/api/v1/#update-organization

Update an organization in your account.

Example: Update the status of an organization to `active` and regenerate it's API credentials

```js
const { data: { org } } = await api.updateSubOrg('example', {
    status:                 'active',
    generateApiCredentials: true,
}).then(response => response.fetchResults());
```

#### deleteSubOrg

See https://www.hardenize.com/docs/api/v1/#delete-organization

Delete an organization from your account.

Example:

```js
await api.deleteSubOrg('example')
    .then(response => response.fetchResults());
```

#### getEventTypes()

See https://www.hardenize.com/docs/api/v1/#list-event-types

Fetch a list of event types

Example:

```js
await api.getEventTypes()
    .then(response => response.fetchResults());
```

#### updateEventType(name, options)

See https://www.hardenize.com/docs/api/v1/#update-event-type

Update an event type.

Example: Disabling the "example.type" event type:

```js
await api.updateEventType('example.type', { enabled: false })
    .then(response => response.fetchResults());
```

#### getEvents(options)

See https://www.hardenize.com/docs/api/v1/#list-events

Get a list of events.

Example: Fetch a list of events (up to a max of 3), that have occured since a particular date/time, for a particular type only.

```js
await api.getEvents({ type: 'example.type', since: '2018-06-20T12:05:12.123456Z', limit: 3 })
    .then(response => response.fetchResults());
```

#### getEvent(id)

See https://www.hardenize.com/docs/api/v1/#get-event

Example:

```js
await api.getEvent(5)
    .then(response => response.fetchResults());
```

#### createEventHook(options)

See https://www.hardenize.com/docs/api/v1/#create-event-hook

Create an event hook.

Example:

```js
const { data: { eventHook } } = await api.createEventHook({
  hookType:    'webhook',
  eventTypes:  ['ct.entry'],
  destination: 'https://www.example.com/webhooks/receive',
}).then(response => response.fetchResults());
```

#### deleteEventHook(id)

See https://www.hardenize.com/docs/api/v1/#delete-event-hook

Delete an event hook.

Example:

```js
await api.deleteEventHook('24673847d5cb283205568e34f8855ba2')
    .then(response => response.fetchResults());
```

#### getEventHooks()

See https://www.hardenize.com/docs/api/v1/#list-event-hooks

Get a list of your event hooks.

Example:

```js
const { data: { eventHooks } } = await api.getEventHooks()
    .then(response => response.fetchResults());
```

#### getEventHookDestinations()

See https://www.hardenize.com/docs/api/v1/#list-event-destinations

Get a list of your event hook destinations.

Example:

```js
const { data: { eventDestinations } } = await api.getEventHookDestinations()
    .then(response => response.fetchResults());
```

#### testEventHook(id, options)

See https://www.hardenize.com/docs/api/v1/#test-event-hook

Test an event hook.

Example: Test with an invalid signature

```js
const result = await api.testEventHook('24673847d5cb283205568e34f8855ba2', { invalid: 'signature' })
    .then(response => response.fetchResults());
```

#### updateEventHook(id, changes)

See https://www.hardenize.com/docs/api/v1/#update-event-hook

Update an event hook.

Example: Set the status to enabled

```js
const { data: { eventHook } } = await api.updateEventHook('24673847d5cb283205568e34f8855ba2', { status: 'enabled' })
    .then(response => response.fetchResults());
```

#### updateUser(id, options)

See https://www.hardenize.com/docs/api/v1/#update-user

Update user.

Example: Disable MFA for user id 1.

```js
await api.updateUser(1, { deleteMfa: true })
    .then(response => response.fetchResults());
```

#### getHdbCertBySha256(sha256, options)

See https://www.hardenize.com/docs/api/v1/#search-hdb-certs-by-sha256

Example: Fetch a cert, including the unpacked data.

```js
const { data: { cert } } = await api.getHdbCertBySha256(sha256, { unpacked: true })
    .then(response => response.fetchResults());
```

#### getHdbCertsByHostSuffix(hostSuffix, options)

See https://www.hardenize.com/docs/api/v1/#search-hdb-certs-by-host-suffix

Example: Fetch certs containing hardenize.com or a subdomain thereof. Include raw PEM in results.

```js
const { data: { certs } } = await api.getHdbCertsByHostSuffix('hardenize.com', {
    exact:      true,
    subdomains: true,
    pem:        true,
}).then(response => response.fetchResults());
```

#### getHdbCertsByKeyword(keyword, options)

See https://www.hardenize.com/docs/api/v1/#search-hdb-certs-by-keyword

Example: Fetch certs containing the keyword "hardenize".

```js
const { data: { certs } } = await api.getHdbCertsByKeyword('hardenize')
    .then(response => response.fetchResults());
```

#### getHdbCertsByHostSpki(spki, options)

See https://www.hardenize.com/docs/api/v1/#search-hdb-certs-by-spki

Example: Fetch certs with a specific SPKI.

```js
const { data: { certs } } = await api.getHdbCertBySpki(spki)
    .then(response => response.fetchResults());
```

### Development

If you are a core developer of this library (you almost certainly aren't, unless you work for
Hardenize Limited), you should check out [./DEVELOPMENT.md](DEVELOPMENT.md)