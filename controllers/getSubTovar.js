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
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

var getSubTovar = function(req, res, next)  {
    let dataSub = [];
    var tov = global.tovar;
    for(let i = 0; i < 4; i++){
        let randomka = randomInteger(0, tov.length);
        dataSub.push(tov[randomka]);
        tov.splice(randomka, 1);
    }
    res.send(dataSub);
};

router.post('/getSubTovar', getSubTovar, function(req, res, next){});

module.exports = router;