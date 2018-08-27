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
    var tovars = "";
    for(let i = 0; i < d.tov.length; i++){
        tovars += "{[ name:"+d.tov[i].nameTovar+", id:"+d.tov[i].id+", len:"+d.tov[i].lenTov+"]};";
    }        
    let price = d.price.replace(/[^-0-9]/gim,''); 
    let dostavka = d.umovi;      
    connection.query('INSERT INTO stonewalling(`name`, `number`, `text`, `tovar`, `dostavka`, `price`, `oplata`, `statusOplati`) VALUES ("'+d.clientName + ' ' + d.clientPriz +'", "'+d.clientPNum+'", "' + d.clientEmail+'", "'+tovars+'", "'+dostavka+'", "'+price+'", "0", "0")', function (errors, results, fields) {
        res.send({code:500, message:"Замовлення відправлене у обробку", oplata: results.insertId, sum: price});
    });  
};

router.post('/sendBuyTovar', buyTovar, function(req, res, next){});
module.exports = router;

