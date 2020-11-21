
const express = require('express');
const router = express.Router();

router.get('/api', require('./api'));

module.exports = router;