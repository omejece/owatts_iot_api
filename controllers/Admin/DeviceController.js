require('dotenv').config();
var Sequelize = require('sequelize');
var Block = require('../../models').block;
var Consumption = require('../../models').consumption;
var Device = require('../../models').device;
var DeviceAlarm = require('../../models').devicealarm;
var DeviceList = require('../../models').devicelist;
var DeviceSetting = require('../../models').devicesetting;

var DeviceType = require('../../models').devicetype;

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

        DeviceList.findOne({
            where:{
                imei: myReq.imei
            }
         }).then(devList=>{
            if(devList){
                if(devList.status === 0){
                    
                    Block.findOne({
                        where:{
                            reference: myReq.block_reference
                        }
                    }).then(myBlock=>{
                        if(myBlock){
                            
                            if(devList.device_type == 1){

                                var data = {
                                    "software_version": "",
                                    "simcard_iccd": "",
                                    "frequency": "0",
                                    "meter_type": devList.meter_type,
                                    "total_powerfactor": "0",
                                    "powerfactora": "0",
                                    "powerfactorb": "0",
                                    "powerfactorc": "0",
                                    "voltagea": "0",
                                    "voltageb": "0",
                                    "voltagec": "0",
                                    "currenta": "0",
                                    "currentb": "0",
                                    "currentc": "0",
                                    "total_activepower": "0",
                                    "activepowera": "0",
                                    "activepowerb": "0",
                                    "activepowerc": "0",
                                    "totalreactivepower": "0",
                                    "reactivepowera": "0",
                                    "reactivepowerb": "0",
                                    "reactivepowerc": "0",
                                    "cummulative_total_energy": "0",
                                    "cummulative_top_energy": "0",
                                    "cummulative_peak_energy": "0",
                                    "cummulative_flat_energy": "0",
                                    "cummulative_bottom_energy": "0",
                                    "source": "1",
                                    "control": "1",
                                    "output": "0",
                                    "disabled": "0",
                                    "ip_address": myReq.ip_address,
                                    "port": myReq.port,
                                    "ssid": myReq.ssid,
                                    "password": myReq.password,
                                };
                                
                                
                                var settings = {};
                               
                                Device.create(
                                   {
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: settings,
                                  },
                                  {
                                     include:["devicetype"]
                                  }
                                ).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
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
                                             message:'device successfully added',
                                             data:myDevice
                                         }));
                                     }).catch(err=>{
                                        console.log(err);
                                         res.setHeader('Content-type','application/json');
                                         res.status(400).send(JSON.stringify({
                                             success:false,
                                             message:'Invalid device',
                                             data:{}
                                         }));   
                                     })
                                        
                                }).catch(err=>{
                                    console.log(err);
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });

                            }
                            else if(devList.device_type == 2){
                                
                                var data = {
                                  "tableno":"",
                                  "size":myReq.size,
                                  "battery":"0",
                                  "signal_strength":"0",
                                  "signal_noise_ratio":"0",
                                  "temperature":"0",
                                  "longitude": myReq.longitude,
                                  "latitude": myReq.latitude,
                                  "valve":0,
                                  "output":0,
                                  "control":0,
                                  "disabled":"0",
                                  "cummulative_flow":0,
                                  "total_purchase":0,
                                  "available_gas":0,
                                  "recharged_data":0
                                }
                                
                                Device.create({
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: {},
                                }).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
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
                                             message:'device successfully added',
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
                                        
                                }).catch(err=>{
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });

                            }
                            else if(devList.device_type == 3){

                                var data = {
                                    control:0,
                                    points:{
                                       point1:{output:0,voltage:0,current:0,activepower:0},
                                       point2:{output:0,voltage:0,current:0,activepower:0},
                                       point3:{output:0,voltage:0,current:0,activepower:0},
                                       point4:{output:0,voltage:0,current:0,activepower:0},
                                       point5:{output:0,voltage:0,current:0,activepower:0},
                                       point6:{output:0,voltage:0,current:0,activepower:0},
                                       point7:{output:0,voltage:0,current:0,activepower:0},
                                       point8:{output:0,voltage:0,current:0,activepower:0}
                                    }
                                };
                                
                                Device.create({
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: {}
                                }).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
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
                                             message:'device successfully added',
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
                                        
                                }).catch(err=>{
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });

                            }
                            else if(devList.device_type == 4){

                                var data = {
                                    "output":"0",
                                    "control":"0",
                                };

                                Device.create({
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: {},
                                }).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
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
                                             message:'device successfully added',
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
                                        
                                }).catch(err=>{
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });
                            }
                            else if(devList.device_type == 5){

                                var data = {
                                    "output": "0",
                                    "control": "0"
                                };

                                Device.create({
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: {},
                                }).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
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
                                             message:'device successfully added',
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
                                        
                                }).catch(err=>{
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });

                            }
                            else if(devList.device_type == 6){

                                var data = {
                                    "number_of_slaves":myReq.number_of_slaves
                                };

                                Device.create({
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: {},
                                }).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
                                      },
                                      {
                                        where:{
                                            imei: myReq.imei
                                        }
                                      }
                                     ).then(()=>{
                                         res.setHeader('Content-type','application/json');
                                         res.status(200).send(JSON.parse({
                                             success:true,
                                             message:'device successfully added',
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
                                        
                                }).catch(err=>{
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });

                            }
                            else if(devList.device_type == 7){

                                var data = {
                                    "address": myReq.address,
                                    "state": "1",
                                    "vpv1": "0",
                                    "vpv2": "0",
                                    "vpv3": "0",
                                    "vbat": "0",
                                    "soc": "0",
                                    "soh": "0",
                                    "ppv1": "0",
                                    "ppv2": "0",
                                    "ppv3": "0",
                                    "pcharge": "0",
                                    "pdischarge": "0",
                                    "vacr": "0",
                                    "vacs": "0",
                                    "vact": "0",
                                    "fac": "0",
                                    "pinv": "0",
                                    "prec": "0",
                                    "linvrms": "0",
                                    "pf": "0",
                                    "vepsr": "0",
                                    "vepss": "0",
                                    "vepst": "0",
                                    "feps": "0",
                                    "peps": "0",
                                    "seps": "0",
                                    "ptogrid": "0",
                                    "ptouser": "0",
                                    "epv1_day": "0",
                                    "epv2_day": "0",
                                    "epv3_day": "0",
                                    "einv_day": "0",
                                    "erec_day": "0",
                                    "echg_day": "0",
                                    "edischg_day": "0",
                                    "eeps_day": "0",
                                    "etogrid_day": "0",
                                    "etouser_day": "0",
                                    "vbus1": "0",
                                    "vbus2": "0",
                                    "epv1_all": "0",
                                    "epv2_all": "0",
                                    "epv3_all": "0",
                                    "einv_all": "0",
                                    "erec_all": "0",
                                    "echg_all": "0",
                                    "edischg_all": "0",
                                    "eeps_all": "0",
                                    "etogrid_all": "0",
                                    "etouser_all": "0",
                                    "fault_code": "0",
                                    "warning_code": "0",
                                    "tinner": "0"
                                };

                                Device.create({
                                    block_id: myBlock.id,
                                    imei: myReq.imei,
                                    device_type: devList.device_type,
                                    device_link_imei: myReq.device_link_imei,
                                    merchant_id: myReq.merchant,
                                    data: data,
                                    flags: {"is_control":"0","is_disabled": "0","is_setting": "0"},
                                    settings: {},
                                }).then(myDevice=>{

                                     DeviceList.update(
                                      {
                                        status: 1
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
                                             message:'device successfully added',
                                             data:{}
                                         }));
                                     }).catch(err=>{
                                        console.log(err);
                                         res.setHeader('Content-type','application/json');
                                         res.status(400).send(JSON.stringify({
                                             success:false,
                                             message:'Invalid device',
                                             data:{}
                                         }));   
                                     })
                                        
                                }).catch(err=>{
                                    console.log(err);
                                     res.setHeader('Content-type','application/json');
                                     res.status(400).send(JSON.stringify({
                                         success:false,
                                         message:'Invalid device',
                                         data:{}
                                     }));   
                                });

                            }
                            

                        }
                        else{
                             res.setHeader('Content-type','application/json');
                             res.status(400).send(JSON.stringify({
                                 success:false,
                                 message:'Invalid block',
                                 data:{}
                             }));
                        }
                    }).catch(err=>{
                        console.log(err);
                        res.setHeader('Content-type','application/json');
                        res.status(400).send(JSON.stringify({
                            success:false,
                            message:'Error addind device 1',
                            data:err
                        }));
                    });

                }
                else{
                     res.setHeader('Content-type','application/json');
                     res.status(400).send(JSON.stringify({
                         success:false,
                         message:'Device already in use',
                         data:{}
                     }));
                }
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
             console.log(err);
             res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device 2',
                 data:{}
             }));
         })
         
     },




     update: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        DeviceList.findOne({
            where:{
                imei: myReq.imei
            }
         }).then(devList=>{
            if(devList){
                Block.findOne({
                    where:{
                        reference: myReq.block_reference
                    }
                }).then(myBlock=>{
                    if(myBlock){

                        Device.findOne({
                           where:{
                              imei: myReq.imei
                           }
                        }).then(myDevice=>{

                            if(myDevice) {

                                if(devList.device_type == 1){
                                    mydata = myDevice.data;
                                    mydata.ip_address = myReq.ip_address;
                                    mydata.ssid = myReq.ssid;
                                    mydata.password = myReq.password;
                                    mydata.meter_type = devList.meter_type;
                                    
                                    var setings = {};

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        device_link_imei: myReq.device_link_imei,
                                        block_id: myBlock.id,
                                        data: mydata,
                                        flags: myDevice.flags,
                                        settings: myDevice.settings
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
                                         res.setHeader('Content-type','application/json');
                                         res.status(200).send(JSON.stringify({
                                             success:true,
                                             message:'device successfully updated',
                                             data:{}
                                         }));   
                                    }).catch(err=>{
                                        console.log(err);
                                         res.setHeader('Content-type','application/json');
                                         res.status(400).send(JSON.stringify({
                                             success:false,
                                             message:'Invalid device',
                                             data:{}
                                         }));   
                                    })

                                }
                                else if(devList.device_type == 2){

                                    mydata = myDevice.data;
                                    mydata.size = myReq.size;
                                    mydata.longitude = myReq.longitude;
                                    mydata.latitude = myReq.latitude;

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        device_link_imei: myReq.device_link_imei,
                                        data: mydata,
                                        flags: myDevice.flags,
                                        block_id: myBlock.id,
                                        settings: myDevice.settings
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
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
                                else if(devList.device_type == 3){

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        device_link_imei: myReq.device_link_imei,
                                        block_id: myBlock.id
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
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
                                else if(devList.device_type == 4){

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        block_id: myBlock.id,
                                        device_link_imei: myReq.device_link_imei
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
                                         res.setHeader('Content-type','application/json');
                                         res.status(200).send(JSON.stringify({
                                             success:true,
                                             message:'device successfully updated',
                                             data:{}
                                         }));   
                                    }).catch(err=>{
                                        console.log(err);
                                         res.setHeader('Content-type','application/json');
                                         res.status(400).send(JSON.stringify({
                                             success:false,
                                             message:'Invalid device',
                                             data:{}
                                         }));   
                                    })
                                    
                                }
                                else if(devList.device_type == 5){

                                    mydata = myDevice.data;
                                    mydata.cons_at_no_load = myReq.cons_at_no_load;
                                    mydata.fuel_cost_per_litre = myReq.fuel_cost_per_litre;
                                    mydata.fuel_cons_rate = myReq.fuel_cons_rate;
                                    mydata.capacity = myReq.capacity;

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        device_link_imei: myReq.device_link_imei,
                                        data: mydata,
                                        settings: myDevice.settings,
                                        block_id: myBlock.id,
                                        flags: myDevice.flags
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
                                         res.setHeader('Content-type','application/json');
                                         res.status(200).send(JSON.stringify({
                                                 success:true,
                                             message:'device successfully updated',
                                             data:{}
                                         }));   
                                    }).catch(err=>{
                                         console.log(err);
                                         res.setHeader('Content-type','application/json');
                                         res.status(400).send(JSON.stringify({
                                             success:false,
                                             message:'Invalid device',
                                             data:{}
                                         }));   
                                    })
                                    
                                }
                                else if(devList.device_type == 6){

                                    mydata = myDevice.data;
                                    mydata.number_of_slaves = myReq.number_of_slaves;

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        device_link_imei: myReq.device_link_imei,
                                        data: mydata,
                                        block_id: myBlock.id,
                                        settings: myDevice.settings,
                                        flags: myDevice.flags
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
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
                                else if(devList.device_type == 7){

                                    mydata = myDevice.data;
                                    mydata.address = myReq.address;

                                    Device.update(
                                      {
                                        device_type: devList.device_type,
                                        device_link_imei: myReq.device_link_imei,
                                        data: mydata,
                                        flags: myDevice.flags,
                                        block_id: myBlock.id,
                                        settings: myDevice.settings
                                      },
                                      {
                                        where:{
                                           imei: myReq.imei,
                                           merchant_id: myReq.merchant
                                        }
                                      }
                                    ).then(myDevice=>{
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
                            console.log(err);
                            res.setHeader('Content-type','application/json');
                            res.status(400).send(JSON.stringify({
                                success:false,
                                message:'error',
                                data:{}
                            }));
                        });
                        
                    }
                    else{
                         res.setHeader('Content-type','application/json');
                         res.status(400).send(JSON.stringify({
                             success:false,
                             message:'Invalid block',
                             data:""
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
             console.log(err);
             res.setHeader('Content-type','application/json');
             res.status(400).send(JSON.stringify({
                 success:false,
                 message:'Error addind device',
                 data:err
             }));
         })
         
     },





     delete: (req,res,next)=>{
     	let myReq;
        myReq = req.body;

        Device.findOne({
            where:{
               imei: myReq.imei
            }
         }).then(myDevice=>{
             if(myDevice){
                 Device.destroy({
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
         
     },



     read: (req,res,next)=>{
     	let myReq = req.query;
        let options;

        if(myReq.merchant_id){
            options = {
                where:{
                  merchant_id: myReq.merchant_id
                }
            };
        }

        if(myReq.block_id){
            options = {
                where:{
                  block_id: myReq.block_id
                }
            };
        }

        Device.findAll(options).then(myDevices=>{
            res.setHeader('Content-type','application/json');
            res.status(200).send(JSON.stringify({
                success:true,
                message:'successfull',
                data:myDevices
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
         
     },
     
     
     
     refillGas:  (req,res,next)=>{
     	let myReq;
        myReq = req.body;

         Device.findOne({
            where:{
              imei: myReq.imei
            },
            raw: true
         }).then(myDevice=>{
              var deviceData = myDevice.data;
              deviceData.available_gas = deviceData.size;
              
              Device.update(
                  {
                    data: deviceData,
                    flags: myDevice.flags,
                    settings: myDevice.settings
                  },
                  {
                    where:{
                        imei: myDevice.imei
                    }
                  }
              ).then(()=>{
                  
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
              
          }).catch(err=>{
              console.log(err);
              res.setHeader('Content-type','application/json');
              res.status(400).send(JSON.stringify({
                  success:false,
                  message:'Error addind device',
                  data:err
              }));
          })
         
     },


     detail: (req,res,next)=>{
     	let myReq;
        myReq = req.query;

        if(myReq.imei.startsWith("250")){
            var myImei = myReq.imei.substring(0,(myReq.imei.length-2));
            var myPoint = myReq.imei.substring(myReq.imei.length-2,myReq.imei.length);
            Device.findOne({
                where:{
                   imei: myImei
                },
                raw: true,
                include:[{model:Block, as:'block'}]
             }).then(myDevice=>{
                 if(myDevice){

                     myDevice.data = JSON.parse(myDevice.data);
                     myDevice.flags = JSON.parse(myDevice.flags);
                     myDevice.settings = JSON.parse(myDevice.settings);
                     //myDevice.block.data = JSON.parse(myDevice.block.data);
                     
                     var output = 0;
                     var myCurrOutPut = (myDevice.data.output/1);
                     var point = (myPoint/1) - 1;
                     var currentOutput = [((myCurrOutPut >> 24) & 0xff),((myCurrOutPut >> 16) & 0xff),((myCurrOutPut >> 8) & 0xff),((myCurrOutPut >> 0) & 0xff)];
                     if(point <= 8){
                        output = currentOutput[3] & (1 << point);
                     }
                     else if(point > 8 && point <= 16){
                        output = currentOutput[2] & (1 << (point - 8));
                     }
                     else if(point > 16 && point <= 24){
                        output = currentOutput[1] & (1 << (point - 16));
                     }
                     else if(point > 24 && point <= 32){
                        output = currentOutput[0] & (1 << (point - 24));
                     }

                     myDevice.data.output = output > 0 ? 0 : 1;

                     Device.findOne({
                        where:{
                            block_id: myDevice.block_id,
                            device_type: 7
                        },
                        raw: true
                     }).then((myInverter)=>{
                         if(myInverter){
                            myInverter.data = typeof myInverter.data == 'string' ? JSON.parse(myInverter.data) : myInverter.data;
                            myInverter.flags = typeof myInverter.flags == 'string' ? JSON.parse(myInverter.flags) : myInverter.flags;
                            myInverter.settings = typeof myInverter.settings == 'string' ? JSON.parse(myInverter.settings) : myInverter.settings;
                            myDevice.inverter = myInverter;
                         }
                         res.status(200).send({
                             success:true,
                             message:'successfull',
                             data:myDevice
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
                 else{
                     res.setHeader('Content-type','application/json');
                     res.status(400).send(JSON.stringify({
                         success:false,
                         message:'Invalid imei number',
                         data:{}
                     }));
                 }
             }).catch(err=>{
                 console.log(err);
                 res.setHeader('Content-type','application/json');
                 res.status(400).send({
                     success:false,
                     message:'Error viewing device device',
                     data:err
                 });
             })
        }
        else{

            Device.findOne({
                where:{
                   imei: myReq.imei
                },
                include:[{model:Block,'as':'block'}],
                raw:true
             }).then(myDevice=>{
                 if(myDevice){
                     
                     myDevice.data = typeof myDevice.data == 'string' ? JSON.parse(myDevice.data) : myDevice.data;
                     myDevice.flags = typeof myDevice.flags == 'string' ? JSON.parse(myDevice.flags) : myDevice.flags;
                     myDevice.settings = typeof myDevice.settings == 'string' ? JSON.parse(myDevice.settings) : myDevice.settings;
                     myDevice.block.data = typeof myDevice.block.data == 'string' ? JSON.parse(myDevice.block.data) : myDevice.block.data;
    
                     Device.findOne({
                        where:{
                            block_id: myDevice.block_id,
                            device_type: 7
                        },
                        raw: true
                     }).then((myInverter)=>{
                         if(myInverter){
                            myInverter.data = typeof myInverter.data == 'string' ? JSON.parse(myInverter.data) : myInverter.data;
                            myInverter.flags = typeof myInverter.flags == 'string' ? JSON.parse(myInverter.flags) : myInverter.flags;
                            myInverter.settings = typeof myInverter.settings == 'string' ? JSON.parse(myInverter.settings) : myInverter.settings;
                            myDevice.inverter = myInverter;
                         }
                         res.status(200).send({
                             success:true,
                             message:'successfull',
                             data:myDevice
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
                 else{
                     res.setHeader('Content-type','application/json');
                     res.status(400).send(JSON.stringify({
                         success:false,
                         message:'Invalid imei number',
                         data:{}
                     }));
                 }
             }).catch(err=>{
                 console.log(err);
                 res.setHeader('Content-type','application/json');
                 res.status(400).send({
                     success:false,
                     message:'Error viewing device device',
                     data:err
                 });
             })

        } 
     },



     search: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        Device.findAll({
            where:{
             imei: {
              [Op.like]: '%'+myReq.imei+'%'
             }
            }
         }).then(myDevice=>{
             res.setHeader('Content-type','application/json');
             res.status(200).send(JSON.stringify({
                 success:true,
                 message:'successfull',
                 data:myDevice
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
         
     },


     buyUnit: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        Auth.Merchant(req.headers.token).then(myMerchant=>{
             Device.findOne({
                where:{
                   imei: myReq.imei
                }
             }).then(myDevice=>{
                 if(myDevice){
                     if(myDevice.device_type == 1 ){

                         var myDeviceData = myDevice.data;
                         myDeviceData.available_unit = (myDeviceData.available_unit/1) + (myReq.recharged_unit/1);
                         
                         Device.findOne(
                           {
                            data: myDeviceData,
                            flags: myDevice.flags,
                            settings: myDevice.settings
                           },
                           {
                            where:{
                               imei: myReq.imei
                            }
                           }
                         ).then(()=>{

                             res.setHeader('Content-type','application/json');
                             res.status(200).send({
                                 success:true,
                                 message:'successfully recharged',
                                 data:{available_unit:myDeviceData,recharged_unit:myReq.recharged_unit}
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
                     else if(myDevice.device_type == 2){
                             var myDeviceData = myDevice.data;
                             var myDeviceFlags = myDevice.flags;
                             var newData = {...myDeviceData,recharged_data:(myReq.recharged_unit/1)};
                             var newFlag = {...myDeviceFlags,is_recharged: 1};
                             
                             Device.update(
                               {
                                data: newData,
                                flags: newFlag,
                                settings: myDevice.settings
                               },
                               {
                                where:{
                                   imei: myReq.imei
                                }
                               }
                             ).then(()=>{
    
                                 res.setHeader('Content-type','application/json');
                                 res.status(200).send({
                                     success:true,
                                     message:'successfully recharged',
                                     data:{available_unit:myDeviceData,recharged_unit:myReq.recharged_unit}
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
                        vres.setHeader('Content-type','application/json');
                         res.status(400).send(JSON.stringify({
                             success:false,
                             message:"you can't buy unut for this device its not a prepaid meter of kike",
                             data:{}
                         }));
                     }
                     
                 }
                 else{
                     res.setHeader('Content-type','application/json');
                     res.status(400).send(JSON.stringify({
                         success:false,
                         message:'Invalid imei number',
                         data:{}
                     }));
                 }
             }).catch(err=>{
                 console.log(err);
                 res.setHeader('Content-type','application/json');
                 res.status(400).send(JSON.stringify({
                     success:false,
                     message:'Error viewing device device',
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
      


      generatorRuntime: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        Runtime.findAll({
            where:{
                date_taken: myReq.date_taken,
                imei: myReq.imei
            },
            raw: true
        }).then(runtime=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.parse({
               success:true,
               message:'Successful',
               data:runtime
           }));
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },




     generatorRuntimes: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        Runtime.findAll({
            where:{
                imei: myReq.imei,
                date_taken:{
                    [Op.between]:[myReq.date_from,myReq.date_to]
                }
            },
            raw: true
        }).then(runtime=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.parse({
               success:true,
               message:'Successful',
               data:runtime
           }));
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },




     generatorLog: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        GenLog.findAll({
            where:{
                date_taken: myReq.date_taken,
                imei: myReq.imei
            },
            order: [
                ['id', 'DESC']
            ],
            raw: true
        }).then(mylog=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.parse({
               success:true,
               message:'Successful',
               data:mylog
           }));
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },




     generatorLogs: (req,res,next)=>{
        let myReq;
        myReq = req.query;

        GenLog.findAll({
            where:{
                imei: myReq.imei,
                date_taken:{
                    [Op.between]:[myReq.date_from,myReq.date_to]
                }
            },
            order: [
                ['id', 'DESC']
            ],
            raw: true
        }).then(mylog=>{
           res.setHeader('Content-type','application/json');
           res.status(200).send(JSON.parse({
               success:true,
               message:'Successful',
               data:mylog
           }));
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     
     deviceTypeDetail: (req,res,next)=>{
         let myReq;
         myReq = req.query;

         DeviceType.findOne({
             where:{
                 id: myReq.device_type_no
             }
         }).then(myDeviceTpe=>{
             if(myDeviceTpe){
               res.setHeader('Content-type','application/json');
               res.status(200).send(JSON.parse({
                   success:true,
                   message:'Successful',
                   data:myDeviceTpes
               }));
             }
             else{
                 
                res.setHeader('Content-type','application/json');
                res.status(400).send({
                   success:false,
                   message:'invalid device number',
                   data:[]
                });
                 
             }
           
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     
     
     allDeviceTypes: (req,res,next)=>{
         let myReq;
         myReq = req.query;

         DeviceType.findAll().then(myDeviceTpes=>{
           res.setHeader('Content-type','application/json');
           res.status(400).send(JSON.parse({
               success:true,
               message:'Successful',
               data:myDeviceTpes
           }));
        }).catch(err=>{
           console.log(err);
           res.setHeader('Content-type','application/json');
           res.status(400).send({
               success:false,
               message:err,
               data:[]
           });
        });
         
     },
     
     disableDevice: (req,res,next)=>{
        /* console.log("*****owatts request to off meter Admin*******");
         console.log("*****Ip Log Admin*******");
         console.log(req);
         const clientIP = req.ip || req.connection.remoteAddress;
         console.log(clientIP);
          res.setHeader('Content-type','application/json');
                     res.status(401).send({
                      success:false,
                      message:'Not authorized',
                      data:[]
                     });
                     return 0;*/
         let myReq;
         myReq = req.body;
         if(myReq.imei.startsWith("250")){
            var myImei = myReq.imei.substring(0,(myReq.imei.length-2));
            var myPoint = myReq.imei.substring(myReq.imei.length-2,myReq.imei.length);

            Device.findOne({
                where:{
                  imei: myImei
                }
             }).then(myDevice=>{
                 if(myDevice){
                     myDevice.settings.control = myDevice.settings.control ? myDevice.settings.control : 0;
                     var myCurrControl = (myDevice.settings.control/1);
                     var point = (myPoint/1) - 1;
                     var currentControl = [((myCurrControl >> 24) & 0xff),((myCurrControl >> 16) & 0xff),((myCurrControl >> 8) & 0xff),((myCurrControl >> 0) & 0xff)];
                     if(point <= 8){
                         currentControl[3] = currentControl[3] & ~(1 << point);
                     }
                     else if(point > 8 && point <= 16){
                        currentControl[2] = currentControl[2] & ~(1 << (point - 8));
                     }
                     else if(point > 16 && point <= 24){
                        currentControl[1] = currentControl[1] & ~(1 << (point - 16));
                     }
                     else if(point > 24 && point <= 32){
                        currentControl[0] = currentControl[0] & ~(1 << (point - 24));
                     }
                     var h16 = ((currentControl[0]) << 8) | (currentControl[1] << 0);
                     var L16 = ((currentControl[2]) << 8) | (currentControl[3] << 0);
                     var control = "0x"+""+h16.toString(16)+""+L16.toString(16);
                     console.log(control,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                     var newControl = parseInt(control).toString();
                    Device.update(
                      {
                        data: myDevice.data,
                        flags: {...myDevice.flags,isControl: 1},
                        settings: {...myDevice.settings,control:newControl}
                      },
                      {
                        where:{
                           id: myDevice.id
                        }
                      }
                    ).then(()=>{
                       res.setHeader('Content-type','application/json');
                       res.status(200).send({
                           success:true,
                           message: 'Successfully  controlled',
                           data:[]
                       });
                    }).catch(err=>{
                        res.setHeader('Content-type','application/json');
                       res.status(400).send({
                           success:false,
                           message:err,
                           data:[]
                       });
                    });
                 }
                 else{
 
                     res.setHeader('Content-type','application/json');
                     res.status(401).send({
                       success:false,
                       message:'Not authorized',
                       data:[]
                     });
 
                 }
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
        else{
         Device.findOne({
            where:{
              imei: myReq.imei
            },
            raw: true
         }).then(myDevice=>{
             if(myDevice){
                let myDeviceData = myDevice.data;
                let myDeviceFlags= myDevice.flags;
                if(typeof myDeviceData === 'string'){
                   myDeviceData = JSON.parse(myDevice.data);
                   myDeviceFlags = JSON.parse(myDevice.flags);
                }
                

                var newData = {...myDeviceData,control:1,disabled: 1};
                var newFlag = {...myDeviceFlags,is_disabled:1,disabled: 1};
                Device.update(
                  {
                    data: newData,
                    flags: newFlag,
                    settings: typeof myDevice.settings == 'string' ? JSON.parse(myDevice.settings) : myDevice.settings
                  },
                  {
                    where:{
                       id: myDevice.id
                    }
                  }
                ).then(()=>{
                   res.setHeader('Content-type','application/json');
                   res.status(200).send({
                       success:true,
                       message:'Successfully disabled',
                       data:[]
                   });
                }).catch(err=>{
                    res.setHeader('Content-type','application/json');
                   res.status(400).send({
                       success:false,
                       message:err,
                       data:[]
                   });
                });
             }
             else{
               res.setHeader('Content-type','application/json');
               res.status(401).send({
                   success:false,
                   message:'Not authorized',
                   data:[]
               });
             }
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
     },




     enableDevice: (req,res,next)=>{
         let myReq;
         myReq = req.body;
         if(myReq.imei.startsWith("250")){
            var myImei = myReq.imei.substring(0,(myReq.imei.length-2));
            var myPoint = myReq.imei.substring(myReq.imei.length-2,myReq.imei.length);
            Device.findOne({
                where:{
                  imei: myImei
                }
             }).then(myDevice=>{
                 if(myDevice){
                     myDevice.settings.control = myDevice.settings.control ? myDevice.settings.control : 0;
                     var myCurrControl = (myDevice.settings.control/1);
                     var point = (myPoint/1) - 1;
                     var currentControl = [((myCurrControl >> 24) & 0xff),((myCurrControl >> 16) & 0xff),((myCurrControl >> 8) & 0xff),((myCurrControl >> 0) & 0xff)];
                     if(point <= 8){
                         currentControl[3] = currentControl[3] | (1 << point);
                     }
                     else if(point > 8 && point <= 16){
                        currentControl[2] = currentControl[2] | (1 << (point - 8));
                     }
                     else if(point > 16 && point <= 24){
                        currentControl[1] = currentControl[1] | (1 << (point - 16));
                     }
                     else if(point > 24 && point <= 32){
                        currentControl[0] = currentControl[0] | (1 << (point - 24));
                     }
                     var h16 = ((currentControl[0]) << 8) | (currentControl[1] << 0);
                     var L16 = ((currentControl[2]) << 8) | (currentControl[3] << 0);
                     var control = "0x"+""+h16.toString(16)+""+L16.toString(16);
                     console.log(control,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                     var newControl = parseInt(control).toString();
                    Device.update(
                      {
                        data: myDevice.data,
                        flags: {...myDevice.flags,isControl: 1},
                        settings: {...myDevice.settings,control:newControl}
                      },
                      {
                        where:{
                           id: myDevice.id
                        }
                      }
                    ).then(()=>{
                       res.setHeader('Content-type','application/json');
                       res.status(200).send({
                           success:true,
                           message: 'Successfully controlled',
                           data:[]
                       });
                    }).catch(err=>{
                        res.setHeader('Content-type','application/json');
                       res.status(400).send({
                           success:false,
                           message:err,
                           data:[]
                       });
                    });
                 }
                 else{
 
                     res.setHeader('Content-type','application/json');
                     res.status(401).send({
                       success:false,
                       message:'Not authorized',
                       data:[]
                     });
 
                 }
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
         else{
            Device.findOne({
                where:{
                  imei: myReq.imei
                }
            }).then(myDevice=>{
                if(myDevice){
                    let myDeviceData = myDevice.data;
                    let myDeviceFlags= myDevice.flags;
                    if(typeof myDeviceData === 'string'){
                      myDeviceData = JSON.parse(myDevice.data);
                      myDeviceFlags = JSON.parse(myDevice.flags);
                    }

                    

                    var newData = {...myDeviceData,control:0,disabled:0};
                    var newFlag = {...myDeviceFlags,is_disabled:1,is_control:1};

                    Device.update(
                    {
                        data: newData,
                        flags: newFlag,
                        settings: typeof myDevice.settings == 'string' ? JSON.parse(myDevice.settings) : myDevice.settings
                    },
                    {
                        where:{
                        id: myDevice.id
                        }
                    }
                    ).then(()=>{
                    res.setHeader('Content-type','application/json');
                    res.status(200).send({
                        success:true,
                        message:'Successfully enabled',
                        data:[]
                    });
                    }).catch(err=>{
                        res.setHeader('Content-type','application/json');
                    res.status(400).send({
                        success:false,
                        message:err,
                        data:[]
                    });
                    });
                }
                else{
                res.setHeader('Content-type','application/json');
                res.status(401).send({
                    success:false,
                    message:'Not authorized',
                    data:[]
                });
                }
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
     },


     acChargeControl: (req,res,next)=>{

         let myReq;
         myReq = req.body;
         Device.findOne({
            where:{
              imei: myReq.imei
            }
         }).then(myDevice=>{
             if(myDevice){
                
                var newFlags = {...myDevice.flags,is_func_enable: 1};
                var cParam = myDevice.settings.func_enable;
                if(myReq.mode == 1){
                    cParam |= (1 << 7);
                }
                else{
                    cParam &= ~(1 << 7);
                }


                var mySetting = {
                   eps_enable_mode: ((cParam & 0xFFFF) & (1 << 0)) > 0 ? 1 : 0,
                   over_frequency_derate_enable: ((cParam & 0xFFFF) & (1 << 1)) > 0 ? 1 : 0,
                   drms_enable: ((cParam & 0xFFFF) & (1 << 2)) > 0 ? 1 : 0,
                   lvrt_enable: ((cParam & 0xFFFF) & (1 << 3)) > 0 ? 1 : 0,
                   anti_island_enable: ((cParam & 0xFFFF) & (1 << 4)) > 0 ? 1 : 0,
                   neutral_detection_enable: ((cParam & 0xFFFF) & (1 << 5)) > 0 ? 1 : 0,
                   soft_start_enable: ((cParam & 0xFFFF) & (1 << 6)) > 0 ? 1 : 0,
                   ac_charge_enable: ((cParam & 0xFFFF) & (1 << 7)) > 0 ? 1 : 0,
                   seamless_switch_enable: ((cParam & 0xFFFF) & (1 << 8)) > 0 ? 1 : 0,
                   turn_off_onn: ((cParam & 0xFFFF) & (1 << 9)) > 0 ? 1 : 0,
                   force_discharge_enable: ((cParam & 0xFFFF) & (1 << 10)) > 0 ? 1 : 0,
                   force_charge_enable: ((cParam & 0xFFFF) & (1 << 11)) > 0 ? 1 : 0,
                   iso_enable: ((cParam & 0xFFFF) & (1 << 12)) > 0 ? 1 : 0,
                   gfci_enable: ((cParam & 0xFFFF) & (1 << 13)) > 0 ? 1 : 0,
                   dci_enable: ((cParam & 0xFFFF) & (1 << 14)) > 0 ? 1 : 0,
                   feed_in_grid_enable: ((cParam & 0xFFFF) & (1 << 15)) > 0 ? 1 : 0,
                };

                var newSettings = {...myDevice.settings,func_enable:cParam,...mySetting};

                Device.update(
                  {
                    data: myDevice.data,
                    flags: newFlags,
                    settings: newSettings
                  },
                  {
                    where:{
                       id: myDevice.id
                    }
                  }
                ).then(()=>{
                   res.setHeader('Content-type','application/json');
                   res.status(200).send({
                       success:true,
                       message: myReq.mode == 1 ? 'Successfully enabled' : 'Successfully disabled',
                       data:[]
                   });
                }).catch(err=>{
                    res.setHeader('Content-type','application/json');
                   res.status(400).send({
                       success:false,
                       message:err,
                       data:[]
                   });
                });
             }
             else{

                 res.setHeader('Content-type','application/json');
                 res.status(401).send({
                   success:false,
                   message:'Not authorized',
                   data:[]
                 });

             }
          }).catch(err=>{
               console.log(err);
               res.setHeader('Content-type','application/json');
               res.status(400).send({
                   success:false,
                   message:err,
                   data:[]
               });
          });

     },



     powerInverter: (req,res,next)=>{

         let myReq;
         myReq = req.body;
         Device.findOne({
            where:{
              imei: myReq.imei
            }
         }).then(myDevice=>{
             if(myDevice){
                
                var newFlags = {...myDevice.flags,is_func_enable: 1};
                var cParam = myDevice.settings.func_enable;
                if(myReq.mode == 1){
                    cParam |= (1 << 9);
                }
                else{
                    cParam &= ~(1 << 9);
                }

                var mySetting = {
                   eps_enable_mode: ((cParam & 0xFFFF) & (1 << 0)) > 0 ? 1 : 0,
                   over_frequency_derate_enable: ((cParam & 0xFFFF) & (1 << 1)) > 0 ? 1 : 0,
                   drms_enable: ((cParam & 0xFFFF) & (1 << 2)) > 0 ? 1 : 0,
                   lvrt_enable: ((cParam & 0xFFFF) & (1 << 3)) > 0 ? 1 : 0,
                   anti_island_enable: ((cParam & 0xFFFF) & (1 << 4)) > 0 ? 1 : 0,
                   neutral_detection_enable: ((cParam & 0xFFFF) & (1 << 5)) > 0 ? 1 : 0,
                   soft_start_enable: ((cParam & 0xFFFF) & (1 << 6)) > 0 ? 1 : 0,
                   ac_charge_enable: ((cParam & 0xFFFF) & (1 << 7)) > 0 ? 1 : 0,
                   seamless_switch_enable: ((cParam & 0xFFFF) & (1 << 8)) > 0 ? 1 : 0,
                   turn_off_onn: ((cParam & 0xFFFF) & (1 << 9)) > 0 ? 1 : 0,
                   force_discharge_enable: ((cParam & 0xFFFF) & (1 << 10)) > 0 ? 1 : 0,
                   force_charge_enable: ((cParam & 0xFFFF) & (1 << 11)) > 0 ? 1 : 0,
                   iso_enable: ((cParam & 0xFFFF) & (1 << 12)) > 0 ? 1 : 0,
                   gfci_enable: ((cParam & 0xFFFF) & (1 << 13)) > 0 ? 1 : 0,
                   dci_enable: ((cParam & 0xFFFF) & (1 << 14)) > 0 ? 1 : 0,
                   feed_in_grid_enable: ((cParam & 0xFFFF) & (1 << 15)) > 0 ? 1 : 0,
                };

                var newSettings = {...myDevice.settings,func_enable:cParam,...mySetting};
             
                Device.update(
                  {
                    data: myDevice.data,
                    flags: newFlags,
                    settings: newSettings
                  },
                  {
                    where:{
                       id: myDevice.id
                    }
                  }
                ).then(()=>{
                   res.setHeader('Content-type','application/json');
                   res.status(200).send({
                       success:true,
                       message: myReq.mode == 1 ? 'Successfully enabled' : 'Successfully disabled',
                       data:[]
                   });
                }).catch(err=>{
                    res.setHeader('Content-type','application/json');
                   res.status(400).send({
                       success:false,
                       message:err,
                       data:[]
                   });
                });
             }
             else{

                 res.setHeader('Content-type','application/json');
                 res.status(401).send({
                   success:false,
                   message:'Not authorized',
                   data:[]
                 });

             }
          }).catch(err=>{
               console.log(err);
               res.setHeader('Content-type','application/json');
               res.status(400).send({
                   success:false,
                   message:err,
                   data:[]
               });
          });

     },




     onnSplitterTerminal: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        Device.findOne({
           where:{
             imei: myReq.imei
           }
        }).then(myDevice=>{
            if(myDevice){
                myDevice.settings.control = myDevice.settings.control ? myDevice.settings.control : 0;
                    var myCurrControl = (myDevice.settings.control/1);
                    var point = (myReq.point/1) - 1;
                    var currentControl = [((myCurrControl >> 24) & 0xff),((myCurrControl >> 16) & 0xff),((myCurrControl >> 8) & 0xff),((myCurrControl >> 0) & 0xff)];
                    if(point <= 8){
                        currentControl[3] = currentControl[3] | (1 << point);
                    }
                    else if(point > 8 && point <= 16){
                       currentControl[2] = currentControl[2] | (1 << (point - 8));
                    }
                    else if(point > 16 && point <= 24){
                       currentControl[1] = currentControl[1] | (1 << (point - 16));
                    }
                    else if(point > 24 && point <= 32){
                       currentControl[0] = currentControl[0] | (1 << (point - 24));
                    }
                    var h16 = ((currentControl[0]) << 8) | (currentControl[1] << 0);
                    var L16 = ((currentControl[2]) << 8) | (currentControl[3] << 0);
                    var control = "0x"+""+h16.toString(16)+""+L16.toString(16);
                    console.log(control,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                    var newControl = parseInt(control).toString();
                Device.update(
                  {
                    data: myDevice.data,
                    flags: {...myDevice.flags,isControl: 1},
                    settings: {...myDevice.settings,control:newControl}
                  },
                  {
                    where:{
                       id: myDevice.id
                    }
                  }
                ).then(()=>{
                   res.setHeader('Content-type','application/json');
                   res.status(200).send({
                       success:true,
                       message: 'Successfully control',
                       data:[]
                   });
                }).catch(err=>{
                    res.setHeader('Content-type','application/json');
                   res.status(400).send({
                       success:false,
                       message:err,
                       data:[]
                   });
                });
            }
            else{

                 res.setHeader('Content-type','application/json');
                 res.status(401).send({
                   success:false,
                   message:'Not authorized',
                   data:[]
                 });

            }
        }).catch(err=>{
              console.log(err);
              res.setHeader('Content-type','application/json');
              res.status(400).send({
                  success:false,
                  message:err,
                  data:[]
              });
        });
    },


    offSplitterTerminal: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        Device.findOne({
           where:{
             imei: myReq.imei
           }
        }).then(myDevice=>{
            if(myDevice){
               myDevice.settings.control = myDevice.settings.control ? myDevice.settings.control : 0;
               var myCurrControl = (myDevice.settings.control/1);
               var point = (myReq.point/1) - 1;
               var currentControl = [((myCurrControl >> 24) & 0xff),((myCurrControl >> 16) & 0xff),((myCurrControl >> 8) & 0xff),((myCurrControl >> 0) & 0xff)];
               if(point <= 8){
                    currentControl[3] = currentControl[3] & ~(1 << point);
               }
               else if(point > 8 && point <= 16){
                   currentControl[2] = currentControl[2] & ~(1 << (point - 8));
               }
               else if(point > 16 && point <= 24){
                   currentControl[1] = currentControl[1] & ~(1 << (point - 16));
               }
               else if(point > 24 && point <= 32){
                  currentControl[0] = currentControl[0] & ~(1 << (point - 24));
               }
               var h16 = ((currentControl[0]) << 8) | (currentControl[1] << 0);
               var L16 = ((currentControl[2]) << 8) | (currentControl[3] << 0);
               var control = "0x"+""+h16.toString(16)+""+L16.toString(16);
               console.log(control,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
               var newControl = parseInt(control).toString();
               Device.update(
                 {
                   data: myDevice.data,
                   flags: {...myDevice.flags,isControl: 1},
                   settings: {...myDevice.settings,control:newControl}
                 },
                 {
                   where:{
                      id: myDevice.id
                   }
                 }
               ).then(()=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).send({
                      success:true,
                      message: 'Successfully control',
                      data:[]
                  });
               }).catch(err=>{
                   res.setHeader('Content-type','application/json');
                  res.status(400).send({
                      success:false,
                      message:err,
                      data:[]
                  });
               });
            }
            else{

                res.setHeader('Content-type','application/json');
                res.status(401).send({
                  success:false,
                  message:'Not authorized',
                  data:[]
                });

            }
        }).catch(err=>{
              console.log(err);
              res.setHeader('Content-type','application/json');
              res.status(400).send({
                  success:false,
                  message:err,
                  data:[]
              });
        });
    },




    onnAllSplitterTerminal: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        Device.findOne({
           where:{
             imei: myReq.imei
           }
        }).then(myDevice=>{
            if(myDevice){
               Device.update(
                 {
                   data: myDevice.data,
                   flags: {...myDevice.flags,isControl: 1},
                   settings: {...myDevice.settings,control:0xffffffff}
                 },
                 {
                   where:{
                      id: myDevice.id
                   }
                 }
               ).then(()=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).send({
                      success:true,
                      message: 'Successfully control',
                      data:[]
                  });
               }).catch(err=>{
                   res.setHeader('Content-type','application/json');
                  res.status(400).send({
                      success:false,
                      message:err,
                      data:[]
                  });
               });
            }
            else{

                res.setHeader('Content-type','application/json');
                res.status(401).send({
                  success:false,
                  message:'Not authorized',
                  data:[]
                });

            }
        }).catch(err=>{
              console.log(err);
              res.setHeader('Content-type','application/json');
              res.status(400).send({
                  success:false,
                  message:err,
                  data:[]
              });
        });
    },



    offAllSplitterTerminal: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        Device.findOne({
           where:{
             imei: myReq.imei
           }
        }).then(myDevice=>{
            if(myDevice){
               Device.update(
                 {
                   data: myDevice.data,
                   flags: {...myDevice.flags,isControl: 1},
                   settings: {...myDevice.settings,control:0x00000000}
                 },
                 {
                   where:{
                      id: myDevice.id
                   }
                 }
               ).then(()=>{
                  res.setHeader('Content-type','application/json');
                  res.status(200).send({
                      success:true,
                      message: 'Successfully control',
                      data:[]
                  });
               }).catch(err=>{
                   res.setHeader('Content-type','application/json');
                  res.status(400).send({
                      success:false,
                      message:err,
                      data:[]
                  });
               });
            }
            else{

                res.setHeader('Content-type','application/json');
                res.status(401).send({
                  success:false,
                  message:'Not authorized',
                  data:[]
                });

            }
        }).catch(err=>{
              console.log(err);
              res.setHeader('Content-type','application/json');
              res.status(400).send({
                  success:false,
                  message:err,
                  data:[]
              });
        });
    },


    setKikeCookingTime: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        Device.findOne({
            where:{
                imei: myReq.imei,
                device_type: 2
            }
         }).then(myDevice=>{
             var cookingTime = ((myReq.cookTime/1) * 60);
             var isCookTime = 1;
             var cookedTime = 0;
             Device.update(
                {
                  data: {...myDevice.data,cookedTime:cookedTime,startKookTime:startKookTime},
                  settings:{...myDevice.settings,cookingTime:cookingTime},
                  flags: {...myDevice.flags,isCookTime:isCookTime}
                },
                {
                  where:{
                    imei: myReq.imei
                  }
                }
             ).then(()=>{
                res.setHeader('Content-type','application/json');
                res.status(200).send({
                    success:true,
                    message: 'Successfully set',
                    data:[]
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

         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).send({
                success:false,
                message:" invalid device",
                data:[]
            });
        });
         
     },




     resetKike: (req,res,next)=>{
        let myReq;
        myReq = req.body;
        Device.findOne({
            where:{
                imei: myReq.imei,
                device_type: 2
            }
         }).then(myDevice=>{
             var is_reset = 1;
             Device.update(
                {
                  data: {...myDevice.data},
                  settings:{...myDevice.settings},
                  flags: {...myDevice.flags,is_reset:1}
                },
                {
                  where:{
                    imei: myReq.imei
                  }
                }
             ).then(()=>{
                res.setHeader('Content-type','application/json');
                res.status(200).send({
                    success:true,
                    message: 'Successfully reset',
                    data:[]
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

         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).send({
                success:false,
                message:" invalid device",
                data:[]
            });
        });
         
     },



     cancelKikeCookingTime: (req,res,next)=>{
        let myReq;
        myReq = req.body;

        Device.findOne({
            where:{
                imei: myReq.imei,
                device_type: 2
            }
         }).then(myDevice=>{
             var cookingTime = 0;
             var isCookTime = 0;
             var cookedTime = 0;
             Device.update(
                {
                  data: {...myDevice.data,cookedTime:cookedTime},
                  settings:{...myDevice.settings,cookingTime:cookingTime},
                  flags: {...myDevice.flags,isCookTime:isCookTime}
                },
                {
                  where:{
                    imei: myReq.imei
                  }
                }
             ).then(()=>{
                res.setHeader('Content-type','application/json');
                res.status(200).send({
                    success:true,
                    message: 'Successfully cancelled',
                    data:[]
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

         }).catch(err=>{
            console.log(err);
            res.setHeader('Content-type','application/json');
            res.status(400).send({
                success:false,
                message:" invalid device",
                data:[]
            });
        });
         
     },







};

