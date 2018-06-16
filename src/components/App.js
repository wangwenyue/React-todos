'use strict'

import React from 'react'
import LocalDb from 'localDb'

import TodoEdit from './TodoEdit.js'
import TodoShow from './TodoShow.js'
import TodoHandler from './TodoHandler.js'


class App extends React.Component {

    constructor() {

        super()
        this.db = new LocalDb('ReactTodos')
        this.state = {
            todos: this.db.get('todos') || [],
            isAllChecked: false
        }
    }

    allChecked() {

        let isAllChecked = false
        if (this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true
        }

        this.setState({
            todos: this.state.todos,
            isAllChecked: isAllChecked
        })
    }

    addTodo(todoItem) {

        this.state.todos.push(todoItem)
        this.db.set('todos', this.state.todos)
        this.allChecked()
    }

    deleteTodo(index) {

        this.state.todos.splice(index, 1)
        this.setState({
            todos: this.state.todos
        })
        this.db.set('todos', this.state.todos)
    }

    editTodo(index, newtext) {

        this.state.todos[index].text = newtext
        this.setState({
            todos: this.state.todos
        })
        this.db.set('todos', this.state.todos)
    }

    clearDone() {

        let todos = this.state.todos.filter(todo => !todo.isDone)
        this.setState({
            todos: todos,
            isALlChecked: false
        })
        this.db.set('todos', todos)
    }

    changeTodoState(todoIndex, isDone, isChangeAll = false) {

        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone
                    return todo
                }),
                isAllChecked: isDone
            })
        } else {
            this.state.todos[todoIndex].isDone = isDone
            this.allChecked()
        }
        this.db.set('todos', this.state.todos)
    }

    render() {

        let infos = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
        }

        return (
            <div className='todo-wrap'>
                <TodoEdit addTodo={this.addTodo.bind(this)}/>
                <TodoShow todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)}
                          changeTodoState={this.changeTodoState.bind(this)} editTodo={this.editTodo.bind(this)}/>
                <TodoHandler {...infos} changeTodoState={this.changeTodoState.bind(this)}
                             clearDone={this.clearDone.bind(this)}/>
            </div>
        )
    }
}

React.render(<App/>, document.getElementById('app'))