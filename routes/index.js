var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('userlogin', { title: '员工登录' });
});

module.exports = router;
