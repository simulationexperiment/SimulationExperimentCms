$(document).ready(function () {
  setAlertBell();
  setActiveNav();
  setPaginationStatus();
  addCommonEvent();
  showLoginUser();
});

function setAlertBell() {
  let alertCount = 8;
  if(alertCount > 0){
    $('.icon-bell-alt').addClass('icon-animated-bell');
  }
}

function setActiveNav() {
  let pathname = getActivePath();
  $('.nav-list li.active').removeClass('active');
  $('.nav-list li.open').removeClass('open').removeClass('active');
  let element = $('.nav-list a[href="' + pathname + '"]');
  $(element).parent().addClass('active');
  $(element).parent().parent().parent().addClass('open active');
  $(element).parent().parent().parent().parent().attr('style', 'display: block;');
}

function getActivePath() {
  let pathname = window.location.pathname;
  if(pathname.indexOf('index') >= 0){
    return '/index';
  }
  if(pathname.indexOf('knowledge') >= 0){
    return '/knowledge';
  }
  if(pathname.indexOf('exercises') >= 0){
    return '/exercises';
  }
  if(pathname.indexOf('systemIntroduce/transport') >= 0){
    return '/systemIntroduce/transport';
  }
  if(pathname.indexOf('experimentPurposes/transport') >= 0){
    return '/experimentPurposes/transport';
  }
  if(pathname.indexOf('experimentRequirement/transport') >= 0){
    return '/experimentRequirement/transport';
  }

  if(pathname.indexOf('myResource') >= 0){
    return '/myResource';
  }
  if(pathname.indexOf('waitingResource') >= 0){
    return '/waitingResource';
  }
  if(pathname.indexOf('usingResource') >= 0){
    return '/usingResource';
  }
  if(pathname.indexOf('refusedResource') >= 0){
    return '/refusedResource';
  }

  if(pathname.indexOf('experiments') >= 0){
    return '/experiments';
  }
  if(pathname.indexOf('assignExperiment') >= 0){
    return '/assignExperiment';
  }
  if(pathname.indexOf('myExperiment') >= 0){
    return '/myExperiment';
  }

  return pathname;
}

// function alertMessage(msg) {
//   var html = '<div class="modal fade" tabindex="-1" role="dialog" id="dialog-alert-message">\n' +
//       '  <div class="modal-dialog" role="document">\n' +
//       '    <div class="modal-content">\n' +
//       '      <div class="modal-header">\n' +
//       '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
//       '        <h4 class="modal-title">系统提示</h4>\n' +
//       '      </div>\n' +
//       '      <div class="modal-body">\n' +
//       '        <p>' + msg + '</p>\n' +
//       '      </div>\n' +
//       '    </div>\n' +
//       '  </div>\n' +
//       '</div>';
//
//   var dialog = $('#dialog-alert-message');
//   if(dialog.length === 0){
//     $('.page-content').after(html);
//   }
//
//   $('#dialog-alert-message').modal('show');
//
// }
//
// function showMessage(msg) {
//   $('.alert-warning').removeClass('hidden');
//   $('.alert-warning span').text(msg);
// }

// function hiddenMessage() {
//   $('.alert-warning').addClass('hidden');
//   $('.alert-warning span').text('');
// }

// function propAlert(msg, selector) {
//   var html = '<div class="modal fade" tabindex="-1" role="dialog" id="dialog-alert-message">\n' +
//     '  <div class="modal-dialog" role="document">\n' +
//     '    <div class="modal-content">\n' +
//     '      <div class="modal-header">\n' +
//     '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
//     '        <h4 class="modal-title">系统提示</h4>\n' +
//     '      </div>\n' +
//     '      <div class="modal-body">\n' +
//     '        <p>' + msg + '</p>\n' +
//     '      </div>\n' +
//     '    </div>\n' +
//     '  </div>\n' +
//     '</div>';
//
//   var dialog = $('#dialog-alert-message');
//   if(dialog.length === 0){
//     $('.page-content').after(html);
//   }else{
//     $('#dialog-alert-message .modal-body p').text(msg);
//   }
//
//   $('#dialog-alert-message').modal('show');
//
//   setTimeout(function () {
//     $('#dialog-alert-message').modal('hide');
//     // $('#dialog-alert-message').remove();
//     if(selector !== undefined){
//       $(selector).parent().parent().addClass('has-error');
//     }
//   }, 2000);
// }
//
// function resetInputStatus(selector) {
//   $(selector).parent().parent().removeClass('has-error');
// }

function setPaginationStatus() {
  var currentPageNum = $('#hidden-currentPageNum').val();
  if(currentPageNum !== undefined){
    //设置默认选中的页码
    $('ul.pagination li').each(function () {
      if($.trim($(this).text()) === currentPageNum){
        $(this).addClass('active');
      }
    });

    //设置前一页按钮是否可用
    var firstPageNumber = $.trim($('ul.pagination li').eq(1).text());
    if(currentPageNum === firstPageNumber){
      $('ul.pagination li').eq(0).addClass('disabled');
    }

    //设置后一页按钮是否可用
    var lastPageNumber = $.trim($('ul.pagination li').eq($('ul.pagination li').length - 2).text());
    if(currentPageNum === lastPageNumber){
      $('ul.pagination li').eq($('ul.pagination li').length - 1).addClass('disabled');
    }
  }
}

function addCommonEvent() {
  $('li.logout').click(function () {
    delCookie('bwa.user');
    location.href = '/';
  });
}

function showLoginUser() {
  let cookie = getCookie('bwa.user');
  if(cookie !== null){
    let loginUser = JSON.parse(cookie);
    $('#login-user-photo').attr('src', loginUser.adminPhoto);
    $('li.light-blue span.user-info>span').text(loginUser.adminName);
  }
}

function getLoginUserInfo() {
  var cookie = getCookie('bwa.user');
  if(cookie !== null){
    return JSON.parse(cookie);
  }

  return '';
}

function getLoginUser() {
  var cookie = getCookie('bwa.user');
  if(cookie !== null){
    var loginUser = JSON.parse(cookie);
    return loginUser.adminID;
  }

  return 'unknown';
}

function setCookie(name,value) {
  var days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function isDecimal(v) {
  var regu = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  var reg = new RegExp(regu);
  return reg.test(v);
}

function isRate(v) {
  var regu = "^0+[\.][0-9]{0,2}$";
  var re = new RegExp(regu);
  return re.test(v);
}

Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
};