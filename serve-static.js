'use strict';

/**
 * Module dependencies.
 */
const url = require('url');
const fs = require('fs');
const path = require('path');

/**
 * Get the MIME type from the filename.
 *
 * @param  {String} filename - The filename.
 * @return {String}          - The MIME type.
 */
function getMIMEType(filename) {
    const extension = path.extname(filename).substring(1);
    switch(filename) {
        case 'js':
            return 'text/javascript';
        default:
            return `text/${extension}`;
    }
}

/**
 * Serve static files.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
module.exports = function serveStatic(req, res) {
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

                res.writeHead(200, {
                    'Content-Type': getMIMEType(pathname)
                });
                res.end(file);
            });

        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    });
};
