'use strict';

/**
 * Module dependencies.
 */
const React = require('react');

/**
 * App component.
 */
module.exports = React.createClass({
    displayName: 'App',

    componentDidMount: function() {
        alert('App component mounted!');
    },

    render: function() {
        return (
            <html>
                <head>
                    <title>Example</title>
                </head>
                <body>
                    <h1>Hello world!</h1>
                    <script src='/build/bundle.js' />
                </body>
            </html>
        );
    }
});
