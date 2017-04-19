const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Connect to the database
mongoose.connect('mongodb://test:test@ds163340.mlab.com:63340/todo')

//Create a schema - this i slike a blueprint
const todoSchema = new mongoose.Schema({
    item: String
})

//Create a model
const Todo = mongoose.model('Todo', todoSchema)

const urlencodedParser = bodyParser.urlencoded({
    extended: false
})

module.exports = (app) => {
    app.get('/todo', (req, res) => {
        //get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if (err) {
                throw err
            }
            res.render('todo', {
                todos: data
            })
        })
    })

    app.post('/todo', urlencodedParser, (req, res) => {
        //get data from the view and add it to mongoDB
        let newTodo = Todo(req.body).save((err, data) => {
            if (err) {
                throw err
            }
            res.json(data)
        })
    })

    app.delete('/todo/:item', (req, res) => {
        //delete the requested item from mongoDB
        Todo.find({
            item: req.params.item
        }).remove((err, data) => {
             if (err) {
                throw err
            }
            res.json(data)
        })
    })
}