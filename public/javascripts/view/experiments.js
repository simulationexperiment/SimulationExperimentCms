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

    //编辑内容
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],

    selectedCourse: null,
    courseList: [{courseCode: 0, courseName: '请选择所属课程'}],

    selectedExperimentType: null,
    experimentTypeList: [{experimentTypeID: 0, experimentTypeName: '请选择实验类型'}],
  };

  $scope.initPage = function () {
    CKEDITOR.replace( 'experimentStep');
    $scope.loadSystem();
    $scope.loadCourse();
    $scope.loadExperimentType();
    $scope.setDefaultOption();
  };

  $scope.setDefaultOption = function(){
    $scope.model.selectedSystem = $scope.model.systemList[0];
    $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
    $scope.model.selectedCourse4Search = $scope.model.courseList4Search[0];
    $scope.model.selectedExperimentType4Search = $scope.model.experimentTypeList4Search[0];
    $scope.model.selectedExperimentType = $scope.model.experimentTypeList[0];
    $scope.model.selectedCourse = $scope.model.courseList[0];
  };

  //todo 调用API获取数据
  $scope.loadSystem = function() {
    $scope.model.systemList.push({systemID: 1, systemName: '3D仓储'});
    $scope.model.systemList.push({systemID: 2, systemName: '3D运输'});
    $scope.model.systemList4Search.push({systemID: 1, systemName: '3D仓储'});
    $scope.model.systemList4Search.push({systemID: 2, systemName: '3D运输'});
  };

  //todo 调用API获取数据
  $scope.loadCourse = function() {
    $scope.model.courseList.push({courseCode: 1, courseName: '物流企业运营实训'});
    $scope.model.courseList.push({courseCode: 2, courseName: '邮政快递企业综合实训'});
    $scope.model.courseList.push({courseCode: 3, courseName: '现代生产物流智能仿真实验'});

    $scope.model.courseList4Search.push({courseCode: 1, courseName: '物流企业运营实训'});
    $scope.model.courseList4Search.push({courseCode: 2, courseName: '邮政快递企业综合实训'});
    $scope.model.courseList4Search.push({courseCode: 3, courseName: '现代生产物流智能仿真实验'});
  };

  //todo 调用API获取数据
  $scope.loadExperimentType = function() {
    $scope.model.experimentTypeList4Search.push({experimentTypeID: 1, experimentTypeName: '含实物实验'});
    $scope.model.experimentTypeList4Search.push({experimentTypeID: 1, experimentTypeName: '虚拟实验'});
    $scope.model.experimentTypeList4Search.push({experimentTypeID: 1, experimentTypeName: '演示实验'});
    $scope.model.experimentTypeList4Search.push({experimentTypeID: 1, experimentTypeName: '客户端实验'});
    $scope.model.experimentTypeList4Search.push({experimentTypeID: 1, experimentTypeName: '远程实验'});
    $scope.model.experimentTypeList4Search.push({experimentTypeID: 1, experimentTypeName: '三维仿真实验'});

    $scope.model.experimentTypeList.push({experimentTypeID: 1, experimentTypeName: '含实物实验'});
    $scope.model.experimentTypeList.push({experimentTypeID: 1, experimentTypeName: '虚拟实验'});
    $scope.model.experimentTypeList.push({experimentTypeID: 1, experimentTypeName: '演示实验'});
    $scope.model.experimentTypeList.push({experimentTypeID: 1, experimentTypeName: '客户端实验'});
    $scope.model.experimentTypeList.push({experimentTypeID: 1, experimentTypeName: '远程实验'});
    $scope.model.experimentTypeList.push({experimentTypeID: 1, experimentTypeName: '三维仿真实验'});
  };

  $scope.initPage();
});