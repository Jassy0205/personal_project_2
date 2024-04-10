const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address");

router.post("/new-address", addressController.createAddress); 

module.exports = router; 