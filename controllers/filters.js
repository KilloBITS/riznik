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

var filters = function(req, res, next)  {
    if(req.body.fil !== '1'){
        var fil = 'type="'+req.body.fil+'"';
    }else{
        var fil = req.body.fil;
    }    
    connection.query('SELECT * FROM tovar left join tovarStars ON tovar.id = tovarStars.id WHERE '+fil, function (errors, results, fields) {
        res.send(results)
    });
};

router.post('/filters', filters, function(req, res, next){});

module.exports = router;