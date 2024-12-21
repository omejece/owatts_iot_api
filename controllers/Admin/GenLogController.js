require('dotenv').config();
const Sequelize = require('sequelize');
const Device = require('../../models').device;
const Block = require('../../models').block;
const ConnectedMeter = require('../../models').connectedmeter;
const GenStartTime = require('../../models').genstarttime;
const Op = Sequelize.Op;



module.exports = {


	 async genStartTimes(req,res,next){
         
         GenStartTime.findAll({
         	where:{
         		start_date: req.query.date_taken
         	},
         	include: [{model:ConnectedMeter,required:false}]
         }).then(myGenStartTime=>{
         	res.setHeader('Content-type','application/json');
	        res.status(200).send({
	            success:true,
	            message:'Successful',
	            data:myGenStartTime
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