
'use strict';
import React from 'react';
import TodoItem from './TodoItem.js'

class TodoShow extends React.Component {

    render() {
        if(this.props.todos.length == 0) {
            return (
                <div className="todo-empty">No todos right now</div>
            )
        } else {
            return (
                <ul className="todo-show">
                    {
                        this.props.todos.map((todo, index) => {
                            return <TodoItem text={todo.text} isDone={todo.isDone} index={index} {...this.props}/>
                        })
                    }
                </ul>
            )
        }
    }

}


export default TodoShow;
