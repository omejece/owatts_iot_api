require('dotenv').config();
var Sequelize = require('sequelize');
var Block = require('../models').block;
var Consumption = require('../models').consumption;
var Device = require('../models').device;
var DeviceAlarm = require('../models').deviceAlarm;
var DeviceList = require('../models').deviceList;
var DeviceSetting = require('../models').deviceSetting;
var Merchant = require('../models').merchant;
var Admin = require('../models').admin;
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

module.exports = {


     check: (req,res,next)=>{
         var token = req.headers["token"];
         Merchant.findOne({
            where:{
                token: token
            }
         }).then(myMerchant=>{
             if(myMerchant){
                next();
             }
             else{
                res.setHeader('Content-type','application/json');
                res.status(401).send(JSON.stringify({
                   success:false,
                   message:'unauthenticated',
                   data:{}
                }));
             }
         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(401).send(JSON.stringify({
               success:false,
               message:err,
               data:[]
            }));
         });
     },


     Merchant: (token)=>{
        
        return new Promise((resolve,reject)=>{
             Merchant.findOne({
                where:{token: token}
             }).then(myMerchant=>{
                 if(myMerchant){
                    resolve(myMerchant);
                 }
                 else{
                    reject(" Invalid user");
                 }
             }).catch(err=>{
                console.log(err);
                reject(err);
             });
        });

     },



     valicateMerchantId: (id)=>{
        
      return new Promise((resolve,reject)=>{
           Merchant.findOne({
              where:{id: id}
           }).then(myMerchant=>{
               if(myMerchant){
                  resolve(myMerchant);
               }
               else{
                  reject(" Invalid user");
               }
           }).catch(err=>{
              console.log(err);
              reject(err);
           });
      });

   },



     authenticate: (req,res,next)=>{
         const bearerHeader = req.headers["authorization"];
         if (typeof bearerHeader !== "undefined") {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
                
              if(err){
                  res.setHeader('Content-type','application/json');
                  res.status(403).send(JSON.stringify({
                     success:false,
                     message:'Invalid token',
                     data:{}
                  }));
              }
              else{
                 next();
              }
            });


         } else {

            res.sendStatus(403);

         }
         
     }





};
