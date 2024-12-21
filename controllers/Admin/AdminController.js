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

const Bcrypt = require('bcrypt-nodejs');


module.exports = {

	login: (req,res,next)=>{
		var myReq = req.body;
        Admin.findOne({
           where:{
           	 email: myReq.email 
           }
        }).then(myAdmin=>{
            if(myAdmin){ 
                
                
                Bcrypt.compare(myReq.password,myAdmin.password,(err, resp)=>{
				    if(err){
				    	res.setHeader('Content-type','application/json');
			            res.status(400).send(JSON.stringify({
			               success:false,
			               message:'error ',
			               data:err
			            }));
				    }
				    else{
				        if(resp == true){
                            const token = jwt.sign(
    					      { email: myAdmin.email },
    					      process.env.TOKEN_KEY,
    					      {
    					        expiresIn: "2h",
    					      }
    					    );
                            
                            res.setHeader('Content-type','application/json');
    			            res.status(200).send(JSON.stringify({
    			               success:true,
    			               message:'Success ',
    			               data:{
    			                  token: token,
    			                  email: myAdmin.email,
    			                  name: myAdmin.name
    			               }
    			            }));
    
    				    }
    				    else{
                            res.setHeader('Content-type','application/json');
    			            res.status(400).send(JSON.stringify({
    			               success:false,
    			               message:'invalid password ',
    			               data:{}
    			            }));
    				    }
				    }




				});
            }
            else{
            	res.setHeader('Content-type','application/json');
	            res.status(400).send(JSON.stringify({
	               success:false,
	               message:'Invalid email ',
	               data:{}
	            }));
            }
        }).catch(err=>{
            console.log(err);
        	res.setHeader('Content-type','application/json');
            res.status(400).send(JSON.stringify({
               success:false,
               message:'error ',
               data:err
            }));
        });
	},



	
};