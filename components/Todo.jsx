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

    _handleChange: function(event) {
        this.setState({
            todoValue: event.target.value
        });
    },

    _handleSubmit: function(event) {
        event.preventDefault();
        this.refs.todoInput.focus();

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

                <form onSubmit={this._handleSubmit}>
                    <input type='text'
                        value={this.state.todoValue}
                        onChange={this._handleChange}
                        name='todo'
                        ref='todoInput'
                        autoFocus
                    />

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
                    <input type='submit' value='Add Todo' />
                </form>

                <ul>
                    {this.state.todos.map((todo, index) => {
                        return <li key={index}>{todo}</li>;
                    })}
                </ul>
            </div>
        );
    }
});
