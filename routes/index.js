var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var usermodel = require('../models/user/usermodel');

router.get('/', function(req, res, next) {
  res.render('user/userlogin', {
    title: '员工登录'
  });
});

// 登录
router.post('/login', function(req, res, next) {
  var hash = crypto.createHash('md5');
  var account = req.body.username;
  var reqpassword = req.body.password;
  hash.update(reqpassword);
  var password = hash.digest('hex');
  usermodel.selectUser(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.name = rows[0].name;
    req.session.uid = rows[0].id;
    res.json({
      'success': '登录成功'
    });
  });
});

// 员工首页
router.get('/home', function(req, res, next) {
  res.render('user/home', {
    title: '员工首页',
    xiugaiClass: 'userUpdatePassword'
  });
});

// 员工签到页面
router.post('/userSignView', function(req, res, next) {
  var page = (req.body.page - 1) * 10 || 0;
  var userid = req.session.uid;
  usermodel.getSignPage(function(err, pagenum) {
    if (err) {
      return next(err);
    }
    usermodel.getSignRecord(userid, page, function(err, signList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < signList.length; i++) {
        var rztime = signList[i].qiandaotime;
        var d = new Date(rztime);
        signList[i].qiandaotime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      }
      res.render('user/UserSign/_UserSign', {
        pagenum: pagenum[0],
        signList: signList
      }, function(err, html) {
        res.json({
          'success': true,
          'view': html
        });
      });
    });
  });
});

// 员工签到
router.post('/userSign', function(req, res, next) {
  var userid = req.session.uid;
  var qiandaodidian = req.body.qiandaodidian;
  var reqnowdate = new Date();
  var nowdate = reqnowdate.getFullYear() + '-' + (reqnowdate.getMonth() + 1) + '-' + reqnowdate.getDate();
  usermodel.isTodaySign(nowdate, userid, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '您今天已经签过到了，请不要重复签到！'
      });
      return next(err);
    }
    usermodel.userSign(userid, qiandaodidian, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '签到成功'
      });
    });
  });
});

// 获取某一页签到记录
router.post('/pagesigninfo', function(req, res, next) {
  var userid = req.session.uid;
	var page = (req.body.page - 1) * 10;
	usermodel.getSignRecord(userid, page, function(err, signList) {
    if (err) {
      return next(err);
    }
    for (var i = 0; i < signList.length; i++) {
      var rztime = signList[i].qiandaotime;
      var d = new Date(rztime);
      signList[i].qiandaotime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
		res.json({
			'success': true,
			'result': signList
		});
	});
});

// 员工待办事项页面
router.post('/userDaiBan', function(req, res, next) {
  var page = 0;
  var userid = req.session.uid;
  usermodel.getDaiBanPage(function(err, pagenum) {
    if (err) {
      return next(err);
    }
    usermodel.getDaiban(userid, page, function(err, daibanList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < daibanList.length; i++) {
        var rztime = daibanList[i].endtime * 1000;
        var d = new Date(rztime);
        daibanList[i].endtime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      }
      res.render('user/DaiBan/_DaiBan', {
        pagenum: pagenum[0],
        daibanList: daibanList
      }, function(err, html) {
        res.json({
          'success': true,
          'view': html
        });
      });
    });
  });
});

// 添加待办事项
router.post('/addDaiBan', function(req, res, next) {
  var userid = req.session.uid;
  var shixiang = req.body.shixiang;
  var endtime = req.body.endtime;
  usermodel.userDaiBan(userid, shixiang, endtime, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加代办事项成功'
    });
  });
});

// 获取某一页签到记录
router.post('/pagedaibaninfo', function(req, res, next) {
  var userid = req.session.uid;
	var page = (req.body.page - 1) * 10;
	usermodel.getDaiban(userid, page, function(err, daibanList) {
    if (err) {
      return next(err);
    }
    for (var i = 0; i < daibanList.length; i++) {
      var rztime = daibanList[i].endtime * 1000;
      var d = new Date(rztime);
      daibanList[i].endtime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
		res.json({
			'success': true,
			'result': daibanList
		});
	});
});

// 员工请假页面
router.post('/userQingJia', function(req, res, next) {
  var page = 0;
  var userid = req.session.uid;
  usermodel.getQingJiaPage(function(err, pagenum) {
    if (err) {
      return next(err);
    }
    usermodel.getQingJia(userid, page, function(err, qingjiaList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < qingjiaList.length; i++) {
        var rztime = qingjiaList[i].start_time * 1000;
        var rztime2 = qingjiaList[i].end_time * 1000;
        var d = new Date(rztime);
        var d2 = new Date(rztime2);
        qingjiaList[i].start_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        qingjiaList[i].end_time = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds();
      }
      res.render('user/QingJia/_QingJia', {
        pagenum: pagenum[0],
        qingjiaList: qingjiaList
      }, function(err, html) {
        res.json({
          'success': true,
          'view': html
        });
      });
    });
  });
});

// 员工请假弹出层
router.post('/userQingJiaModal', function(req, res, next) {
  res.render('user/QingJia/_AddQingJia', {}, function(err, html) {
    res.json({
      'success': true,
      'view': html
    });
  });
});

// 请假
router.post('/addQingJia', function(req, res, next) {
  var userid = req.session.uid;
  var reason = req.body.reason;
  var starttime = req.body.starttime;
  var endtime = req.body.endtime;
  usermodel.userQingJia(reason, userid, starttime, endtime, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '请假成功，请等待管理员审核！'
    });
  });
});

// 获取某一页签到记录
router.post('/pageqingjiainfo', function(req, res, next) {
  var userid = req.session.uid;
	var page = (req.body.page - 1) * 10;
	usermodel.getQingJia(userid, page, function(err, qingjiaList) {
    if (err) {
      return next(err);
    }
    for (var i = 0; i < qingjiaList.length; i++) {
      var rztime = qingjiaList[i].start_time * 1000;
      var rztime2 = qingjiaList[i].end_time * 1000;
      var d = new Date(rztime);
      var d2 = new Date(rztime2);
      qingjiaList[i].start_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      qingjiaList[i].end_time = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate() + ' ' + d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds();
    }
		res.json({
			'success': true,
			'result': qingjiaList
		});
	});
});

// 修改密码
router.post('/updatePassword', function(req, res, next) {
  var hash = crypto.createHash('md5');
  var hash1 = crypto.createHash('md5');
  var userid = req.session.uid;
  var reqpassword = req.body.password;
  var reqoldPassword = req.body.oldpassword;
  hash.update(reqpassword);
  hash1.update(reqoldPassword);
  var password = hash.digest('hex');
  var oldpassword = hash1.digest('hex');
  usermodel.getOldPassword(userid, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (oldpassword != rows[0].password) {
      res.json({
        'error': '请输入正确的原密码!'
      });
      return next(err);
    }
    usermodel.updatePassword(password, userid, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '修改密码成功'
      });
    });
  });
});

module.exports = router;
