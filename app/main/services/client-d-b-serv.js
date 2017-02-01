'use strict';
angular.module('main')

.factory('ClientDB', ['$cordovaSQLite', '$ionicPlatform',
  function ($cordovaSQLite, $ionicPlatform) {
    var db;

    $ionicPlatform.ready(function () {
      db = $cordovaSQLite.openDB({ name: 'rfng-test.db', location: 'default'});
      executePragmaStatement();
    }.bind(this));

    return {
      initDB: initDB,
      runQuery: runQuery
    };


    function initDB () {
      $ionicPlatform.ready(function () {

        db = $cordovaSQLite.openDB({ name: 'rfng-test.db', location: 'default'});
        executePragmaStatement();

      }.bind(this));
    }

    function executePragmaStatement () {
      db.executeSql('pragma table_info (test_table);', [], function (res) {
        console.log('PRAGMA res: ' + JSON.stringify(res));
      });
      console.log('Executing Pragma Query');
    }

    function runQuery (query, dataArray, successCb, errorCb) {
      $ionicPlatform.ready(function () {
        $cordovaSQLite.execute(db, query, dataArray).then(function (res) {
          successCb(res);
        }, function (err) {
          errorCb(err);
        });
      }.bind(this));
    }
  }
]);
