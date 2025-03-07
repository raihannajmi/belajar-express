const express = require('express');

const app = express();

app.set('view engine', 'ejs');
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index', { todos: todos });
});

app.get('/todos/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.render('edit', { todo: todo.content, id: id });
});

let todos = [];
let todoIdCounter = 1;

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todoContent = req.body.todo;
    if (!todoContent) {
        return res.status(400).json({ error: 'Todo content is required' });
    }
    const newTodo = {
        id: todoIdCounter++,
        content: todoContent
    };
    todos.push(newTodo);
    res.redirect('/');
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodoContent = req.body.todo;
    if (!updatedTodoContent) {
        return res.status(400).json({ error: 'Todo content is required' });
    }
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos[todoIndex].content = updatedTodoContent;
    res.redirect('/');
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(todoIndex, 1);
    res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
