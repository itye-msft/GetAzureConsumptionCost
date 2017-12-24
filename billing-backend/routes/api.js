var express = require('express');
var router = express.Router();
var API = require('../API');
var json2csv = require('json2csv');


router.get('/login', function(req, res, next) {
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  API.Login(clientId,clientSecret, tenantId)
  .then(creds=> {
    var sessData = req.session;
    sessData.creds = creds;
    res.json(creds);
  })
  .catch(error =>{
    res.json({error:error.message});
  });
});

router.get('/getrates', function (req, res, next) {
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];
  
  API.Login(clientId, clientSecret, tenantId)
    .then(credentials => {
      console.log("Login successful, pulling rates...");
      var rates = API.GetRates(credentials, subscriptionId, offerId)
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

router.get('/getconsumption', function(req, res, next) {
  
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];

  API.Login(clientId, clientSecret, tenantId)
    .then(credentials => {
      console.log("Login successful, pulling consumption...");
      var consumption = API.GetConsumption(credentials, subscriptionId)
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

  API.Login(clientId, clientSecret, tenantId)
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
        API.GetRates(credentials, subscriptionId, offerId)
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
        API.GetConsumption(credentials, subscriptionId, startDate, endDate, granularity)
          .then(consumption => {
            //math time
            var sum = 0;
            var resultsHashtable = {};
            if (filter) {
              consumption = consumption.filter(consumptionItem => consumptionItem.instanceData && consumptionItem.instanceData.indexOf(filter) !== -1);
            }
            consumption.forEach(consumptionItem => {
              var rate = rates.find(rateItem => rateItem.meterId === consumptionItem.meterId);

              if (rate) {
                var amount = rate.meterRates["0"] * consumptionItem.quantity;
                sum += amount;
                if (detailed) {
                  if (!resultsHashtable.hasOwnProperty(rate.meterId)) {
                    resultsHashtable[rate.meterId] = {
                      name: rate.meterName,
                      rate: rate.meterRates["0"],
                      consumption: consumptionItem.quantity,
                      cost: amount,
                      region: rate.meterRegion,
                      fullName: rate.unit + " of " + (rate.meterSubCategory ? rate.meterSubCategory : rate.meterCategory)
                    }
                  }
                  else {
                    resultsHashtable[rate.meterId].cost = resultsHashtable[rate.meterId].cost + amount;
                    resultsHashtable[rate.meterId].consumption = resultsHashtable[rate.meterId].consumption + consumptionItem.quantity;
                  }
                }
              }
            });
            res.json(
              {
                total: sum,
                details: resultsHashtable
              }
            );

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
  var clientId = req.query['clientId'];
  var clientSecret = req.query['clientSecret'];
  var tenantId = req.query['tenantId'];
  var subscriptionId = req.query['subscriptionId'];
  var offerId = req.query['offerId'];
  var detailed = req.query['detailed'] == 'true';
  var filter = req.query['filter'];
  var startDate = req.query['startDate']? new Date(req.query['startDate']):null; //Date format: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
  var endDate = req.query['endDate']? new Date(req.query['endDate']):null;
  var granularity = req.query['granularity']?req.query['granularity']:'Daily';

  var deferred = Promise.defer();

  API.Login(clientId, clientSecret, tenantId)
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
        API.GetRates(credentials, subscriptionId, offerId)
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
        API.GetConsumption(credentials, subscriptionId, startDate, endDate, granularity)
          .then(consumption => {
            //math time
            var resultsHashtable = [];
            if (filter) {
              consumption = consumption.filter(consumptionItem => consumptionItem.instanceData && consumptionItem.instanceData.indexOf(filter) !== -1);
            }
            consumption.forEach(consumptionItem => {
              var rate = rates.find(rateItem => rateItem.meterId === consumptionItem.meterId);

              if (rate) {
                var amount = rate.meterRates["0"] * consumptionItem.quantity;
                var rg = consumptionItem.instanceData ? consumptionItem.instanceData.match(new RegExp('resourceGroups/(.*?)/')) : '';

                resultsHashtable.push(
                  {
                    name: rate.meterName,
                    rate: rate.meterRates["0"],
                    consumption: consumptionItem.quantity,
                    cost: amount,
                    region: rate.meterRegion,
                    meterDescription: rate.unit + " of " + (rate.meterSubCategory ? rate.meterSubCategory : rate.meterCategory),
                    usageStartTime: consumptionItem.usageStartTime,
                    usageEndTime: consumptionItem.usageEndTime,
                    resourceGroup: rg ? rg[1] : ''
                  }
                );
              }
            });

            var csv = resultsHashtable.length == 0 ? "" : json2csv({ data: resultsHashtable });
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
