'use strict';
import React from 'react'


class TodoHandler extends React.Component {

    handlerSelectAll(event) {
        this.props.changeTodoState(null, event.target.checked, true)

    }


    handlerDeleteDone() {
        this.props.clearDone()
    }

    render() {
        return (
            <div className="todo-handler">
                <label>
                    <input type="checkbox" checked={this.props.isAllChecked}
                           onChange={this.handlerSelectAll.bind(this)}/>SelectAll
                </label>
                <span><span className="text-success">TodoDone: {this.props.todoDoneCount}</span> / AllTodos: {this.props.todoCount}</span>
                <button className="btn btn-danger" onClick={this.handlerDeleteDone.bind(this)}>Clear finished Todos</button>
            </div>
        )
    }

}


export default TodoHandler;
