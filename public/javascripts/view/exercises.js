let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    selectedSystem4Search: null,
    systemList4Search: [{systemID: 0, systemName: '全部'}],

    selectedKnowledge4Search: null,
    knowledgeList4Search: [{knowledgeCode: 0, knowledgeName: '全部'}],

    selectedCreator: null,
    teacherList4Search: [{teacherID: 0, teacherName: '全部'}],

    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],

    selectedExercisesType: null,
    exercisesTypeList: [{exercisesTypeCode: 0, exercisesTypeName: '请选择习题类型'}],

    selectedCourse: null,
    courseList: [{courseCode: 0, courseName: '请选择所属课程'}],

    selectedKnowledge: null,
    knowledgeList: [{knowledgeCode: 0, knowledgeName: '请选择所属知识点'}],

    selectedExperiment: null,
    experimentList: [{experimentCode: 0, experimentName: '请选择所属实验'}],
  };

  $scope.initPage = function () {
    CKEDITOR.replace( 'exercisesContent');
    $scope.loadSystem();
    $scope.loadTeachers();
    $scope.loadExercisesType();
    $scope.loadCourse();
    $scope.loadKnowledge();
    $scope.loadExperiment();
    $scope.setDefaultOption();
  };

  $scope.setDefaultOption = function(){
      $scope.model.selectedSystem = $scope.model.systemList[0];
      $scope.model.selectedSystem4Search = $scope.model.systemList4Search[0];
      $scope.model.selectedKnowledge4Search = $scope.model.knowledgeList4Search[0];
      $scope.model.selectedCreator = $scope.model.teacherList4Search[0];
      $scope.model.selectedExercisesType = $scope.model.exercisesTypeList[0];
      $scope.model.selectedCourse = $scope.model.courseList[0];
      $scope.model.selectedKnowledge = $scope.model.knowledgeList[0];
      $scope.model.selectedExperiment = $scope.model.experimentList[0];
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

  //todo 调用API获取数据
  $scope.loadExercisesType = function() {
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 1, exercisesTypeName: '单选'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 2, exercisesTypeName: '多选'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 3, exercisesTypeName: '填空'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 4, exercisesTypeName: '判断'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 5, exercisesTypeName: '简答'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 6, exercisesTypeName: '论述'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 7, exercisesTypeName: '计算'});
    $scope.model.exercisesTypeList.push({exercisesTypeCode: 8, exercisesTypeName: '案例分析'});
  };

  //todo 调用API获取数据
  $scope.loadCourse = function() {
    $scope.model.courseList.push({courseCode: 1, courseName: '物流企业运营实训'});
    $scope.model.courseList.push({courseCode: 2, courseName: '邮政快递企业综合实训'});
    $scope.model.courseList.push({courseCode: 3, courseName: '现代生产物流智能仿真实验'});
  };

  //todo 调用API获取数据
  $scope.loadKnowledge = function() {
    $scope.model.knowledgeList.push({knowledgeCode: 1, knowledgeName: '知识点1'});
    $scope.model.knowledgeList.push({knowledgeCode: 2, knowledgeName: '知识点2'});
    $scope.model.knowledgeList.push({knowledgeCode: 3, knowledgeName: '知识点3'});

    $scope.model.knowledgeList4Search.push({knowledgeCode: 1, knowledgeName: '知识点1'});
    $scope.model.knowledgeList4Search.push({knowledgeCode: 2, knowledgeName: '知识点2'});
    $scope.model.knowledgeList4Search.push({knowledgeCode: 3, knowledgeName: '知识点3'});
  };

  //todo 调用API获取数据
  $scope.loadExperiment = function() {
    $scope.model.experimentList.push({experimentCode: 1, experimentName: '实物实验'});
    $scope.model.experimentList.push({experimentCode: 1, experimentName: '虚拟实验'});
    $scope.model.experimentList.push({experimentCode: 1, experimentName: '演示实验'});
    $scope.model.experimentList.push({experimentCode: 1, experimentName: '客户端实验'});
    $scope.model.experimentList.push({experimentCode: 1, experimentName: '远程实验'});
    $scope.model.experimentList.push({experimentCode: 1, experimentName: '三维仿真实验'});
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