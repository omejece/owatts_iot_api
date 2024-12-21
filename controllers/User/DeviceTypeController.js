require('dotenv').config();
const Sequelize = require('sequelize');
const Block = require('../../models').block;
const Consumption = require('../../models').consumption;
const Device = require('../../models').device;
const DeviceAlarm = require('../../models').devicealarm;
const DeviceList = require('../../models').devicelist;
const DeviceSetting = require('../../models').devicesetting;
const Merchant = require('../../models').merchant;
const Admin = require('../../models').admin;
const BlockConsumption = require('../../models').blockconsumption;
const Auth = require('../../middleware/AuthMiddleWare');
const uuid = require('uuid');
const Op = Sequelize.Op;

module.exports = {
   
     
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

