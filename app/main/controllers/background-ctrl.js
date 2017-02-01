'use strict';
angular.module('main')
.controller('BackgroundCtrl', function ($log, $localStorage, $scope, $timeout, Socket) {

  Socket;
  $scope.logText = '';
  $scope.count = 0;
  $localStorage.count = 0;

  var updateCounter = function () {
    $localStorage.count ++;
    $scope.count = $localStorage.count;
    $scope.logText += Socket.returnsocket().readyState + '\n';
    $timeout(updateCounter, 1000);
  };
  updateCounter();

  $scope.reset = function () {
    $scope.count = 0;
    $localStorage.count = 0;
    $scope.logText = '';
  };

});
