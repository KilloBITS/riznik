'use strict';
const express = require('express');
const router = express.Router();
var InstagramAPI = require('instagram-api');

//7725656041.1677ed0.5aade3d607d34211b0f95abefb37acd8
var accessToken = '7725656041.1677ed0.5aade3d607d34211b0f95abefb37acd8';//5562828690.1677ed0.8acf44b1448249d1bdae3ca9bbba69dc
var instagramAPI = new InstagramAPI(accessToken);
// instagram 
instagramAPI.userSelf().then(function (result) {
//     console.log(result.data); // user info 
//     console.log(result.limit); // api limit 
//     console.log(result.remaining) // api request remaining
}, function (err) {
    console.log(err); // error info 
});

function insta() {
    global.instaImage = [];
    instagramAPI.userMedia("7725656041", accessToken).then(function (result) {  //5562828690  7725656041
        for (var i = 0; i < (result.data).length; i++) {
            var a = result.data[i];
            global.instaImage.push(a);//.images.standard_resolution.url
        }
    });
};

insta();
setInterval(function(){
    insta();
},(1000 * 60) * 60 * 24);

router.post('/insta', function(req, res, next){
    
    res.send(global.instaImage);
});
module.exports = router;