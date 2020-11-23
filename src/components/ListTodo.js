import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListTodo extends Component {
  render() {
    return (
      <div className="todo-list item-list mb-3">
        {this.props.appointments.map(item => (
          <div className="todo-item col media py-3" key={item.todoId}>
            <div className="mr-3">
              <button
                className="todo-delete btn btn-sm btn-danger"
                onClick={() => this.props.deleteToDo(item)}>
                <FaTimes />
              </button>
            </div>

            <div className="todo-info media-body">
              <div className="todo-head d-flex">

                <span className="todo-name" contentEditable suppressContentEditableWarning 
                onBlur={ e => this.props.updateInfo('todoTitle', e.target.innerText, item.todoId) } >
                  {item.todoTitle}</span>

                <span className="todo-date ml-auto"
                onBlur={ e => this.props.updateInfo('todoDate', e.target.innerText, item.todoId) } >
                  <Moment
                    date={item.todoDate}
                    parse="YYYY-MM-dd hh:mm"
                    format="YYYY-MMM-D  ( h:mma )"
                  />
                </span>
              </div>


              <div className="todo-notes"
              onBlur={ e => this.props.updateInfo('todoNotes', e.target.innerText, item.todoId) } >
                {item.todoNotes}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListTodo;
