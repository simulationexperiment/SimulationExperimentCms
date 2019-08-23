let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    //查询条件
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],

    selectedCourse4Search: null,
    courseList4Search: [{courseID: 0, courseName: '全部'}],

    selectedExperimentType4Search: null,
    experimentTypeList4Search: [{experimentTypeID: 0, experimentTypeName: '全部'}],
  };

  $scope.initPage = function () {
    $scope.loadSystem();
    $scope.loadCourse();
    $scope.loadExperimentType();
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

  $scope.loadCourse = function() {
    $http.get('/common/course').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.courseList === null){
        return false;
      }
      let courseID = document.getElementById('hidden-courseID').value;
      angular.forEach(response.data.courseList, function (course) {
        $scope.model.courseList4Search.push({
          courseID: course.courseID,
          courseName: course.courseName
        });
      });
      angular.forEach($scope.model.courseList4Search, function (course) {
        if(parseInt(courseID) === course.courseID){
          $scope.model.selectedCourse4Search = course;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadExperimentType = function() {
    $http.get('/common/experimentType').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.experimentTypeList === null){
        return false;
      }
      let experimentTypeID = document.getElementById('hidden-experimentTypeID').value;
      angular.forEach(response.data.experimentTypeList, function (experimentType) {
        $scope.model.experimentTypeList4Search.push({
          experimentTypeID: experimentType.experimentTypeID,
          experimentTypeName: experimentType.experimentTypeName
        });
      });

      angular.forEach($scope.model.experimentTypeList4Search, function (experimentType) {
        if(parseInt(experimentTypeID) === experimentType.experimentTypeID){
          $scope.model.selectedExperimentType4Search = experimentType;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSearch = function () {
    location.href = '/assignExperiment?systemID=' + $scope.model.selectedSystem4Search.systemID
        + '&courseID=' + $scope.model.selectedCourse4Search.courseID
        + '&experimentTypeID=' + $scope.model.selectedExperimentType4Search.experimentTypeID;
  };

  $scope.onChange = function (experimentAssignID) {
    location.href = '/assignExperiment/edit?experimentAssignID='+experimentAssignID;
  };

  $scope.onDelete = function (experimentAssignID, experimentName) {
    bootbox.confirm({
      message: '您确定要删除已布置的实验：' + experimentName + '吗？',
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
          $http.delete('/assignExperiment?experimentAssignID=' + experimentAssignID).then(function successCallback(response) {
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