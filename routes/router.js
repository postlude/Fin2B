var express = require('express');
var moment = require('moment-timezone');
var router = express.Router();

router.get('/', function(req, res){
    res.render('test', {title: 'Test Title', content: 'world'});
});

router.get('/password', function(req, res){
    res.render('password');
});

router.get('/ajax/get_server_date', function(req, res){
    var serverTime = moment(new Date()).tz('Asia/Seoul').format('YYYY년 MM월 DD일 HH시 mm분 ss초');
    res.send(serverTime);
});


module.exports = router;