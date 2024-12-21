require('dotenv').config();
var Sequelize = require('sequelize');
var Block = require('../../models').block;
var Consumption = require('../../models').consumption;
var Device = require('../../models').device;
var DeviceAlarm = require('../../models').devicealarm;
var DeviceList = require('../../models').devicelist;
var DeviceSetting = require('../../models').devicesetting;
var DeviceType = require('../../models').devicetype;
var Merchant = require('../../models').merchant;
var Admin = require('../../models').admin;
const jwt = require("jsonwebtoken");
var Auth = require('../../middleware/AuthMiddleWare');
var uuid = require('uuid');
const Op = Sequelize.Op;

module.exports = {
   
     create: (req,res,next)=>{
         let myReq;
         myReq = req.body;

         DeviceType.create({
             name: myReq.name,
             description: myReq.description
         }).then(myDeviceTpe=>{
               res.setHeader('Content-type','application/json');
               res.status(200).send({
                   success:true,
                   message:'Successful',
                   data:myDeviceTpe
               });
           
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     
     
     update: (req,res,next)=>{
         let myReq;
         myReq = req.body;

         DeviceType.update(
           {
             name: myReq.name,
             description: myReq.description   
           },
           {
             where:{
                 id: myReq.device_type_no
             }
           }
         ).then(myDeviceTpe=>{
               res.setHeader('Content-type','application/json');
               res.status(200).send({
                   success:true,
                   message:'Successful',
                   data:[]
               });
           
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     
     
     delete: (req,res,next)=>{
         let myReq;
         myReq = req.body;

         DeviceType.destroy({
             where:{
                 id: myReq.device_type_id
             }
         }).then(myDeviceTpe=>{
               res.setHeader('Content-type','application/json');
               res.status(200).send({
                   success:true,
                   message:'Successful',
                   data:{}
               });
           
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     
     
     
     detail: (req,res,next)=>{
         let myReq;
         myReq = req.query;

         DeviceType.findOne({
             where:{
                 id: myReq.device_type_no
             }
         }).then(myDeviceTpe=>{
             if(myDeviceTpe){
               res.setHeader('Content-type','application/json');
               res.status(200).send({
                   success:true,
                   message:'Successful',
                   data:myDeviceTpe
               });
             }
             else{
                 
                res.setHeader('Content-type','application/json');
                res.status(400).send({
                   success:false,
                   message:'invalid device number',
                   data:[]
                });
                 
             }
           
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     
     
     read: (req,res,next)=>{
         let myReq;
         myReq = req.query;

         DeviceType.findAll().then(myDeviceTpes=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send({
               success:true,
               message:'Successful',
               data:myDeviceTpes
           });
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },



};

