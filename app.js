var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var net = require('net');
var bcrypt = require('bcrypt-nodejs');
var uniqid = require('uniqid');
var cors = require('cors');

 app.use(cors());
 




var Auth = require('./middleware/AuthMiddleWare');
var options = {
  key: fs.readFileSync('../../ssl/keys/a2eae_9dd69_fc6d2a9a420711f9075ace3f87276591.key','utf8'),
  cert: fs.readFileSync('../../ssl/certs/_wildcard__owattspay_net_a2eae_9dd69_1749764944_d521aeb7c3d24626825a92312eb7771c.crt','utf8')
};

var https = require('https').createServer(options,app);

var http = require('http').createServer(app);

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var ApiRoute = require('./routes/api');
var WebRoute = require('./routes/web');


app.use(logger('dev'));

 app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/



app.get('/',function(req,res){
    res.setHeader('Content-type','application/json');
    res.send(JSON.stringify({status:20,message:"IoT meter api"})); 
});




app.use('/api/v2/admin',WebRoute);
app.use('/api/v2',Auth.check,ApiRoute);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







app.use(function(req, res, next) {
  next(createError(404));
});









https.listen(process.env.HTTPS_PORT, function(){
    console.log(`listening at port ${process.env.HTTPS_PORT} https`);
});

https.on('error',function(error){
   console.log(error);
});



http.listen(process.env.HTTP_PORT, function(){
   console.log(`listening at port ${process.env.HTTP_PORT} http`);
});




http.on('error',function(error){
   console.log(error);
});



