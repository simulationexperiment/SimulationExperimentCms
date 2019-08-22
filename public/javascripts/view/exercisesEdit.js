let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    exercisesID: '',

    systemID: 0,
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],

    exercisesTypeID: 0,
    selectedExercisesType: null,
    exercisesTypeList: [{exercisesTypeID: 0, exercisesTypeName: '请选择习题类型'}],

    courseID: 0,
    selectedCourse: null,
    courseList: [{courseID: 0, courseName: '请选择所属课程'}],

    knowledgeID: 0,
    selectedKnowledge: null,
    knowledgeList: [{knowledgeID: 0, knowledgeName: '请选择所属知识点'}],

    experimentTypeID: 0,
    selectedExperimentType: null,
    experimentTypeList: [{experimentTypeID: 0, experimentTypeName: '请选择实验类型'}],

    exercisesContent: '',
    add: true
  };

  $scope.initPage = function () {
    $scope.initCkEditor();
    $scope.loadData();
  };

  $scope.initCkEditor = function(){
    CKEDITOR.config.height = 350;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.extraPlugins = 'html5video';
    CKEDITOR.config.image_previewText = ' ';
    CKEDITOR.replace( 'exercisesContent');
  };

  $scope.loadData = function(){
    let exercisesID = document.getElementById('hidden-exercisesID').value;
    if(exercisesID === ''){
      $scope.loadSystem();
      $scope.loadExercisesType();
      $scope.loadCourse();
      $scope.loadExperimentType();
      return false;
    }
    $http.get('/exercises/edit/detail?exercisesID=' + exercisesID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.exercisesInfo === null){
        return false;
      }

      $scope.model.exercisesID = response.data.exercisesInfo.exercisesID;
      $scope.model.systemID = response.data.exercisesInfo.systemID;
      $scope.model.exercisesTypeID = response.data.exercisesInfo.exercisesTypeID;
      $scope.model.courseID = response.data.exercisesInfo.courseID;
      $scope.model.knowledgeID = response.data.exercisesInfo.knowledgeID;
      $scope.model.experimentTypeID = response.data.exercisesInfo.experimentTypeID;
      $scope.model.exercisesContent = response.data.exercisesInfo.exercisesContent;

      CKEDITOR.instances.exercisesContent.setData($scope.model.exercisesContent);
      $scope.model.add = false;
      $scope.loadSystem();
      $scope.loadExercisesType();
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
      $scope.loadKnowledge();
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadExercisesType = function() {
    $http.get('/common/exercisesType').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.exercisesTypeList === null){
        return false;
      }
      angular.forEach(response.data.exercisesTypeList, function (exercisesType) {
        $scope.model.exercisesTypeList.push({
          exercisesTypeID: exercisesType.exercisesTypeID,
          exercisesTypeName: exercisesType.exercisesTypeName
        });
      });
      angular.forEach($scope.model.exercisesTypeList, function (exercisesType) {
        if(exercisesType.exercisesTypeID === $scope.model.exercisesTypeID){
          $scope.model.selectedExercisesType = exercisesType;
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

  $scope.loadKnowledge = function() {
    $scope.model.knowledgeList.splice(1, $scope.model.knowledgeList.length);
    $http.get('/common/knowledge?systemID=' + $scope.model.selectedSystem.systemID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.knowledgeList === null){
        return false;
      }
      angular.forEach(response.data.knowledgeList, function (knowledge) {
        $scope.model.knowledgeList.push({
          knowledgeID: knowledge.knowledgeID,
          knowledgeName: knowledge.knowledgeName
        });
      });

      angular.forEach($scope.model.knowledgeList, function (knowledge) {
        if(knowledge.knowledgeID === $scope.model.knowledgeID){
          $scope.model.selectedKnowledge = knowledge;
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

    // $scope.model.experimentList.push({experimentCode: 1, experimentName: '实物实验'});
    // $scope.model.experimentList.push({experimentCode: 1, experimentName: '虚拟实验'});
    // $scope.model.experimentList.push({experimentCode: 1, experimentName: '演示实验'});
    // $scope.model.experimentList.push({experimentCode: 1, experimentName: '客户端实验'});
    // $scope.model.experimentList.push({experimentCode: 1, experimentName: '远程实验'});
    // $scope.model.experimentList.push({experimentCode: 1, experimentName: '三维仿真实验'});
  };

  $scope.checkData = function() {
    $scope.model.exercisesContent = CKEDITOR.instances.exercisesContent.getData();
    if($scope.model.exercisesContent.length === 0){
      bootbox.alert('请输入习题内容。');
      return false;
    }
    return true;
  };

  $scope.addData = function () {
    $http.post('/exercises/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      exercisesTypeID: $scope.model.selectedExercisesType.exercisesTypeID,
      courseID: $scope.model.selectedCourse.courseID,
      knowledgeID: $scope.model.selectedKnowledge.knowledgeID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      exercisesContent: $scope.model.exercisesContent,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/exercises';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/exercises/edit', {
      exercisesID: $scope.model.exercisesID,
      systemID: $scope.model.selectedSystem.systemID,
      exercisesTypeID: $scope.model.selectedExercisesType.exercisesTypeID,
      courseID: $scope.model.selectedCourse.courseID,
      knowledgeID: $scope.model.selectedKnowledge.knowledgeID,
      experimentTypeID: $scope.model.selectedExperimentType.experimentTypeID,
      exercisesContent: $scope.model.exercisesContent,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/exercises';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSystemChange = function(){
    $scope.loadKnowledge();
  };

  $scope.onSubmit = function(){
    if(!$scope.checkData()){
      return false;
    }
    if($scope.model.exercisesID === ''){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});