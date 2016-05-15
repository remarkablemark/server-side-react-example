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
                    <meta charSet='utf-8' />
                    <title>Server-Side React Example</title>
                    <link rel='stylesheet'
                          href={`/${this.props.publicPath}/css/style.css`}
                    />
                </head>
                <body>
                    <h1>Server-Side React Example</h1>
                    <script dangerouslySetInnerHTML={{ __html: propsString }} />
                    <script src={`/${this.props.publicPath}/js/bundle.js`} />
                </body>
            </html>
        );
    }
});
