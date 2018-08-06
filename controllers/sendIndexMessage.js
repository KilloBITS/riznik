var express = require('express');
var router = express.Router();
var validator = require('validator');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'riznik.comment@gmail.com',
        pass: 'qazwsx159357'
    }
});

function mailOptions(a, b, c, d) {
    this.from = a, //'riznik.comment@gmail.com',
    this.to = b, //'mr.kalinuk@gmail.com',
    this.subject = c, //'Sending Email using Node.js',
    this.text = d;//'That was easy!';
}

router.post('/sendMessage', function (req, res) {
    try {
        if (validator.isEmail(req.body.email)) {
            let txt = req.body.msgText + '[Відпавник: ' + req.body.name + ', email: ' + req.body.email + ']';
            let ml = new mailOptions(req.body.email, 'panriznik@gmail.com', 'Коментар користувача.', txt); //panriznik@gmail.com
            transporter.sendMail(ml, function (error, info) {
                if (error) {
                    console.log(error);
                    res.send(false);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send(true);
                }
            });
        } else {
            res.send(false);
        }
    } catch (err) {
        console.log(err)
        res.send(false);
    }
});

module.exports = router;