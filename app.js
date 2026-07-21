// const createError = require('http-errors');

const express = require('express');
const path = require('path');
const fs = require('fs');
const net = require('net');
const bcrypt = require('bcrypt-nodejs');
const uniqid = require('uniqid');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
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



const http = require('http').createServer(app);

/*app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'];
  console.log(clientIP, '*************** rejected ip address **************');

  if (blockedIPs.includes(clientIP)) {
    console.log(`Blocked request from IP: ${clientIP}`);
    return res.status(403).send('Access denied.');
  }

  next(); // Continue processing for other IPs
});*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  next(createError(404));
});


http.listen(process.env.HTTP_PORT, function() {
  console.log(`listening at port ${process.env.HTTP_PORT} http`);
});

http.on('error', function(error) {
  console.log(error);
});




