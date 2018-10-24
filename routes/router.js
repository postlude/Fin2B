var express = require('express');
var moment = require('moment-timezone');
var request = require('request');
var cheerio = require('cheerio');
var getFibonacci = require('../libs/getFibonacci');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('password');
});

router.get('/server_time', function(req, res){
    var serverTime = moment(new Date()).tz('Asia/Seoul').format('YYYY년 MM월 DD일 HH시 mm분 ss초');
    res.send(serverTime);
});

// password
router.get('/password', function(req, res){
    res.render('password');
});

router.post('/password/check', function(req, res){
    var password = req.body.pwd;
    var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&+=]).{8,}$/;
    // var reg = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&+=]).{8,}$');
    if(reg.test(password)){
        res.send(true);
    }else{
        res.send(false);
    }
});

// google search
router.get('/search', function(req, res){
    res.render('search');
});

router.post('/search', function(req, res){
    var url = 'https://www.google.com/search?q=' + req.body.searchValue;

    // encodeURI() 를 호출하지 않고 그냥 url로 사용할 경우 한글 깨짐
    request(encodeURI(url), function(error, response, body){  
        if (error) {
            throw error
        }

        const $ = cheerio.load(body);
        var searchResult = $('#search').html();

        res.send(searchResult);
    });
});

// fibonacci
router.get('/fibonacci', function(req, res){
    res.render('fibonacci');
});

router.post('/fibonacci', function(req, res){
    var inputNum = req.body.piboNum;
    var result = getFibonacci(inputNum);
    res.send({'inputNum' : inputNum, 'fiboNum' : result});
});

module.exports = router;