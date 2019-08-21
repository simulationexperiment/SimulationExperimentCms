let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],

    selectedKnowledge4Search: null,
    knowledgeList4Search: [{knowledgeID: 0, knowledgeName: '全部'}],

    selectedCreator: null,
    teacherList4Search: [{teacherID: 0, teacherName: '全部'}],
  };

  $scope.initPage = function () {
    $scope.loadSystem();
    $scope.loadTeachers();
    $scope.setDefaultOption();
  };

  $scope.setDefaultOption = function(){
      $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
      $scope.model.selectedKnowledge4Search = $scope.model.knowledgeList4Search[0];
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

      $scope.loadKnowledge();
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

  $scope.loadKnowledge = function() {
    $scope.model.knowledgeList4Search.splice(1, $scope.model.knowledgeList4Search.length);
    $http.get('/common/knowledge?systemID=' + $scope.model.selectedSystem4Search.systemID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.knowledgeList === null){
        return false;
      }
      let knowledgeID = document.getElementById('hidden-knowledgeID').value;
      angular.forEach(response.data.knowledgeList, function (knowledge) {
        $scope.model.knowledgeList4Search.push({
          knowledgeID: knowledge.knowledgeID,
          knowledgeName: knowledge.knowledgeName
        });
      });

      let isMaped= false;
      angular.forEach($scope.model.knowledgeList4Search, function (knowledge) {
        if(parseInt(knowledgeID) === knowledge.knowledgeID){
          $scope.model.selectedKnowledge4Search = knowledge;
          isMaped = true;
        }
      });
      if(!isMaped){
        $scope.model.selectedKnowledge4Search = $scope.model.knowledgeList4Search[0];
      }
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSystemChange = function(){
    $scope.loadKnowledge();
  };

  $scope.onSearch = function () {
    location.href = '/exercises?systemID=' + $scope.model.selectedSystem4Search.systemID
        + '&knowledgeID=' + $scope.model.selectedKnowledge4Search.knowledgeID
        + '&creator=' + $scope.model.selectedCreator.teacherID;
  };

  $scope.onShowExercisesContent = function(systemName, courseName, exercisesContent){
    bootbox.alert({
      title: systemName + ' ' + courseName + ' 习题内容',
      message: exercisesContent
    });
  };

  $scope.onChange = function (exercisesID) {
    location.href = '/exercises/edit?exercisesID='+exercisesID;
  };

  $scope.onDelete = function (exercisesID) {
    bootbox.confirm({
      message: '您确定要删除该习题吗？',
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
          $http.delete('/exercises?exercisesID=' + exercisesID).then(function successCallback(response) {
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