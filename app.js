var express = require('express'),
app= express(),
engines = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert');
bodyParser = require('body-parser');


app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017/munchies', function(err, db){

  assert.equal(null, err);
      console.log("Successfully connected to MongoDB.");


app.get('/', function(req, res){
res.render('index.html' );
console.log("index");
});

app.get('/gallery', function(req, res){
res.render('gallery.html' );
console.log("gallery");
});



app.get('/form', function(req, res){
res.render('form.html');
console.log("form");
});

app.get('/menu', function(req, res){
res.render('menu.html');
console.log("menu");
});

app.post('/email',  function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.body.name,
       last_name:req.body.email
   };
   console.log(response);


   this.db.collection('munchies').updateOne(
               {"$push" :{"name":response}});

   res.end(JSON.stringify("entered into db"));
})

app.use(function(req, res){
  res.sendStatus(404);
});

var server = app.listen(3000, function() {
  var port=server.address().port;
  console.log('express server listening on port %s', port);
});

});
