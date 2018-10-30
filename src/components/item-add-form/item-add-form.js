import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
  
  state = {
    label:''
  }
  
  onLabelChange = ({target}) =>{
    this.setState({
      label:target.value
    });
  }
  onSubmit = (ev) =>{
    ev.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label:''
    });
  }
 
  render() {
    return (
      <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
          <input type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="new task"
          value={this.state.label}/>
        <button
          className="btn btn-outline-secondary"
          >
          Add Item
        </button>
      </form>
    )
  }
}
