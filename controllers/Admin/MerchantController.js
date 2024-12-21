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
         Merchant.create({
            name: myReq.name,
            address: myReq.address,
            token: uuid.v4()
         }).then(myMerchant=>{

              res.setHeader('Content-type','application/json');
              res.status(200).send(JSON.stringify({
                  success:true,
                  message:'merchant successfully added',
                  data:myMerchant
              }));   

         }).catch(err=>{
              res.setHeader('Content-type','application/json');
              res.status(400).send(JSON.stringify({
                  success:false,
                  message:' error',
                  data:{}
              }));   
         })
     },

   


    update: (req,res,next)=>{
         let myReq;
         myReq = req.body;
         
         Merchant.findOne({
         	where:{
         		id: myReq.id
         	}
         }).then(myMerchant=>{
            if(myMerchant){
                
                Merchant.update(
                 {
                   name: myReq.name,
                   address: myReq.address
        	     },
        	     {
        	       where:{
        	       	 id: myMerchant.id
        	       }
        	     }
        	    ).then(myMerchant=>{
                   res.setHeader('Content-type','application/json');
                   res.status(200).send(JSON.stringify({
                       success:true,
                       message:'Success',
                       data:{}
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
                 
            }
            else{
                res.setHeader('Content-type','application/json');
                 res.status(400).send(JSON.stringify({
                     success:false,
                     message:'Invalid merchant',
                     data:{}
                 }));
            }
         }).catch(err=>{
         	 console.log(err);
         	 res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind merchant',
                 data:err
             }));
         });
         
        
    },


    delete: (req,res,next)=>{
        let myReq;
         myReq = req.body;
        Merchant.destroy(
	     {
	       where:{
	       	 id: myReq.id
	       }
	     }
	    ).then(myMerchant=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.stringify({
               success:true,
               message:'Success',
               data:{}
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


    read: (req,res,next)=>{
        let myReq;
         myReq = req.query;
        Merchant.findAll().then(myMerchant=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.stringify({
               success:true,
               message:'Success',
               data:myMerchant
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


    detail: (req,res,next)=>{
        let myReq;
         myReq = req.query;
        Merchant.findOne(
	     {
	       where:{
	       	 id: myReq.id
	       }
	     }
	    ).then(myMerchant=>{
	       if(myMerchant){
	           res.setHeader('Content-type','application/json');
               res.status(200).send(JSON.stringify({
                   success:true,
                   message: 'Success',
                   data: myMerchant
               }));
	       }
	       else{
	           res.setHeader('Content-type','application/json');
               res.status(400).send(JSON.stringify({
                   success:false,
                   message:' invalid merchant',
                   data:[]
               }));
	       }
           
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


    search: (req,res,next)=>{
        let myReq;
         myReq = req.query;
        Merchant.findAll(
       {
         where:{
           name: {
            [Op.like]: '%'+myReq.name+'%'
          }
         }
       }
      ).then(myMerchant=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.stringify({
               success:true,
               message: 'Success',
               data: myMerchant
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

};