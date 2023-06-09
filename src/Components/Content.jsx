/* eslint-disable react/prop-types */
import {MdDelete} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"

const Content = (props) => {
  return (
    <section>
           <div className="custom_container d-flex align-items-center justify-content-center">
            <div className="custom_card">
                  <div className="input-group mb-3">
                      <input type="text" value={props.newNotes} onChange={(e)=>{props.setNewNotes(e.target.value)}} className="form-control" placeholder="New Todo..." aria-label="New Todo..." aria-describedby="button-addon2" />
                      <button onClick={props.handleAddTodo} className="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
                  </div>
                <div className="todosContainer">
                  {props.todos.map((todo,index)=>
                  todo.isDeleted ? null:(
                    <div className="todo" key={index}>
                        <input checked={todo.completed ? true:false} className="finishBtn" type="checkbox" onChange={()=>{props.handleFinish(todo)}}/>
                        <p className={todo.completed ? "completed" : "notComplete"}>{todo.todo}</p>
                        <div className="buttons">
                        <button className="editBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{props.setId(todo.id)}}><AiFillEdit/></button>
                            <button className="deleteBtn" onClick={()=>{props.handleDelete(todo)}}><MdDelete/></button>
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
                      <input value={props.editedTodo} onChange={(e)=>{props.setEditedTodo(e.target.value)}} className="editedTodo w-100 py-2" style={{outline:'none'}} type="text" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={props.handleEdit}>Save</button>
                  </div>
                </div>
              </div>
            </div>
    </section>
  )
}


export default Content