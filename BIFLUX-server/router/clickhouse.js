const express = require('express');
const router = express.Router();
const clickhouseController = require('../controllers/clickhouseController');

router.post('/test-connection', clickhouseController.testConnection);

module.exports = router;
