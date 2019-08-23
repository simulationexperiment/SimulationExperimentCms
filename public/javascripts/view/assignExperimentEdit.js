let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    experimentAssignID: '',

    systemID: 0,
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],

    courseID: 0,
    selectedCourse: null,
    courseList: [{courseID: 0, courseName: '请选择所属课程'}],

    experimentTypeID: 0,
    selectedExperimentType: null,
    experimentTypeList: [{experimentTypeID: 0, experimentTypeName: '请选择实验类型'}],

    experimentID: 0,
    selectedExperiment: null,
    experimentList: [{experimentID: 0, experimentName: '请选择实验'}],

    experimentTimes: 0,

    add: true
  };

  $scope.initPage = function () {
    $scope.loadData();
  };

  $scope.loadData = function(){
    let experimentAssignID = document.getElementById('hidden-experimentAssignID').value;
    if(experimentAssignID === ''){
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadExperimentType();
      $scope.loadExperiment();
      return false;
    }
    $http.get('/assignExperiment/edit/detail?experimentAssignID=' + experimentAssignID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.experimentAssignInfo === null){
        return false;
      }

      $scope.model.experimentAssignID = response.data.experimentAssignInfo.experimentAssignID;
      $scope.model.systemID = response.data.experimentAssignInfo.systemID;
      $scope.model.courseID = response.data.experimentAssignInfo.courseID;
      $scope.model.experimentTypeID = response.data.experimentAssignInfo.experimentTypeID;
      $scope.model.experimentID = response.data.experimentAssignInfo.experimentID;
      $scope.model.experimentTimes = response.data.experimentAssignInfo.experimentTimes;
      $scope.model.add = false;
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadExperimentType();
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
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
      angular.forEach(response.data.systemList, function (system) {
        $scope.model.systemList.push({
          systemID: system.systemID,
          systemName: system.systemName
        });
      });
      angular.forEach($scope.model.systemList, function (system) {
        if(system.systemID === $scope.model.systemID){
          $scope.model.selectedSystem = system;
        }
      });
      $scope.loadExperiment();
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
      angular.forEach(response.data.courseList, function (course) {
        $scope.model.courseList.push({
          courseID: course.courseID,
          courseName: course.courseName
        });
      });
      angular.forEach($scope.model.courseList, function (course) {
        if(course.courseID === $scope.model.courseID){
          $scope.model.selectedCourse = course;
        }
      });
      $scope.loadExperiment();
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
      angular.forEach(response.data.experimentTypeList, function (experimentType) {
        $scope.model.experimentTypeList.push({
          experimentTypeID: experimentType.experimentTypeID,
          experimentTypeName: experimentType.experimentTypeName
        });
      });

      angular.forEach($scope.model.experimentTypeList, function (experimentType) {
        if(experimentType.experimentTypeID === $scope.model.experimentTypeID){
          $scope.model.selectedExperimentType = experimentType;
        }
      });
      $scope.loadExperiment();
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadExperiment = function(){
    if($scope.model.selectedSystem === null
        || $scope.model.selectedSystem.systemID === 0
        || $scope.model.selectedCourse === null
        || $scope.model.selectedCourse.courseID === 0
        || $scope.model.selectedExperimentType === null
        || $scope.model.selectedExperimentType.experimentTypeID === 0){
      $scope.model.experimentList.splice(1, $scope.model.experimentList.length);
      $scope.model.selectedExperiment = $scope.model.experimentList[0];
      return false;
    }
    $http.get('/common/experiment?systemID=' + $scope.model.selectedSystem.systemID
        + '&courseID=' + $scope.model.selectedCourse.courseID
        + '&experimentTypeID=' + $scope.model.selectedExperimentType.experimentTypeID)
        .then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.experimentList === null || response.data.experimentList.length === 0){
        $scope.model.experimentList.splice(1, $scope.model.experimentList.length);
        $scope.model.selectedExperiment = $scope.model.experimentList[0];
        return false;
      }
      angular.forEach(response.data.experimentList, function (experiment) {
        $scope.model.experimentList.push({
          experimentID: experiment.experimentID,
          experimentName: experiment.experimentName
        });
      });

      angular.forEach($scope.model.experimentList, function (experiment) {
        if(experiment.experimentID === $scope.model.experimentID){
          $scope.model.selectedExperiment = experiment;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.addData = function () {
    $http.post('/assignExperiment/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      experimentID: $scope.model.selectedExperiment.experimentID,
      experimentTimes: $scope.model.experimentTimes,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/assignExperiment';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/assignExperiment/edit', {
      experimentAssignID: $scope.model.experimentAssignID,
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      experimentID: $scope.model.selectedExperiment.experimentID,
      experimentTimes: $scope.model.experimentTimes,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/assignExperiment';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSystemChange = function(){
    $scope.loadExperiment();
  };

  $scope.onCourseChange = function(){
    $scope.loadExperiment();
  };

  $scope.onExperimentTypeChange = function(){
    $scope.loadExperiment();
  };

  $scope.onSubmit = function(){
    if($scope.model.experimentAssignID === ''){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});