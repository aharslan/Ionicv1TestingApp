'use strict';
angular.module('main')

.factory('Socket', ['$log', '$q', '$rootScope', '$ionicLoading', function ($log, $q, $rootScope) {
  // We return this object to anything injecting our service
  var Service = {};
  // Keep all pending requests here until they get responses
  var callbacks = {};
  // Create a unique callback ID to map requests to responses
  var currentCallbackId = 0;

  // Create our websocket object with the address to the websocket
  // var ws = new WebSocket('ws://az0181d.abbvienet.com/AbbVie.Corp.Cop.RapidflowNG/WSService.svc');

  // ws.onopen = function () {
  //   $log.log('Socket has been opened!');
  // };

  // ws.onclose = function () {
  //   $log.log('Socket has been closed!');
  //   ws = new WebSocket('ws://az0181d.abbvienet.com/AbbVie.Corp.Cop.RapidflowNG/WSService.svc');
  // };

  // ws.onmessage = function (message) {
  //   listener(JSON.parse(message.data));
  // };
  var ws = null;

  function start () {
    ws = new WebSocket('ws://az0181d.abbvienet.com/AbbVie.Corp.Cop.RapidflowNG/WSService.svc');
    ws.onopen = function () {
      console.log('connected!');
    };
    ws.onmessage = function (message) {
      listener(JSON.parse(message.data));
    };
    ws.onclose = function () {
      console.log('closed!');
      //reconnect now
      //check();
    };
    ws.onerror = function () {
      console.log('Socket Error No VPN');
    };

  }

  function check () {
    if (!ws || ws.readyState === 3)
    {
      start();
    }
  }

  start();

  setInterval(check, 5000);

  function sendRequest (request) {
    var defer = $q.defer();
    var callbackId = getCallbackId();
    callbacks[callbackId] = {
      time: new Date(),
      cb: defer
    };
    request.callBackId = callbackId;
    $log.log('Sending request', request);
    /////////////////////////////////////////
    waitForSocketConnection(ws, function () {
      console.log('message sent!!!');
      ws.send(JSON.stringify(request));
    });
    //ws.send(JSON.stringify(request));
    return defer.promise;
  }

  function listener (data) {
    var messageObj = data[0];
    $log.log('Received data from websocket: ', messageObj);
    //If an object exists with callback_id in our callbacks object, resolve it

    if (callbacks.hasOwnProperty(messageObj.callBackId))
    {
      $log.log(callbacks[messageObj.callBackId]);
      //$rootScope.$apply(callbacks[1].cb.resolve(messageObj)); // hardcod ed now server not returning the callbackID...
      $rootScope.$apply(callbacks[messageObj.callBackId].cb.resolve(messageObj.data));
      delete callbacks[messageObj.callBackId];
    }
  }

  // This creates a new callback ID for a request
  function getCallbackId () {
    currentCallbackId += 1;
    if (currentCallbackId > 10000) {
      currentCallbackId = 0;
    }
    return currentCallbackId;
  }

  // // Socket Methods to be used by the rest of the Controllers/Services to make a specific call to Server
  // Service.authenticate = function (username, password) {

  //   var methodName = 'AuthenticateUser';

  //   var credentials = new Object();
  //   credentials.userName = username;
  //   credentials.password = password;

  //   var request = {
  //     methodName: methodName,
  //     parameterObj: JSON.stringify(credentials),
  //   };
  //   // Storing in a variable for clarity on what sendRequest returns
  //   var promise = sendRequest(request);
  //   return promise;
  // };

  Service.callWebSocketService = function (methodName, parameterObj) {
    var request = {
      methodName: methodName,
      parameterObj: JSON.stringify(parameterObj)
    };
    // Storing in a variable for clarity on what sendRequest returns
    var promise = sendRequest(request);
    return promise;
  };
  Service.returnsocket = function () {
    return ws;
  };

  // Make the function wait until the connection is made...
  function waitForSocketConnection (socket, callback) {
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          console.log('Connection is made');
          if (callback !== null) {
            callback();
          }
          return;
        }
        else {
          console.log('wait for connection...');
          waitForSocketConnection(socket, callback);
        }

      }, 1000); // wait 5 milisecond for the connection...
  }

  return Service;
}]);
