'use strict';
angular.module('main')
.controller('DbdatabindCtrl', function ($log, $scope, ClientDBUserSettingsApplication) {

  $log.log('Hello from your Controller: DbdatabindCtrl in module main:. This is your controller:', this);
  ClientDBUserSettingsApplication.initDB();

  //var pushNotificationSettingId = 3;
  $scope.pushNotificationSettingIndex;

  ClientDBUserSettingsApplication.getAllUserSettingsApplications()
    .then(function () {
      var UserSettingsApplicationList = ClientDBUserSettingsApplication.returnAllUserSettingsApplicationList();

      if (UserSettingsApplicationList.length === 0) {
        $log.log('empty length:' + UserSettingsApplicationList.length);
        ClientDBUserSettingsApplication.insertUserSettingsApplication(1, 1, 1, 'Hello Moto');
        ClientDBUserSettingsApplication.insertUserSettingsApplication(2, 1, 2, 'Hello World');
        ClientDBUserSettingsApplication.insertUserSettingsApplication(3, 1, 3, 'Hello Man');
      }
      else {
        $log.log('not-empty length:' + UserSettingsApplicationList.length);
      }

      //$scope.UserSettingsApplicationList = ClientDBUserSettingsApplication.returnAllUserSettingsApplicationList;
      $scope.userSettingApplicationBySettingID = ClientDBUserSettingsApplication.getUserSettingsApplicationBySettingID;
    });

  $scope.changeRecord = function () {
    ClientDBUserSettingsApplication.updateUserSettingsApplication(1, 1, 1, 'Hello Moto');
  };
});
