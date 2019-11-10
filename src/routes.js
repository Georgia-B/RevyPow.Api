var express = require("express");
const dataController = require('./data/controller');
const subscriptionController = require('./subscription/controller');

const router = express.Router();
router.get("/data", dataController.getData);
router.post("/subscription", subscriptionController.createSubscription);
router.delete("/subscription", subscriptionController.deleteSubscription);

module.exports = router