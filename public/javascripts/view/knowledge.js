let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],

    selectedCreator: null,
    teacherList4Search: [{teacherID: 0, teacherName: '全部'}],

    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],

  };

  $scope.initPage = function () {
    CKEDITOR.replace( 'knowledgeContent');
    CKEDITOR.replace( 'experimentStep');
    $scope.loadSystem();
    $scope.loadTeachers();
    $scope.setDefaultOption();
  };

  $scope.setDefaultOption = function(){
    $scope.model.selectedSystem = $scope.model.systemList[0];
    $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
    $scope.model.selectedCreator = $scope.model.teacherList4Search[0];
  };

  //todo 调用API获取数据
  $scope.loadSystem = function() {
    $scope.model.systemList.push({systemID: 1, systemName: '3D仓储'});
    $scope.model.systemList.push({systemID: 2, systemName: '3D运输'});
    $scope.model.systemList4Search.push({systemID: 1, systemName: '3D仓储'});
    $scope.model.systemList4Search.push({systemID: 2, systemName: '3D运输'});
  };

  //todo 调用API获取数据
  $scope.loadTeachers = function() {
    $scope.model.teacherList4Search.push({teacherID: 1, teacherName: '教师1'});
    $scope.model.teacherList4Search.push({teacherID: 2, teacherName: '教师2'});
    $scope.model.teacherList4Search.push({teacherID: 3, teacherName: '教师3'});
  };

  $scope.onShowKnowledgeContent = function(knowledgeContent){
    let a = '';
    CKEDITOR.instances.knowledgeContent.setData(knowledgeContent);
  };

  $scope.onShowExperimentStep = function(experimentStep){
    CKEDITOR.instances.experimentStep.setData(experimentStep);
  };

  $scope.onChange = function (knowledgeID, knowledgeName, knowledgeContent, experimentStep) {
    CKEDITOR.instances.knowledgeContent.setData(knowledgeContent);
    CKEDITOR.instances.experimentStep.setData(experimentStep);

    let content = CKEDITOR.instances.knowledgeContent.getData();
    let step = CKEDITOR.instances.experimentStep.getData();

  };

  $scope.onDelete = function (knowledgeID, knowledgeName) {
    // bootbox.confirm({
    //   message: '您确定要将' + bankName + '修改为删除状态吗？',
    //   buttons: {
    //     confirm: {
    //       label: '确认',
    //       className: 'btn-danger'
    //     },
    //     cancel: {
    //       label: '取消',
    //       className: 'btn-default'
    //     }
    //   },
    //   callback: function (result) {
    //     if(result) {
    //       $http.put('/bank/changeStatus', {
    //         bankID:  bankID,
    //         dataStatus: 'D',
    //         loginUser: getLoginUser()
    //       }).then(function successCallback(response) {
    //         if(response.data.err){
    //           bootbox.alert(response.data.msg);
    //           return false;
    //         }
    //         location.reload();
    //       }, function errorCallback(response) {
    //         bootbox.alert('网络异常，请检查网络设置');
    //       });
    //     }
    //   }
    // });
  };

  $scope.initPage();
});