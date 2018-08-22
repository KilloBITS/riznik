'use strict';
/* global __dirname, config */
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
const mysql = require('mysql');

var folder1 = __dirname + '/../publick/image/slide/';

var ipOptSQL = {
    host: '52.14.180.56',
    port: 3306,
    user: 'riznik',
    password: 'yaPn6eZQHBnBeOf8',
    database: 'PanRiznyk'
};

var connection = mysql.createConnection(ipOptSQL);
connection.connect();

router.get('/shop', function(req, res, next){
    //SELECT * FROM `configurate`
    connection.query('SELECT * FROM `configurate`', function (errors, results, fields) {
        console.log(results[0].one);
        if(results[0].one === 1){
            connection.query('SELECT * FROM tovar left join tovarStars ON tovar.id = tovarStars.id WHERE 1', function (errors, results, fields) {
                res.render('shop.ejs', {tovar: results});  
            });
            
        }else{
            res.render('supporting.ejs');  
        }
        
    });
    
});

module.exports = router;


