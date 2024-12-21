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
   
     createOrUpdate: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        Device.findOne({
			where:{
			   imei: myReq.imei
			}
		}).then(myDevice=>{
			if(myDevice){
			   
				DeviceSetting.findOne({
					where:{
						imei: myReq.imei
					}
				}).then(devSet=>{
				   if(devSet){
					   DeviceSetting.update(
						 {
						   data: myReq.data
						 },
						 {
						   where:{
							  imei: myReq.imei
						   }
						 }
					   ).then(()=>{
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
					   DeviceSetting.create({
						   device_id: myDevice.id,
						   data: myReq.data,
						   imei: myReq.imei
					   }).then(devSet=>{

							res.setHeader('Content-type','application/json');
							res.status(200).send(JSON.stringify({
								success:true,
								message:'device successfully added',
								data:{}
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
			 res.setHeader('Content-type','application/json');
			res.status(400).send(JSON.stringify({
				success:false,
				message:'error',
				data:{}
			}));
		});

     },


     delete: (req,res,next)=>{
     	let myReq;
        myReq = req.query;

        Device.findOne({
			where:{
			   imei: myReq.imei
			}
		 }).then(myDevice=>{
			  if(myDevice){
				   DeviceSetting.destroy({
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
		 })
         
     },



     detail: (req,res,next)=>{
     	let myReq;
        myReq = req.query;

        DeviceSetting.findOne({
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
		 })
         
     },



};
