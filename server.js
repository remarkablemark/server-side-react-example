'use strict';

/**
 * Use Babel require hook to transpile JSX on server-side.
 *
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
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const serveStatic = require('./serve-static');

/**
 * Constants.
 */
const PUBLIC_PATH = 'build';
const PORT = 3000;
const IP = '127.0.0.1';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Create web server.
 */
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // handle static files
    if (req.method === 'GET' && req.url.indexOf(`/${PUBLIC_PATH}/`) === 0) {
        serveStatic(req, res);

    // otherwise response with default html
    } else {
        let props = {
            publicPath: PUBLIC_PATH,
            isProduction: IS_PRODUCTION
        };

        // extract data from querystring and add to props (if applicable)
        const query = url.parse(req.url, true).query;
        if (query.todo) {
            props.todos = query.todo.constructor === Array ?
                          query.todo : [query.todo]
        }

        // render app component with props
        const html = ReactDOMServer.renderToString(
            React.createElement(
                require('./components/App'),
                props
            )
        );

        // respond with html
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>${html}`);
    }
});

/**
 * Listen to web server.
 */
server.listen(PORT, IP, () => {
    console.log(`http://${IP}:${PORT}`);
});
