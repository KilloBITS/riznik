'use strict';
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var ipOptSQL = {
    host: '52.14.180.56',
    port: 3306,
    user: 'riznik',
    password: 'yaPn6eZQHBnBeOf8',
    database: 'PanRiznyk'
};

var connection = mysql.createConnection(ipOptSQL);
connection.connect();

var getUsersLength = function(req, res, next)  {
    connection.query('SELECT * FROM `ipAdress` WHERE 1 ', function (errors, results, fields) {
        res.send(results.length.toString());
    });  
};

router.post('/getUsersLength', getUsersLength, function(req, res, next){});

module.exports = router;