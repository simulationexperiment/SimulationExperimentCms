let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    knowledgeID: '',
    systemID: 0,
    selectedSystem: null,
    systemList: [{systemID: 0, systemName: '请选择所属系统'}],
    knowledgeName: '',
    knowledgeContent: '',
    add: true
  };

  $scope.initPage = function () {
    $scope.initCkEditor();
    $scope.setDefaultOption();
    $scope.loadData();
  };

  $scope.initCkEditor = function(){
    CKEDITOR.config.height = 350;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.extraPlugins = 'html5video';
    CKEDITOR.config.image_previewText = ' ';
    CKEDITOR.replace( 'knowledgeContent');
  };

  $scope.setDefaultOption = function(){
    $scope.model.selectedSystem = $scope.model.systemList[0];
  };

  $scope.loadData = function(){
    let knowledgeID = document.getElementById('hidden-knowledgeID').value;
    if(knowledgeID === ''){
      $scope.loadSystem();
      return false;
    }
    $http.get('/knowledge/edit/detail?knowledgeID=' + knowledgeID).then(function successCallback (response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      if(response.data.knowledgeInfo === null){
        return false;
      }

      $scope.model.knowledgeID = response.data.knowledgeInfo.knowledgeID;
      $scope.model.knowledgeName = response.data.knowledgeInfo.knowledgeName;
      $scope.model.systemID = response.data.knowledgeInfo.systemID;

      $scope.model.knowledgeContent = response.data.knowledgeInfo.knowledgeContent;
      CKEDITOR.instances.knowledgeContent.setData($scope.model.knowledgeContent);
      $scope.model.add = false;
      $scope.loadSystem();
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

  $scope.checkData = function() {
    $scope.model.knowledgeContent = CKEDITOR.instances.knowledgeContent.getData();
    if($scope.model.knowledgeContent.length === 0){
      bootbox.alert('请输入知识点内容。');
      return false;
    }
    return true;
  };

  $scope.addData = function () {
    $http.post('/knowledge/edit', {
      systemID: $scope.model.selectedSystem.systemID,
      knowledgeName: $scope.model.knowledgeName,
      knowledgeContent: $scope.model.knowledgeContent,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/knowledge';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.changeData = function () {
    $http.put('/knowledge/edit', {
      knowledgeID: $scope.model.knowledgeID,
      systemID: $scope.model.selectedSystem.systemID,
      knowledgeName: $scope.model.knowledgeName,
      knowledgeContent: $scope.model.knowledgeContent,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.href = '/knowledge';
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSubmit = function(){
    if(!$scope.checkData()){
      return false;
    }
    if($scope.model.knowledgeID === ''){
      $scope.addData();
    }else{
      $scope.changeData();
    }
  };

  $scope.initPage();
});