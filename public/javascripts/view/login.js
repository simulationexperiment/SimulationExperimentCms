let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    cellphone: '',
    password: ''
  };

  $scope.onLogin = function () {
    if($scope.model.cellphone.length === 0 || $scope.model.password.length === 0){
      return false;
    }
    $http.post('/', {
      cellphone: $scope.model.cellphone,
      password: $scope.model.password
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.userInfo === null){
        bootbox.alert('您输入的用户名密码不存在！');
        return false;
      }
      //记录Cookie
      setCookie('secms.user', JSON.stringify(response.data.userInfo));
      location.href = '/index';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };
});