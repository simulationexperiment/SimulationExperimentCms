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
    sourceTypeList4Search: [{sourceTypeID: 0, sourceTypeName: '全部'}],

    //编辑内容：所属系统
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],
    //编辑内容：所属课程
    selectedCourse: null,
    courseList: [{courseCode: 0, courseName: '请选择所属课程'}],
    //编辑内容：资源类型
    selectedSourceType: null,
    sourceTypeList: [{sourceTypeID: 0, sourceTypeName: '全部'}],

    //编辑内容：审核人
    selectedAuditor: null,
    teacherList: [{teacherID: 0, teacherName: '全部'}],

    resourceUrl: ''
  };

  $scope.initPage = function () {
    $scope.initUploadPlugins();
    $scope.loadSystem();
    $scope.loadCourse();
    $scope.loadSourceType();
    $scope.loadTeachers();
    $scope.setDefaultOption();
  };

  $scope.initUploadPlugins = function(){
    uploadUtils.initUploadPlugin('#file-upload-resource', '/myResource/fileUpload', ['png','jpg','jpeg','pdf','mp4','zip'], false, function (opt,data) {
      $scope.model.resourceUrl = data.imageUrl[0];
    });
  };

  $scope.loadSourceType = function(){
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 1, sourceTypeName: 'PDF'});
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 2, sourceTypeName: 'Image'});
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 3, sourceTypeName: 'MP4'});
    $scope.model.sourceTypeList4Search.push({sourceTypeID: 4, sourceTypeName: 'ZIP'});

    $scope.model.sourceTypeList.push({sourceTypeID: 1, sourceTypeName: 'PDF'});
    $scope.model.sourceTypeList.push({sourceTypeID: 2, sourceTypeName: 'Image'});
    $scope.model.sourceTypeList.push({sourceTypeID: 3, sourceTypeName: 'MP4'});
    $scope.model.sourceTypeList.push({sourceTypeID: 4, sourceTypeName: 'ZIP'});
  };

  $scope.setDefaultOption = function(){
    //查询条件默认值设置
    $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
    $scope.model.selectedCourse4Search = $scope.model.courseList4Search[0];
    $scope.model.selectedSourceType4Search = $scope.model.sourceTypeList4Search[0];

    //编辑内容默认值设置
    $scope.model.selectedSystem = $scope.model.systemList[0];
    $scope.model.selectedCourse = $scope.model.courseList[0];
    $scope.model.selectedSourceType = $scope.model.sourceTypeList[0];
    $scope.model.selectedAuditor = $scope.model.teacherList[0];
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
    $scope.model.teacherList.push({teacherID: 1, teacherName: '教师1'});
    $scope.model.teacherList.push({teacherID: 2, teacherName: '教师2'});
    $scope.model.teacherList.push({teacherID: 3, teacherName: '教师3'});
  };

  //todo 调用API获取数据
  $scope.loadCourse = function() {

    $scope.model.courseList4Search.push({courseCode: 1, courseName: '物流企业运营实训'});
    $scope.model.courseList4Search.push({courseCode: 2, courseName: '邮政快递企业综合实训'});
    $scope.model.courseList4Search.push({courseCode: 3, courseName: '现代生产物流智能仿真实验'});

    $scope.model.courseList.push({courseCode: 1, courseName: '物流企业运营实训'});
    $scope.model.courseList.push({courseCode: 2, courseName: '邮政快递企业综合实训'});
    $scope.model.courseList.push({courseCode: 3, courseName: '现代生产物流智能仿真实验'});
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