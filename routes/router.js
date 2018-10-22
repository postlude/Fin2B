var express = require('express');
var moment = require('moment-timezone');
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


module.exports = router;