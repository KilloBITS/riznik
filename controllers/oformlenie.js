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

var buyTovar = function(req, res, next)  {
    var d = req.body.data;
    console.log(d);
    connection.query('INSERT INTO stonewalling(`name`, `number`, `text`, `tovar`, `dostavka`) VALUES ("'+d.clientName+'", "'+d.clientPNum+'", "' + d.clientEmail+'", "'+'test'+'", "'+'test'+'")', function (errors, results, fields) {
        console.log(results);
        res.send({code:500, message:"Замовлення відправлене у обробку"});
    });  
};

router.post('/sendBuyTovar', buyTovar, function(req, res, next){});

module.exports = router;

