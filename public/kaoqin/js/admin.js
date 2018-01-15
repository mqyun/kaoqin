$(function() {
  $('.leftli-userinfo').click();
});

$(document).on('click', '#sidebar .sidebar-menu > li', function() {
  $('#sidebar .sidebar-menu > li').removeClass('active');
  $(this).addClass('active');
});

// 登录
$(document).on('click', '.btn-tologin', function() {
  var username = $('input[name="username"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'username': username,
    'password': password
  }
  if (username.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/admin/login', data, function(result) {
      if (result.success) {
        showTips('success', result.success, '两秒钟之后跳转到首页');
        setTimeout(function() {
          location.href = '/admin/home';
        }, 2000);
      }
    });
  }
});

// 员工信息
$(document).on('click', '.leftli-userinfo', function() {
  var data = {
    'page': 1
  }
  ajaxPost('/admin/userinfo', data, function(result) {
    if (result.success) {
      $('#main-content').html('');
      $('#main-content').append(result.view);
      $(function() {
        $('#datetimepicker1').datetimepicker();
      });
    }
  });
});

// 部门管理
$(document).on('click', '.leftli-bumenmanage', function() {
  ajaxPost('/admin/bumenmanage', {}, function(result) {
    if (result.success) {
      $('#main-content').html('');
      $('#main-content').append(result.view);
    }
  });
});

// 添加部门
$(document).on('click', '.btn-addbumenmodel', function() {
  $('.addbumen-model').slideToggle();
});
$(document).on('click', '.btn-cancelbumen', function() {
  $('.addbumen-model').slideUp();
});
$(document).on('click', '.btn-addbumen', function() {
  var name = $('input[name="bumenname"]').val();
  var data = {
    'name': name
  }
  if (name.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/admin/addbumen', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        setTimeout(function() {
          $('.leftli-bumenmanage').click();
        }, 1000);
      }
    });
  }
});

// 修改部门名称
$(document).on('click', '.btn-xgbumenname', function() {
  var bumenid = $(this).data('bumenid');
  layer.open({
    type: 1,
    title: '修改部门名称',
    area: ['800px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-3">名称</label>\
    <div class="col-lg-9"><input type="text" name="xg-bumenname" class="form-control"></div></div>\
    </div></div>',
    btn: ['修改'],
    shadeClose: true,
    yes: function(index, layero) {
      var name = $('input[name="xg-bumenname"]').val();
      var data = {
        'bumenid': bumenid,
        'name': name
      }
      layer.close(index);
      if (name.length == 0) {
        showTips('warning', 'Warning!', '请填写部门名称！');
      } else {
        ajaxPost('/admin/updatebumen', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            setTimeout(function() {
              $('.leftli-bumenmanage').click();
            }, 1000);
          }
        });
      }
    },
    success: function() {
      $('#datetimepicker2').datetimepicker();
    }
  });
});

// 添加员工
$(document).on('click', '.btn-adduser', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var gonghao = $('input[name="gonghao"]').val();
  var name = $('input[name="name"]').val();
  var bumen = $('select[name="bumen"]').val();
  var zhiwei = $('select[name="zhiwu"]').val();
  var sex = $('select[name="sex"]').val();
  var age = $('input[name="age"]').val();
  var ruzhitime = $('input[name="ruzhitime"]').val();
  ruzhitime = Date.parse(new Date(ruzhitime)) / 1000;
  var data = {
    'account': account,
    'password': password,
    'gonghao': gonghao,
    'name': name,
    'bumen': bumen,
    'zhiwei': zhiwei,
    'sex': sex,
    'age': age,
    'ruzhitime': ruzhitime
  }
  if (account.length == 0 || password.length == 0 || gonghao.length == 0 || name.length == 0 ||
    age.length == 0 || ruzhitime.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/admin/adduser', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        setTimeout(function() {
          $('.leftli-userinfo').click();
        }, 1000);
      }
    });
  }
});

// 员工信息界面获取其他页信息
$(document).on('click', '.user-pageli', function() {
  $('.user-pageli').removeClass('active');
  $(this).addClass('active');
  var page = $(this).data('pagenum');
  var data = {
    'page': page
  }
  ajaxPost('/admin/pageuserinfo', data, function(result) {
    if (result.success) {
      $('.tbody-userinfo').html('');
      var list = result.result;
      for (var i = 0; i < list.length; i++) {
        var rztime = list[i].ruzhitime * 1000;
        var d = new Date(rztime);
        list[i].ruzhitime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      }
      for (var i = 0; i < list.length; i++) {
        var tr = '<tr>\
								<td>' + list[i].name + '</td>\
								<td>' + list[i].age + '</td>\
								<td>' + list[i].sex + '</td>\
								<td>' + list[i].ruzhitime + '</td>\
								<td>' + list[i].bumenname + '</td>\
								<td data-userid=' + list[i].id + '><button class="btn btn-success btn-xs btn-reuserpassword"><i class="icon-ok">重置密码</i></button>\
								<button class="btn btn-primary btn-xs btn-edituserinfo"><i class="icon-pencil"></i></button>\
								<button class="btn btn-danger btn-xs btn-deleteuserinfo"><i class="icon-trash"></i></button></td></tr>'
        $('.tbody-userinfo').append(tr);
      }
    }
  });
});

// 删除员工
$(document).on('click', '.btn-deleteuserinfo', function() {
  var userId = $(this).parents('td').data('userid');
  var data = {
    'userId': userId
  }
  showBtnTips('warning', '删除员工！', '确定要删除该员工吗？', '取消', '确定', function() {
    ajaxPost('/admin/deleteuser', data, function(result) {
      if (result.success) {
        showTips('success', 'Success', result.success);
        setTimeout(function() {
          $('.leftli-userinfo').click();
        }, 1000);
      }
    });
  });
});

// 修改员工信息
$(document).on('click', '.btn-edituserinfo', function() {
  var userId = $(this).parents('td').data('userid');
  var data = {
    'userId': userId
  }
  ajaxPost('/admin/getEditUserInfoFrame', data, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '修改员工信息',
        area: ['800px'],
        skin: 'layui-layer-lan',
        content: result.view,
        btn: ['修改'],
        shadeClose: true,
        yes: function(index, layero) {
          var account = $('input[name="edit-account"]').val();
          var gonghao = $('input[name="edit-gonghao"]').val();
          var name = $('input[name="edit-name"]').val();
          var bumen = $('select[name="edit-bumen"]').val();
          var zhiwei = $('select[name="edit-zhiwu"]').val();
          var sex = $('select[name="edit-sex"]').val();
          var age = $('input[name="edit-age"]').val();
          var data = {
            'userid': userId,
            'account': account,
            'gonghao': gonghao,
            'name': name,
            'bumen': bumen,
            'zhiwei': zhiwei,
            'sex': sex,
            'age': age
          }
          layer.close(index);
          ajaxPost('/admin/EditUserInfo', data, function(result) {
            if (result.success) {
              showTips('success', 'Success!', result.success);
              setTimeout(function() {
                $('.user-pageli.active').click();
              }, 1000);
            }
          });
        },
        success: function() {
          $('#datetimepicker2').datetimepicker();
        }
      });
    }
  });
});

// 重置密码
$(document).on('click', '.btn-reuserpassword', function() {
  var userId = $(this).parents('td').data('userid');
  var data = {
    'userid': userId
  }
  showBtnTips('warning', '重置密码员工！', '确定要重置该员工密码吗？', '取消', '确定', function() {
    ajaxPost('/admin/reUserPassword', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        setTimeout(function() {
          $('.user-pageli.active').click();
        }, 1000);
      }
    });
  });
});

// 职位界面
$(document).on('click', '.leftli-zhiwei', function() {
  ajaxPost('/admin/getZhiWei', {}, function(result) {
    if (result.success) {
      $('#main-content').html('');
      $('#main-content').append(result.view);
    }
  });
});

// 添加职位
$(document).on('click', '.btn-addzhiweimodel', function() {
  $('.addzhiwei-model').slideToggle();
});
$(document).on('click', '.btn-cancelzhiwei', function() {
  $('.addzhiwei-model').slideUp();
});
$(document).on('click', '.btn-addzhiwei', function() {
  var name = $('input[name="zhiweiname"]').val();
  var data = {
    'name': name
  }
  if (name.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/admin/addzhiwei', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        setTimeout(function() {
          $('.leftli-zhiwei').click();
        }, 1000);
      }
    });
  }
});
