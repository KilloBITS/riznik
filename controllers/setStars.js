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

var setStars = function(req, res, next)  {
    var bal = req.body.bal; 
    var id = req.body.id; 
    connection.query('SELECT * FROM `tovarStars` WHERE id="'+ id +'"', function (errors, results, fields) {
        if(results[0].len === 0){
            var infLen = 1;
        }
        else
        {
            var infLen = results[0].len;
        }
        
        var star = parseInt(results[0].star) + parseInt(bal);
        var newLen = parseInt(results[0].len) + 1;        

        connection.query('UPDATE `tovarStars` SET `star`="'+ star +'",`len`="'+ newLen +'" WHERE id="'+id+'"', function(){
            res.send('good') 
        });
        
    });  
};

router.post('/setStars', setStars, function(req, res, next){});



module.exports = router;