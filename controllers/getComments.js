'use strict';
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var connection2 = mysql.createConnection(global.SQLoptions2);
connection2.connect();

var getComments = function(req, res, next)  {
    connection2.query('SELECT * FROM `tov'+req.body.id+'` WHERE 1', function (errors, results, fields) {
        res.send(results);
    });
};

router.post('/getComments', getComments, function(req, res, next){});

module.exports = router;