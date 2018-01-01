var express = require('express');
var router = express.Router();
var SDK = require('../SDK');
var json2csv = require('json2csv');
var ApiManager = require('../ApiManager');
var sdk = new ApiManager(SDK);

var ConsumptionUtils = require('../ConsumptionUtils');
var utils = new ConsumptionUtils();

router.get('/login', function (req, res, next) {
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];

  sdk.Login(clientId, clientSecret, tenantId)
    .then(creds => {
      res.json(creds);
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

router.get('/getrates', function (req, res, next) {
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];



  sdk.Login(clientId, clientSecret, tenantId)
    .then(credentials => {
      console.log("Login successful, pulling rates...");
      sdk.GetRates(credentials, subscriptionId, offerId)
        .then(rates => {
          res.json(rates);
        })
        .catch(error => {
          res.json({ error: error.message });
        });
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

router.get('/getconsumption', function (req, res, next) {

  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];

  sdk.Login(clientId, clientSecret, tenantId)
    .then(credentials => {
      console.log("Login successful, pulling consumption...");
      var consumption = sdk.GetConsumption(credentials, subscriptionId)
        .then(consumption => {
          res.json(consumption);
        })
        .catch(error => {
          res.json({ error: error.message });
        });
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

router.get('/getcost', function (req, res, next) {

  //preparing params
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];
  var detailed = req.query['detailed'] == 'true';
  var filter = req.query['filter'];
  var startDate = req.query['startDate'] ? new Date(req.query['startDate']) : null; //Date format: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
  var endDate = req.query['endDate'] ? new Date(req.query['endDate']) : null;
  var granularity = req.query['granularity'] ? req.query['granularity'] : 'Daily';

  sdk.Login(clientId, clientSecret, tenantId)
    .then(credentials => {
      console.log("Login successful");

      var deferred = Promise.defer();

      var rates = null;
      if (global.rateCards && global.rateCards.hasOwnProperty(subscriptionId)) {
        rates = global.rateCards[subscriptionId];
      }
      if (rates) {
        console.log("Using rates from cache...");
        deferred.resolve();
      }
      else {
        console.log("pulling rates...");
        sdk.GetRates(credentials, subscriptionId, offerId)
          .then(rateCards => {
            //set in cache
            if (!global.rateCards) {
              global.rateCards = {};
            }
            global.rateCards[subscriptionId] = rateCards;

            rates = rateCards;
            deferred.resolve();
          })
          .catch(error => {

            res.json({ error: error.message });
            deferred.reject();
          });
      }
      deferred.promise.then(() => {

        console.log("pulling consumption...");
        sdk.GetConsumption(credentials, subscriptionId, startDate, endDate, granularity)
          .then(consumption => {

            //now we have the consumption and rates. we can calculate it.
            var result = utils.computeConsumption(consumption, rates, filter, detailed);
            res.json(result);

          })
          .catch(error => {
            console.dir(error);
            res.json({ error: error.message });
          });

      });
    })
    .catch(error => {
      res.json({ error: error.message });
      deferred.reject();
    });
});

router.get('/downloadcost', function (req, res, next) {

  //prepare params
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];
  var detailed = req.query['detailed'] == 'true';
  var filter = req.query['filter'];
  var startDate = req.query['startDate'] ? new Date(req.query['startDate']) : null; //Date format: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
  var endDate = req.query['endDate'] ? new Date(req.query['endDate']) : null;
  var granularity = req.query['granularity'] ? req.query['granularity'] : 'Daily';

  var deferred = Promise.defer();

  sdk.Login(clientId, clientSecret, tenantId)
    .then(credentials => {
      console.log("Login successful");

      var rates = null;
      if (global.rateCards && global.rateCards.hasOwnProperty(subscriptionId)) {
        rates = global.rateCards[subscriptionId];
      }
      if (rates) {
        console.log("Using rates from cache...");
        deferred.resolve();
      }
      else {
        console.log("pulling rates...");
        sdk.GetRates(credentials, subscriptionId, offerId)
          .then(rateCards => {
            //set in cache
            if (!global.rateCards) {
              global.rateCards = {};
            }
            global.rateCards[subscriptionId] = rateCards;

            rates = rateCards;
            deferred.resolve();
          })
          .catch(error => {

            res.json({ error: error.message });
            deferred.reject();
          });
      }
      deferred.promise.then(() => {

        console.log("pulling consumption...");
        sdk.GetConsumption(credentials, subscriptionId, startDate, endDate, granularity)
          .then(consumption => {

            var detailedConsumption = utils.computeDetailedConsumption(consumption, rates, filter);

            var csv = detailedConsumption.length == 0 ? "" : json2csv({ data: detailedConsumption });
            res.set('Content-Type', 'application/octet-stream');
            res.attachment('azure_consumptions.csv');
            res.status(200).send(csv);
          })
          .catch(error => {
            console.dir(error);
            res.json({ error: error.message });
          });

      });
    })
    .catch(error => {
      res.json({ error: error.message });
      deferred.reject();
    });
});

module.exports = router;
