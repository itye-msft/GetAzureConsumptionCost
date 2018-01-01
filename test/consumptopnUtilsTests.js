var assert = require('chai').assert;
var ApiManager = require('../ApiManager');
var SdkMock = require('./SdkMock');
var sdk = new ApiManager(new SdkMock());

var ConsumptionUtils = require('../ConsumptionUtils');
var utils = new ConsumptionUtils();

describe('consumptionUtils', function () {
  describe('computeConsumption', function () {
    it('should return computed consumption', function () {
      // arrange
      return sdk.Login("a", "b", "c").then(credentials => {
        sdk.GetRates(credentials, "a", "b").then(rates => {
          sdk.GetConsumption(credentials, "a", "startDate", "endDate", "granularity")
            .then(consumption => {
              let filter = null;
              let detailed = true;
              var result = utils.computeConsumption(consumption, rates, filter, detailed);

              assert.isNotNull(result);
            });
        });
      });
    });
  });

  describe('computeConsumption', function () {
    it('computed consumption is correct', function () {
      // arrange
      return sdk.Login("a", "b", "c").then(credentials => {
        sdk.GetRates(credentials, "a", "b").then(rates => {
          sdk.GetConsumption(credentials, "a", "startDate", "endDate", "granularity")
            .then(consumption => {
              let filter = null;
              let detailed = true;
              var result = utils.computeConsumption(consumption, rates, filter, detailed);

              assert.equal(1.088, result.details["f8cc8e26-97d3-468e-a156-ee9f80e395c0"].cost);
              assert.equal(1.258295552, result.total);
            });
        });
      });
    });
  });

  describe('conputeDetailedConsumption', function () {
    it('should return detailed computed consumption', function () {
      // arrange
      return sdk.Login("a", "b", "c").then(credentials => {
        sdk.GetRates(credentials, "a", "b").then(rates => {
          sdk.GetConsumption(credentials, "a", "startDate", "endDate", "granularity")
            .then(consumption => {
              let filter = null;
              let detailed = true;
              var result = utils.computeDetailedConsumption(consumption, rates, filter);

              assert.isNotNull(result);
            });
        });
      });
    });
  });

  describe('conputeDetailedConsumption', function () {
    it('detailed computed consumption is correct', function () {
      // arrange
      return sdk.Login("a", "b", "c").then(credentials => {
        sdk.GetRates(credentials, "a", "b").then(rates => {
          sdk.GetConsumption(credentials, "a", "startDate", "endDate", "granularity")
            .then(consumption => {
              let filter = null;
              let detailed = true;
              var result = utils.computeDetailedConsumption(consumption, rates, filter, detailed);
              let cost = result[2].rate * result[2].consumption
              assert.equal(1.088, cost);
            });
        });
      });
    });
  });
});
