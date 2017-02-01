'use strict';
angular.module('main')
.controller('BackgroundCtrl', function ($log, $localStorage, $scope, $timeout) {

  $scope.count = 0;
  $localStorage.count = 0;

  var updateCounter = function () {
    $localStorage.count ++;
    $scope.count = $localStorage.count;
    $timeout(updateCounter, 1000);
  };
  updateCounter();

  $scope.reset = function () {
    $scope.count = 0;
    $localStorage.count = 0;
  };

});

// .factory('StorageService', function ($localStorage) {
//   var _getAll = function () {
//     return $localStorage.things;
//   };
//   var _add = function (thing) {
//     $localStorage.things.push(thing);
//   };
//   var _remove = function (thing) {
//     $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
//   };
//   var _setUser = function (user) {
//     $localStorage.user = user;
//   };
//   var _getUser = function () {
//     return $localStorage.user;
//   };
//   var _removeUser = function () {
//     $localStorage.user = null;
//   };
//   return {
//     getAll: _getAll,
//     add: _add,
//     remove: _remove,
//     setUser: _setUser,
//     getUser: _getUser,
//     removeUser: _removeUser
//   };
// });
