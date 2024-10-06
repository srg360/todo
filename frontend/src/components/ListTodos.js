import React,{Fragment,useState,useEffect} from "react";

//components
import EditTodo from "./EditTodos";

const ListTodos=()=>{
    
    const [todos,setTodos]=useState([]);

    const getTodos=async()=>{
        try {
            const response=await fetch("http://localhost:5000/todos");
            const jsonData=await response.json();
            console.log(jsonData);
            setTodos(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteTodo=async (id)=>{
        try {
            const response=await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            });
            setTodos(todos.filter(todo=>todo.todo_id!=id));
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getTodos();
    },[])
    
    return(
        <Fragment>
            <table className="table text-center mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo=>(
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <span><EditTodo todo={todo}/></span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span><button className="btn btn-danger" onClick={ () => deleteTodo(todo.todo_id) }>Delete</button></span>
                            </td>
                        </tr>
                    )

                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos