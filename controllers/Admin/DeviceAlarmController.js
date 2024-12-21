require('dotenv').config();
var Sequelize = require('sequelize');
var Block = require('../../models').block;
var Consumption = require('../../models').consumption;
var Device = require('../../models').device;
var DeviceAlarm = require('../../models').devicealarm;
var DeviceList = require('../../models').devicelist;
var DeviceSetting = require('../../models').devicesetting;
var Merchant = require('../../models').merchant;
var Admin = require('../../models').admin;
const jwt = require("jsonwebtoken");
var Auth = require('../../middleware/AuthMiddleWare');
var uuid = require('uuid');
const Op = Sequelize.Op;

module.exports =  {
    

     read: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        DeviceAlarm.findAll({
            where:{
               date_taken: {
                 [Op.between]:[myReq.from,myReq.to]
               }
            }
         }).then(myalarm=>{
            res.setHeader('Content-type','application/json');
            res.status(200).send(JSON.stringify({
               success:true,
               message:'success',
               data:myalarm
            }));
         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).send(JSON.stringify({
               success:false,
               message:err,
               data:[]
            }));
         });
     },



     activeAlarm: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        DeviceAlarm.findAll({
            where:{
               status: 0,
               imei: myReq.imei
            }
         }).then(myalarm=>{
            res.setHeader('Content-type','application/json');
            res.status(200).send(JSON.stringify({
               success:true,
               message:'success',
               data:myalarm
            }));
         }).catch(err=>{
            res.setHeader('Content-type','application/json');
            res.status(400).send(JSON.stringify({
               success:false,
               message:'Error',
               data:[]
            }));
         });
     },



     inActiveAlarm: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        DeviceAlarm.findAll({
            where:{
               status: 0,
               imei: myReq.imei
            }
         }).then(myalarm=>{
            res.setHeader('Content-type','application/json');
            res.status(200).send(JSON.stringify({
               success:true,
               message:'success',
               data:myalarm
            }));
         }).catch(err=>{
            res.setHeader('Content-type','application/json');
            res.status(400).send(JSON.stringify({
               success:false,
               message:'Error',
               data:[]
            }));
         });
      
     },


     update: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        DeviceAlarm.update(
            {
            status : 1
            },
            {
            where:{
               id: myReq.id
            }
            }
         ).then(()=>{
            res.setHeader('Content-type','application/json');
            res.status(200).send(JSON.stringify({
               success:true,
               message:'Alarm successfully',
               data:[]
            }));
         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).send(JSON.stringify({
               success:false,
               message:'Error',
               data:[]
            }));
         });
     },

     

};