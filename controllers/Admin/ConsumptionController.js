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
var http = require('http');


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
            let myReq;
            myReq = req.query;
            let options;
            if(myReq.imei && myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     block_id:myReq.block_id,
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  }
               }
            }
            else if(!myReq.imei && myReq.block_id){
               options = {
                  where: {
                     block_id:myReq.block_id,
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  }
               }
            }
            else if(myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  }
               }
            }
            else if(!myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     date_taken:{
                        [Op.between]:[myReq.fromDate,myReq.toDate]
                     }
                  }
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
            let myReq;
            myReq = req.query;
            let options;

            if(myReq.imei && myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     year_taken:myReq.year,
                     block_id:myReq.block_id
                  }
               }
            }
            else if(!myReq.imei && myReq.block_id){
               options = {
                  where: {
                     year_taken:myReq.year,
                     block_id:myReq.block_id
                  }
               }
            }
            else if(myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     imei:myReq.imei,
                     year_taken:myReq.year
                  }
               }
            }
            else if(!myReq.imei && !myReq.block_id){
               options = {
                  where: {
                     year_taken:myReq.year
                  }
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
      

      reconcileWithOwatts: async (req, res, next) => {
         const myReq = req.body;
     
         try {
           if (myReq.password !== "cceeoo33@@##") {
             return res.status(403).json({
               success: false,
               message: "unauthorized",
               data: {},
             });
           }
     
           const options = {
             hostname: "app.owatts.io",
             path: `/api/v1/iot_devices?start=${myReq.start}&end=${myReq.end}`,
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               // "Authorization": "Bearer YOUR_API_KEY",
             },
           };
     
           // Make HTTPS request
           const apiReq = https.request(options, (apiRes) => {
             let data = "";
     
             apiRes.on("data", (chunk) => {
               data += chunk;
             });
     
             apiRes.on("end", async () => {
               try {
                 const myData = JSON.parse(data);
                 console.log(myData); 
                 console.log(" ################################### dhdhdh ##############################");
                 // If the API returns an array
                 if (Array.isArray(myData)) {
                   for (const myDeviceConsumption of myData) {
                     const imei = myDeviceConsumption.imei;
                     const totalConsumption = myDeviceConsumption.totalConsumption || 0;
                     const adjustedConsumption = totalConsumption - totalConsumption * 0.2;
     
                     const seenDevice = await Device.findOne({ where: { imei } });
                     if (seenDevice) {
                       const myDeviceData = seenDevice.data;
                       myDeviceData.cummulative_total_energy =
                         (myDeviceData.cummulative_total_energy || 0) + adjustedConsumption;
     
                       await Device.update(
                         { data: myDeviceData },
                         { where: { imei } }
                       );
                     }
                   }
                 }
     
                 return res.status(200).json({
                   success: true,
                   message: "Successful",
                   data: myData,
                 });
               } catch (err) {
                 console.error("⚠️ Failed to parse response:", err);
                 return res.status(500).json({
                   success: false,
                   message: "Failed to parse API response",
                   data: {},
                 });
               }
             });
           });
     
           apiReq.on("error", (err) => {
             console.error("🚫 API request error:", err.message);
             return res.status(500).json({
               success: false,
               message: "Failed to reach remote API",
               data: {},
             });
           });
     
           apiReq.end();
         } catch (err) {
           console.error("🔥 Server error:", err);
           return res.status(400).json({
             success: false,
             message: err.message || "Unexpected error",
             data: {},
           });
         }
       },


       removeErrorBulkCons: async (req, res, next) => {
         const myReq = req.body;
     
         try {
           if (myReq.password !== "cceeoo33@@##") {
             return res.status(403).json({
               success: false,
               message: "unauthorized",
               data: {},
             });
           }
     
           const options = {
             hostname: "app.owatts.io",
             path: `/api/v1/iot_devices?start=${myReq.start}&end=${myReq.end}`,
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               // "Authorization": "Bearer YOUR_API_KEY",
             },
           };
     
           // Make HTTPS request
           const apiReq = https.request(options, (apiRes) => {
             let data = "";
     
             apiRes.on("data", (chunk) => {
               data += chunk;
             });
     
             apiRes.on("end", async () => {
               try {
                 const myData = JSON.parse(data);
                 console.log(myData); 
                 console.log(" ################################### dhdhdh ##############################");
                 // If the API returns an array
                 if (Array.isArray(myData)) {
                   for (const myDeviceConsumption of myData) {
                     const imei = myDeviceConsumption.imei;
                     const totalConsumption = myDeviceConsumption.totalConsumption || 0;
                     const adjustedConsumption = totalConsumption - totalConsumption * 0.2;
     
                     const seenDevice = await Device.findOne({ where: { imei } });
                     if (seenDevice) {
                       const myDeviceData = seenDevice.data;
                       myDeviceData.cummulative_total_energy =
                         (myDeviceData.cummulative_total_energy || 0) - adjustedConsumption;
     
                       await Device.update(
                         { data: myDeviceData },
                         { where: { imei } }
                       );
                     }
                   }
                 }
     
                 return res.status(200).json({
                   success: true,
                   message: "Successful",
                   data: myData,
                 });
               } catch (err) {
                 console.error("⚠️ Failed to parse response:", err);
                 return res.status(500).json({
                   success: false,
                   message: "Failed to parse API response",
                   data: {},
                 });
               }
             });
           });
     
           apiReq.on("error", (err) => {
             console.error("🚫 API request error:", err.message);
             return res.status(500).json({
               success: false,
               message: "Failed to reach remote API",
               data: {},
             });
           });
     
           apiReq.end();
         } catch (err) {
           console.error("🔥 Server error:", err);
           return res.status(400).json({
             success: false,
             message: err.message || "Unexpected error",
             data: {},
           });
         }
       },


       getRangeSumConsumption: (req,res,next)=>{
         let myReq;
         myReq = req.query;
         
         let options = {
            attributes: [
              'imei',
      
              // Individual sums
              [
                Sequelize.literal(
                  'SUM(CAST(data->>\'grid_consumption\' AS DOUBLE PRECISION))'
                ),
                'grid_consumption'
              ],
              [
                Sequelize.literal(
                  'SUM(CAST(data->>\'gen_consumption\' AS DOUBLE PRECISION))'
                ),
                'gen_consumption'
              ],
              [
                Sequelize.literal(
                  'SUM(CAST(data->>\'battery_consumption\' AS DOUBLE PRECISION))'
                ),
                'battery_consumption'
              ],
              [
                Sequelize.literal(
                  'SUM(CAST(data->>\'solar_consumption\' AS DOUBLE PRECISION))'
                ),
                'solar_consumption'
              ],
              [
                Sequelize.literal(
                  'SUM(CAST(data->>\'total_consumption\' AS DOUBLE PRECISION))'
                ),
                'total_consumption'
              ],
            ],
            where: {
              day_taken: {
                [Op.between]: [myReq.fromDate, myReq.toDate],
              },
            },
            group: ['imei'],
            raw: true,
         }


         

         Consumption.findAll(options).then(myconsumptions=>{
            res.setHeader('Content-type','application/json');
            res.status(200).send(JSON.stringify({
               success:true,
               message:'Successfull',
               data: myconsumptions
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
     



     

};