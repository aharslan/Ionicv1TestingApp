'use strict';

describe('module: main, controller: BackgroundCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var BackgroundCtrl;
  beforeEach(inject(function ($controller) {
    BackgroundCtrl = $controller('BackgroundCtrl');
  }));

  it('should do something', function () {
    expect(!!BackgroundCtrl).toBe(true);
  });

});
