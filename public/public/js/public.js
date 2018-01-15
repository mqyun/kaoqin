// ajax封装方法
function ajaxPost(url, data, successfn, isLoadingShow) {
	var oDiv;
	$.ajax({
		url: url,
		contentType: "application/json; charset=utf-8",
		type: 'POST',
		data: JSON.stringify(data),
		success: function(result) {
			if (result.success) {
				successfn && successfn(result);
			} else {
				showTips('error', '出错了！', result.error);
			}
		},
		error: function(jqXHR, status, error) {
			if (error.length > 0) {
				showTips('error', '出错了！', error);
			} else {
				showTips('error', '出错了！', '请刷新页面试试~');
			}
		},
		beforeSend: function(jqXHR, settings) {
			if (isLoadingShow == undefined || isLoadingShow == true) {
				oDiv = alertLoading();
			}
		},
		complete: function(jqXHR, status) {
			if (oDiv) oDiv.remove();
		}
	})
};

// sweetalert自动消失提示封装
function showTips(type, msgtit, msgcon, newTimeOut = 2000) {
	// type取值 "warning"、"error"、"success"、"info"
	swal({
		title: msgtit,
		text: msgcon,
		timer: newTimeOut,
		showConfirmButton: false,
    type: type,
    html: true
	});
}

function showBtnTips(type, msgtit, msgcon, btncancel, btnconfirm, callback, newTimeOut = 2000) {
  swal({
		title: msgtit,
		text: msgcon,
		type: type,
		showCancelButton: true,
		confirmButtonClass: 'btn-info',
		cancelButtonClass: 'btn-secondary',
		confirmButtonText: btnconfirm,
    cancelButtonText: btncancel,
		closeOnConfirm: false
	}, function() {
		callback();
	});
}

// 加载动画封装
function alertLoading() {
	var oDiv = $('<div class="loadingTip"><img src="/public/img/loading.gif" /></div>');
	$('body').append(oDiv);
	return oDiv;
}

// 获取路径参数封装
function getFromUrl(key) {
	var urlInfo = location.search.substring(1).split('&');
	for (var i = 0; i < urlInfo.length; i++) {
		var name = urlInfo[i].split('=')[0];
		var value = urlInfo[i].split('=')[1];
		if (key.toLowerCase() === name.toLowerCase()) {
			return value;
			break;
		}
	}
	return '';
}

// 获取经纬度
function GetPostion(callback) {
  var address = "具体的地理位置 ";
	var longtitude = 0;
	var latitude = 0;
  var url = "http://api.map.baidu.com/geocoder/v2/?address=" + address + "&output=json&ak=FG7wxr1VUj0k2NwoO3yXzymd&callback=?";
  $.getJSON(url, function(data) {
		// 经度
    longtitude = data.result.location.lng;
		// 纬度
    latitude = data.result.location.lat;
		callback(longtitude, latitude);
  });
}
