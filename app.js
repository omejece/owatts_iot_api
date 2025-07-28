var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var net = require('net');
var bcrypt = require('bcrypt-nodejs');
var uniqid = require('uniqid');
var cors = require('cors');

// const blockedIPs = ['174.138.183.72'];

 app.use(cors());
 




var Auth = require('./middleware/AuthMiddleWare');
var options = {
  key: fs.readFileSync('../../ssl/keys/efe49_654c5_54ff2112abaae234b312eb28279704b2.key','utf8'),
  cert: fs.readFileSync('../../ssl/certs/www_iot2_owattspay_net_efe49_654c5_1760312678_26c7e37eea39f872a1668dd1315f4e4d.crt','utf8')
};

var https = require('https').createServer(options,app);

var http = require('http').createServer(app);

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var ApiRoute = require('./routes/api');
var WebRoute = require('./routes/web');


// app.use((req, res, next) => {
//   const clientIP = req.headers['x-forwarded-for'];
//   console(clientIP,' *************** rejected ip address **************');

//   if (blockedIPs.includes(clientIP)) {
//     console.log(`Blocked request from IP: ${clientIP}`);
//     return res.status(403).send('Access denied.');
//   }

//   next(); // Continue processing for other IPs
// });


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



