let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    //查询条件：所属系统
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],
    //查询条件：所属课程
    selectedCourse4Search: null,
    courseList4Search: [{courseCode: 0, courseName: '全部'}],
    //查询条件：资源类型
    selectedSourceType4Search: null,
    sourceTypeList4Search: [{sourceTypeID: 0, sourceTypeName: '全部'}]
  };

  $scope.initPage = function () {
    $scope.loadSystem();
    $scope.loadCourse();
    $scope.loadSourceType();
    $scope.setDefaultOption();
  };

  $scope.loadSourceType = function(){
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 1, sourceTypeName: 'PDF'});
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 2, sourceTypeName: 'Image'});
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 3, sourceTypeName: 'MP4'});
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 4, sourceTypeName: 'ZIP'});
  };

  $scope.setDefaultOption = function(){
    //查询条件默认值设置
    $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
    $scope.model.selectedCourse4Search = $scope.model.courseList4Search[0];
    $scope.model.selectedSourceType4Search = $scope.model.sourceTypeList4Search[0];
  };

  //todo 调用API获取数据
  $scope.loadSystem = function() {
    $scope.model.systemList4Search.push({systemID: 1, systemName: '3D仓储'});
    $scope.model.systemList4Search.push({systemID: 2, systemName: '3D运输'});
  };

  //todo 调用API获取数据
  $scope.loadCourse = function() {
    $scope.model.courseList4Search.push({courseCode: 1, courseName: '物流企业运营实训'});
    $scope.model.courseList4Search.push({courseCode: 2, courseName: '邮政快递企业综合实训'});
    $scope.model.courseList4Search.push({courseCode: 3, courseName: '现代生产物流智能仿真实验'});
  };

  $scope.initPage();
});