'use strict';
angular.module('main')

.service('ClientDBUserSettingsApplication', ['$ionicPlatform', '$q', 'ClientDB',
  function ($ionicPlatform, $q, ClientDB) {

    var UserSettingsApplicationList;

    return {
      initDB: initDB,
      getUserSettingsApplication: getUserSettingsApplication,
      insertUserSettingsApplication: insertUserSettingsApplication,
      updateUserSettingsApplication: updateUserSettingsApplication,
      getAllUserSettingsApplications: getAllUserSettingsApplications,
      deleteUserSettingsApplication: deleteUserSettingsApplication,
      returnAllUserSettingsApplicationList: returnAllUserSettingsApplicationList,
      getUserSettingsApplicationBySettingID: getUserSettingsApplicationBySettingID
    };

    function initDB () {
      $ionicPlatform.ready(function () {
        var createTable = 'CREATE TABLE IF NOT EXISTS UserSettingsApplication' + ' (UserApplicationSettingID INTEGER PRIMARY KEY NOT NULL, UserID INTEGER, SettingID INTEGER, Value NVARCHAR(32), LastModified DATETIME,  FOREIGN KEY(SettingID) REFERENCES Settings(SettingID), FOREIGN KEY(UserID) REFERENCES Users(UserID))';
        //var createTable = 'DROP TABLE UserSettingsApplication';

        ClientDB.initDB();
        ClientDB.runQuery(createTable, [], function (res) {
          console.log('Success in create table: UserSettingsApplication' + res);
        }, function (err) {
          console.log(err);
        });
      }.bind(this));
    }


    function insertUserSettingsApplication (UserApplicationSettingID, UserID, SettingID, Value) {
      console.log('adding new UserSettingsApplication');
      var deferred = $q.defer();
      var query = 'INSERT INTO UserSettingsApplication (UserApplicationSettingID, UserID, SettingID, Value, LastModified) VALUES (?,?,?,?,?)';
      var d = new Date();

      ClientDB.runQuery(query, [UserApplicationSettingID, UserID, SettingID, Value, d], function (response) {
        console.log(response);
        deferred.resolve(response);
        getAllUserSettingsApplications();
      }, function (error) {
        console.log(error);
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function updateUserSettingsApplication (UserApplicationSettingID, UserID, SettingID, Value) {
      console.log('updating UserSettingsApplication : UserApplicationSettingID:' + UserApplicationSettingID);
      var deferred = $q.defer();
      var query = 'UPDATE UserSettingsApplication SET UserID = ?, SettingID = ?, Value = ?, LastModified = ? WHERE UserApplicationSettingID = ?';
      var d = new Date();

      ClientDB.runQuery(query, [UserID, SettingID, Value, d, UserApplicationSettingID], function (response) {
        console.log(response);
        deferred.resolve(response);
        getAllUserSettingsApplications();
      }, function (error) {
        console.log(error);
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function getAllUserSettingsApplications () {
      var deferred = $q.defer();
      var query = 'SELECT * from UserSettingsApplication';

      ClientDB.runQuery(query, [], function (response) {
        UserSettingsApplicationList = response.rows;
        deferred.resolve(response);
      }, function (error) {
        console.log(error);
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getUserSettingsApplication (id) {
      var user;
      if (UserSettingsApplicationList) {
        for (var i = 0; i < UserSettingsApplicationList.length; i++) {
          if (UserSettingsApplicationList.item(i).UserApplicationSettingID === id)
          {
            user = UserSettingsApplicationList.item(i);
            break;
          }
        }
      }
      return user;
    }

    function getUserSettingsApplicationBySettingID (SettingID) {
      var user;
      if (UserSettingsApplicationList) {
        for (var i = 0; i < UserSettingsApplicationList.length; i++) {
          if (UserSettingsApplicationList.item(i).SettingID === SettingID)
          {
            user = UserSettingsApplicationList.item(i);
            break;
          }
        }
      }
      return user;
    }

    function returnAllUserSettingsApplicationList ()
    {
      return UserSettingsApplicationList;
    }

    function deleteUserSettingsApplication (id) {
      var deferred = $q.defer();
      var query = 'DELETE FROM UserSettingsApplication WHERE UserApplicationSettingID = ?';

      ClientDB.runQuery(query, [id], function (response) {
        console.log(response);
        deferred.resolve(response);
      }, function (error) {
        console.log(error);
        deferred.reject(error);
      });
      return deferred.promise;
    }

  }
]);
