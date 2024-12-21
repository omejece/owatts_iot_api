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
    



     detail: (req,res,next)=>{
         let myReq;
         myReq = req.query;
         if(myReq.report_type == 1){
             
              Auth.Merchant(req.headers.token).then(myMerchant=>{
                  Consumption.findAll({
                      where: {
                        imei:myReq.imei,
                        year_taken:myReq.year,
                        merchant_id: myMerchant.id
                      }
                   }).then(myconsumptions=>{
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
         else if(myReq.report_type == 2){
             
              Auth.Merchant(req.headers.token).then(myMerchant=>{
                  Consumption.findAll({
                      where: {
                        imei:myReq.imei,
                        year_taken:myReq.year,
                        month_taken:myReq.month,
                        merchant_id: myMerchant.id
                      }
                   }).then(myconsumptions=>{
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
                message:'Invalid report type',
                data:{}
             }));
         }
                     
                        
     },
     
     
     
     
     singleConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
              Consumption.findOne({
                where: {
                  imei: myReq.imei,
                  date_taken:myReq.date,
                  merchant_id: myMerchant.id,
                  source: myReq.device_type
                }
              }).then(myconsumptions=>{
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
     
     
     
     
     allDailyConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
              Consumption.findAll({
                where: {
                  date_taken:myReq.date,
                  merchant_id: myMerchant.id,
                  device_type: myReq.device_type
                }
              }).then(myconsumptions=>{
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




     consumptionRange: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
              Consumption.findAll({
                where: {
                  merchant_id: myMerchant.id,
                  date_taken:{
                     [Op.between]:[myReq.datefrom,myReq.dateto]
                  }
                }
              }).then(myconsumptions=>{
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
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
              Consumption.findAll({
                where: {
                  date_taken:{
                    [Op.between]:[myReq.from,myReq.to]
                  },
                  merchant_id: myMerchant.id
                }
              }).then(myconsumptions=>{
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


     // consumption for blocks

     blockDetail: (req,res,next)=>{
         let myReq;
         myReq = req.query;
         if(myReq.report_type == 1){
             
              Auth.Merchant(req.headers.token).then(myMerchant=>{
                  BlockConsumption.findAll({
                      where: {
                        year_taken:myReq.year,
                        merchant_id: myMerchant.id
                      }
                   }).then(myconsumptions=>{
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
              }).catch(err=>{
                 console.log(err);
                 res.setHeader('Content-type','application/json');
                 res.status(400).json({
                     success:false,
                     message:err,
                     data:[]
                 });
              });
             
         }
         else if(myReq.report_type == 2){
             
              Auth.Merchant(req.headers.token).then(myMerchant=>{
                  BlockConsumption.findAll({
                      where: {
                        year_taken:myReq.year,
                        month_taken:myReq.month,
                        merchant_id: myMerchant.id
                      }
                   }).then(myconsumptions=>{
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
              }).catch(err=>{
                 console.log(err);
                 res.setHeader('Content-type','application/json');
                 res.status(400).json({
                     success:false,
                     message:err,
                     data:[]
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
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
               Block.findOne({
                   where:{
                     reference: myReq.reference,
                     merchant_id: myMerchant.id
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
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).json({
               success:false,
               message:err,
               data:[]
           });
        });
        
     },
     
     
     
     
     allDailyBlockConsumption: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
              BlockConsumption.findAll({
                where: {
                  date_taken:myReq.date,
                  //merchant_id: myMerchant.id
                }
              }).then(myconsumptions=>{
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
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).json({
               success:false,
               message:err,
               data:[]
           });
        });
        
     },



     blockRead: (req,res,next)=>{
        let myReq;
        myReq = req.query;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
              BlockConsumption.findAll({
                where: {
                  date_taken:{
                    [Op.between]:[myReq.from,myReq.to]
                  },
                  merchant_id: myMerchant.id
                }
              }).then(myconsumptions=>{
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
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).json({
               success:false,
               message:err,
               data:[]
           });
        });
        
     },

     

};