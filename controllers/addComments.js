'use strict';
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var connection2 = mysql.createConnection(global.SQLoptions2);
connection2.connect();

var addComments = function(req, res, next)  {    
    console.log(req.body.id);
    console.log(req.body.text);
    connection2.query('INSERT INTO `tov'+req.body.id+'`(`name`, `textVal`, `dateMsg`) VALUES ("Анонім","'+req.body.text+'","27.08.2018")', function (errors, results, fields) {
        res.send(results);
    });
};

router.post('/addComments', addComments, function(req, res, next){});

module.exports = router;