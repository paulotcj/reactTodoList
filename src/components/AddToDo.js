import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddToDo extends Component {
  constructor() {
    super();
    this.state = {
      todoTitle: '',
      todoDate: '',
      todoTime: '',
      todoNotes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempTodo = {
      todoTitle: this.state.todoTitle,
      todoDate: this.state.todoDate + ' ' + this.state.todoTime,
      todoNotes: this.state.todoNotes
    };

    this.props.addToDo(tempTodo);

    this.setState({
      todoTitle: '',
      todoDate: '',
      todoTime: '',
      todoNotes: ''
    });
    this.props.toggleForm();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div
        className={
          'card textcenter mt-3 ' +
          (this.props.formDisplay ? '' : 'add-todo')
        }
      >
        <div
          className="todo-addheading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
          <FaPlus /> Add To-Do 
        </div>

        <div className="card-body">
          <form id="todoForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="todoTitle"
                readOnly
              >
                To-Do Title
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="todoTitle"
                  placeholder="To-Do Title"
                  value={this.state.todoTitle}
                  onChange={this.handleChange}
                />
              </div>
            </div>


            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="todoDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="todoDate"
                  id="todoDate"
                  value={this.state.todoDate}
                  onChange={this.handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="todoTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="todoTime"
                  id="todoTime"
                  value={this.state.todoTime}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="todoNotes">
                Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="todoNotes"
                  id="todoNotes"
                  placeholder="Notes"
                  value={this.state.todoNotes}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddToDo;
