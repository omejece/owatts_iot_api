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
   
     createOrUpdate: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        Auth.Merchant(req.headers.token).then(myMerchant=>{
             Device.findOne({
	         	where:{
	         	   imei: myReq.imei,
	         	   merchant_id: myMerchant.id
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


     delete: (req,res,next)=>{
     	let myReq;
        myReq = req.query;

        Auth.Merchant(req.headers.token).then(myMerchant=>{
             Device.findOne({
	            where:{
	               imei: myReq.imei,
	               merchant_id: myMerchant.id
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



     detail: (req,res,next)=>{
     	let myReq;
        myReq = req.query;

        Auth.Merchant(req.headers.token).then(myMerchant=>{
            DeviceSetting.findOne({
	            where:{
	               imei: myReq.imei,
	               merchant_id: myMerchant.id
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
