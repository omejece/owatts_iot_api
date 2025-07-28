require('dotenv').config();
const Sequelize = require('sequelize');
const Device = require('../../models').device;
const Block = require('../../models').block;
const ConnectedMeter = require('../../models').connectedmeter;
const CookingLog = require('../../models').cookingLog;
const Op = Sequelize.Op;



module.exports = {


	 async getCookingLogs(req,res,next){
         
         CookingLog.findAll({
         	where:{
            date_taken: req.query.date_taken
         	}
         }).then(cookingLogs=>{
         	res.setHeader('Content-type','application/json');
	        res.status(200).send({
	            success:true,
	            message:'Successful',
	            data:cookingLogs
	        });
         }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
         });

	 }

}