'use strict';

import React from 'react';


class TodoEdit extends React.Component {

    handlerKeyUp(event) {
        if (event.key == 'Enter') {
            let self = event.target
            let value = self.value

            if (!value) {
                return false
            }

            let newTodoItem = {
                text: value,
                isDone: false
            }

            self.value = ''
            this.props.addTodo(newTodoItem)
        }
    }

    render() {
        return (
            <div className="todo-edit">
                <input onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="Put your task here"/>
            </div>
        )
    }

}


export default TodoEdit
