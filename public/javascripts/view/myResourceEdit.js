let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    resourceID: 0,
    //编辑内容：所属系统
    systemID: 0,
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],
    //编辑内容：所属课程
    courseID: 0,
    selectedCourse: null,
    courseList: [{courseID: 0, courseName: '请选择所属课程'}],
    //编辑内容：资源类型
    sourceTypeID: 0,
    selectedSourceType: null,
    sourceTypeList: [{sourceTypeID: 0, sourceTypeName: '请选择资源类型'}],
    //编辑内容：审核人
    auditorID: 0,
    selectedAuditor: null,
    teacherList: [{teacherID: 0, teacherName: '请选择审核人'}],
    resourceUri: ''
  };

  $scope.initPage = function () {
    $scope.initUploadPlugins();
    $scope.loadData();
  };

  $scope.initUploadPlugins = function(){
    uploadUtils.initUploadPlugin('#file-upload-resource', '/myResource/edit/fileUpload', ['png','jpg','jpeg','pdf','mp4','zip'], false, function (opt,data) {
      $scope.model.resourceUri = data.fileUrl[0];
      $scope.$apply();
    });
  };

  $scope.loadData = function(){
    let resourceID = document.getElementById('hidden-resourceID').value;
    if(resourceID === ''){
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadSourceType();
      $scope.loadTeachers();
      return false;
    }
    $http.get('/myResource/edit/detail?resourceID=' + resourceID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.resourceInfo === null){
        return false;
      }

      $scope.model.resourceID = response.data.resourceInfo.resourceID;
      $scope.model.systemID = response.data.resourceInfo.systemID;
      $scope.model.courseID = response.data.resourceInfo.courseID;
      $scope.model.sourceTypeID = response.data.resourceInfo.resourceTypeID;
      $scope.model.auditorID = response.data.resourceInfo.auditorID;
      $scope.model.resourceUri = response.data.resourceInfo.resourceUri;
      $scope.model.add = false;
      $scope.loadSystem();
      $scope.loadCourse();
      $scope.loadSourceType();
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

  $scope.loadSourceType = function(){
    $http.get('/common/resourceType').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.resourceTypeList === null){
        return false;
      }
      angular.forEach(response.data.resourceTypeList, function (resourceType) {
        $scope.model.sourceTypeList.push({
          sourceTypeID: resourceType.sourceTypeID,
          sourceTypeName: resourceType.sourceTypeName
        });
      });
      angular.forEach($scope.model.sourceTypeList, function (sourceType) {
        if(sourceType.sourceTypeID === $scope.model.sourceTypeID){
          $scope.model.selectedSourceType = sourceType;
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
        $scope.model.selectedAuditor = $scope.model.teacherList[0];
        return false;
      }
      angular.forEach(response.data.teacherList, function (teacher) {
        $scope.model.teacherList.push({
          teacherID: teacher.userID,
          teacherName: teacher.fullName
        });
      });

      angular.forEach($scope.model.teacherList, function (teacher) {
        if($scope.model.auditorID === teacher.teacherID){
          $scope.model.selectedAuditor = teacher;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.addData = function () {
    $http.post('/myResource/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      resourceTypeID: $scope.model.selectedSourceType.sourceTypeID,
      resourceUri: $scope.model.resourceUri,
      auditorID: $scope.model.selectedAuditor.teacherID,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/myResource';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/myResource/edit', {
      resourceID: $scope.model.resourceID,
      systemID: $scope.model.selectedSystem.systemID,
      courseID: $scope.model.selectedCourse.courseID,
      resourceTypeID: $scope.model.selectedSourceType.sourceTypeID,
      resourceUri: $scope.model.resourceUri,
      auditorID: $scope.model.selectedAuditor.teacherID,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/myResource';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSubmit = function(){
    if($scope.model.resourceID === 0){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});