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
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const serveStatic = require('./serve-static');

/**
 * Constants.
 */
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
        serveStatic(req, res);

    // default html
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const props = {
            publicPath: PUBLIC_PATH
        };
        const html = ReactDOMServer.renderToString(
            React.createElement(
                require('./components/App.jsx'),
                props
            )
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
