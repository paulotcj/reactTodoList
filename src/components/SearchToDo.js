import React, { Component } from 'react';

class SearchToDo extends Component {
  render() {
    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchToDo"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={ e => {this.props.searchToDo(e.target.value)}}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">

                <button className={
                  'sort-by dropdown-item ' + 
                  (this.props.orderBy === 'todoTitle'? 'active':'')
                } href="#" onClick={ e => this.props.changeOrder('todoTitle', this.props.orderDir) } >
                  To-Do Title
                </button>

                <button className={
                  'sort-by dropdown-item ' + 
                  (this.props.orderBy === 'todoDate'? 'active':'')
                } href="#" onClick={ e => this.props.changeOrder('todoDate', this.props.orderDir) } >
                  Date
                </button>



                <div role="separator" className="dropdown-divider" />

                <button className={
                  'sort-by dropdown-item ' + 
                  (this.props.orderDir === 'asc'? 'active':'')
                } href="#" onClick={ e => this.props.changeOrder(this.props.orderBy, 'asc') } >
                  Asc
                </button>
                <button className={
                  'sort-by dropdown-item ' + 
                  (this.props.orderDir === 'desc'? 'active':'')
                } href="#" onClick={ e => this.props.changeOrder(this.props.orderBy, 'desc') } >
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchToDo;
