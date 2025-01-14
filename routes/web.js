var express = require('express');
var router = express.Router();
var AdminController = require('../controllers/Admin/AdminController');
var MerchantController = require('../controllers/Admin/MerchantController');
var Auth = require('../middleware/AuthMiddleWare');
var DeviceListController = require('../controllers/Admin/DeviceListController');
var BlockController = require('../controllers/Admin/BlockController');
var ConsumptionController = require('../controllers/Admin/ConsumptionController');
var DeviceAlarmController = require('../controllers/Admin/DeviceAlarmController');
var DeviceController = require('../controllers/Admin/DeviceController');
var DeviceSettingController = require('../controllers/Admin/DeviceSettingController');
var DeviceTypeController = require('../controllers/Admin/DeviceTypeController');
var ConsumptionController = require('../controllers/Admin/ConsumptionController');
var ByPassController = require("../controllers/Admin/ByPassController");

var GenLogController = require('../controllers/User/GenLogController');

var InverterLogController = require('../controllers/User/InverterLogController');




/* device types */
router.post('/device_type/store',Auth.authenticate,DeviceTypeController.create);
router.put('/device_type/update',Auth.authenticate,DeviceTypeController.update);
router.delete('/device_type/delete',Auth.authenticate,DeviceTypeController.delete);
router.get('/device_type/detail',Auth.authenticate,DeviceTypeController.detail);
router.get('/device_type/read',Auth.authenticate,DeviceTypeController.read);
/* device types */



/* device */
router.post('/login',AdminController.login);
router.post('/merchant/store',Auth.authenticate,MerchantController.create);
router.put('/merchant/update',Auth.authenticate,MerchantController.update);
router.delete('/merchant/delete',Auth.authenticate,MerchantController.delete);
router.get('/merchant/read',Auth.authenticate,MerchantController.read);
router.get('/merchant/detail',Auth.authenticate,MerchantController.detail);
router.get('/merchant/search',Auth.authenticate,MerchantController.search);
/* device */



/* device list */
router.post('/device_list/store',Auth.authenticate,DeviceListController.create);
router.put('/device_list/update',Auth.authenticate,DeviceListController.update);
router.delete('/device_list/delete',Auth.authenticate,DeviceListController.delete);
router.get('/device_list/read',Auth.authenticate,DeviceListController.read);
router.get('/device_list/detail',Auth.authenticate,DeviceListController.detail);
router.get('/device_list/search',Auth.authenticate,DeviceListController.search);
/* device list */



/* block */
router.post('/block/store',Auth.authenticate,BlockController.create);
router.put('/block/update',Auth.authenticate,BlockController.update);
router.delete('/block/delete',Auth.authenticate,BlockController.delete);
router.get('/block/detail',Auth.authenticate,BlockController.detail);
router.get('/block/read',Auth.authenticate,BlockController.read);
router.get('/block/search',Auth.authenticate,BlockController.search);
router.get('/block/devices',Auth.authenticate,BlockController.blockDevices);

/* blocks */



/* consumption */
router.get('/consumption/detail',Auth.authenticate,ConsumptionController.detail);
router.get('/consumption/read',Auth.authenticate,ConsumptionController.read);
router.get('/consumption/single_consumption',Auth.authenticate,ConsumptionController.singleConsumption);
router.get('/consumption/all_consumption',Auth.authenticate,ConsumptionController.allDailyConsumption);

router.get('/block_consumption/detail',ConsumptionController.blockDetail);
router.get('/block_consumption/read',ConsumptionController.blockRead);
router.get('/block_consumption/single_consumption',ConsumptionController.singleBlockConsumption);
router.get('/block_consumption/all_consumption',ConsumptionController.allDailyBlockConsumption);

/* consumption */


/* Alrm */
router.put('/alarm/update',Auth.authenticate,DeviceAlarmController.update);
router.get('/alarm/activealarm',Auth.authenticate,DeviceAlarmController.activeAlarm);
router.get('/alarm/inactivealarm',Auth.authenticate,DeviceAlarmController.inActiveAlarm);
router.get('/alarm/read',Auth.authenticate,DeviceAlarmController.read);
/* Alarm */


/* device */
router.post('/device/store',Auth.authenticate,DeviceController.create);
router.put('/device/update',Auth.authenticate,DeviceController.update);
router.delete('/device/delete',Auth.authenticate,DeviceController.delete);
router.get('/device/read',Auth.authenticate,DeviceController.read);
router.get('/device/detail',Auth.authenticate,DeviceController.detail);
router.get('/device/search',Auth.authenticate,DeviceController.search);
router.put('/device/disable',Auth.authenticate,DeviceController.disableDevice);
router.put('/device/enable',Auth.authenticate,DeviceController.enableDevice);
router.post('/device/recharge',Auth.authenticate,DeviceController.buyUnit);
/* device */

/*refill gas*/
  router.post('/refill_gas',Auth.authenticate,DeviceController.refillGas);
/*gas refil*/




/* device setting */
router.post('/device_setting/store',Auth.authenticate,DeviceSettingController.createOrUpdate);
router.delete('/device_setting/delete',Auth.authenticate,DeviceSettingController.delete);
router.get('/device_setting/detail',Auth.authenticate,DeviceSettingController.detail);
/* device setting */



/* generator logs */
router.get('/generator_runtime',Auth.authenticate,DeviceController.generatorRuntime);
router.get('/generator_runtimes',Auth.authenticate,DeviceController.generatorRuntimes);
router.get('/generator_log',Auth.authenticate,DeviceController.generatorLog);
router.get('/generator_logs',Auth.authenticate,DeviceController.generatorLogs);
/* my generator logs */



/* generator start times */
  router.get('/gen_start_times',GenLogController.genStartTimes);

/* end generator start times */


/*lux inverter controls*/
  
  router.put('/ac_charge_enable',DeviceController.acChargeControl);
  router.put('/power_inverter',DeviceController.powerInverter);

  


/*lux inverter controls*/


/* generator start times */
  router.get('/inverter_logs',InverterLogController.read);

/* end generator start times */



/*splitter  controls*/
  
router.put('/off_splitter_point',DeviceController.offSplitterTerminal);
router.put('/onn_splitter_point',DeviceController.onnSplitterTerminal);

router.put('/off_all_splitter_point',DeviceController.offAllSplitterTerminal);
router.put('/onn_all_splitter_point',DeviceController.onnAllSplitterTerminal);

/*end splitter  controls*/


/*end splitter  controls*/
router.put('/setKikeCookingTime',DeviceController.setKikeCookingTime);
router.put('/cancelKikeCookingTime',DeviceController.cancelKikeCookingTime);
/* Kike cooking time */


/*reset kike*/
router.put('/resetkike',DeviceController.resetKike);
router.post('/resetkike',DeviceController.resetKike);
/*end reset kike*/


/* consumption api */
router.get('/yearly_consumption',ConsumptionController.getYearlyConsumption);
router.get('/range_consumption',ConsumptionController.getRangeConsumption);
router.get('/bypass_suspect',ByPassController.getByPassed);
router.get('/gen_logs',GenLogController.genStartTimes);
/* End consumption api */


module.exports = router;