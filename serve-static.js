'use strict';

/**
 * Module dependencies.
 */
const url = require('url');
const fs = require('fs');
const path = require('path');

/**
 * Serve static files.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
module.exports = function serveStatic(req, res) {
    const pathname = url.parse(req.url).pathname;
    const filepath = path.join(__dirname, pathname);
    const extension = path.extname(pathname);

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
};
