let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],

    selectedCreator: null,
    teacherList4Search: [{teacherID: 0, teacherName: '全部'}],

    userRole: '',
  };

  $scope.initPage = function () {
    let loginUserInfo = getLoginUserInfo();
    $scope.model.userRole = loginUserInfo.userRole;
    $scope.loadSystem();
    $scope.loadTeachers();
    $scope.setDefaultOption();
  };

  $scope.setDefaultOption = function(){
    $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
    $scope.model.selectedCreator = $scope.model.teacherList4Search[0];
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

      angular.forEach($scope.model.systemList4Search, function (system) {
        if(parseInt(systemID) === system.systemID){
          $scope.model.selectedSystem4Search = system;
        }
      });

    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadTeachers = function() {
    $http.get('/common/teacher').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.teacherList === null){
        return false;
      }
      let creatorID = document.getElementById('hidden-creator').value;
      angular.forEach(response.data.teacherList, function (teacher) {
        $scope.model.teacherList4Search.push({
          teacherID: teacher.userID,
          teacherName: teacher.fullName
        });
      });

      angular.forEach($scope.model.teacherList4Search, function (teacher) {
        if(parseInt(creatorID) === teacher.teacherID){
          $scope.model.selectedCreator = teacher;
        }
      });

    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onShowKnowledgeContent = function(knowledgeName, knowledgeContent){
    bootbox.alert({
      title: knowledgeName,
      message: knowledgeContent
    });
  };

  $scope.onSearch = function (){
    location.href = 'knowledge?systemID=' + $scope.model.selectedSystem4Search.systemID + '&creator=' + $scope.model.selectedCreator.teacherID;
  };

  $scope.onChange = function (knowledgeID){
    location.href = '/knowledge/edit?knowledgeID=' + knowledgeID;
  };

  $scope.onDelete = function (knowledgeID, knowledgeName){
    bootbox.confirm({
      message: '您确定要删除' + knowledgeName + '吗？',
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
          $http.delete('/knowledge?knowledgeID=' + knowledgeID).then(function successCallback(response) {
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

  $scope.initPage();
});