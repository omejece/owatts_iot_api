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

const options = {
  key: fs.readFileSync('../../ssl/keys/a22b7_a6de1_731f7aac372120b85100bea8726f7c8e.key', 'utf8'),
  cert: fs.readFileSync('../../ssl/certs/www_iot2_owattspay_net_a22b7_a6de1_1765583076_dc0a9c2459be5367451878e92e257819.crt', 'utf8')
};

const https = require('https').createServer(options, app);
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

https.listen(process.env.HTTPS_PORT, function() {
  console.log(`listening at port ${process.env.HTTPS_PORT} https`);
});

https.on('error', function(error) {
  console.log(error);
});

http.listen(process.env.HTTP_PORT, function() {
  console.log(`listening at port ${process.env.HTTP_PORT} http`);
});

http.on('error', function(error) {
  console.log(error);
});




