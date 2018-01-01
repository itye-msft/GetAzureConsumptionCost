class ApiManager {

    constructor(sdk) {
        this.sdk = sdk;
    }

    Login(clientId, clientSecret, tenantId) {
        return this.sdk.Login(clientId, clientSecret, tenantId);
    }

    GetRates(credentials, subscriptionId, offerId, currency = "USD", locale = "en-US", regionInfo = "US") {
        return this.sdk.GetRates(credentials, subscriptionId, offerId, currency, locale, regionInfo);
    }

    GetConsumption(credentials, subscriptionId, startDate = null, endDate = null, granularity = 'Daily') {

        if (endDate == null) {
            endDate = new Date();
            endDate.setUTCHours(0, 0, 0, 0);
        }
        if (startDate == null) {
            startDate = new Date();
            startDate.setHours(startDate.getHours() - 24);
            startDate.setUTCHours(0, 0, 0, 0);
        }

        return this.sdk.GetConsumption(credentials, subscriptionId, startDate, endDate, granularity);
    }
}

module.exports = ApiManager;