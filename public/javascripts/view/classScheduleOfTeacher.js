let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    selectedSystem4Search: null,

    systemList4Search: [{systemID: 0, systemName: '请选择系统'}],

    selectedTeacher4Search: null,
    teacherList4Search: [{teacherID: 0, teacherName: '请选择教师'}],

    userRole: ''
  };

  $scope.initPage = function () {
    let loginUserInfo = getLoginUserInfo();
    $scope.model.userRole = loginUserInfo.userRole;
    $scope.loadSystem();
    $scope.loadTeachers();
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

  $scope.loadTeachers = function() {
    $http.get('/common/teacher').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.teacherList === null){
        return false;
      }
      let teacherID = document.getElementById('hidden-teacherID').value;
      angular.forEach(response.data.teacherList, function (teacher) {
        $scope.model.teacherList4Search.push({
          teacherID: teacher.userID,
          teacherName: teacher.fullName
        });
      });

      if(teacherID === '0'){
        $scope.model.selectedTeacher4Search = $scope.model.teacherList4Search[0];
        return false;
      }

      angular.forEach($scope.model.teacherList4Search, function (teacher) {
        if(parseInt(teacherID) === teacher.teacherID){
          $scope.model.selectedTeacher4Search = teacher;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSearch = function () {
    if($scope.model.selectedSystem4Search.systemID === 0 || $scope.model.selectedTeacher4Search.teacherID === 0){
      return false;
    }
    location.href = '/classScheduleOfTeacher?systemID=' + $scope.model.selectedSystem4Search.systemID
        + '&teacherID=' + $scope.model.selectedTeacher4Search.teacherID
        + '&teacherName=' + $scope.model.selectedTeacher4Search.teacherName;
  };

  $scope.onChange = function(scheduleID) {
    location.href = '/classScheduleOfTeacher/edit?scheduleID=' + scheduleID;
  };

  $scope.initPage();
});