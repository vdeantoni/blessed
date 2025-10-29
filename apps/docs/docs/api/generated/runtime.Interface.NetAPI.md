# Interface: NetAPI

Defined in: [packages/core/src/runtime.ts:282](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L282)

## Properties

### createConnection()

> **createConnection**: \{(`options`, `connectionListener?`): `Socket`; (`port`, `host?`, `connectionListener?`): `Socket`; (`path`, `connectionListener?`): `Socket`; \}

Defined in: [packages/core/src/runtime.ts:283](https://github.com/vdeantoni/unblessed/blob/alpha/packages/core/src/runtime.ts#L283)

#### Call Signature

> (`options`, `connectionListener?`): `Socket`

A factory function, which creates a new Socket,
immediately initiates connection with `socket.connect()`,
then returns the `net.Socket` that starts the connection.

When the connection is established, a `'connect'` event will be emitted
on the returned socket. The last parameter `connectListener`, if supplied,
will be added as a listener for the `'connect'` event **once**.

Possible signatures:

- [createConnection](#createconnection)
- [createConnection](#createconnection) for `IPC` connections.
- [createConnection](#createconnection) for TCP connections.

The connect function is an alias to this function.

##### Parameters

###### options

`NetConnectOpts`

###### connectionListener?

() => `void`

##### Returns

`Socket`

#### Call Signature

> (`port`, `host?`, `connectionListener?`): `Socket`

A factory function, which creates a new Socket,
immediately initiates connection with `socket.connect()`,
then returns the `net.Socket` that starts the connection.

When the connection is established, a `'connect'` event will be emitted
on the returned socket. The last parameter `connectListener`, if supplied,
will be added as a listener for the `'connect'` event **once**.

Possible signatures:

- [createConnection](#createconnection)
- [createConnection](#createconnection) for `IPC` connections.
- [createConnection](#createconnection) for TCP connections.

The connect function is an alias to this function.

##### Parameters

###### port

`number`

###### host?

`string`

###### connectionListener?

() => `void`

##### Returns

`Socket`

#### Call Signature

> (`path`, `connectionListener?`): `Socket`

A factory function, which creates a new Socket,
immediately initiates connection with `socket.connect()`,
then returns the `net.Socket` that starts the connection.

When the connection is established, a `'connect'` event will be emitted
on the returned socket. The last parameter `connectListener`, if supplied,
will be added as a listener for the `'connect'` event **once**.

Possible signatures:

- [createConnection](#createconnection)
- [createConnection](#createconnection) for `IPC` connections.
- [createConnection](#createconnection) for TCP connections.

The connect function is an alias to this function.

##### Parameters

###### path

`string`

###### connectionListener?

() => `void`

##### Returns

`Socket`
