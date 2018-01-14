var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var adminmodel = require('../../models/admin/adminmodel');

// 管理员登录页
router.get('/', function(req, res, next) {
	res.render('admin/adminlogin', {
		title: '管理员登录'
	});
});

// 管理员首页
router.get('/home', function(req, res, next) {
	res.render('admin/home', {
		title: '考勤管理系统'
	});
});

// 管理员登录
router.post('/login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	adminmodel.selectAdmin(username, function(err, rows) {
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
		req.session.quanxian = rows[0].quanxian;
		res.json({
			'success': '登录成功'
		});
	});
});

// 获取员工信息
router.post('/userinfo', function(req, res, next) {
	var page = (req.body.page - 1) * 10 || 0;
	adminmodel.getbumen(function(err, bumenList) {
		if (err) {
			return next(err);
		}
		adminmodel.getUserPage(function(err, pagenum) {
			if (err) {
				return next(err);
			}
			adminmodel.getuser(page, function(err, userList) {
				for (var i = 0; i < userList.length; i++) {
					var rztime = userList[i].ruzhitime * 1000;
					var d = new Date(rztime);
					userList[i].ruzhitime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
				}
				res.render('admin/UserInfo/_UserInfo', {
					bumenList: bumenList,
					pagenum: pagenum[0],
					userList: userList
				}, function(err, html) {
					res.json({
						'success': true,
						'view': html
					});
				});
			});
		});
	});
});

// 获取其他页员工信息
router.post('/pageuserinfo', function(req, res, next) {
	var page = (req.body.page - 1) * 10;
	adminmodel.getuser(page, function(err, userList) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': true,
			'result': userList
		});
	});
});

// 部门管理
router.post('/bumenmanage', function(req, res, next) {
	adminmodel.getbumen(function(err, rows) {
		if (err) {
			return next(err);
		}
		res.render('admin/BuMen/_BuMenManage', {
			bumenList: rows
		}, function(err, html) {
			res.json({
				'success': true,
				'view': html
			});
		});
	});
});

// 添加部门
router.post('/addbumen', function(req, res, next) {
	var name = req.body.name;
	adminmodel.addbumen(name, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next();
		}
		res.json({
			'success': '添加部门成功'
		});
	});
});

// 添加员工
router.post('/adduser', function(req, res, next) {
	var hash = crypto.createHash('md5');
	var account = req.body.account;
	var reqpassword = req.body.password;
	hash.update(reqpassword);
	var password = hash.digest('hex');
	var gonghao = req.body.gonghao;
	var name = req.body.name;
	var bumen = req.body.bumen;
	var zhiwei = req.body.zhiwei;
	var sex = req.body.sex;
	var age = req.body.age;
	var ruzhitime = req.body.ruzhitime;
	adminmodel.adduser(account, password, gonghao, name, bumen, zhiwei, sex, age, ruzhitime, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next();
		}
		res.json({
			'success': '添加员工成功'
		});
	});
});

// 删除员工
router.post('/deleteuser', function(req, res, next) {
	var userId = req.body.userId;
	adminmodel.deleteuser(userId, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': '删除成功'
		});
	});
});

// 获取修改员工信息页面
router.post('/getEditUserInfoFrame', function(req, res, next) {
	var userId = req.body.userId;
	adminmodel.getbumen(function(err, bumenList) {
		if (err) {
			return next(err);
		}
		adminmodel.getThisUser(userId, function(err, userItem) {
			if (err) {
				return next(err);
			}
			res.render('admin/UserInfo/_EditUserInfo', {
				bumenList: bumenList,
				userItem: userItem[0]
			}, function(err, html) {
				res.json({
					'success': true,
					'view': html
				});
			});
		});
	});
});

// 修改员工信息
router.post('/EditUserInfo', function(req, res, next) {
	var userid = req.body.userid;
	var account = req.body.account;
	var gonghao = req.body.gonghao;
	var name = req.body.name;
	var bumen = req.body.bumen;
	var zhiwei = req.body.zhiwei;
	var sex = req.body.sex;
	var age = req.body.age;
	adminmodel.editUserInfo(account, gonghao, name, bumen, zhiwei, sex, age, userid, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': '修改员工信息成功'
		});
	})
});

// 重置密码为123
router.post('/reUserPassword', function(req, res, next) {
	var hash = crypto.createHash('md5');
	var userid = req.body.userid;
	var reqpassword = '123';
	hash.update(reqpassword);
	var password = hash.digest('hex');
	adminmodel.reUserPassword(password, userid, function(err) {
		if (err) {
			res.json({
				'error': err
			});
			return next(err);
		}
		res.json({
			'success': '重置密码成功'
		});
	})
});

module.exports = router;
