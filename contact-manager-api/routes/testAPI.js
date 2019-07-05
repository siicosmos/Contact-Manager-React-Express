var express = require('express');
var router = express.Router();
var config = require('config');

var configPort = config.get('port')
router.get('/', function(req, res, next) {
    res.send('API is running on ' + configPort);
});

module.exports = router;