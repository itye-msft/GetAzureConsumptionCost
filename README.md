Get Azure Consumption Cost
===================

### Abstract
This project uses 2 [Azure Commerce APIs](https://docs.microsoft.com/en-us/azure/billing/billing-usage-rate-card-overview) to calculate the consumption cost, for all or part of an Azure subscription. Results can be filtered by resource group or resource tags.

The Node.js API is based on the [Azure node.js SDKs](https://github.com/Azure/azure-sdk-for-node/tree/master/lib/services/commerce).

### Getting started Guide
1. In order to use this app, you need to have an Azure subscription.
2. Deploy your app to Azure.
3. Use your subscription Id to query the API, to get the total cost of your subscription.
4. If you want to get a cost for a specific resource group, simply pass your resource-group name as a parameter to the API, and it will filter the results.

-------

### Here are the server api functions:

| Name  | Description |
| ------------- | ------------- |
| Login | Use service principal credentials to authenticate and get a`Credentials` object for using with the rest of the functions. |
| GetRates | A list of available Azure resources and estimated pricing information for each. |
| GetConsumption | Get your estimated Azure consumption data. |
| GetCosts | Get your estimated Azure consumption data combined with the total cost based on your rates. |
| DownloadCosts |  Download a csv file of your estimated Azure consumption data combined with the total cost based on your rates. |

### The last 2 functions require the following params:

| Name | Type |  Description |
| --- | ---- | --- |
| clientId | string | Your service principal ID |
| clientSecret | string | Your service principal secret |
| tenantId | string | Your subscription tenant ID |
| subscriptionId | string | Subscription ID to pull consumption info for |
| offerId | string | Must be specific code taken from [Microsoft Azure Offer Details](https://azure.microsoft.com/en-us/support/legal/offer-details/)
| detailed | bool | true if the consumption info should contain details. Optional. |
| filter | string | A way to limit results only to a specific resource instance info. For example: resource group, tags etc. Optional. |
| startDate | Date | Start time for the report. The date format is [ECMAScript](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) YYYY-MM-DDTHH:mm:ss.sssZ .  Optional. Defaults to 24 hours ago|
| endDate | Date | End time for the report. The date format is [ECMAScript](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) YYYY-MM-DDTHH:mm:ss.sssZ.  Optional. Defaults to now.|
| granularity | string | Can be: "Daily" or "Hourly". Optional. Default is Daily. |


----------

For a UI project  that consumes these APIs, please visit [this project](https://github.com/itye-msft/GetAzureConsumptionCostUI).