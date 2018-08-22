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

var sendPayment = function(req, res, next)  {
    var d = req.body.type;
    console.log(d);    
    connection.query('UPDATE `stonewalling` SET `oplata`="'+req.body.type+'" WHERE id="'+req.body.id+'"' , function (errors, results, fields) {
        res.send({code:500, message:"Виконано!"});
    });  
};

router.post('/sendPayment', sendPayment, function(req, res, next){});

module.exports = router;