class SdkMock {

    constructor() {
        this.jsonLoginResponse =  {
            "environment": {
                "validateAuthority": true,
                "name": "Azure",
                "portalUrl": "https://portal.azure.com",
                "publishingProfileUrl": "http://go.microsoft.com/fwlink/?LinkId=254432",
                "managementEndpointUrl": "https://management.core.windows.net",
                "resourceManagerEndpointUrl": "https://management.azure.com/",
                "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
                "sqlServerHostnameSuffix": ".database.windows.net",
                "galleryEndpointUrl": "https://gallery.azure.com/",
                "activeDirectoryEndpointUrl": "https://login.microsoftonline.com/",
                "activeDirectoryResourceId": "https://management.core.windows.net/",
                "activeDirectoryGraphResourceId": "https://graph.windows.net/",
                "activeDirectoryGraphApiVersion": "2013-04-05",
                "storageEndpointSuffix": ".core.windows.net",
                "keyVaultDnsSuffix": ".vault.azure.net",
                "azureDataLakeStoreFileSystemEndpointSuffix": "azuredatalakestore.net",
                "azureDataLakeAnalyticsCatalogAndJobEndpointSuffix": "azuredatalakeanalytics.net"
            },
            "authorizationScheme": "Bearer",
            "tokenCache": {
                "_entries": [
                    {
                        "tokenType": "Bearer",
                        "expiresIn": 3599,
                        "expiresOn": "2017-12-26T16:33:42.916Z",
                        "resource": "https://management.core.windows.net/",
                        "accessToken": "XXXXXXXXXXXXXXXXXX",
                        "isMRRT": true,
                        "_clientId": "000-000-000",
                        "_authority": "https://login.microsoftonline.com/XXXXXXXXXXXXXX"
                    }
                ]
            },
            "clientId": "XXXXXXXXXXXXXXXXXX",
            "domain": "XXXXXXXXXXXXXXXXXX",
            "secret": "XXXXXXXXXXXXXXXXXX",
            "context": {
                "_authority": {
                    "_log": {
                        "_componentName": "Authority",
                        "_logContext": {
                            "correlationId": "XXXXXXXXXXXXXXXXXX"
                        }
                    },
                    "_url": {
                        "protocol": "https:",
                        "slashes": true,
                        "auth": null,
                        "host": "login.microsoftonline.com",
                        "port": null,
                        "hostname": "login.microsoftonline.com",
                        "hash": null,
                        "search": null,
                        "query": null,
                        "pathname": "/XXXXXXXXXXXXXXXXXX",
                        "path": "/XXXXXXXXXXXXXXXXXX",
                        "href": "https://login.microsoftonline.com/XXXXXXXXXXXXXXXXXX"
                    },
                    "_validated": true,
                    "_host": "login.microsoftonline.com",
                    "_tenant": "XXXXXXXXXXXXXXXXXX",
                    "_authorizationEndpoint": null,
                    "_tokenEndpoint": "https://login.microsoftonline.com/XXXXXXXXXXXXXXXXXX/oauth2/token",
                    "_deviceCodeEndpoint": "https://login.microsoftonline.com/XXXXXXXXXXXXXXXXXX/oauth2/devicecode",
                    "_isAdfsAuthority": false,
                    "_callContext": {
                        "options": {},
                        "_logContext": {
                            "correlationId": "XXXXXXXXXXXXXXXXXX"
                        }
                    }
                },
                "_oauth2client": null,
                "_correlationId": null,
                "_callContext": {
                    "options": {},
                    "_logContext": {
                        "correlationId": "XXXXXXXXXXXXXXXXXX"
                    }
                },
                "_cache": {
                    "_entries": [
                        {
                            "tokenType": "Bearer",
                            "expiresIn": 3599,
                            "expiresOn": "2017-12-26T16:33:42.916Z",
                            "resource": "https://management.core.windows.net/",
                            "accessToken": "XXXXXXXXXXXXXXXXXX",
                            "isMRRT": true,
                            "_clientId": "XXXXXXXXXXXXXXXXXX",
                            "_authority": "https://login.microsoftonline.com/XXXXXXXXXXXXXXXXXX"
                        }
                    ]
                },
                "_tokenRequestWithUserCode": {}
            }
        };
        this.jsonGetRateResponse = [
            {
                "meterId": "32c3ebec-1646-49e3-8127-2cafbd3a04d8",
                "meterName": "Data Transfer In (GB)",
                "meterCategory": "Networking",
                "meterSubCategory": "",
                "unit": "GB",
                "meterTags": [],
                "meterRegion": "Zone 1",
                "meterRates": {
                    "0": 0
                },
                "effectiveDate": "0001-01-01T00:00:00.000Z",
                "includedQuantity": 0
            },
            {
                "meterId": "f8cc8e26-97d3-468e-a156-ee9f80e395c0",
                "meterName": "Compute Hours",
                "meterCategory": "Virtual Machines",
                "meterSubCategory": "Standard_D2_v2 VM",
                "unit": "Hours",
                "meterTags": [],
                "meterRegion": "EU West",
                "meterRates": {
                    "0": 0.136
                },
                "effectiveDate": "2016-09-01T00:00:00.000Z",
                "includedQuantity": 0
            },
            {
                "meterId": "433e81b3-9d5b-4e61-9dec-d4bfee231f32",
                "meterName": "Premium Storage - Page Blob/P4 (Units)",
                "meterCategory": "Storage",
                "meterSubCategory": "Locally Redundant",
                "unit": "Units",
                "meterTags": [],
                "meterRegion": "US East",
                "meterRates": {
                    "0": 5.2795
                },
                "effectiveDate": "2016-02-01T00:00:00.000Z",
                "includedQuantity": 0
            }
        ];
        this.jsonGetConsumptionResponse = [
            {
                "id": "/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/providers/Microsoft.Commerce/UsageAggregates/Daily_BRSDT_20171226_0000",
                "name": "Daily_BRSDT_20171226_0000",
                "type": "Microsoft.Commerce/UsageAggregate",
                "subscriptionId": "73a4ea93-d914-424d-9e64-28adf397e8e3",
                "meterId": "32c3ebec-1646-49e3-8127-2cafbd3a04d8",
                "usageStartTime": "2017-12-25T00:00:00.000Z",
                "usageEndTime": "2017-12-26T00:00:00.000Z",
                "quantity": 0.012634,
                "unit": "GB",
                "meterName": "Data Transfer In (GB)",
                "meterCategory": "Networking",
                "meterRegion": "Zone 1",
                "infoFields": {},
                "instanceData": "{\"Microsoft.Resources\":{\"resourceUri\":\"/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/resourceGroups/SUPPCHAIN100-WEBAPP/providers/Microsoft.Compute/virtualMachines/sch100rnc-tx0\",\"location\":\"westeurope\",\"additionalInfo\":{\"ImageType\":\"\",\"ServiceType\":\"\",\"VMName\":\"\",\"VMProperties\":\"\",\"UsageType\":\"DataTrIn\"}}}"
            },
            {
                "id": "/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/providers/Microsoft.Commerce/UsageAggregates/Daily_BRSDT_20171226_0000",
                "name": "Daily_BRSDT_20171226_0000",
                "type": "Microsoft.Commerce/UsageAggregate",
                "subscriptionId": "73a4ea93-d914-424d-9e64-28adf397e8e3",
                "meterId": "32c3ebec-1646-49e3-8127-2cafbd3a04d8",
                "usageStartTime": "2017-12-25T00:00:00.000Z",
                "usageEndTime": "2017-12-26T00:00:00.000Z",
                "quantity": 0.013642,
                "unit": "GB",
                "meterName": "Data Transfer In (GB)",
                "meterCategory": "Networking",
                "meterRegion": "Zone 1",
                "infoFields": {},
                "instanceData": "{\"Microsoft.Resources\":{\"resourceUri\":\"/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/resourceGroups/SUPPCHAIN101-WEBAPP/providers/Microsoft.Compute/virtualMachines/sch1016nf-tx0\",\"location\":\"westeurope\",\"additionalInfo\":{\"ImageType\":\"\",\"ServiceType\":\"\",\"VMName\":\"\",\"VMProperties\":\"\",\"UsageType\":\"DataTrIn\"}}}"
            },
            {
                "id": "/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/providers/Microsoft.Commerce/UsageAggregates/Daily_BRSDT_20171226_0000",
                "name": "Daily_BRSDT_20171226_0000",
                "type": "Microsoft.Commerce/UsageAggregate",
                "subscriptionId": "73a4ea93-d914-424d-9e64-28adf397e8e3",
                "meterId": "f8cc8e26-97d3-468e-a156-ee9f80e395c0",
                "usageStartTime": "2017-12-25T00:00:00.000Z",
                "usageEndTime": "2017-12-26T00:00:00.000Z",
                "quantity": 8,
                "unit": "Hours",
                "meterName": "Compute Hours",
                "meterCategory": "Virtual Machines",
                "meterSubCategory": "Standard_D2_v2 VM",
                "meterRegion": "EU West",
                "infoFields": {},
                "instanceData": "{\"Microsoft.Resources\":{\"resourceUri\":\"/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/resourceGroups/SUPPCHAIN100-WEBAPP/providers/Microsoft.Compute/virtualMachines/sch100rnc-mn1\",\"location\":\"westeurope\",\"additionalInfo\":{\"ImageType\":\"Canonical\",\"ServiceType\":\"Standard_D2_v2\",\"VMName\":\"\",\"VMProperties\":\"\",\"UsageType\":\"ComputeHR\"}}}"
            },
            {
                "id": "/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/providers/Microsoft.Commerce/UsageAggregates/Daily_BRSDT_20171226_0000",
                "name": "Daily_BRSDT_20171226_0000",
                "type": "Microsoft.Commerce/UsageAggregate",
                "subscriptionId": "73a4ea93-d914-424d-9e64-28adf397e8e3",
                "meterId": "433e81b3-9d5b-4e61-9dec-d4bfee231f32",
                "usageStartTime": "2017-12-26T00:00:00.000Z",
                "usageEndTime": "2017-12-27T00:00:00.000Z",
                "quantity": 0.032256,
                "unit": "Units",
                "meterName": "Premium Storage - Page Blob/P4 (Units)",
                "meterCategory": "Storage",
                "meterSubCategory": "Locally Redundant",
                "meterRegion": "US East",
                "infoFields": {},
                "instanceData": "{\"Microsoft.Resources\":{\"resourceUri\":\"/subscriptions/73a4ea93-d914-424d-9e64-28adf397e8e3/resourceGroups/MC_TOMERK8SCLUSTER_TOMERK8SCLUSTER_EASTUS/providers/Microsoft.Compute/disks/aks-nodepool1-27228872-0_OsDisk_1_dd1b34ed41cb4effa5628614fb39f6ef\",\"location\":\"useast\",\"tags\":{\"creationSource\":\"aks-aks-nodepool1-27228872-0\",\"orchestrator\":\"Kubernetes:1.8.2\",\"poolName\":\"nodepool1\",\"resourceNameSuffix\":\"27228872\"}}}"
            }
        ];
    }
    
    Login(clientId, clientSecret, tenantId){
        let that = this;
        return new Promise(function(resolve, reject){
            resolve(that.jsonLoginResponse);
        });
    }

    GetRates(credentials, subscriptionId, offerId, currency="USD", locale="en-US", regionInfo="US"){
        let that = this;
        return new Promise(function(resolve, reject){
            resolve(that.jsonGetRateResponse);
        });
    }

    GetConsumption(credentials, subscriptionId, startDate=null, endDate=null, granularity='Daily') {
        let that = this;
        return new Promise(function(resolve, reject){
            resolve(that.jsonGetConsumptionResponse);
        });;
    }

}

module.exports = SdkMock;