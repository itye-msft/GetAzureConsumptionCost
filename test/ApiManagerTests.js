var assert = require('chai').assert;
var ApiManager = require('../ApiManager');
var SdkMock = require('./SdkMock');
var sdk = new ApiManager(new SdkMock());

describe('ApiManager', function() {
  describe('Login', function() {
    it('should return json object', function() {
      // act
      return sdk.Login("a","b","c").then(creds => { 
        //assert
        assert.isNotNull(creds);
      });
    });
  });

  describe('GetRates', function() {
    it('should return json object', function() {
      // act
      return sdk.GetRates("a","b","c").then(rates =>{
        //assert
        assert.isNotNull(rates);
      });
    });
  });

  describe('GetConsumption', function() {
    it('should return json object', function() {
      // act
      return sdk.GetConsumption("a","b","c").then(consumption =>{
        //assert
        assert.isNotNull(consumption);
      });
    });
  });
});
