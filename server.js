'use strict';

/**
 * Use Babel require hook to transpile JSX on server-side.
 * https://babeljs.io/docs/usage/require/
 */
require('babel-register')({
    presets: ['react']
});

/**
 * Module dependencies.
 */
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

/**
 * Constants.
 */
const PUBLIC_PATH = 'build';
const PORT = 3000;
const IP = '127.0.0.1';

/**
 * Handle static files.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
function handleStatic(req, res) {
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
}

/**
 * Create web server.
 */
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // static file
    if (req.method === 'GET' && req.url.indexOf(`/${PUBLIC_PATH}/`) === 0) {
        handleStatic(req, res);

    // default html
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = ReactDOMServer.renderToString(
            React.createElement(require('./components/App.jsx'))
        );
        res.end(`<!DOCTYPE html>${html}`);
    }
});

/**
 * Listen to web server.
 */
server.listen(PORT, IP, () => {
    console.log(`http://${IP}:${PORT}`);
});
