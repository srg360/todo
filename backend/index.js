const express=require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create TODO
app.post("/todos",async(req,res)=>{
    try {
        console.log("Creating a todo");
        console.log(req.body);
        const {description}=req.body;
        const newTodo=await pool.query("INSERT INTO tbls_todo (description) values ($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(501).send("Something went wrong!");
    }
});

//get all TODOS
app.get("/todos",async(req,res)=>{
    try {
        console.log("Get all todos");
        const todoList=await pool.query("SELECT * FROM tbls_todo");
        res.json(todoList.rows);
    } catch (error) {
        console.log(error);
        res.status(501).send("Something went wrong!");
    }
    
});

//get a TODO
app.get("/todos/:id",async(req,res)=>{
    try {
        console.log("Get a todo");
        const id=parseInt(req.params.id);
        console.log(id);
        const todo=await pool.query("SELECT * FROM tbls_todo WHERE todo_id=$1",[id]);
        res.status(200).json(todo.rows);
    } catch (error) {
        console.log(error);
        res.status(501).json({errMsg:"Something went wrong!"});
    }
    
});

//update a TODO
app.put("/todos/:id",async(req,res)=>{
    try {
        console.log("Update a todo");
        const id=parseInt(req.params.id);
        const {description}=req.body;
        console.log(id);
        await pool.query("UPDATE tbls_todo set description=$2 where todo_id=$1",[id,description]);
        res.status(200).json({scssMsg:`Description updated successfully for ID: ${id}`});
    } catch (error) {
        console.log(error);
        res.status(501).json({errMsg:"Something went wrong!"});
    }
    
});

//delete a TODO
app.delete("/todos/:id",async(req,res)=>{
    try {
        console.log("Delete a todo");
        const id=parseInt(req.params.id);
        const todoList=await pool.query("DELETE FROM tbls_todo where todo_id=$1",[id]);
        res.status(200).json({scssMsg:`Todo deleted with ID: ${id}`});
    } catch (error) {
        console.log(error);
        res.status(501).json({errMsg:"Something went wrong!"});
    }
    
});

app.use("*",(req,res)=>{
    res.status(404).json({errMsg:"Route not found"});
});

app.listen(5000,()=>{
    console.log("Server is running on 5000");
});