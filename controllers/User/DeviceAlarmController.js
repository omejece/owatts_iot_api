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

module.exports =  {
    

     read: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        Auth.Merchant(req.headers.token).then(myMerchant=>{
             DeviceAlarm.findAll({
               where:{
                  date_taken: {
                    [Op.between]:[myReq.from,myReq.to]
                  },
                  imei: myReq.imei,
                  merchant_id: myMerchant.id
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
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
             DeviceAlarm.findAll({
               where:{
                  status: 0,
                  imei: myReq.imei,
                  merchant_id: myMerchant.id
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



     inActiveAlarm: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
            DeviceAlarm.findAll({
               where:{
                  status: 0,
                  imei: myReq.imei,
                  merchant_id: myMerchant.id
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


     update: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        Auth.Merchant(req.headers.token).then(myMerchant=>{
            DeviceAlarm.update(
               {
                 status : 1
               },
               {
                 where:{
                   id: myReq.id,
                   merchant_id: myMerchant.id
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

     

};