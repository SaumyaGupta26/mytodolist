//import { useEffect, useState } from 'react'
// import TodoList from './TodoList'
import './App.css'

import TodoList from './TodoList';

function App() {

  return(
    <div className='main-div'>
      <h2 className='main-heading'>My Todo</h2>
        <TodoList/>
     </div>
  )
  
}

export default App
