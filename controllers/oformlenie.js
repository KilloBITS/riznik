'use strict';
const express = require('express');
const router = express.Router();

var buyTovar = function(req, res, next)  {
    console.log(req.body.data);
    
    res.send({code:500, message:"Замовлення відправлене у обробку"});
};

router.post('/sendBuyTovar', buyTovar, function(req, res, next){});


module.exports = router;

