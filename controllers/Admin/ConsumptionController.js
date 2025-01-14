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
var BlockConsumption = require('../../models').blockconsumption;
const jwt = require("jsonwebtoken");
var Auth = require('../../middleware/AuthMiddleWare');
var uuid = require('uuid');
const Op = Sequelize.Op;


module.exports = {
    
    


     detail: (req,res,next)=>{
         let myReq;
         myReq = req.query;
         if(myReq.report_type == 1){
               
               let options;

               if(myReq.merchant_id){
                  options = {
                     where: {
                       imei:myReq.imei,
                       year_taken:myReq.year,
                       merchant_id: myReq.merchant_id
                     },
                     include:[{model:Device,required:true}]
                  }
               }
               else{

                  options = {
                     where: {
                       imei:myReq.imei,
                       year_taken:myReq.year
                     },
                     include:[{model:Device,required:true}]
                  }

               }

               if(myReq.block_id){
                   options.where.block_id = myReq.block_id
               }
             
               Consumption.findAll(options).then(myconsumptions=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).send(JSON.stringify({
                     success:true,
                     message:'Successfull',
                     data:myconsumptions
                  }));
               }).catch(err=>{
                  console.log(err);
                  res.setHeader('Content-type','application/json');
                  res.status(400).send(JSON.stringify({
                     success:false,
                     message:err,
                     data:{}
                  })); 
            });
             
         }
         else if(myReq.report_type == 2){
               let options;

               if(myReq.merchant_id){
                  options = {
                     where: {
                       imei:myReq.imei,
                       year_taken:myReq.year,
                       month_taken:myReq.month,
                       merchant_id: myReq.merchant_id
                     },
                     include:[{model:Device,required:true}]
                  }
               }
               else{

                  options = {
                     where: {
                       imei:myReq.imei,
                       year_taken:myReq.year,
                       month_taken:myReq.month
                     },
                     include:[{model:Device,required:true}]
                  }

               }


               if(myReq.block_id){
                  options.where.block_id = myReq.block_id
               }
             
               Consumption.findAll(options).then(myconsumptions=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).send(JSON.stringify({
                     success:true,
                     message:'Successfull',
                     data:myconsumptions
                  }));
               }).catch(err=>{
                  console.log(err);
                  res.setHeader('Content-type','application/json');
                  res.status(400).send(JSON.stringify({
                     success:false,
                     message:err,
                     data:{}
                  })); 
               });
             
         }
         else{
              res.setHeader('Content-type','application/json');
              res.status(400).send(JSON.stringify({
                success:false,
                message:'Invalid report type',
                data:{}
             }));
         }
                     
                        
     },
     
     
     
     
     singleConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        let options = {
            where: {
             imei: myReq.imei,
             date_taken:myReq.date
            },
            include:[{model:Device,required:true}]
        }
        Consumption.findOne(options).then(myconsumptions=>{
            res.setHeader('Content-type','application/json'); 
            res.status(200).json({
               success:true,
               message:'Successfull',
               data:myconsumptions
            });
            
      }).catch(err=>{
         console.log(err);
         res.setHeader('Content-type','application/json');
         res.status(400).send(JSON.stringify({
            success:false,
            message:err,
            data:{}
         })); 
      });
        
     },
     
     
     
     
     allDailyConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        let options;

         if(myReq.merchant_id){
            options = {
               where: {
                  date_taken:myReq.date,
                  merchant_id: myReq.merchant_id
               },
               include:[{model:Device,required:true}]
            }
         }
         else{

            options = {
               where: {
                  date_taken:myReq.date
               },
               include:[{model:Device,required:true}]
            }

         }


         if(myReq.block_id){
            options.where.block_id = myReq.block_id
         }
        
        Consumption.findAll(options).then(myconsumptions=>{
           res.setHeader('Content-type','application/json'); 
           res.status(200).json({
              success:true,
              message:'Successfull',
              data:myconsumptions
           });
           
       }).catch(err=>{
         console.log(err);
         res.setHeader('Content-type','application/json');
         res.status(400).send(JSON.stringify({
            success:false,
            message:err,
            data:{}
         })); 
       });
        
     },



     read: (req,res,next)=>{
            let myReq;
            myReq = req.query;

            let options;

            if(myReq.merchant_id){
               options = {
                  where: {
                     date_taken:myReq.date,
                     merchant_id: myReq.merchant_id
                  },
                  include:[{model:Device,required:true}]
               }
            }
            else{

               options = {
                  where: {
                     date_taken:myReq.date
                  },
                  include:[{model:Device,required:true}]
               }

            }


            if(myReq.block_id){
               options.where.block_id = myReq.block_id
            }
            
            Consumption.findAll(options).then(myconsumptions=>{
               res.setHeader('Content-type','application/json'); 
               res.status(200).json({
                  success:true,
                  message:'Successfull',
                  data:myconsumptions
               });
               
         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).send(JSON.stringify({
               success:false,
               message:err,
               data:{}
            })); 
         });
        
     },


    // for block



    blockDetail: (req,res,next)=>{
         let myReq;
         myReq = req.query;
         if(myReq.report_type == 1){
               
               let options;

               if(myReq.merchant_id){
                  options = {
                     where: {
                       year_taken:myReq.year,
                       merchant_id: myReq.merchant_id
                     }
                  }
               }
               else{

                  options = {
                     where: {
                       year_taken:myReq.year
                     }
                  }

               }

               if(myReq.block_id){
                   options.where.block_id = myReq.block_id
               }
             
               BlockConsumption.findAll(options).then(myconsumptions=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).json({
                     success:true,
                     message:'Successfull',
                     data:myconsumptions
                  });
               }).catch(err=>{
                  console.log(err);
                  res.setHeader('Content-type','application/json');
                  res.status(400).json({
                     success:false,
                     message:err,
                     data:{}
                  }); 
            });
             
         }
         else if(myReq.report_type == 2){
               let options;

               if(myReq.merchant_id){
                  options = {
                     where: {
                       year_taken:myReq.year,
                       month_taken:myReq.month,
                       merchant_id: myReq.merchant_id
                     }
                  }
               }
               else{

                  options = {
                     where: {
                       year_taken:myReq.year,
                       month_taken:myReq.month
                     }
                  }

               }


               if(myReq.block_id){
                  options.where.block_id = myReq.block_id
               }
             
               BlockConsumption.findAll(options).then(myconsumptions=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).json({
                     success:true,
                     message:'Successfull',
                     data:myconsumptions
                  });
               }).catch(err=>{
                  console.log(err);
                  res.setHeader('Content-type','application/json');
                  res.status(400).json({
                     success:false,
                     message:err,
                     data:{}
                  }); 
               });
             
         }
         else{
              res.setHeader('Content-type','application/json');
              res.status(400).json({
                success:false,
                message:'Invalid report type',
                data:{}
             });
         }
                     
                        
     },
     
     
     
     
     singleBlockConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Block.findOne({
           where:{
             reference: myReq.reference
           }
        }).then(myBlock=>{

            if(myBlock){
                let options = {
                     where: {
                       date_taken:myReq.date,
                       block_id: myBlock.id
                     }
                 }
                 BlockConsumption.findOne(options).then(myconsumptions=>{
                     res.setHeader('Content-type','application/json'); 
                     res.status(200).json({
                        success:true,
                        message:'Successfull',
                        data:myconsumptions
                     });
                     
               }).catch(err=>{
                  console.log(err);
                  res.setHeader('Content-type','application/json');
                  res.status(400).json({
                     success:false,
                     message:err,
                     data:{}
                  }); 
               });
           }
           else{
              res.setHeader('Content-type','application/json');
               res.status(400).json({
                  success:false,
                  message:"Invalid block reference",
                  data:{}
               }); 
           }

        }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).json({
               success:false,
               message:err,
               data:{}
            }); 
        });
        
        
     },
     
     
     
     
     allDailyBlockConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        let options;

         if(myReq.merchant_id){
            options = {
               where: {
                  date_taken:myReq.date,
                  merchant_id: myReq.merchant_id
               }
            }
         }
         else{

            options = {
               where: {
                  date_taken:myReq.date
               }
            }

         }


         if(myReq.block_id){
            options.where.block_id = myReq.block_id
         }
        
        BlockConsumption.findAll(options).then(myconsumptions=>{
           res.setHeader('Content-type','application/json'); 
           res.status(200).json({
              success:true,
              message:'Successfull',
              data:myconsumptions
           });
           
       }).catch(err=>{
         console.log(err);
         res.setHeader('Content-type','application/json');
         res.status(400).send({
            success:false,
            message:err,
            data:{}
         }); 
       });
        
     },



     blockRead: (req,res,next)=>{
            let myReq;
            myReq = req.query;

            let options;

            if(myReq.merchant_id){
               options = {
                  where: {
                     date_taken:myReq.date,
                     merchant_id: myReq.merchant_id
                  }
               }
            }
            else{

               options = {
                  where: {
                     date_taken:myReq.date
                  }
               }

            }


            if(myReq.block_id){
               options.where.block_id = myReq.block_id
            }
            
            BlockConsumption.findAll(options).then(myconsumptions=>{
               res.setHeader('Content-type','application/json'); 
               res.status(200).json({
                  success:true,
                  message:'Successfull',
                  data:myconsumptions
               });
               
         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).json({
               success:false,
               message:err,
               data:{}
            }); 
         });
        
     },


     getRangeConsumption: (req,res,next)=>{
            let options;

            if(myReq.imei && myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     block_id:myReq.block_id,
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  },
                  include:[{model:Device,required:false}]
               }
            }
            else if(!myReq.imei && myReq.block_id){
               options = {
                  where: {
                     block_id:myReq.block_id,
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  },
                  include:[{model:Device,required:false}]
               }
            }
            else if(myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  },
                  include:[{model:Device,required:false}]
               }
            }
            else if(!myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  },
                  include:[{model:Device,required:false}]
               }
            }
         
            Consumption.findAll(options).then(myconsumptions=>{
               res.setHeader('Content-type','application/json');
               res.status(200).send(JSON.stringify({
                  success:true,
                  message:'Successfull',
                  data:myconsumptions
               }));
            }).catch(err=>{
               console.log(err);
               res.setHeader('Content-type','application/json');
               res.status(400).send(JSON.stringify({
                  success:false,
                  message:err,
                  data:{}
               })); 
            });
     },


     getYearlyConsumption: (req,res,next)=>{
            let options;

            if(myReq.imei && myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     year_taken:myReq.year,
                     block_id:myReq.block_id
                  },
                  include:[{model:Device,required:false}]
               }
            }
            else if(!myReq.imei && myReq.block_id){
               options = {
                  where: {
                     year_taken:myReq.year,
                     block_id:myReq.block_id
                  },
                  include:[{model:Device,required:false}]
               }
            }
            else if(myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     year_taken:myReq.year
                  },
                  include:[{model:Device,required:false}]
               }
            }
            else if(!myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     year_taken:myReq.year
                  },
                  include:[{model:Device,required:false}]
               }
            }
         
            Consumption.findAll(options).then(myconsumptions=>{
               res.setHeader('Content-type','application/json');
               res.status(200).send(JSON.stringify({
                  success:true,
                  message:'Successfull',
                  data:myconsumptions
               }));
            }).catch(err=>{
               console.log(err);
               res.setHeader('Content-type','application/json');
               res.status(400).send(JSON.stringify({
                  success:false,
                  message:err,
                  data:{}
               })); 
            });
      },




     

};