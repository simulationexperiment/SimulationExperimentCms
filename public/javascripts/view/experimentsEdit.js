let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    experimentID: '',

    systemID: 0,
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],

    courseID: 0,
    selectedCourse: null,
    courseList: [{courseID: 0, courseName: '请选择所属课程'}],

    experimentTypeID: 0,
    selectedExperimentType: null,
    experimentTypeList: [{experimentTypeID: 0, experimentTypeName: '请选择实验类型'}],

    experimentName: '',
    experimentContent: '',
    add: true
  };

  $scope.initPage = function () {
    $scope.initCkEditor();
    $scope.loadData();
  };

  $scope.initCkEditor = function(){
    CKEDITOR.config.height = 300;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.extraPlugins = 'html5video';
    CKEDITOR.config.image_previewText = ' ';
    CKEDITOR.replace( 'experimentStep');
  };

  $scope.loadData = function(){
    let experimentID = document.getElementById('hidden-experimentID').value;
    if(experimentID === ''){
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadExperimentType();
      return false;
    }
    $http.get('/experiments/edit/detail?experimentID=' + experimentID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.experimentInfo === null){
        return false;
      }

      $scope.model.experimentID = response.data.experimentInfo.experimentID;
      $scope.model.systemID = response.data.experimentInfo.systemID;
      $scope.model.courseID = response.data.experimentInfo.courseID;
      $scope.model.experimentTypeID = response.data.experimentInfo.experimentTypeID;
      $scope.model.experimentName = response.data.experimentInfo.experimentName;
      $scope.model.experimentContent = response.data.experimentInfo.experimentContent;

      CKEDITOR.instances.experimentStep.setData($scope.model.experimentContent);
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
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.checkData = function() {
    $scope.model.experimentContent = CKEDITOR.instances.experimentStep.getData();
    if($scope.model.experimentContent.length === 0){
      bootbox.alert('请输入实验步骤。');
      return false;
    }
    return true;
  };

  $scope.addData = function () {
    $http.post('/experiments/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      experimentName: $scope.model.experimentName,
      experimentContent: $scope.model.experimentContent,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/experiments';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/experiments/edit', {
      experimentID: $scope.model.experimentID,
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      experimentName: $scope.model.experimentName,
      experimentContent: $scope.model.experimentContent,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/experiments';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSubmit = function(){
    if(!$scope.checkData()){
      return false;
    }
    if($scope.model.experimentID === ''){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});