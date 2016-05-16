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

        const reactVersion = this.props.reactVersion;
        // use the minified version of React in production (warnings are suppressed)
        // use the unminified version of React in development (warnings are displayed)
        const reactBuild = this.props.isProduction ? '.min' : '';

        // scripts (order matters)
        const scripts = [
            `//cdnjs.cloudflare.com/ajax/libs/react/${reactVersion}/react${reactBuild}.js`,
            `//cdnjs.cloudflare.com/ajax/libs/react/${reactVersion}/react-dom${reactBuild}.js`,
            `/${this.props.publicPath}/js/bundle.js`
        ];

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

                    {/* props as json */}
                    <script dangerouslySetInnerHTML={{ __html: propsString }} />

                    {/* scripts */}
                    {scripts.map((src, index) => {
                        return <script src={src} key={index} />;
                    })}
                </body>
            </html>
        );
    }
});
