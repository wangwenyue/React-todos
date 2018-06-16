'use strict';

import React from 'react'


class TodoItem extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            text: this.props.text
        }
    }

    handlerChange() {

        let isDone = !this.props.isDone
        this.props.changeTodoState(this.props.index, isDone)
    }

    handlerMouseOver() {

        React.findDOMNode(this).style.background = '#eee'
        React.findDOMNode(this.refs.delButton).style.display = 'inline-block'
    }

    handlerMouseOut() {

        React.findDOMNode(this).style.background = '#fff'
        React.findDOMNode(this.refs.delButton).style.display = 'none'
    }

    handlerDelete() {
        this.props.deleteTodo(this.props.index)
    }


    handlerFocusSpan(event) {

        let item = event.target
        item.contentEditable = true
        item.focus()
    }

    handlerUserInput(event) {

        if (event.key === 'Enter') {
            // console.log('按下了回车键')
            event.preventDefault()
            this.setState({text: event.target.innerHTML}, () => {
                let newtext = this.state.text
                this.props.editTodo(this.props.index, newtext)
            })
            event.target.contentEditable = false

        }

    }


    render() {
        // console.log('this.state.text', this.state.text)
        let className = this.props.isDone ? 'task-done' : ''
        return (
            <li onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                <label>
                    <input ref="checkboxInput" type="checkbox" checked={this.props.isDone}
                           onChange={this.handlerChange.bind(this)}/>
                </label>
                <span ref="itemText" className={className}
                      onKeyPress={this.handlerUserInput.bind(this)}
                      onClick={this.handlerFocusSpan.bind(this)}>{this.state.text}</span>
                <button ref="delButton" className="btn btn-danger" onClick={this.handlerDelete.bind(this)}>Delete
                </button>
            </li>
        )
    }

}


export default TodoItem
