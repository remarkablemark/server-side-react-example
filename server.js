'use strict';

/**
 * Module dependencies.
 */
const http = require('http');

/**
 * Server.
 */
const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<h1>Hello world!</h1>');
});

const PORT = 3000;
const IP = '127.0.0.1';

server.listen(PORT, IP, () => {
    console.log(`http://${IP}:${PORT}`);
});
