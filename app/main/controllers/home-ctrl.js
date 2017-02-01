'use strict';
angular.module('main')
.controller('HomeCtrl', function ($log, $scope, $state) {

  $scope.btns = [];
  var a = {};
  a.class = 'button button-balanced icon ion-checkmark';
  a.label = 'Agree';
  $scope.btns.push(a);

  var b = {};
  b.class = 'button  button-assertive icon ion-shuffle';
  b.label = 'Disagree';
  $scope.btns.push(b);


  $scope.demoWebSockets = function () {
    $state.go('WebSocket');
  };

  $scope.demoDBDataBinding = function () {
    $state.go('Dbdatabind');
  };

  $scope.demoBackgroundMode = function () {
    $state.go('BackgroundMode');
  };
});
