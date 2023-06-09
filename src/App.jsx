import { useState, useEffect } from "react"
import Content from "./Components/Content"

function App() {
  const [todos, setTodos] = useState([]);
  const [newNotes, setNewNotes] = useState('');
  const [editedTodo, setEditedTodo] = useState('')
  const [id, setId] = useState(0)


  //Fetch API
  const URL = "https://dummyjson.com/todos"
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const getData = await fetch(URL);
        const jsonData = await getData.json()
        setTodos(jsonData.todos)
      }catch(error){
        console.error(error)
      }
    }
    fetchData();
  },[])

  //Edit Todos
  const handleEdit = async ()=>{
    console.log(id)
    const getData = await fetch(`${URL}/${id}`, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: editedTodo
      })
    })
    const result = await getData.json();
    const updatedTodos = todos.map((item)=> {
      if(item.id === id ){
        return result
      }else{
        return item
      }
    })
    setTodos(updatedTodos);
    setEditedTodo('');
  }

  //Edit todos and set to completed
  const handleFinish = async (todo)=>{
    const getData = await fetch(`${URL}/${todo.id}`, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: todo.completed ? false:true,
      })
    })
    const result = await getData.json();
    const updatedTodos = todos.map((item)=> {
      if(item.id === todo.id){
        return result
      }else{
        return item
      }
    })
    setTodos(updatedTodos);
  }

  //Delete Todos
  const handleDelete= async(todo)=>{
    const toDelete = await fetch(`${URL}/${todo.id}`, {
      method: 'DELETE',
    })
    const result = await toDelete.json()
    const updatedTodos = todos.map((item)=> {
      if(item.id === todo.id){
        console.log(result)
        return result
      }else{
        return item
      }
    })
    setTodos(updatedTodos);
  }

  //Add new todos
  const handleAddTodo = async ()=>{
      if(newNotes){
          const handleNotes = {
              todo: newNotes,
              completed: false,
              userId: 5,
            }
          const add = await fetch(`${URL}/add`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(handleNotes)
          })
          const todo = await add.json();
          const copy = [...todos];
              copy.unshift(todo);
              setTodos(copy);
              setNewNotes('')
      }
  }

  return (
    <main>
      <Content 
          newNotes={newNotes} 
            setNewNotes={setNewNotes}
              handleAddTodo={handleAddTodo}
                todos={todos}
                    setId={setId}
                  handleFinish={handleFinish}
                handleDelete={handleDelete}
              editedTodo={editedTodo}
            setEditedTodo={setEditedTodo}
          handleEdit={handleEdit}
          />
    </main>
  )
}

export default App
