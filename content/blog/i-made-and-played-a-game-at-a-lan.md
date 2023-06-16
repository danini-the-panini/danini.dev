---
title: I Made and Played a Game at a LAN
publishedAt: 2016-04-20
tags: ["gamedev", "websockets", "node", "javascript"]
---
# I Made and Played a Game at a LAN

Achievement unlocked! Check out my quick-and-dirty WebSocket/WebGL game [here](https://github.com/danini-the-panini/websocket-game).

## The Achievement(s)

This weekend, I achieved a number of goals I have had for myself as a developer.

First and foremost, I wrote a real-time network-enabled multiplayer game. This is something I've always wanted to do. Earlier multiplayer games I wrote were keyboard-sharing and/or hotseat games. My first network-enabled game was a turn-based TCP battleships game I wrote for a second year university project. Later, I made an attempt at a real-time networked game (using TCP and then UDP), which was an [abysmal failure](https://github.com/danini-the-panini/NetGame). This weekend I decided to use [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and it turned out great.

Second of all, I built an actual playable game with [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) and [THREE.js](threejs.org). I've played around a lot with THREE.js in the past, but I had never actually built a playable game before. Most other Graphics Programming I do is the hard-core way, with C or Java. OpenGL is hard, but THREE.js makes it easy and and accessible.

Thirdly, and this is the kicker, I made and played the game at a LAN, with everyone at the LAN. This is an achievement both in the fact that I managed to put together a multiplayer game in between jamming Call of Duty and Supreme Commander, and also in sharing it with the rest of the guys and keeping them entertained by it for at least a few minutes.

## How

Whenever I want to try something or play around with a technology, I start with a box in the middle of the screen and then make it move around. This is probably because the ["Getting Started" example](http://threejs.org/docs/#Manual/Introduction/Creating_a_scene) for THREE.js is a spinning box, and moving the box around on a 2D plane is pretty straightforward from there.

Once I had a box moving around, it was time to make it network-enabled. In the spirit of getting things up and running quickly, I threw together a [Node.js](https://nodejs.org) server with [express](http://expressjs.com/) and [express-ws](https://github.com/HenningM/express-ws), and then started sending messages from the browser using the built-in WebSocket class.

### Server

```javascript
const express = require('express');
const app = express();

app.use(express.static('public')); // serve the game's assets
const expressWs = require('express-ws')(app);

const clients = [];

app.ws('/game', (ws, req) => {
    // player connected
    clients.push({ ws: ws });
    ws.on('message', (msg) => {
        // got a message from player
    });
    ws.on('close', () => {
        // player disconnected
    });
});
```

### Client

```javascript
var ws = new WebSocket('ws://' + window.location.host + '/game');
ws.onopen = function(evt) {
    // connected to server
};
ws.onmessage = function(evt) {
    const msg = evt.data;
    // got a message from the server
};
ws.onclose = function(evt) {
    // disconnected from server
}
```

And it was as simple as that, when a player joins, I send a connect message:

```javascript
// client
ws.send('c,' + name);
```

And then the server gets it, parses it, and relays it to all the other clients.

```javascript
// server
const msgParts = msg.split(',');
if (msgParts[0] === 'c') {
    const newClientName = msgParts[1];
    clients.forEach((client) => {
        client.ws.send('c,' + newClientName);
    });
}
```

And so on an so forth with all kinds of messages. The first thing I started sending after the clients could connect to the server and get to know each other was to get them to tell each other where they are on the playing field:

```javascript
// client
ws.send('p,' + position.x + ',' + position.y + ',' + rotation.z);
```

Since the game is played logically on a 2D plane, all we need is x, y, and rotation. The server then diligently broadcasts to all the other clients agian.

From here, I added a message for firing a weapon:

```javascript
// client
ws.send('f,' + bullet.position.x + ',' + bullet.position.y + ',' + bullet.rotation.z);
```

As well as player death:

```javascript
// client
ws.send('k,' + victim.name);
```

Adding more messages becomes as simple as sending, recieving, and handling accordingly. WebSockets make it as simple as sending JS events across the network and handling them like you would any other event, because they *are* just JS events.

Of course it starts getting complicated when you want to improve things by handling low network latency (lag), and prevent hackers and cheaters from ruining the game for everyone. These challenges are difficult to solve even for the most experienced game developers. But when you're playing over a wired connection with a group of close friends, these things aren't as important.

## Conclusion

WebSockets turned out to be way simpler and much more effective than I had anticipated. It took me a few minutes to get a server and clients talking to each other, with hardly any boilerplate! And one I had messages flying between them, the lag wasn't *that* bad either, considering I had done zero optimisation in that regard.

To make things even simpler, THREE.js makes 3D graphics an absolute breeze. Objects are objects, and moving them around requires literally just changing their position and rotation vectors. All the complex maths is handled for you, and you can focus on getting your game working.

All in all, making 3D network-enabled games that are accessible to anyone with a modern browser is, in my opinion, dead-easy. All you need is an idea and some JavaScript know-how.
