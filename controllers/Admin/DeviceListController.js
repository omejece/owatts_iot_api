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


module.exports = {
   
     create: (req,res,next)=>{
         let myReq;
         myReq = req.body;
         DeviceList.findOne({
         	where:{
         		imei: myReq.imei
         	}
         }).then(devList=>{
            if(devList){
                 res.setHeader('Content-type','application/json');
                 res.status(400).send(JSON.stringify({
                     success:false,
                     message:'device already exist',
                     data:{}
                 }));
            }
            else{
                DeviceList.create({
                    device_type: myReq.device_type,
                    status: 0,
                    meter_type: myReq.meter_type,
                    imei: myReq.imei
                }).then(myDevice=>{

                     res.setHeader('Content-type','application/json');
                     res.status(200).send(JSON.stringify({
                         success:true,
                         message:'device successfully added',
                         data:myDevice
                     }));   

                }).catch(err=>{
                     res.setHeader('Content-type','application/json');
                     res.status(400).send(JSON.stringify({
                         success:false,
                         message:'device error',
                         data:{}
                     }));   
                })
            }
         }).catch(err=>{
         	 console.log(err);
         	 res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         });
     },




     update: (req,res,next)=>{
         let myReq;
         myReq = req.body;
         DeviceList.findOne({
         	where:{
         		imei: myReq.imei
         	}
         }).then(devList=>{
            if(devList){
                DeviceList.update(
                  {
                    device_type: DataTypes.INTEGER,
                    status: DataTypes.INTEGER,
                    meter_type: myReq.meter_type
                  },
                  {
                    where:{
                       imei: myReq.imei
                    }
                  }
                ).then(myDevice=>{
                     res.setHeader('Content-type','application/json');
                     res.status(200).send(JSON.stringify({
                         success:true,
                         message:'device successfully updated',
                         data:{}
                     }));   
                }).catch(err=>{
                     res.setHeader('Content-type','application/json');
                     res.status(400).send(JSON.stringify({
                         success:false,
                         message:'Invalid device',
                         data:{}
                     }));   
                })
            }
            else{
                 res.setHeader('Content-type','application/json');
	             res.status(400).send(JSON.stringify({
	                 success:false,
	                 message:'Invalid device',
	                 data:{}
	             }));	
            }
         }).catch(err=>{
         	 console.log(err);
         	 res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         });
     },




     delete: (req,res,next)=>{
     	 let myReq;
         myReq = req.query;
         DeviceList.findOne({
            where:{
               imei: myReq.imei
            }
         }).then(myDevice=>{
         	 if(myDevice){
         	 	 DeviceList.destroy({
         	 	 	where:{
		               imei: myReq.imei
		            }
         	 	 }).then(()=>{
                     res.setHeader('Content-type','application/json');
		             res.status(200).send(JSON.stringify({
		                 success:true,
		                 message:'successfull',
		                 data:{}
		             }));
         	 	 }).catch(err=>{
         	 	 	 console.log(err);
		         	 res.setHeader('Content-type','application/json');
		             res.status(400).send(JSON.stringify({
		                 success:false,
		                 message:'Error addind device',
		                 data:err
		             }));
         	 	 })
         	 }
         	 else{
	         	 res.setHeader('Content-type','application/json');
	             res.status(400).send(JSON.stringify({
	                 success:false,
	                 message:'Invalid imei number',
	                 data:err
	             }));
         	 }
         }).catch(err=>{
         	 console.log(err);
         	 res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         });
     },



     read: (req,res,next)=>{
     	 let myReq;
         myReq = req.query;
         DeviceList.findAll().then(myDevices=>{
             res.setHeader('Content-type','application/json');
             res.status(200).send(JSON.stringify({
                 success:true,
                 message:'successfull',
                 data:myDevices
             }));
         }).catch(err=>{
         	 console.log(err);
         	 res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         });
     },


     detail: (req,res,next)=>{
     	 let myReq;
         myReq = req.query;
         DeviceList.findOne({
            where:{
               imei: myReq.imei
            }
         }).then(myDevice=>{
         	 if(myDevice){
                 res.setHeader('Content-type','application/json');
	             res.status(200).send(JSON.stringify({
                     success:true,
	                 message:'successfull',
	                 data:myDevice
	             }));
         	 }
         	 else{
	         	 res.setHeader('Content-type','application/json');
	             res.status(400).send(JSON.stringify({
	                 success:false,
	                 message:'Invalid imei number',
	                 data:err
	             }));
         	 }
         }).catch(err=>{
         	 console.log(err);
         	 res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         });
     },



     search: (req,res,next)=>{
         let myReq;
         myReq = req.query;
         DeviceList.findOne({
            where:{
             imei: {
              [Op.like]: '%'+myReq.imei+'%'
             }
            }
         }).then(myDevice=>{
             res.setHeader('Content-type','application/json');
             res.status(200).send(JSON.stringify({
                 success:true,
                 message:'successfull',
                 data:myDevice
             }));
         }).catch(err=>{
             console.log(err);
             res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         });
     },




};

