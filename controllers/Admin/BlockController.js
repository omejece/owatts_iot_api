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
    

     create: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        
        Block.create({
            merchant_id: myReq.merchant,
            name: myReq.name,
            reference: uuid.v4(),
            address: myReq.address,
            capacity: myReq.capacity,
            latitude: myReq.latitude,
            longitude: myReq.longitude,
            data: {}
          }).then(block=>{
             console.log(block);
             res.setHeader('Content-type','application/json');
             res.status(200).json({
                 success:true,
                 message:"Block successfully added",
                 data:block
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

          Block.findOne({
            where:{
              reference: myReq.reference,
              merchant_id: myReq.merchant
            }
          }).then(myBlock=>{
             if(myBlock){
                 Block.update(
                  {
                    merchant_id: myReq.merchant,
                    name: myReq.name,
                    address: myReq.address,
                    capacity: myReq.capacity,
                    latitude: myReq.latitude,
                    longitude: myReq.longitude,
                    data: myBlock.data
                  },
                  {
                   where:{
                     reference: myReq.reference
                   }
                  }
                 ).then(block=>{
                    res.setHeader('Content-type','application/json');
                    res.status(200).send(JSON.stringify({
                        success:true,
                        message:"Block successfully updated",
                        data:[]
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
                    message:"Invalid block",
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



     delete: (req,res,next)=>{
          let myReq;
          myReq = req.body;
          Block.findOne({
            where:{
              reference: myReq.reference
            }
          }).then(myBlock=>{
             if(myBlock){
                 Block.destroy(
                  {
                   where:{
                     reference: myReq.reference
                   }
                  }
                 ).then(block=>{
                    res.setHeader('Content-type','application/json');
                    res.status(200).send(JSON.stringify({
                        success:true,
                        message:"Block successfully removed",
                        data:[]
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
                    message:"Invalid block",
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



     detail: (req,res,next)=>{
          let myReq;
          myReq = req.query;

          Block.findOne({
            where:{
              reference: myReq.reference
            },
            raw: true
          }).then(myBlock=>{
             if(myBlock){
                  Merchant.findOne({
                     where:{
                        id: myBlock.merchant_id 
                     }
                  }).then(merchant=>{
                        myBlock.data = JSON.parse(myBlock.data);
                        myBlock.merchant = merchant;
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


             }
             else{
                res.setHeader('Content-type','application/json');
                res.status(400).send(JSON.stringify({
                    success:false,
                    message:"Invalid block",
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




     read: (req,res,next)=>{
           let myReq;
           myReq = req.query;
           let options;
           if(myReq.merchant_id){
              options = {
                    where:{
                       merchant_id: myReq.merchant_id
                    }
                }
           }

            Block.findAll(options).then(myBlock=>{
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
         
     },



     search: (req,res,next)=>{
          let myReq;
          myReq = req.query;

          Block.findAll({
            where:{
              reference: {
               [Op.like]: '%'+myReq.reference+'%'
              },
              merchant_id: myReq.merchant
            }
          }).then(myBlock=>{
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
      
     },


     blockDevices: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        Block.findOne({
          where:{
            reference: myReq.reference
          },
          raw: true
        }).then(myBlock=>{
           if(myBlock){

                Device.findAll({
                    where:{
                        block_id: myBlock.id
                    }
                }).then(myDevices=>{

                    res.setHeader('Content-type','application/json');
                    res.status(200).send(JSON.stringify({
                        success:true,
                        message:"successfull",
                        data:myDevices
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
                  message:"Invalid block",
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
 

}