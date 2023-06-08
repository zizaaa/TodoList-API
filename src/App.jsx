import { useState, useEffect } from "react"
import {MdDelete} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"
import {BsCheckLg} from "react-icons/bs"

function App() {
  const [todos, setTodos] = useState([]);
  const [newNotes, setNewNotes] = useState('');
  const [editedTodo, setEditedTodo] = useState('')
  const [id, setId] = useState(0)


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
    <section>
        <div className="custom_container d-flex align-items-center justify-content-center">
            <div className="custom_card">
                  <div className="input-group mb-3">
                      <input type="text" value={newNotes} onChange={(e)=>{setNewNotes(e.target.value)}} className="form-control" placeholder="New Todo..." aria-label="New Todo..." aria-describedby="button-addon2" />
                      <button onClick={handleAddTodo} className="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
                  </div>
                <div className="todosContainer">
                  {todos.map((todo,index)=>
                  todo.isDeleted ? null:(
                    <div className="todo" key={index}>
                        <p className={todo.completed ? "completed" : "notComplete"}>{todo.todo}</p>
                        <div className="buttons">
                        <button className="editBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{setId(todo.id)}}><AiFillEdit/></button>
                        <button className="checkBtn" onClick={()=>{handleFinish(todo)}}><BsCheckLg/></button>
                            <button className="deleteBtn" onClick={()=>{handleDelete(todo)}}><MdDelete/></button>
                        </div>
                    </div>
                  )
                  )}
                </div>
            </div>
        </div>
        {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Todo</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <input value={editedTodo} onChange={(e)=>{setEditedTodo(e.target.value)}} className="editedTodo w-100 py-2" style={{outline:'none'}} type="text" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={handleEdit}>Save</button>
                  </div>
                </div>
              </div>
            </div>
    </section>
  )
}

export default App
