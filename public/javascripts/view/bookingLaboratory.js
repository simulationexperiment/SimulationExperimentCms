let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {

    fromDate: '',
    toDate: '',

    appointmentDate: '',

    courseOrder: 0,
    selectedCourseOrder: null,
    courseOrderList: [{courseOrderID: 0, courseOrderName: '请选择第几节课'}],

    laboratoryID: 0,
    selectedLaboratory: null,
    laboratoryList: [{laboratoryID: 0, laboratoryName: '请选择实验室'}],

    userRole: '',
  };

  $scope.initPage = function () {
    let loginUserInfo = getLoginUserInfo();
    let fromDate = document.getElementById('hidden-fromDate').value;
    let toDate = document.getElementById('hidden-toDate').value;
    if(fromDate !== ''){
      $scope.model.fromDate = new Date(fromDate);
    }
    if(toDate !== ''){
      $scope.model.toDate = new Date(toDate);
    }
    $scope.model.userRole = loginUserInfo.userRole;
    $scope.loadCourseOrder();
    $scope.loadLaboratory();
  };

  $scope.loadCourseOrder = function() {
    $scope.model.courseOrderList.push({courseOrderID: 1, courseOrderName: '第一节课'});
    $scope.model.courseOrderList.push({courseOrderID: 2, courseOrderName: '第二节课'});
    $scope.model.courseOrderList.push({courseOrderID: 3, courseOrderName: '第三节课'});
    $scope.model.courseOrderList.push({courseOrderID: 4, courseOrderName: '第四节课'});
    $scope.model.courseOrderList.push({courseOrderID: 5, courseOrderName: '第五节课'});
    $scope.model.courseOrderList.push({courseOrderID: 6, courseOrderName: '第六节课'});
    $scope.model.courseOrderList.push({courseOrderID: 7, courseOrderName: '第七节课'});
    $scope.model.courseOrderList.push({courseOrderID: 8, courseOrderName: '第八节课'});
    angular.forEach($scope.model.courseOrderList, function (courseOrder) {
      if(courseOrder.courseOrderID === $scope.model.courseOrder){
        $scope.model.selectedCourseOrder = courseOrder;
      }
    });
  };

  $scope.loadLaboratory = function() {
    $http.get('/common/laboratory').then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.laboratoryList === null){
        return false;
      }
      angular.forEach(response.data.laboratoryList, function (system) {
        $scope.model.laboratoryList.push({
          laboratoryID: system.laboratoryID,
          laboratoryName: system.laboratoryName
        });
      });
      $scope.model.selectedLaboratory = $scope.model.laboratoryList[0];

    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.transform = function (transTime) {
    let date = new Date(transTime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + d;
  };

  $scope.onSearch = function (){
    if($scope.model.fromDate === '' || $scope.model.toDate === ''){
      return false;
    }
    location.href = 'bookingLaboratory?fromDate=' + $scope.transform($scope.model.fromDate) + '&toDate=' + $scope.transform($scope.model.toDate);
  };

  $scope.onAppointment = function (){
    $http.get('/bookingLaboratory/checkLaboratoryScheduled?laboratoryDate=' + $scope.transform($scope.model.appointmentDate) +
        '&courseOrder=' + $scope.model.selectedCourseOrder.courseOrderID +
        '&laboratoryID=' + $scope.model.selectedLaboratory.laboratoryID
    ).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.scheduled){

        bootbox.alert($scope.transform($scope.model.appointmentDate)
            + '第' + $scope.model.selectedCourseOrder.courseOrderID + '节的'
            + $scope.model.selectedLaboratory.laboratoryName + '已被其他人预定，请从新选择。');
        return false;
      }

      $http.post('/bookingLaboratory', {
        laboratoryDate: $scope.transform($scope.model.appointmentDate),
        courseOrder: $scope.model.selectedCourseOrder.courseOrderID,
        laboratoryID: $scope.model.selectedLaboratory.laboratoryID,
        loginUser: getLoginUser()
      }).then(function successCallback(response) {
        if(response.data.err){
          bootbox.alert(response.data.msg);
          return false;
        }

        location.href = 'bookingLaboratory?fromDate=' + $scope.transform($scope.model.appointmentDate)
            + '&toDate=' + $scope.transform($scope.model.appointmentDate);
      }, function errorCallback(response) {
        bootbox.alert('网络异常，请检查网络设置');
      });

    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onDelete = function (appointmentID, laboratoryDate, courseOrder, laboratoryName){
    bootbox.confirm({
      message: '您确定要删除' + laboratoryDate + '第' + courseOrder + '节' + laboratoryName + '的预定吗？',
      buttons: {
        confirm: {
          label: '删除',
          className: 'btn-danger'
        },
        cancel: {
          label: '取消',
          className: 'btn-default'
        }
      },
      callback: function (result) {
        if(result) {
          $http.delete('/bookingLaboratory?appointmentID=' + appointmentID).then(function successCallback(response) {
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