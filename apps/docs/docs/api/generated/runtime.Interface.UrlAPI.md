# Interface: UrlAPI

Defined in: [packages/core/src/runtime.ts:273](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L273)

URL operations interface
Subset of Node.js url module

## Properties

### parse()

> **parse**: \{(`urlString`): `UrlWithStringQuery`; (`urlString`, `parseQueryString`, `slashesDenoteHost?`): `UrlWithStringQuery`; (`urlString`, `parseQueryString`, `slashesDenoteHost?`): `UrlWithParsedQuery`; (`urlString`, `parseQueryString`, `slashesDenoteHost?`): `Url`; \}

Defined in: [packages/core/src/runtime.ts:274](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L274)

#### Call Signature

> (`urlString`): `UrlWithStringQuery`

The `url.parse()` method takes a URL string, parses it, and returns a URL
object.

A `TypeError` is thrown if `urlString` is not a string.

A `URIError` is thrown if the `auth` property is present but cannot be decoded.

`url.parse()` uses a lenient, non-standard algorithm for parsing URL
strings. It is prone to security issues such as [host name spoofing](https://hackerone.com/reports/678487) and incorrect handling of usernames and passwords. Do not use with untrusted
input. CVEs are not issued for `url.parse()` vulnerabilities. Use the `WHATWG URL` API instead.

##### Parameters

###### urlString

`string`

The URL string to parse.

##### Returns

`UrlWithStringQuery`

##### Since

v0.1.25

##### Deprecated

Use the WHATWG URL API instead.

#### Call Signature

> (`urlString`, `parseQueryString`, `slashesDenoteHost?`): `UrlWithStringQuery`

The `url.parse()` method takes a URL string, parses it, and returns a URL
object.

A `TypeError` is thrown if `urlString` is not a string.

A `URIError` is thrown if the `auth` property is present but cannot be decoded.

`url.parse()` uses a lenient, non-standard algorithm for parsing URL
strings. It is prone to security issues such as [host name spoofing](https://hackerone.com/reports/678487) and incorrect handling of usernames and passwords. Do not use with untrusted
input. CVEs are not issued for `url.parse()` vulnerabilities. Use the `WHATWG URL` API instead.

##### Parameters

###### urlString

`string`

The URL string to parse.

###### parseQueryString

If `true`, the `query` property will always be set to an object returned by the querystring module's `parse()` method. If `false`, the `query` property
on the returned URL object will be an unparsed, undecoded string.

`false` | `undefined`

###### slashesDenoteHost?

`boolean`

If `true`, the first token after the literal string `//` and preceding the next `/` will be interpreted as the `host`. For instance, given `//foo/bar`, the
result would be `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`.

##### Returns

`UrlWithStringQuery`

##### Since

v0.1.25

##### Deprecated

Use the WHATWG URL API instead.

#### Call Signature

> (`urlString`, `parseQueryString`, `slashesDenoteHost?`): `UrlWithParsedQuery`

The `url.parse()` method takes a URL string, parses it, and returns a URL
object.

A `TypeError` is thrown if `urlString` is not a string.

A `URIError` is thrown if the `auth` property is present but cannot be decoded.

`url.parse()` uses a lenient, non-standard algorithm for parsing URL
strings. It is prone to security issues such as [host name spoofing](https://hackerone.com/reports/678487) and incorrect handling of usernames and passwords. Do not use with untrusted
input. CVEs are not issued for `url.parse()` vulnerabilities. Use the `WHATWG URL` API instead.

##### Parameters

###### urlString

`string`

The URL string to parse.

###### parseQueryString

`true`

If `true`, the `query` property will always be set to an object returned by the querystring module's `parse()` method. If `false`, the `query` property
on the returned URL object will be an unparsed, undecoded string.

###### slashesDenoteHost?

`boolean`

If `true`, the first token after the literal string `//` and preceding the next `/` will be interpreted as the `host`. For instance, given `//foo/bar`, the
result would be `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`.

##### Returns

`UrlWithParsedQuery`

##### Since

v0.1.25

##### Deprecated

Use the WHATWG URL API instead.

#### Call Signature

> (`urlString`, `parseQueryString`, `slashesDenoteHost?`): `Url`

The `url.parse()` method takes a URL string, parses it, and returns a URL
object.

A `TypeError` is thrown if `urlString` is not a string.

A `URIError` is thrown if the `auth` property is present but cannot be decoded.

`url.parse()` uses a lenient, non-standard algorithm for parsing URL
strings. It is prone to security issues such as [host name spoofing](https://hackerone.com/reports/678487) and incorrect handling of usernames and passwords. Do not use with untrusted
input. CVEs are not issued for `url.parse()` vulnerabilities. Use the `WHATWG URL` API instead.

##### Parameters

###### urlString

`string`

The URL string to parse.

###### parseQueryString

`boolean`

If `true`, the `query` property will always be set to an object returned by the querystring module's `parse()` method. If `false`, the `query` property
on the returned URL object will be an unparsed, undecoded string.

###### slashesDenoteHost?

`boolean`

If `true`, the first token after the literal string `//` and preceding the next `/` will be interpreted as the `host`. For instance, given `//foo/bar`, the
result would be `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`.

##### Returns

`Url`

##### Since

v0.1.25

##### Deprecated

Use the WHATWG URL API instead.

---

### format()

> **format**: \{(`urlObject`, `options?`): `string`; (`urlObject`): `string`; \}

Defined in: [packages/core/src/runtime.ts:275](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L275)

#### Call Signature

> (`urlObject`, `options?`): `string`

The `url.format()` method returns a formatted URL string derived from `urlObject`.

```js
import url from "node:url";
url.format({
  protocol: "https",
  hostname: "example.com",
  pathname: "/some/path",
  query: {
    page: 1,
    format: "json",
  },
});

// => 'https://example.com/some/path?page=1&#x26;format=json'
```

If `urlObject` is not an object or a string, `url.format()` will throw a `TypeError`.

The formatting process operates as follows:

- A new empty string `result` is created.
- If `urlObject.protocol` is a string, it is appended as-is to `result`.
- Otherwise, if `urlObject.protocol` is not `undefined` and is not a string, an `Error` is thrown.
- For all string values of `urlObject.protocol` that _do not end_ with an ASCII
  colon (`:`) character, the literal string `:` will be appended to `result`.
- If either of the following conditions is true, then the literal string `//` will be appended to `result`:
  - `urlObject.slashes` property is true;
  - `urlObject.protocol` begins with `http`, `https`, `ftp`, `gopher`, or `file`;
- If the value of the `urlObject.auth` property is truthy, and either `urlObject.host` or `urlObject.hostname` are not `undefined`, the value of `urlObject.auth` will be coerced into a string
  and appended to `result` followed by the literal string `@`.
- If the `urlObject.host` property is `undefined` then:
  - If the `urlObject.hostname` is a string, it is appended to `result`.
  - Otherwise, if `urlObject.hostname` is not `undefined` and is not a string,
    an `Error` is thrown.
  - If the `urlObject.port` property value is truthy, and `urlObject.hostname` is not `undefined`:
    _ The literal string `:` is appended to `result`, and
    _ The value of `urlObject.port` is coerced to a string and appended to `result`.
- Otherwise, if the `urlObject.host` property value is truthy, the value of `urlObject.host` is coerced to a string and appended to `result`.
- If the `urlObject.pathname` property is a string that is not an empty string:
  - If the `urlObject.pathname` _does not start_ with an ASCII forward slash
    (`/`), then the literal string `'/'` is appended to `result`.
  - The value of `urlObject.pathname` is appended to `result`.
- Otherwise, if `urlObject.pathname` is not `undefined` and is not a string, an `Error` is thrown.
- If the `urlObject.search` property is `undefined` and if the `urlObject.query`property is an `Object`, the literal string `?` is appended to `result` followed by the output of calling the
  `querystring` module's `stringify()` method passing the value of `urlObject.query`.
- Otherwise, if `urlObject.search` is a string:
  - If the value of `urlObject.search` _does not start_ with the ASCII question
    mark (`?`) character, the literal string `?` is appended to `result`.
  - The value of `urlObject.search` is appended to `result`.
- Otherwise, if `urlObject.search` is not `undefined` and is not a string, an `Error` is thrown.
- If the `urlObject.hash` property is a string:
  - If the value of `urlObject.hash` _does not start_ with the ASCII hash (`#`)
    character, the literal string `#` is appended to `result`.
  - The value of `urlObject.hash` is appended to `result`.
- Otherwise, if the `urlObject.hash` property is not `undefined` and is not a
  string, an `Error` is thrown.
- `result` is returned.

##### Parameters

###### urlObject

`URL`

A URL object (as returned by `url.parse()` or constructed otherwise). If a string, it is converted to an object by passing it to `url.parse()`.

###### options?

`URLFormatOptions`

##### Returns

`string`

##### Since

v0.1.25

##### Legacy

Use the WHATWG URL API instead.

#### Call Signature

> (`urlObject`): `string`

The `url.format()` method returns a formatted URL string derived from `urlObject`.

```js
import url from "node:url";
url.format({
  protocol: "https",
  hostname: "example.com",
  pathname: "/some/path",
  query: {
    page: 1,
    format: "json",
  },
});

// => 'https://example.com/some/path?page=1&#x26;format=json'
```

If `urlObject` is not an object or a string, `url.format()` will throw a `TypeError`.

The formatting process operates as follows:

- A new empty string `result` is created.
- If `urlObject.protocol` is a string, it is appended as-is to `result`.
- Otherwise, if `urlObject.protocol` is not `undefined` and is not a string, an `Error` is thrown.
- For all string values of `urlObject.protocol` that _do not end_ with an ASCII
  colon (`:`) character, the literal string `:` will be appended to `result`.
- If either of the following conditions is true, then the literal string `//` will be appended to `result`:
  - `urlObject.slashes` property is true;
  - `urlObject.protocol` begins with `http`, `https`, `ftp`, `gopher`, or `file`;
- If the value of the `urlObject.auth` property is truthy, and either `urlObject.host` or `urlObject.hostname` are not `undefined`, the value of `urlObject.auth` will be coerced into a string
  and appended to `result` followed by the literal string `@`.
- If the `urlObject.host` property is `undefined` then:
  - If the `urlObject.hostname` is a string, it is appended to `result`.
  - Otherwise, if `urlObject.hostname` is not `undefined` and is not a string,
    an `Error` is thrown.
  - If the `urlObject.port` property value is truthy, and `urlObject.hostname` is not `undefined`:
    _ The literal string `:` is appended to `result`, and
    _ The value of `urlObject.port` is coerced to a string and appended to `result`.
- Otherwise, if the `urlObject.host` property value is truthy, the value of `urlObject.host` is coerced to a string and appended to `result`.
- If the `urlObject.pathname` property is a string that is not an empty string:
  - If the `urlObject.pathname` _does not start_ with an ASCII forward slash
    (`/`), then the literal string `'/'` is appended to `result`.
  - The value of `urlObject.pathname` is appended to `result`.
- Otherwise, if `urlObject.pathname` is not `undefined` and is not a string, an `Error` is thrown.
- If the `urlObject.search` property is `undefined` and if the `urlObject.query`property is an `Object`, the literal string `?` is appended to `result` followed by the output of calling the
  `querystring` module's `stringify()` method passing the value of `urlObject.query`.
- Otherwise, if `urlObject.search` is a string:
  - If the value of `urlObject.search` _does not start_ with the ASCII question
    mark (`?`) character, the literal string `?` is appended to `result`.
  - The value of `urlObject.search` is appended to `result`.
- Otherwise, if `urlObject.search` is not `undefined` and is not a string, an `Error` is thrown.
- If the `urlObject.hash` property is a string:
  - If the value of `urlObject.hash` _does not start_ with the ASCII hash (`#`)
    character, the literal string `#` is appended to `result`.
  - The value of `urlObject.hash` is appended to `result`.
- Otherwise, if the `urlObject.hash` property is not `undefined` and is not a
  string, an `Error` is thrown.
- `result` is returned.

##### Parameters

###### urlObject

A URL object (as returned by `url.parse()` or constructed otherwise). If a string, it is converted to an object by passing it to `url.parse()`.

`string` | `UrlObject`

##### Returns

`string`

##### Since

v0.1.25

##### Legacy

Use the WHATWG URL API instead.

---

### fileURLToPath()

> **fileURLToPath**: (`url`, `options?`) => `string`

Defined in: [packages/core/src/runtime.ts:276](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L276)

This function ensures the correct decodings of percent-encoded characters as
well as ensuring a cross-platform valid absolute path string.

```js
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

new URL("file:///C:/path/").pathname; // Incorrect: /C:/path/
fileURLToPath("file:///C:/path/"); // Correct:   C:\path\ (Windows)

new URL("file://nas/foo.txt").pathname; // Incorrect: /foo.txt
fileURLToPath("file://nas/foo.txt"); // Correct:   \\nas\foo.txt (Windows)

new URL("file:///你好.txt").pathname; // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
fileURLToPath("file:///你好.txt"); // Correct:   /你好.txt (POSIX)

new URL("file:///hello world").pathname; // Incorrect: /hello%20world
fileURLToPath("file:///hello world"); // Correct:   /hello world (POSIX)
```

#### Parameters

##### url

The file URL string or URL object to convert to a path.

`string` | `URL`

##### options?

`FileUrlToPathOptions`

#### Returns

`string`

The fully-resolved platform-specific Node.js file path.

#### Since

v10.12.0
