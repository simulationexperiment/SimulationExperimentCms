let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '请选择系统'}],

    userRole: ''
  };

  $scope.initPage = function () {
    let loginUserInfo = getLoginUserInfo();
    $scope.model.userRole = loginUserInfo.userRole;
    $scope.loadSystem();
  };

  $scope.loadSystem = function() {
    $http.get('/common/system').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.systemList === null){
        return false;
      }
      let systemID = document.getElementById('hidden-systemID').value;
      angular.forEach(response.data.systemList, function (system) {
        $scope.model.systemList4Search.push({
          systemID: system.systemID,
          systemName: system.systemName
        });
      });

      if(systemID === '0'){
        $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
        return false;
      }

      angular.forEach($scope.model.systemList4Search, function (system) {
        if(parseInt(systemID) === system.systemID){
          $scope.model.selectedSystem4Search = system;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSearch = function () {
    if($scope.model.selectedSystem4Search.systemID === 0){
      return false;
    }
    location.href = '/classSchedule?systemID=' + $scope.model.selectedSystem4Search.systemID;
  };


  $scope.initPage();
});