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
    // e.g, http://localhost:3000/pathname
    const pathname = url.parse(req.url).pathname;
    const filepath = path.join(__dirname, pathname);

    // check if filepath is a file
    fs.lstat(filepath, (err, stats) => {

        // not a file
        if (err) {
            res.writeHead(404);
            return res.end('Not Found');
        }

        // is a file
        if (stats.isFile()) {
            fs.readFile(filepath, 'utf8', (err, file) => {
                // error reading the file
                if (err) {
                    res.writeHead(500);
                    return res.end('Internal Server Error');
                }

                // update headers
                res.writeHead(200, {
                    'Content-Type': getMIMEType(pathname)
                });

                // respond with file text
                res.end(file);
            });

        // not a file (already checked above but added for safety)
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    });
};
