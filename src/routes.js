var express = require("express");
var swaggerUi = require('swagger-ui-express');
const dataController = require('./data/controller');
const subscriptionController = require('./subscription/controller');

const router = express.Router();
var swaggerDocument = require('../swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get("/data", dataController.getData);
router.post("/subscription", subscriptionController.createSubscription);
router.delete("/subscription", subscriptionController.deleteSubscription);

module.exports = router