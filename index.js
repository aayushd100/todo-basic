//main directory
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));



var todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);


app.get('/', function(req, res){
  res.send("HELLO FROM THE ROOT ROUTE!???");
});








app.listen(process.env.PORT, function(){
    console.log("App is running on port: "+ process.env.PORT);
});