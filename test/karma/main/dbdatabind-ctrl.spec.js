'use strict';

describe('module: main, controller: DbdatabindCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var DbdatabindCtrl;
  beforeEach(inject(function ($controller) {
    DbdatabindCtrl = $controller('DbdatabindCtrl');
  }));

  it('should do something', function () {
    expect(!!DbdatabindCtrl).toBe(true);
  });

});
