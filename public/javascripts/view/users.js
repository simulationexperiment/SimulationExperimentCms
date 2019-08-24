let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.onChange = function (userID) {
    location.href = '/users/edit?userID='+userID;
  };

  $scope.onDelete = function (userID, userName, userRole) {
    bootbox.confirm({
      message: '您确定要删除用户：' + userName + '吗？',
      buttons: {
        confirm: {
          label: '确认',
          className: 'btn-danger'
        },
        cancel: {
          label: '取消',
          className: 'btn-default'
        }
      },
      callback: function (result) {
        if(result) {
          $http.delete('/users?userID=' + userID).then(function successCallback(response) {
            if(response.data.err){
              bootbox.alert(response.data.msg);
              return false;
            }
            location.reload();
          }, function errorCallback(response) {
            bootbox.alert('网络异常，请检查网络设置');
          });
        }
      }
    });
  };

});