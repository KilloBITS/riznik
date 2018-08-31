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

var setZakazStatus = function(req, res, next)  {    
    connection.query('UPDATE `stonewalling` SET `status`="'+req.body.type+'" WHERE id="'+ req.body.id+'"', function (errors, results, fields) {
        console.log(errors);
        console.log(results);
        res.send(results);
    });  
};

router.post('/ZakazStatus', setZakazStatus, function(req, res, next){});

module.exports = router;

