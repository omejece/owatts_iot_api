var express = require('express');
var router = express.Router();


var BlockController = require('../controllers/User/BlockController');
var ConsumptionController = require('../controllers/User/ConsumptionController');
var DeviceAlarmController = require('../controllers/User/DeviceAlarmController');
var DeviceController = require('../controllers/User/DeviceController');
var DeviceListController = require('../controllers/Admin/DeviceListController');
var DeviceSettingController = require('../controllers/User/DeviceSettingController');
var DeviceTypeController = require('../controllers/User/DeviceTypeController');
var GenLogController = require('../controllers/User/GenLogController');
var InverterLogController = require('../controllers/User/InverterLogController');




/* device types */
router.get('/device_type/detail',DeviceTypeController.detail);
router.get('/device_type/read',DeviceTypeController.read);
/* device types */






/* block */
router.post('/block/store',BlockController.create);
router.put('/block/update',BlockController.update);
router.delete('/block/delete',BlockController.delete);
router.get('/block/detail',BlockController.detail);
router.get('/block/read',BlockController.read);
router.get('/block/search',BlockController.search);
/* blocks */



/* consumption */
router.get('/consumption/detail',ConsumptionController.detail);
router.get('/consumption/read',ConsumptionController.read);
router.get('/consumption/single_consumption',ConsumptionController.singleConsumption);
router.get('/consumption/all_consumption',ConsumptionController.allDailyConsumption);

router.get('/block_consumption/detail',ConsumptionController.blockDetail);
router.get('/block_consumption/read',ConsumptionController.blockRead);
router.get('/block_consumption/single_consumption',ConsumptionController.singleBlockConsumption);
router.get('/block_consumption/all_consumption',ConsumptionController.allDailyBlockConsumption);

/* consumption */


/* Alrm */
router.put('/alarm/update',DeviceAlarmController.update);
router.get('/alarm/activealarm',DeviceAlarmController.activeAlarm);
router.get('/alarm/inactivealarm',DeviceAlarmController.inActiveAlarm);
router.get('/alarm/read',DeviceAlarmController.read);
/* Alarm */


/* device */
router.post('/device/store',DeviceController.create);
router.put('/device/update',DeviceController.update);
router.delete('/device/delete',DeviceController.delete);
router.get('/device/read',DeviceController.read);
router.get('/device/detail',DeviceController.detail);
router.get('/device/search',DeviceController.search);
router.post('/device/recharge',DeviceController.buyUnit);
router.put('/device/disable',DeviceController.disableDevice);
router.put('/device/enable',DeviceController.enableDevice);
/* device */

/*refill gas*/
  router.post('/refill_gas',DeviceController.refillGas);
/*gas refil*/




/* device setting */
router.post('/device_setting/store',DeviceSettingController.createOrUpdate);
router.delete('/device_setting/delete',DeviceSettingController.delete);
router.get('/device_setting/detail',DeviceSettingController.detail);
/* device setting */



/* generator logs */
router.get('/generator_runtime',DeviceController.generatorRuntime);
router.get('/generator_runtimes',DeviceController.generatorRuntimes);
router.get('/generator_log',DeviceController.generatorLog);
router.get('/generator_logs',DeviceController.generatorLogs);
/* my generator logs */



/* generator start times */
  router.get('/gen_start_times',GenLogController.genStartTimes);

/* end generator start times */



/* generator start times */
  router.get('/inverter_logs',InverterLogController.read);

/* end generator start times */



/*lux inverter controls*/
  
  router.put('/ac_charge_enable',DeviceController.acChargeControl);
  router.put('/power_inverter',DeviceController.powerInverter);

  


/*lux inverter controls*/



/*splitter  controls*/
  
router.put('/off_splitter_point',DeviceController.offSplitterTerminal);
router.put('/onn_splitter_point',DeviceController.onnSplitterTerminal);

router.put('/off_all_splitter_point',DeviceController.offAllSplitterTerminal);
router.put('/onn_all_splitter_point',DeviceController.onnAllSplitterTerminal);


/*end splitter  controls*/
  router.put('/setKikeCookingTime',DeviceController.setKikeCookingTime);
  router.put('/cancelKikeCookingTime',DeviceController.cancelKikeCookingTime);
/* Kike cooking time */








/* End kike cooking time */













module.exports = router;