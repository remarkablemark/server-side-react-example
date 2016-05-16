'use strict';

/**
 * Render app once HTML document has been completed loaded and parsed.
 * This ensures that `window.__PROPS__` has been initialized and can be accessed.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {
    var React = require('react');
    var ReactDOM = require('react-dom');

    ReactDOM.render(
        React.createElement(
            require('../../components/App'),
            window.__PROPS__
        ),
        document // render into root node
    );
});
