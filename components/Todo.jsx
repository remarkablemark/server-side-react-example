'use strict';

/**
 * Module dependencies.
 */
const React = require('react');

/**
 * Todo component.
 */
module.exports = React.createClass({
    displayName: 'Todo',

    getDefaultProps: function() {
        return {
            todos: []
        };
    },

    getInitialState: function() {
        return {
            todoValue: '',
            todos: this.props.todos
        };
    },

    /**
     * Update the input value when the user types.
     * https://facebook.github.io/react/docs/forms.html#controlled-components
     *
     * @param {SyntheticEvent} event - The event.
     */
    _handleChange: function(event) {
        this.setState({
            todoValue: event.target.value
        });
    },

    /**
     * Add the todo when the input is submitted.
     *
     * @param {SyntheticEvent} event - The event.
     */
    _handleSubmit: function(event) {
        event.preventDefault();
        this.refs.todoInput.focus();

        // add todo only if it's not empty
        if (this.state.todoValue) {
            this.setState({
                todos: this.state.todos.concat(
                    [this.state.todoValue]
                ),
                todoValue: ''
            });
        }
    },

    render: function() {
        return (
            <div>
                <h3>Todo List</h3>

                {/* form */}
                <form onSubmit={this._handleSubmit}>

                    {/* primary input */}
                    <input type='text'
                        value={this.state.todoValue}
                        onChange={this._handleChange}
                        name='todo'
                        ref='todoInput'
                        autoFocus
                    />

                    {/* hidden todos passed from the server-side */}
                    {this.props.todos.map((todo, index) => {
                        return (
                            <input type='hidden'
                                   name='todo'
                                   value={todo}
                                   key={index}
                            />
                        );
                    })}

                    &nbsp;
                    {/* submit button */}
                    <input type='submit' value='Add Todo' />

                </form>

                {/* list of todos */}
                <ul>
                    {this.state.todos.map((todo, index) => {
                        return <li key={index}>{todo}</li>;
                    })}
                </ul>
            </div>
        );
    }
});
