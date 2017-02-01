'use strict';

describe('module: main, service: ClientDBUserSettingsApplication', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var ClientDBUserSettingsApplication;
  beforeEach(inject(function (_ClientDBUserSettingsApplication_) {
    ClientDBUserSettingsApplication = _ClientDBUserSettingsApplication_;
  }));

  it('should do something', function () {
    expect(!!ClientDBUserSettingsApplication).toBe(true);
  });

});
