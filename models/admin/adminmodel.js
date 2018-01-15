var db = require('../dboperation');

module.exports = {
  // 验证用户
  selectAdmin: function(username, callback) {
    var sql = "select * from admin where account = ?;";
		db.exec(sql, username, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 添加部门
  addbumen: function(name, callback) {
    var sql = "insert into bumen(name) values(?);";
		db.exec(sql, name, function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  // 获取所有部门
  getbumen: function(callback) {
    var sql = "select * from bumen;";
    db.exec(sql, '', function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 修改部门名称
  updateBuMenName: function(name, id, callback) {
    var sql = "update bumen set name = ? where id = ?;";
    db.exec(sql, [name, id], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  // 添加员工
  adduser: function(account, password, gonghao, name, bumen, zhiwei, sex, age, ruzhitime, callback) {
    var sql = "insert into user(account, password, gonghao, name, bumen, zhiwei, sex, age, ruzhitime) values(?,?,?,?,?,?,?,?,?);";
    db.exec(sql, [account, password, gonghao, name, bumen, zhiwei, sex, age, ruzhitime], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取员工管理页码
  getUserPage: function(callback) {
    var sql = "select ceil(count(id)/10) as page from user;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有员工
  getuser: function(page, callback) {
    var sql = "select user.*, bumen.name as bumenname from user,bumen where user.bumen=bumen.id order by user.id desc limit " + page + ", 10;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 删除员工
  deleteuser: function(userId, callback) {
    var sql = "delete from user where id = ?;";
    db.exec(sql, userId, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取单个员工信息
  getThisUser: function(userId, callback) {
    var sql = "select * from user where id = ?;";
    db.exec(sql, userId, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改员工信息
  editUserInfo: function(account, gonghao, name, bumen, zhiwei, sex, age, userid, callback) {
    var sql = "update user set account = ?, gonghao = ?, name = ?, bumen = ?, zhiwei = ?, sex = ?, age = ? where id = ?;";
    db.exec(sql, [account, gonghao, name, bumen, zhiwei, sex, age, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 重置员工密码
  reUserPassword: function(password, userid, callback) {
    var sql = "update user set password = ? where id = ?;";
    db.exec(sql, [password, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取代办事项页码
  getDaiBanPage: function(callback) {
    var sql = "select ceil(count(id)/10) as page from daiban;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取代办事项
  getDaiBan: function(page, callback) {
    var sql = "select daiban.*, user.name as username from daiban,user where daiban.user_id=user.id order by daiban.id desc limit " + page + ", 10;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有职位
  getZhiWei: function(callback) {
    var sql = "select * from zhiwei;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加职位
  addzhiwei: function(name, callback) {
    var sql = "insert into zhiwei(name) values(?);";
		db.exec(sql, name, function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
  // 修改职位名称
  updateZhiWeiName: function(name, id, callback) {
    var sql = "update zhiwei set name = ? where id = ?;";
    db.exec(sql, [name, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取某一天的签到情况
  getDayQianDaoInfo: function(nowdate, callback) {
    var sql = "select qiandao.*, user.name as username from qiandao, user where ( datediff ( qiandaotime , '" + nowdate + "' ) = 0 ) and qiandao.user_id = user.id;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 审核签到
  examineQianDao: function(id, callback) {
    var sql = "update qiandao set shenhe = 1 where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 审核请假
  examineQingJia: function(id, callback) {
    var sql = "update qingjia set shenhe = 1 where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取原密码
  getOldPassword: function(id, callback) {
    var sql = "select * from admin where id = ?;";
    db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 修改密码
  updatePassword: function(password, id, callback) {
    var sql = "update admin set password = ? where id = ?;";
    db.exec(sql, [password, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 添加管理员
  addAdmin: function(account, password, name, sex, qianxian, callback) {
    var sql = "insert into admin(account, password, name, sex, qianxian) values(?,?,?,?,?);";
    db.exec(sql, [account, password, name, sex, qianxian], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
