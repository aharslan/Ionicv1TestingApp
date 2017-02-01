'use strict';

describe('module: main, service: ClientDB', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var ClientDB;
  beforeEach(inject(function (_ClientDB_) {
    ClientDB = _ClientDB_;
  }));

  it('should do something', function () {
    expect(!!ClientDB).toBe(true);
  });

});
