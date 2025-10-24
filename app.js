// const createError = require('http-errors');

const express = require('express');
const path = require('path');
const fs = require('fs');
const net = require('net');
const bcrypt = require('bcrypt-nodejs');
const uniqid = require('uniqid');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// const blockedIPs = ['174.138.183.72'];


const Auth = require('./middleware/AuthMiddleWare');
const ApiRoute = require('./routes/api');
const WebRoute = require('./routes/web');


const app = express();

app.use(cors());

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
    res.setHeader('Content-type','application/json');
    res.send(JSON.stringify({status:20,message:"IoT meter api"})); 
});

app.use('/api/v2/admin', WebRoute);
app.use('/api/v2', Auth.check, ApiRoute);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, function(){
   console.log(`listening at port ${process.env.PORT || 3000}`);
});



// const options = {
//   key: fs.readFileSync('../../ssl/keys/efe49_654c5_`54ff2112abaae234b312eb28279704b2.key','utf8'),
//   cert: fs.readFileSync('../../ssl/certs/www_iot2_o`wattspay_net_efe49_654c5_1760312678_26c7e37eea39f872a1668dd1315f4e4d.crt','utf8')
// };

// const https = require('https').createServer(options,app);

// const http = require('http').createServer(app);



// app.use((req, res, next) => {
//   const clientIP = req.headers['x-forwarded-for'];
//   console(clientIP,' *************** rejected ip address **************');

//   if (blockedIPs.includes(clientIP)) {
//     console.log(`Blocked request from IP: ${clientIP}`);
//     return res.status(403).send('Access denied.');
//   }

//   next(); // Continue processing for other IPs
// });






/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/










// app.use(function(req, res, next) {
//   next(createError(404));
// });









// https.listen(process.env.HTTPS_PORT, function(){
//     console.log(`listening at port ${process.env.HTTPS_PORT} https`);
// });

// https.on('error',function(error){
//    console.log(error);
// });



// http.listen(process.env.HTTP_PORT, function(){
//    console.log(`listening at port ${process.env.HTTP_PORT} http`);
// });




// http.on('error',function(error){
//    console.log(error);
// });



