var express = require('express'),
app= express(),
engines = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert');
bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: "",
       pass: "",
        server: "smtp.gmail.com",
         port: 465

    }
})


app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017/munchies', function(err, db){

  assert.equal(null, err);
      console.log("Successfully connected to MongoDB.");


app.get('/', function(req, res){
res.render('index.html' );

});

app.get('/gallery', function(req, res){
res.render('gallery.html' );

});



app.get('/form', function(req, res){
res.render('form.html');

});

app.get('/menu', function(req, res){
res.render('menu.html');

});


app.post('/email',  function (req, res) {



//console.log(numItems);

var email= req.body.email;
var name= req.body.first + req.body.last;
response = {
       "_id":req.body.email,
       "name":{"last_name":req.body.last,
       "first_name": req.body.first}
   };

 var findemail = function(db,email, callback) {
   var cursor =db.collection('subscriptions').find({"_id": email} );
   cursor.count(function(err, doc) {
      assert.equal(err, null);
      console.log(doc);
      if (doc <1) {
        db.collection("subscriptions").insert(response, {w:1}, function(err, result) {});
   res.end(JSON.stringify("entered into db"));
          } else {
            callback();
      res.end(JSON.stringify("You seem to be already subscribed please check spam mailbox"));
      }
   });
};





findemail(db, email, function() {});
console.log(email);
var mailOptions = {
    from: "nkkvlz@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Email from Munchies ", // Subject line
    text: "Thank you for subscribing with us ", // plaintext body
    html: "<b>Thank you for subscribing with us </b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
})


});



app.post('/unsubscribe',  function (req, res)
{

var email= req.body.remail;
var unsubscribe= function(db,email,callback){
  console.log(email);
db.collection('subscriptions').remove( {"_id": email},{justOne: true} );


}


unsubscribe(db, email,function(){})
});



app.use(function(req, res){
  res.sendStatus(404);
});


var server = app.listen(3000, function() {
  var port=server.address().port;
  console.log('express server listening on port %s', port);
});

});
