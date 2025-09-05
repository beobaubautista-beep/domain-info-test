const express = require('express');
const router = express.Router();
const apiController = require('./api/ApiController'); 

router.use('/api', apiController)

module.exports = router;
