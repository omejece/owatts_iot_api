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
const Auth = require('../../middleware/AuthMiddleWare');
const uuid = require('uuid');
const Op = Sequelize.Op;


module.exports =  {
    

     create: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        
        Auth.Merchant(req.headers.token).then(myMerchant=>{
            Block.create({
              merchant_id: myMerchant.id,
              name: myReq.name,
              reference: uuid.v4(),
              address: myReq.address,
              capacity: myReq.capacity,
              latitude: myReq.latitude,
              longitude: myReq.longitude
            }).then(block=>{
               res.setHeader('Content-type','application/json');
               res.status(200).send(JSON.stringify({
                   success:true,
                   message:"Block successfully added",
                   data:block
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



     update: (req,res,next)=>{
          let myReq;
          myReq = req.body;

          Auth.Merchant(req.headers.token).then(myMerchant=>{
              Block.findOne({
                 where:{
                   reference: myReq.reference,
                   merchant_id: myMerchant.id
                 }
               }).then(myBlock=>{
                  if(myBlock){
                      Block.update(
                       {
                        capacity: myReq.capacity,
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
          Auth.Merchant(req.headers.token).then(myMerchant=>{
              Block.findOne({
                 where:{
                   reference: myReq.reference,
                   id: myMerchant.id
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
              Block.findOne({
                 where:{
                   reference: myReq.reference,
                   merchant_id: myMerchant.id
                 },
                 raw: true
               }).then(myBlock=>{
                  if(myBlock){
                       myBlock.data = myBlock.data;
                       res.setHeader('Content-type','application/json');
                       res.status(200).send(JSON.stringify({
                           success:true,
                           message:"successfull",
                           data:myBlock
                       }));
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
               Block.findAll({
                  where:{
                    merchant_id: myMerchant.id
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

          Auth.Merchant(req.headers.token).then(myMerchant=>{
              Block.findAll({
                 where:{
                   reference: {
                    [Op.like]: '%'+myReq.reference+'%'
                   },
                   merchant_id: myMerchant.id
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