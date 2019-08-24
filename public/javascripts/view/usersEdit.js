let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    userID: '',
    cellphone: '',
    userCode: '',
    fullName: '',
    sex: 'M',
    userRole: 'T',
    email: '',
    add: true
  };

  $scope.initPage = function () {
    $scope.loadData();
  };

  $scope.loadData = function(){
    let userID = document.getElementById('hidden-userID').value;
    if(userID === ''){
      return false;
    }
    $http.get('/users/edit/detail?userID=' + userID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.userInfo === null){
        return false;
      }

      $scope.model.userID = response.data.userInfo.userID;
      $scope.model.cellphone = response.data.userInfo.cellphone;
      $scope.model.userCode = response.data.userInfo.userCode;
      $scope.model.fullName = response.data.userInfo.fullName;
      $scope.model.sex = response.data.userInfo.sex;
      $scope.model.userRole = response.data.userInfo.userRole;
      $scope.model.email = response.data.userInfo.email;
      $scope.model.add = false;
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.addData = function () {
    $http.post('/users/edit', {
      cellphone: $scope.model.cellphone,
      userCode: $scope.model.userCode,
      fullName: $scope.model.fullName,
      sex: $scope.model.sex,
      userRole: $scope.model.userRole,
      email: $scope.model.email,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/users';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/users/edit', {
      userID: $scope.model.userID,
      cellphone: $scope.model.cellphone,
      userCode: $scope.model.userCode,
      fullName: $scope.model.fullName,
      sex: $scope.model.sex,
      userRole: $scope.model.userRole,
      email: $scope.model.email,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/users';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSubmit = function(){
    if($scope.model.userID === ''){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});