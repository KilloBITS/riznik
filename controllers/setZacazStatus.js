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

setInterval(function(){    //раз в 24 часа удалять отмененные
    connection.query('DELETE FROM `stonewalling` WHERE STATUS="CAN"', function (errors, results, fields) {});  
},60000*60*24);

var setZakazStatus = function(req, res, next)  {    
    if(req.body.type === "DEL"){
        connection.query('DELETE FROM `stonewalling` WHERE id="'+ req.body.id+'"', function (errors, results, fields) {
            res.send('Видалено');
        });  
    }else{
        connection.query('UPDATE `stonewalling` SET `status`="'+req.body.type+'" WHERE id="'+ req.body.id+'"', function (errors, results, fields) {
            res.send('Статус замовлення змінено');
        });  
    }
    
};

router.post('/ZakazStatus', setZakazStatus, function(req, res, next){});

module.exports = router;

