import { useEffect, useState } from 'react';
import './css/app.css';
import { TodoAdd } from './pages/TodoAdd';
import { TodoList } from './pages/TodoList';


const App = () => {
  interface todo {
    id: number,
    title: string,
    completed: boolean,
  }

  const [todos, setTodos] = useState<todo[]>([])
  const [editTodoId, setEditTodoId] = useState<number | null>(null)
  const [editTodoTitle, setEditTodoTitle] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:8000/todos', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(data => setTodos(data as todo[]))
      .catch((error) => console.log(error));
  }, [])


  async function handleAddTodo(todo: { title: string }): Promise<void> {
    const response = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    const data = await response.json() as todo
    setTodos([...todos, data])

  }
  async function handleRemoveTodo(id: number): Promise<void> {
    await fetch(`http://localhost:8000/todos?id=${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id))
    })
      .catch((error) => console.log(error));
  }

  async function handleToggleTodo(id: number, isChecked: boolean): Promise<void> {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      return;
    }
    await fetch(`http://localhost:8000/todos?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: isChecked }),
    })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: isChecked } : todo
          )
        )
      })
      .catch((error) => console.log(error));
  }

   function handleEditTodo(id: number): void {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      setEditTodoId(id);
      setEditTodoTitle(todo.title);
    } 
  }
  async function fetchSaveTodo(id: number): Promise<void> {
   await fetch(`http://localhost:8000/todos?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editTodoTitle }),
    })
    .then(() => {
        setEditTodoId(null);
        setEditTodoTitle('');
      })
    .catch((error) => console.log(error));
  }


  return (
    <div className='mt-10 max-w-xl mx-auto p-6 bg-white rounded-xl shadow-2xl'>
      <TodoAdd handleAddTodo={handleAddTodo} />
      <TodoList todos={todos}
        handleRemoveTodo={handleRemoveTodo}
        handleToggleTodo={handleToggleTodo}
        handleEditTodo={handleEditTodo}
        editTodoId={editTodoId}
        editTodoTitle={editTodoTitle}
        setEditTodoTitle={setEditTodoTitle} 
        fetchSaveTodo={fetchSaveTodo}/>


    </div>
  )
}

export default App
