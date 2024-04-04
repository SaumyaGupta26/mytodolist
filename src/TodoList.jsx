import React from 'react'
import { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './App.css';

function TodoList() {
    let [todos, setTodos] = useState([{task: 'sampleTask', id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState('');

    let addNewTask = () => {
        if (!newTodo.trim()) {
            alert('Please fill the field first');
            return;
        }
        const newTask = { task: newTodo, id: uuidv4(), isDone: false };
    
        // Retrieve existing todos from local storage or initialize to an empty array
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    
        // Update todos with the new task and store it back in local storage
        const updatedTodos = [...storedTodos, newTask];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        // Update the state to trigger a re-render
        setTodos(updatedTodos);

        setNewTodo('');

       
    };

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id) =>{
         
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        
    }

    let markAsDone = (id) =>{
       setTodos((prevTodos) => prevTodos.map((todo) => {
        if(todo.id == id) {
            return {
                ...todo, isDone: true,
            }
        } else{
        return todo;
         }
       }))
    }

    let markAllDone = () =>{
        setTodos((prevTodos) => prevTodos.map((todo) => {
         
             return {
                 ...todo, isDone: true,
             }
         
        }))
     }
 
  return (
    <div className='todo-wrapper'>
        <div className='todo-input-item'>
        <input type="text" placeholder='add a task' value={newTodo} onChange={updateTodoValue}/>
        <button className='btn' onClick={addNewTask}>Add Task</button>
        
        </div>
        
      <h2>Tasks To Do...</h2>
      <ul>
        {
            todos.map((todo) => (
                <li key={todo.id} className='todo-list-item'>
                    <span style={todo.isDone ? {textDecorationLine : "line-through", color: 'red'} : {}} ><b>{todo.task}</b></span> 
                      <div>
                        <DeleteOutlineIcon className='icon' onClick={() => deleteTodo(todo.id)}/>
                        <TaskAltIcon  className='check-icon' onClick={() => markAsDone(todo.id)}/>
                      </div>
                </li>
            ))
        }
      </ul>
      <br />
      <button className="allDone-btn" onClick={markAllDone}>All Done</button>
    </div>
  )
}

export default TodoList
