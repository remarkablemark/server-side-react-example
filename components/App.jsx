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

    getDefaultProps: function() {
        return {
            publicPath: ''
        };
    },

    componentDidMount: function() {
        alert('App component mounted!');
    },

    render: function() {
        const propsString = `window.__PROPS__=${JSON.stringify(this.props)}`;

        return (
            <html>
                <head>
                    <title>Example</title>
                </head>
                <body>
                    <h1>Hello world!</h1>
                    <script dangerouslySetInnerHTML={{ __html: propsString }} />
                    <script src={`/${this.props.publicPath}/js/bundle.js`} />
                </body>
            </html>
        );
    }
});
