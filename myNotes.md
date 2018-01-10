## In a node app, we need:

1. The main `index.js` (in the main directory)
2. models directory > `index.js todo.js`  
3. routes directory > `todo.js`



## In the main Directory:

* Initialize with `npm init`
* Create `index.js` file and install express.
* Listen for app requests using: `app.listen( process.env.PORT, function(){} )`



## In the models Directory:

* The `index.js` file:
  * Import mongoose
  * Set debug to be true. This shows all the process and errors
  * Now using mongoose, connect to the mongodb. It is normally found in the locolhost. Type the command argument: `mongodb://localhost/todo-api`
  * `mongoose.Promise = Promise;` enables the promise mode
  * Now export the database reference using `module.exports.Todo` (Todo is the variable name to be used later to access).
* In the `todo.js` file:
  * Require mongoose.
  * Define the database schema by `new mongoose.Schema()`
  * Using objects inside the main object enables to use properties like *require* and *type*.
  * Connect the Todo model and export it using `module.exports`

## In the routes Directory:

* Here all the routings will take place.
* Use all the db functions to access the database.
* export it to router.
 

## After that:

* `npm install body-parser`
* Use the exported variable from the models folder as the connection between database. In this case, `Todo` is used to reference the database.


## Some Database commands:
* `db.Todo.find()`  : Gives the list of all items in the database collection
* `db.Todo.create(*put what to insert in created todo*)`  : Creates a new item.
* `db.Todo.findById(*write id here*)` : Reference one item. Read that item by passing it in the callback function.
* `db.Todo.findOneAndUpdate({_id: *write id here (typically req.params.todoId)*}, *write updated properties*, {new: true})` : First argument is to tell that we are finding by ID. Second is the updated object (typicaly `req.body` is used). `{new: true}` is for displaying the updated item after submission.
* `db.Todo.remove({_id: *write the id here*})`: Deletes the item with given id.


## Using the helpers folder to refactor all Routes!
1. Create a helpers folder in main directory and create `todo.js` file in it.
2. Import all the models (the database) in it.
3. use `exports.*your command name* = function(req,res){}` to make the route.
4. Now moving to routes folder, import the helpers folder in the `todos.js` file by using `var helpers = require('../helpers/todos')`
5. Replace all routes with `router.route('/')` and use the `.get(helpers.getTodo)` and `post(helpers.createTodo)` after it.