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

    selectedReportStatus4Search: null,
    reportStatusList4Search: [{reportStatusID: 'A', reportStatusName: '全部'}],

    reportID: '',
    modalTitle: '',
    disciplineScore: 0,
    practiceScore: 0,
    reportScore: 0,
  };

  $scope.initPage = function () {
    $scope.loadSystem();
    $scope.loadCourse();
    $scope.loadExperimentType();
    $scope.loadReportStatus();
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

  $scope.loadReportStatus = function(){
    let reportStatusID = document.getElementById('hidden-reportStatus').value;
    $scope.model.reportStatusList4Search.push({reportStatusID: 'P', reportStatusName: '待批阅'});
    $scope.model.reportStatusList4Search.push({reportStatusID: 'C', reportStatusName: '已批阅'});
    angular.forEach($scope.model.reportStatusList4Search, function (reportStatus) {
      if(reportStatusID === reportStatus.reportStatusID){
        $scope.model.selectedReportStatus4Search = reportStatus;
      }
    });
  };

  $scope.onSearch = function () {
    location.href = '/experimentReview?systemID=' + $scope.model.selectedSystem4Search.systemID
        + '&courseID=' + $scope.model.selectedCourse4Search.courseID
        + '&experimentTypeID=' + $scope.model.selectedExperimentType4Search.experimentTypeID
        + '&reportStatus=' + $scope.model.selectedReportStatus4Search.reportStatusID
    ;
  };

  $scope.onReview = function (reportID, createUser, reportName) {
    $scope.model.reportID = reportID;
    $scope.model.modalTitle = '批阅' + createUser + '的实验报告: ' + reportName;
    $('#myModal').modal('show');
  };

  $scope.onSubmit = function(){
    let totalScore = $scope.model.disciplineScore + $scope.model.practiceScore + $scope.model.reportScore;
    bootbox.confirm({
      message: '您确定要以总分：' + totalScore + '分提交吗？',
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
          $http.put('/experimentReview', {
            reportID: $scope.model.reportID,
            disciplineScore: $scope.model.disciplineScore,
            practiceScore: $scope.model.practiceScore,
            reportScore: $scope.model.reportScore,
            loginUser: getLoginUser()
          }).then(function successCallback(response) {
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