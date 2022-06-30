"use strict";

var rxjs = require("rxjs");

var mock = jest.createMockFromModule("@angular/fire/auth");
mock.authState = jest.fn().mockReturnValue(rxjs.of(null));

module.exports = mock;
