'use strict';

/**
 * Module dependencies.
 */
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PUBLIC_PATH = 'build';
const PORT = 3000;
const IP = '127.0.0.1';

/**
 * Create web server.
 */
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // static file
    if (req.method === 'GET' && req.url.indexOf(`/${PUBLIC_PATH}/`) === 0) {
        const pathname = url.parse(req.url).pathname;
        const filepath = path.join(__dirname, pathname);

        fs.lstat(filepath, (err, stats) => {
            if (err) {
                res.writeHead(404);
                return res.end('Not Found');
            }

            if (stats.isFile()) {
                fs.readFile(filepath, 'utf8', (err, file) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end('Internal Server Error');
                    }

                    res.writeHead(200);
                    res.end(file);
                });

            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        });

    // default html
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Example</title>
                </head>
                <body>
                    <h1>Hello world!</h1>
                    <script src='/${PUBLIC_PATH}/bundle.js'></script>
                </body>
            </html>
        `);
    }
});

/**
 * Listen to web server.
 */
server.listen(PORT, IP, () => {
    console.log(`http://${IP}:${PORT}`);
});
