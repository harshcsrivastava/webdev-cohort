# WebSockets Refresher Guide

## What are WebSockets?

WebSockets provide a full-duplex communication channel over a single, long-lived connection between a client (usually a browser) and a server. Unlike HTTP, which is request-response based, WebSockets allow real-time, two-way interaction.

## Why Use WebSockets?

- Real-time chat applications
- Live notifications
- Online gaming
- Collaborative editing (e.g., Google Docs)
- Live dashboards/streaming data

## How WebSockets Work

1. **Handshake:** Starts as an HTTP request, then upgrades to a WebSocket connection.
2. **Full-Duplex:** Both client and server can send messages independently at any time.
3. **Persistent:** The connection stays open until closed by either side.

## Basic WebSocket Flow

```
Client <--- WebSocket Handshake (HTTP Upgrade) ---> Server
Client <=== Real-time Messages ===> Server
```

## Example with Socket.IO (Node.js)

### Server (Node.js)

```js
import { Server } from "socket.io";
const io = new Server(httpServer);
io.on("connection", (socket) => {
    socket.on("event", (data) => {
        // handle event
    });
    socket.emit("event", data);
});
```

### Client (Browser)

```js
const socket = io();
socket.on("event", (data) => {
    // handle event
});
socket.emit("event", data);
```

## Common Events in Chat Apps

- `connection`: When a client connects
- `disconnect`: When a client disconnects
- `message`: Sending/receiving chat messages
- `typing`: Indicate when a user is typing

### CODE LOGIC

Create a boilerplate like this and add SDN in `index.html`
Check network tab for io

```js
import http from "node:http";
import { Server } from "socket.io";
import express from "express";
import path from "node:path";

async function main() {
    const app = express();
    app.use(express.static(path.resolve("./public")));

    const server = http.createServer(app);
    const io = new Server();

    io.attach(server);

    server.listen(9000, () => {
        console.log(`Http server is running on http://localhost:9000`);
    });
}

main();
```

For client side: https://socket.io/docs/v4/client-installation/
Add custom url in const socket = io()

## Key Concepts

- **Broadcast:** Send a message to all clients except the sender
- **Emit:** Send a message to a specific client or all clients
- **Rooms:** Logical channels for grouping sockets (e.g., chat rooms)

## Debugging Tips

- Open browser dev tools → Console/Network → WS tab
- Use `console.log` on both client and server
- Check for CORS issues if connecting across domains

## Useful Links

- [MDN WebSockets Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Socket.IO Docs](https://socket.io/docs/)
- [WebSocket RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)

---

This guide is a quick refresher for working with WebSockets and Socket.IO. For deeper dives, check the links above.
