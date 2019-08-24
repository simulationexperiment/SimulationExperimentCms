let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    reportID: '',

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

    //编辑内容：批阅人
    correctorID: 0,
    selectedCorrector: null,
    teacherList: [{teacherID: 0, teacherName: '请选择审核人'}],

    startTime: '',
    endTime: '',
    reportUri: '',

    add: true
  };

  $scope.initPage = function () {
    $scope.initUploadPlugins();
    $scope.loadData();
  };

  $scope.initUploadPlugins = function(){
    uploadUtils.initUploadPlugin('#file-upload-resource', '/experimentReport/edit/fileUpload', ['pdf','zip'], false, function (opt,data) {
      $scope.model.reportUri = data.fileUrl[0];
      $scope.$apply();
    });
  };

  $scope.loadData = function(){
    let reportID = document.getElementById('hidden-reportID').value;
    if(reportID === ''){
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadExperimentType();
      $scope.loadExperiment();
      $scope.loadTeachers();
      return false;
    }
    $http.get('/experimentReport/edit/detail?reportID=' + reportID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.experimentAssignInfo === null){
        return false;
      }

      $scope.model.reportID = response.data.experimentReportInfo.reportID;
      $scope.model.systemID = response.data.experimentReportInfo.systemID;
      $scope.model.courseID = response.data.experimentReportInfo.courseID;
      $scope.model.experimentTypeID = response.data.experimentReportInfo.experimentTypeID;
      $scope.model.experimentID = response.data.experimentReportInfo.experimentID;
      $scope.model.correctorID = response.data.experimentReportInfo.correctorID;
      $scope.model.startTime = new Date(response.data.experimentReportInfo.startTime);
      $scope.model.endTime = new Date(response.data.experimentReportInfo.endTime);
      $scope.model.reportUri = response.data.experimentReportInfo.reportUri;
      $scope.model.add = false;
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadExperimentType();
      $scope.loadTeachers();
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
    $http.get('/common/experiment/assign?systemID=' + $scope.model.selectedSystem.systemID
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

  $scope.loadTeachers = function() {
    $http.get('/common/teacher').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.teacherList === null){
        $scope.model.selectedCorrector = $scope.model.teacherList[0];
        return false;
      }
      angular.forEach(response.data.teacherList, function (teacher) {
        $scope.model.teacherList.push({
          teacherID: teacher.userID,
          teacherName: teacher.fullName
        });
      });

      angular.forEach($scope.model.teacherList, function (teacher) {
        if($scope.model.correctorID === teacher.teacherID){
          $scope.model.selectedCorrector = teacher;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.addData = function () {
    $http.post('/experimentReport/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      experimentID: $scope.model.selectedExperiment.experimentID,
      startTime: $scope.model.startTime,
      endTime: $scope.model.endTime,
      reportUri: $scope.model.reportUri,
      correctorID: $scope.model.selectedCorrector.teacherID,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/experimentReport';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/experimentReport/edit', {
      reportID: $scope.model.reportID,
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      experimentID: $scope.model.selectedExperiment.experimentID,
      startTime: $scope.model.startTime,
      endTime: $scope.model.endTime,
      reportUri: $scope.model.reportUri,
      correctorID: $scope.model.selectedCorrector.teacherID,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/experimentReport';
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
    if($scope.model.reportID === ''){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});