import { useState, useEffect } from 'react';
import TodoInput from './Components/TodoInput'
import TodoList from './Components/TodoList'

function App() {

  const [todos, setTodos] = useState([])
  const [todoVal, setTodoVal] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todo: newList}))
  }
 
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList);
  }

  function handleDeleteTodos(idx) {
    const newTodoList = todos.filter((todo, todoIdx) =>{
      return todoIdx !== idx;
    })
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodos(idx) {
    const editedVal = todos[idx]
    setTodoVal(editedVal);
    handleDeleteTodos(idx);
  }

  useEffect(() => {
    if (!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }
    else {
      localTodos = JSON.parse(localTodos).todos
    }
  }, [])

  return (
    <>
      <TodoInput todoVal={todoVal} setTodoVal={setTodoVal}  handleAddTodos={handleAddTodos}></TodoInput>
      <TodoList handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos={todos}></TodoList>
    </>
  );
};
export default App;