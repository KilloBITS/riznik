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

var cancelPay = function(req, res, next)  {
    var d = req.body.id;
    console.log(d);

    
    connection.query('DELETE FROM `stonewalling` WHERE id="'+d+'"' , function (errors, results, fields) {
        res.send({code:500, message:"Операцію скасовано!"});
    });  
};

router.post('/cancelPayTovar', cancelPay, function(req, res, next){});

module.exports = router;