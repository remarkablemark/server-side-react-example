'use strict';

/**
 * Module dependencies.
 */
const React = require('react');
const ReactDOM = require('react-dom');

/**
 * Render app on the client-side.
 */
ReactDOM.render(
    React.createElement(
        require('../../components/App.jsx'),
        window.__PROPS__
    ),
    document
);