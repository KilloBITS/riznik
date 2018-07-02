'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
var requestIp = require('request-ip');
var mysql = require('mysql');

var folder1 = __dirname + '/../publick/image/slide/';
router.use(requestIp.mw());

var ipOptSQL = {
    host: '52.14.180.56',
    port: 3306,
    user: 'riznik',
    password: 'yaPn6eZQHBnBeOf8',
    database: 'PanRiznyk'
};

var connection = mysql.createConnection(ipOptSQL);
connection.connect();

var GetUsersLength = (ip) => {
    connection.query('SELECT * FROM `ipAdress` WHERE ip="' + ip + '"', function (errors, results, fields) {
        if (results.length >= 1) {

        } else {
            connection.query('INSERT INTO ipAdress(`ip`) VALUES ("'+ip+'")', function (errors, results, fields) {});
        }
    });
};


//SELECT * FROM `ip`
var ipMiddleware = function (req, res, next) {
    var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    return clientIp;
};

router.get('/', function (req, res, next) {
    GetUsersLength(ipMiddleware(req, res));
    res.render('index.ejs', {main_data: global.mainData, partners: global.partners});
});

module.exports = router;

