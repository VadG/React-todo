import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  
  maxId=100;

  state = {
    todoData : [
    this.createTodoItem('Drink Coffee'),
    this.createTodoItem('Make Awesome App'),
    this.createTodoItem('Have a lunch')
    ],
    term:'',
    filter:'all'
  }  

  createTodoItem(label){
    return {
        label,
        important:false,
        id:this.maxId++,
        done:false
      }
  }

  deleteItem = (id) =>{
    this.setState(({todoData}) => {
      const newTodoData = todoData.filter(item=>item.id!==id);
      return{
        todoData:newTodoData
      }
    });
  }

  addItem = (label) =>{
     
      const newItem = this.createTodoItem(label);
      this.setState(({todoData}) =>{
        return {
          todoData:[...todoData,newItem]
        }
      });
  }

  onToggleImportant = (id) =>{
    this.setState(({todoData}) => {
      const idx = todoData.findIndex(item=>item.id === id);
      const newTodoData = [...todoData];
      newTodoData[idx].important = !newTodoData[idx].important;
      return {
        todoData:newTodoData
      }
    });
  }
  onToggleDone = (id) =>{
    this.setState(({todoData}) => {
      const idx = todoData.findIndex(item=>item.id === id);
      const newTodoData = [...todoData];
      newTodoData[idx].done = !newTodoData[idx].done;
      return {
        todoData:newTodoData
      }
    });

  }
  search(items,term){

  return term.length==0?items:
                        items.filter(item=>{
                          return item.label.toLowerCase().indexOf(term.toLowerCase()) >-1;
                        })
  }
  onSearchChange = (term) =>{
    this.setState({
      term
    });

  }
  
   onFilterChange = (filter) =>{
    this.setState({
      filter
    });

  }
  filter = (items,filter) =>{
    switch(filter){
      case 'all':
      return items;
      case 'active': return items.filter(item=>!item.done);
      case 'done': return items.filter(item=>item.done);
      default:return items;
    }
  }

  render() {
    const {todoData,term,filter} = this.state;
    const visibleItems = this.filter(this.search(todoData,term),filter);
  
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return(
     <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={this.onSearchChange} />
        <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
      </div>

      <TodoList todos={visibleItems} 
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}/>
      <ItemAddForm onItemAdded={this.addItem}></ItemAddForm>
    </div>
  )}
};

 
