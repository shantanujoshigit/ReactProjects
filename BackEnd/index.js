const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoRoutes = express.Router();
let Todo = require('./todo.model')


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/todos', TodoRoutes)

app.listen(4000, function(){
    console.log("Server connected!")
})

mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open',function(){
    console.log("Database established")
})

TodoRoutes.route('/').get(function(req,res){
    Todo.find(function (err,todos){
        if(!err){
            res.json(todos)
        } else{
            console.log("error")
        }
    })
})
//---getting data
TodoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;   //...............................accessing id parameter from URL
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

//Send the new added post

TodoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'task added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new task failed');
        });
});

TodoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_title = req.body.task_title;
            todo.task_description = req.body.task_description;
            todo.task_priority = req.body.task_priority;
            todo.task_completed = req.body.task_completed;

            todo.save().then(todo => {
                res.json('Task updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});