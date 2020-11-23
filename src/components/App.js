import React, { Component } from 'react';
import '../css/App.css';

import AddToDo from './AddToDo';
import SearchToDo from './SearchToDo';
import ListTodo from './ListTodo';

import { findIndex, times, without } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myToDoList: [],
      formDisplay: false,
      orderBy: 'todoTitle',
      orderDir: 'asc',
      queryText : '',
      lastIndex: 0
    };
    this.deleteToDo = this.deleteToDo.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchToDo = this.searchToDo.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(name,value,id){
    let tempToDoList = this.state.myToDoList;
    let todoIndex = findIndex(this.state.myToDoList, {
      todoId: id
    });

    tempToDoList[todoIndex][name] = value;
    this.setState({myToDoList : tempToDoList});
  }

  searchToDo(query){
    this.setState({queryText: query});
  }

  changeOrder(pOrderBy, pDir){
    this.setState({orderBy: pOrderBy, orderDir : pDir});
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  addToDo(todo) {
    let tempToDoList = this.state.myToDoList;
    todo.todoId = this.state.lastIndex;
    tempToDoList.unshift(todo);
    this.setState({
      myToDoList: tempToDoList,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteToDo(todo) {
    let tempToDoList = this.state.myToDoList;
    tempToDoList = without(tempToDoList, todo);

    this.setState({
      myToDoList: tempToDoList
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const todoList = result.map(item => {
          item.todoId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myToDoList: todoList
        });
      });
  }

  render() {
    
    let order;
    let filteredTodoList = this.state.myToDoList;
    if(this.state.orderDir === 'asc'){ order = 1; }
    else {order = -1;}

    filteredTodoList = filteredTodoList.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase())
      { return -1 * order; }
      else {return 1 * order;}
    }).filter(i => {
      return(
           i['todoTitle'].toLowerCase().includes(this.state.queryText.toLowerCase())
        || i['todoNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      );
    });

    return (
      <main className="page bg-white" id="tagmain">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddToDo
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addToDo={this.addToDo}
                />
                <SearchToDo 
                 orderBy={this.state.orderBy}
                 orderDir={this.state.orderDir} 
                 changeOrder={this.changeOrder} 
                 searchToDo={this.searchToDo} />
                <ListTodo
                  appointments={filteredTodoList}
                  deleteToDo={this.deleteToDo}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
