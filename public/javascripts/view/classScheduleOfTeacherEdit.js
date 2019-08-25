let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    scheduleID: 0,
    //编辑内容：所属系统
    originalSystemID: 0,
    systemID: 0,
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],


    //编辑内容：教师
    originalTeacherID: 0,
    originalTeacherName: 0,
    teacherID: 0,
    selectedTeacher: null,
    teacherList: [{teacherID: 0, teacherName: '请选择教师'}],

    //编辑内容：课程节次
    courseOrder: 1,
    selectedCourseOrder: null,
    courseOrderList: [],

    mondayCourse: '',
    tuesdayCourse: '',
    wednesdayCourse: '',
    thursdayCourse: '',
    fridayCourse: '',
    saturdayCourse: '',
    sundayCourse: '',

    add: true
  };

  $scope.initPage = function () {
    $scope.loadData();
  };

  $scope.loadData = function(){
    let scheduleID = document.getElementById('hidden-scheduleID').value;
    if(scheduleID === ''){
      $scope.loadSystem();
      $scope.loadTeachers();
      $scope.loadCourseOrder();
      return false;
    }
    $http.get('/classScheduleOfTeacher/edit/detail?scheduleID=' + scheduleID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.classScheduleInfo === null){
        return false;
      }

      $scope.model.scheduleID = response.data.classScheduleInfo.scheduleID;
      $scope.model.originalSystemID = response.data.classScheduleInfo.systemID;
      $scope.model.systemID = response.data.classScheduleInfo.systemID;
      $scope.model.originalTeacherID = response.data.classScheduleInfo.teacherID;
      $scope.model.teacherID = response.data.classScheduleInfo.teacherID;
      $scope.model.originalTeacherName = response.data.classScheduleInfo.teacherName;
      $scope.model.courseOrder = response.data.classScheduleInfo.courseOrder;
      $scope.model.mondayCourse = response.data.classScheduleInfo.mondayCourse;
      $scope.model.tuesdayCourse = response.data.classScheduleInfo.tuesdayCourse;
      $scope.model.wednesdayCourse = response.data.classScheduleInfo.wednesdayCourse;
      $scope.model.thursdayCourse = response.data.classScheduleInfo.thursdayCourse;
      $scope.model.fridayCourse = response.data.classScheduleInfo.fridayCourse;
      $scope.model.saturdayCourse = response.data.classScheduleInfo.saturdayCourse;
      $scope.model.sundayCourse = response.data.classScheduleInfo.sundayCourse;
      $scope.model.add = false;
      $scope.loadSystem();
      $scope.loadTeachers();
      $scope.loadCourseOrder();
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
        if($scope.model.teacherID === teacher.teacherID){
          $scope.model.selectedTeacher = teacher;
        }
      });
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.loadCourseOrder = function() {
    $scope.model.courseOrderList.push({courseOrderID: 1, courseOrderName: '第一节课'});
    $scope.model.courseOrderList.push({courseOrderID: 2, courseOrderName: '第二节课'});
    $scope.model.courseOrderList.push({courseOrderID: 3, courseOrderName: '第三节课'});
    $scope.model.courseOrderList.push({courseOrderID: 4, courseOrderName: '第四节课'});
    $scope.model.courseOrderList.push( {courseOrderID: 5, courseOrderName: '第五节课'});
    $scope.model.courseOrderList.push({courseOrderID: 6, courseOrderName: '第六节课'});
    $scope.model.courseOrderList.push({courseOrderID: 7, courseOrderName: '第七节课'});
    $scope.model.courseOrderList.push({courseOrderID: 8, courseOrderName: '第八节课'});
    angular.forEach($scope.model.courseOrderList, function (courseOrder) {
      if(courseOrder.courseOrderID === $scope.model.courseOrder){
        $scope.model.selectedCourseOrder = courseOrder;
      }
    });
  };

  $scope.addData = function () {
    $http.post('/classScheduleOfTeacher/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      teacherID: $scope.model.selectedTeacher.teacherID,
      courseOrder: $scope.model.selectedCourseOrder.courseOrderID,
      mondayCourse: $scope.model.mondayCourse,
      tuesdayCourse: $scope.model.tuesdayCourse,
      wednesdayCourse: $scope.model.wednesdayCourse,
      thursdayCourse: $scope.model.thursdayCourse,
      fridayCourse: $scope.model.fridayCourse,
      saturdayCourse: $scope.model.saturdayCourse,
      sundayCourse: $scope.model.sundayCourse,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }

      location.href = '/classScheduleOfTeacher?systemID=' + $scope.model.selectedSystem.systemID
          + '&teacherID=' + $scope.model.selectedTeacher.teacherID
          + '&teacherName=' + $scope.model.selectedTeacher.teacherName;
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onBack = function() {
    if($scope.model.originalSystemID === 0 || $scope.model.originalTeacherID === 0){
      location.href = '/classScheduleOfTeacher';
    }else{
      location.href = '/classScheduleOfTeacher?systemID=' + $scope.model.originalSystemID
          + '&teacherID=' + $scope.model.originalTeacherID
          + '&teacherName=' + $scope.model.originalTeacherName;
    }

  };

  $scope.onSubmit = function(){
    $scope.addData();
  };

  $scope.initPage();
});