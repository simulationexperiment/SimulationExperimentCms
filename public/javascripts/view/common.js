$(document).ready(function () {
  setAlertBell();
  setActiveNav();
  setPaginationStatus();
  addCommonEvent();
  showLoginUser();
  hideNav();
});

function setAlertBell() {
  let alertCount = 8;
  if(alertCount > 0){
    $('.icon-bell-alt').addClass('icon-animated-bell');
  }
}

function hideNav() {
  let loginUserInfo = getLoginUserInfo();
  if(loginUserInfo !== 'unknown'){
    if(loginUserInfo.userRole === 'S'){
      //隐藏只能由教师和管理员操作的菜单
      $('li.teacher-nav').hide();
      $('li.admin-nav').hide();
    }
    if(loginUserInfo.userRole === 'T'){
      //隐藏只能由学生和管理员操作的菜单
      $('li.student-nav').hide();
      $('li.admin-nav').hide();
    }

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
  if(pathname.indexOf('experimentReport') >= 0){
    return '/experimentReport';
  }
  if(pathname.indexOf('users') >= 0){
    return '/users';
  }
  return pathname;
}

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
    delCookie('secmsUser');
    location.href = '/';
  });
}

function showLoginUser() {
  let cookie = getCookie('secmsUser');
  if(cookie !== null){
    let loginUser = JSON.parse(cookie);
    $('#login-user-photo').attr('src', loginUser.adminPhoto);
    $('li.light-blue span.user-info>span').text(loginUser.fullName);
  }
}

function getLoginUserInfo() {
  var cookie = getCookie('secmsUser');
  if(cookie !== null){
    return JSON.parse(cookie);
  }

  return '';
}

function getLoginUser() {
  var cookie = getCookie('secmsUser');
  if(cookie !== null){
    var loginUser = JSON.parse(cookie);
    return loginUser.userID;
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