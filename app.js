'use strict';
/* global __dirname, config */
let express = require('express');
let app = express();
let app2 = express();
let http = require('http');
var bParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('validator');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var path = require('path'),
        fs = require('fs');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'riznik.comment@gmail.com',
        pass: 'qazwsx159357'
    }
});
//использование библиотек
app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use(express.static(__dirname + '/publick/'));
app.use(cookieParser());

global.SQLoptions = {host: '52.14.180.56', port: 3306, user: 'riznik', password: 'yaPn6eZQHBnBeOf8', database: 'PanRiznyk'};
global.SQLoptions2 = {host: '52.14.180.56', port: 3306, user: 'riznik', password: 'yaPn6eZQHBnBeOf8', database: 'commentars'};
var connection = mysql.createConnection(global.SQLoptions); connection.connect();
var connection2 = mysql.createConnection(global.SQLoptions2); connection2.connect();

/*GET запроссы*/
let index = require('./routes/index'); app.get('/', index);
let shop = require('./routes/shop'); app.get('/shop', shop);
let checkout = require('./routes/product'); app.get('/product/*', checkout);

app.get('*', function (req, res) {
    res.redirect('/');
});

//Обновление конфигураций страницы
let updateData = () => {
//    console.log('Конфигурации обновлены!');
    connection.query('SELECT * FROM `MainConfig` WHERE 1', function (errors, results, fields) {
        global.mainData = results[0];
    });
};

//обновление партнеров
let updateData2 = () => {
//    console.log('Партнеры обновлены');
    connection.query('SELECT * FROM `partners` WHERE 1', function (errors, results, fields) {
        global.partners = results;
    });
};

//обновление магазинов
let updateData3 = () => {
//    console.log('Магазины обновлены!');
    connection.query('SELECT * FROM `shops` WHERE 1', function (errors, results, fields) {
        global.shops = results;
    });
};

let updateData4 = () => {
//    console.log('Товары обновлены!');
    connection.query('SELECT * FROM tovar left join tovarStars ON tovar.id = tovarStars.id WHERE 1', function (errors, results, fields) {
        global.tovar = results;
    });
};

app.post('/tovars', function (req, res) {  //список магазинов
    res.send(global.tovar);
});
//список магазинов
app.post('/getShops', function (req, res) {  //список магазинов
    res.send(global.shops);
});
var insta = require('./controllers/instagram');
app.post('/insta', insta);
//фильтр
var filters = require('./controllers/filters');
app.post('/filters', filters);
// отправка сообщения
let msg = require('./controllers/sendIndexMessage');
app.post('/sendMessage', msg);
//количство гостей
var getUsersLength = require('./controllers/getUsersLength');
app.post('/getUsersLength', getUsersLength);
//супутствующие товары
var getSubTovar = require('./controllers/getSubTovar');
app.post('/getSubTovar', getSubTovar);
//получение комментариев
var getComments = require('./controllers/getComments');
app.post('/getComments', getComments);
//оставить оценку
var setStars = require('./controllers/setStars');
app.post('/setStars', setStars);
//авторизация
var authUser = require('./controllers/authController');
app.post('/auth', authUser);
//оформление заказа
var sendBuyTovar = require('./controllers/oformlenie');
app.post('/sendBuyTovar', sendBuyTovar);
//подтверждение платежа
var sendPayment = require('./controllers/sendPayment');
app.post('/sendPayment', sendPayment);
//отмена заказа и платежа
var cancelPayTovar = require('./controllers/cancelPay');
app.post('/cancelPayTovar', cancelPayTovar);

var addComments = require('./controllers/addComments');
app.post('/addComments', addComments);

let UpdateDataFunction = () => {
    var TimeInt = (1000 * 60) * 60;
    //Обновление инстаграмма и данных каждый час
    setInterval(function () {
        updateData();  //основнгые параметры
        updateData2(); //партнеры
        updateData3(); //магазины
        updateData4();
    }, 10000);
};

app.listen(8010, function () {
    UpdateDataFunction();
    updateData();  //основнгые параметры
    updateData2(); //партнеры
    updateData3(); //магазины
    updateData4();
    console.log('Магазин на порте 8010 запущен!');
});


























//работа сервера на порте 3000
app2.use(express.static(__dirname + '/publick/'));
app2.use(cookieParser());
app2.use(bParser.json({limit: '50mb'}));
app2.use(bParser.urlencoded({limit: '50mb', extended: true}));
/*GET запросы*/
let auth = require('./routes/auth');
app2.get('/', auth);
let panel = require('./routes/admin');
app2.get('/panel', panel);

let stonewalling = require('./controllers/stonewalling');
app2.post('/stonewalling', stonewalling);


app2.post('/tovarData', function (req, res) {
    var id = req.body.id;
    connection.query('SELECT * FROM `tovar` WHERE id="' + id + '"', function (errors, results, fields) {
        res.send(results);
    });
});

app2.post('/getTovar', function (req, res) {
    connection.query('SELECT * FROM `tovar` WHERE 1', function (errors, results, fields) {
        res.send(results);
    });
});

app2.post('/deleteTovar', function (req, res) {
    var id = req.body.id;
    connection.query('DELETE FROM `tovar` WHERE id="' + id + '"', function (errors, results, fields) {        
        connection.query('DELETE FROM `tovarStars` WHERE id="' + id + '"', function (errors, result, fields) {            
            res.send('Товар видалено');
        });   
    });
});

app2.post('/UpdateDataTovar', function (req, res) {
    var d = req.body.data;
    connection.query('UPDATE `tovar` SET `type`="' + d.type + '",`name`="' + d.name + '",`text`="' + d.text + '",`price`="' + d.price + '" WHERE id="' + d.id + '"', function (errors, results, fields) {
        res.send('Зміни збереженно для товару: ' + d.name);
    });
});

app2.post('/AddNewsTovar', function (req, res) {
    var data = req.body.data;
    connection.query('INSERT INTO `tovar`(`type`, `name`, `text`, `price`, `length`, `sklad`) VALUES ("'+ data.categories +'","'+data.name+'","'+data.text+'","'+data.price+'","'+data.length+'","'+''+'")', function (errors, results, fields) {
        connection.query('INSERT INTO `tovarStars`(`id`, `star`, `len`) VALUES ("'+ results.insertId +'","'+ 0 +'","'+ 0 +'")', function (errors, result, fields) {
            res.send('Збережено');            
            connection2.query('create table tov'+results.insertId+' (id int (10),name varchar(20) NOT NULL, textVal text(1024) NOT NULL, dateMsg varchar(24) NOT NULL)');
        });
    });
});

function key_generator(len) {
    var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //to upper 
    var numeric = '01234567895645874684156873524357454151156468755154686002545641025374';
    var password = "";
    var character = "";
    while (password.length < length) {
        var entity1 = Math.ceil(string.length * Math.random() * Math.random());
        var entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        var hold = string.charAt(entity1);
        hold = (entity1 % 2 === 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        password = character;
    }
    return password;
}

function mailOptions2(a, b, c, d) {
    this.from = a, //'riznik.comment@gmail.com',
            this.to = b, //'mr.kalinuk@gmail.com',
            this.subject = c, //'Sending Email using Node.js',
            this.text = d;//'That was easy!';
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

app2.post('/auth', function (req, res, next) {
    connection.query('SELECT * FROM `Users` WHERE Name="' + req.body.L + '"', function (errors, results, fields) {
        if (results.length > 0) {
            if (results[0].password === req.body.P) {
                let users = 'userID' + results[0].Name;
                global[users] = {a: true, b: [results[0]]};
                let txt = randomInteger(100000, 999999).toString();
                let ml = new mailOptions2(req.body.email, results[0].email, 'Код підтвердження: ', txt); //panriznik@gmail.com
                transporter.sendMail(ml, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.send('Неверный логин или пароль');
                    } else {
                        console.log('Email sent: ' + info.response);
                        let users1 = 'userSMS' + results[0].Name;
                        global[users1] = txt;
                        res.send('{"code":500 , "data": "good"}');
                    }
                });
            } else {
                res.send('Неверный логин или пароль');
            }
        } else {
            res.send('Неверный логин или пароль');
        }
    });
});

app2.post('/authSMS', function (req, res, next) {
    let users1 = 'userSMS' + req.body.N;
    let users = 'userID' + req.body.N;
    let code = global[users1];

    if (code === req.body.S) {
        var newKey = key_generator(35);
        res.cookie('AuthKEY', newKey);
        res.cookie('uID', global[users].b[0].id);
        res.cookie('uName', global[users].b[0].Name);
        res.send('{"code":500 , "url": "/panel"}');
    }
});

app2.post('/legend', function (req, res, next) {
    if (parseInt(req.body.typePost) === 1) {
        //сохранить легенду
        connection.query('UPDATE `MainConfig` SET `Description`="' + req.body.text + '" WHERE 1', function (errors, results, fields) {
            udateData();
            res.send('Легенда сохранена');
        });
    } else {
        connection.query('SELECT * FROM `MainConfig` WHERE 1', function (errors, results, fields) {
            res.send(results[0].Description);
        });
    }
});


app2.post('/upload', function (req, res) {
    var base64Data = req.body.imgagesBASE.replace(/^data:image\/png;base64,/, "");
    let base64Image = req.body.imgagesBASE.split(';base64,').pop();
    require("fs").writeFile("./publick/content/tovarImage/" + req.body.tovarID + ".jpg", base64Image, {encoding: 'base64'}, function (err) {
        console.log('File created');
    });
    res.send("Upload completed!");
});

app2.post('/getUsersLength', function (req, res) {
    connection.query('SELECT * FROM `ipAdress` WHERE 1 ', function (errors, results, fields) {
        res.send(results.length.toString());
    });
});

app2.listen(3000, function () {
    console.log('Админка на 3000 порте запущена');
});
