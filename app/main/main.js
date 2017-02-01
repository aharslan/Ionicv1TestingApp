'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngStorage',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      //template: main/templates/page1.html,
      templateUrl: 'main/templates/page1.html',
      controller: 'HomeCtrl'
    })
    .state('WebSocket', {
      url: '/WebSocket',
      //template: main/templates/page1.html,
      templateUrl: 'main/templates/socket.html',
      controller: 'WebSocketCtrl'
    })
    .state('Dbdatabind', {
      url: '/Dbdatabind',
      //template: main/templates/page1.html,
      templateUrl: 'main/templates/dbdatabind.html',
      controller: 'DbdatabindCtrl'
    })
    .state('BackgroundMode', {
      url: '/BackgroundMode',
      //template: main/templates/page1.html,
      templateUrl: 'main/templates/backgroundmode.html',
      controller: 'BackgroundCtrl'
    });
});
