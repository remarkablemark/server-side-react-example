'use strict';

/**
 * Module dependencies.
 */
const React = require('react');
const ReactDOM = require('react-dom');

/**
 * Render app on the client-side.
 */
document.addEventListener('DOMContentLoaded', () => {
    // render app component once HTML has been loaded
    // this is to ensure that `window.__PROPS__` has been initialized
    ReactDOM.render(
        React.createElement(
            require('../../components/App'),
            window.__PROPS__
        ),
        document // render into root node
    );
});
