'use strict';

/**
 * Module dependencies.
 */
const React = require('react');
const Todo = require('./Todo');

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
                    <Todo todos={this.props.todos} />

                    <script dangerouslySetInnerHTML={{ __html: propsString }} />
                    <script src={`/${this.props.publicPath}/js/bundle.js`} />
                </body>
            </html>
        );
    }
});
