require('dotenv').config();
const Sequelize = require('sequelize');
const Block = require('../../models').block;
const Consumption = require('../../models').consumption;
const Device = require('../../models').device;
const DeviceAlarm = require('../../models').devicealarm;
const DeviceList = require('../../models').devicelist;
const InverterLog = require('../../models').inverterlog;
const DeviceSetting = require('../../models').devicesetting;
const Merchant = require('../../models').merchant;
const Admin = require('../../models').admin;
const Auth = require('../../middleware/AuthMiddleWare');
const uuid = require('uuid');
const Op = Sequelize.Op;


module.exports = {

     read: (req,res,next)=>{
          let myReq;
          myReq = req.query;

          Auth.Merchant(req.headers.token).then(myMerchant=>{
          	   var options = {
          	   	  where:{
                    merchant_id: myMerchant.id,
                    time_saved:{
                    	[Op.between] : [myReq.from, myReq.to]
                    }
                  }
          	   }

          	   if(myReq.imei){
                  options.where.imei = myReq.imei;
          	   }

               InverterLog.findAll(options).then(myBlock=>{
                   res.setHeader('Content-type','application/json');
                   res.status(200).send(JSON.stringify({
                       success:true,
                       message:"successfull",
                       data:myBlock
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
          }).catch(err=>{
             console.log(err);
             res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:err,
                 data:[]
             }));
          });
         
     }

}