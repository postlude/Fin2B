var express = require('express');
var moment = require('moment-timezone');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('password');
});

router.get('/server_date/ajax_get', function(req, res){
    var serverTime = moment(new Date()).tz('Asia/Seoul').format('YYYY년 MM월 DD일 HH시 mm분 ss초');
    res.send(serverTime);
});

// password
router.get('/password', function(req, res){
    res.render('password');
});

router.post('/password/ajax_check', function(req, res){
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
    var url = 'https://www.google.co.kr/search?q=' + req.body.search_value;
    request(url, function(error, response, html){  
        if (error) {
            throw error
        };

        const $ = cheerio.load(html);
        let searchResult = $('#search').html();
        
        // console.log($('div').html());
        // console.log(searchResult);
        // res.send(searchResult);
        // res.send(cheerio.load(html));
        res.render('searchResult', {'searchResult' : searchResult});
    });
    // res.send(url);
});

router.post('/search/ajax_search', function(req, res){
    var url = 'https://www.google.co.kr/search?q=' + req.body.searchValue;
    request(url, function(error, response, html){  
        if (error) {
            throw error
        };

        var strContents = new Buffer(html);
        console.log(iconv.decode(strContents, 'MS949').toString());

        const $ = cheerio.load(html);
        let searchResult = $('#search').html();
        
        
        // console.log($('div').html());
        // console.log(searchResult);
        res.send(searchResult);
        // res.send(cheerio.load(html));
        // res.render('searchResult', {'searchResult' : searchResult});
    });
    // res.send(url);
});

// 참고
// https://www.youtube.com/watch?v=V3qibfw_5nQ

module.exports = router;