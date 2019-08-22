let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    //查询条件：所属系统
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],
    //查询条件：所属课程
    selectedCourse4Search: null,
    courseList4Search: [{courseID: 0, courseName: '全部'}],
    //查询条件：资源类型
    selectedSourceType4Search: null,
    sourceTypeList4Search: [{sourceTypeID: 0, sourceTypeName: '全部'}],
    //查询条件：资源类型
    selectedResourceStatus4Search: null,
    resourceStatus4Search: [{resourceStatusID: 'null', resourceStatusName: '全部'}],
  };

  $scope.initPage = function () {
    $scope.loadSystem();
    $scope.loadCourse();
    $scope.loadSourceType();
    $scope.loadResourceStatus();
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
        if(system.systemID === parseInt(systemID)){
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
        if(course.courseID === parseInt(courseID)){
          $scope.model.selectedCourse4Search = course;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadSourceType = function(){
    $http.get('/common/resourceType').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.resourceTypeList === null){
        return false;
      }
      let resourceTypeID = document.getElementById('hidden-sourceTypeID').value;
      angular.forEach(response.data.resourceTypeList, function (resourceType) {
        $scope.model.sourceTypeList4Search.push({
          sourceTypeID: resourceType.sourceTypeID,
          sourceTypeName: resourceType.sourceTypeName
        });
      });
      angular.forEach($scope.model.sourceTypeList4Search, function (sourceType) {
        if(sourceType.sourceTypeID === parseInt(resourceTypeID)){
          $scope.model.selectedSourceType4Search = sourceType;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadResourceStatus = function(){
    let resourceStatusID = document.getElementById('hidden-resourceStatusID').value;
    $scope.model.resourceStatus4Search.push({resourceStatusID: 'P', resourceStatusName: '待审核'});
    $scope.model.resourceStatus4Search.push({resourceStatusID: 'A', resourceStatusName: '审批通过'});
    $scope.model.resourceStatus4Search.push({resourceStatusID: 'R', resourceStatusName: '审批未通过'});
    angular.forEach($scope.model.resourceStatus4Search, function (resourceStatus) {
      if(resourceStatus.resourceStatusID === resourceStatusID){
        $scope.model.selectedResourceStatus4Search = resourceStatus;
      }
    });
  };

  $scope.onSearch = function () {
    location.href = '/myResource?systemID=' + $scope.model.selectedSystem4Search.systemID
        + '&courseID=' + $scope.model.selectedCourse4Search.courseID
        + '&resourceTypeID=' + $scope.model.selectedSourceType4Search.sourceTypeID
        + '&resourceStatusID=' + $scope.model.selectedResourceStatus4Search.resourceStatusID;
  };

  $scope.onChange = function (resourceID) {
    location.href = '/myResource/edit?resourceID=' + resourceID;
  };

  $scope.onDelete = function (resourceID, resourceName) {
    bootbox.confirm({
      message: '您确定要删除' + resourceName + '这个资源吗？',
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
          $http.delete('/myResource?resourceID=' + resourceID).then(function successCallback(response) {
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