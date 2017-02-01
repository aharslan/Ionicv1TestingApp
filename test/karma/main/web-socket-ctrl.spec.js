'use strict';

describe('module: main, controller: WebSocketCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var WebSocketCtrl;
  beforeEach(inject(function ($controller) {
    WebSocketCtrl = $controller('WebSocketCtrl');
  }));

  it('should do something', function () {
    expect(!!WebSocketCtrl).toBe(true);
  });

});
