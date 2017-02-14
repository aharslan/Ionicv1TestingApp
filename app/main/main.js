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
})

.run(function () {
  document.addEventListener('deviceready', function ($window) {
    /*eslint-disable*/
    // configure background mode
    cordova.plugins.backgroundMode.setDefaults({
        title: 'RapidFlow',
        text: 'Running in background',
        //icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
        //color: String, // hex format like 'F14F4D'
        //resume: Boolean,
        //hidden: true,
        //bigText: Boolean,
        silent: true //disable the notifications for android.
    })

    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    cordova.plugins.backgroundMode.on('activate', function () { //enable, disable, activate, deactivate
      //run when app is going to background
      //alert('activate');
    });

    cordova.plugins.backgroundMode.on('deactivate', function () { //enable, disable, activate, deactivate
      //run when app comes back to foreground
      //alert('deactivate');
    });
    $window;
    document.addEventListener('LaunchUrl', function(event) {
        // // gets page name from url
        // var page =/.*:[/]{2}([^?]*)[?]?(.*)/.exec(event.detail.url)[1];
        // // redirects to page specified in url
        // $state.go('tab.'+ page, {});
        alert('LaunchUrl Event Fired!!!');
    });
    /*eslint-enable*/
  }, false);
});

/*eslint-disable*/
function handleOpenURL (url) {
  setTimeout( function () {
    var event = new CustomEvent('LaunchUrl', {detail: {'url': url}});
    document.dispatchEvent(event);
  }, 0);
}
/*eslint-enable*/
