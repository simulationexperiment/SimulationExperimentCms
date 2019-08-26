let app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.model = {
    question: '',

    answer4QuestionID: 0,
    answer4Question: '',
    answer: ''
  };

  $scope.onSubmitQuestion = function () {
    $http.post('/QA/question', {
      question: $scope.model.question,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.reload();
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onSubmitAnswer = function () {
    $http.post('/QA/answer', {
      questionID: $scope.model.answer4QuestionID,
      answer: $scope.model.answer,
      loginUser: getLoginUser()
    }).then(function successCallback(response) {
      if(response.data.err){
        bootbox.alert(response.data.msg);
        return false;
      }
      location.reload();
    }, function errorCallback(response) {
      bootbox.alert('网络异常，请检查网络设置');
    });
  };

  $scope.onAnswer = function (questionID, question) {
    $scope.model.answer4QuestionID = questionID;
    $scope.model.answer4Question = question;
    $('#answerModal').modal('show');
  };
});