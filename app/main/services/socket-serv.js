'use strict';
angular.module('main')

.factory('Socket', ['$q', '$rootScope', function ($q, $rootScope) {
  // We return this object to anything injecting our service
  var Service = {};
  // Keep all pending requests here until they get responses
  var callbacks = {};
  // Create a unique callback ID to map requests to responses
  var currentCallbackId = 0;

  // Create our websocket object with the address to the websocket
  var ws = new WebSocket('ws://az0181d.abbvienet.com/AbbVie.Corp.Cop.RapidflowNG/WSService.svc');

  ws.onopen = function () {
    console.log('Socket has been opened!');
  };

  ws.onclose = function () {
    console.log('Socket has been closed!');
    ws = new WebSocket('ws://az0181d.abbvienet.com/AbbVie.Corp.Cop.RapidflowNG/WSService.svc');
  };

  ws.onmessage = function (message) {
    listener(JSON.parse(message.data));
  };

  function sendRequest (request) {
    var defer = $q.defer();
    var callbackId = getCallbackId();
    callbacks[callbackId] = {
      time: new Date(),
      cb: defer
    };
    request.callBackId = callbackId;
    console.log('Sending request', request);
    ws.send(JSON.stringify(request));
    return defer.promise;
  }

  function listener (data) {
    var messageObj = data[0];
    console.log('Received data from websocket: ', messageObj);
    //If an object exists with callback_id in our callbacks object, resolve it

    if (callbacks.hasOwnProperty(messageObj.callBackId))
    {
      console.log(callbacks[messageObj.callBackId]);
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

  // Socket Methods to be used by the rest of the Controllers/Services to make a specific call to Server
  Service.authenticate = function (username, password) {

    var methodName = 'AuthenticateUser';

    var credentials = new Object();
    credentials.userName = username;
    credentials.password = password;

    var request = {
      methodName: methodName,
      parameterObj: JSON.stringify(credentials),
    };
    // Storing in a variable for clarity on what sendRequest returns
    var promise = sendRequest(request);
    return promise;
  };

  return Service;
}]);
