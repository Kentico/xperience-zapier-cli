const getObjectTypesField = require('../fields/getObjectTypesField');
const triggerNoun = 'Catch Xperience Webhook'
const eventTypes = {
    0: 'Create',
    1: 'Update',
    2: 'Delete',   
};

const performHook = async (z, bundle) => {
    // Due to Zapier validation, all datetime fields need to be converted into ISO-8601
    const data = bundle.cleanedRequest;
    for(const key in data) {
        const value = data[key];
        const date = new Date(value);
        if(!isNaN(date)) {

            // Value is a date
            data[key] = date.toISOString();
        }
    }

    return [data];
}

const performSubscribe = async (z, bundle) => {
    const hook = {
        'WebhookEventType': bundle.inputData.eventType,
        'WebhookName': bundle.inputData.name,
        'WebhookEnabled': true,
        'WebhookObjectType': bundle.inputData.objectType,
        'WebhookURL': bundle.targetUrl,
        'WebhookCreatedManually': false
    };
    const options = {
        url: `${bundle.authData.website}/rest/zapier.webhook/currentsite`,
        params: {
            format: 'json'
        },
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: hook
    };

    const response = await z.request(options);

    return z.JSON.parse(response.content);
}

const performUnsubscribe = async (z, bundle) => {
    // bundle.subscribeData contains the parsed response JSON from the subscribe
    // request made initially.
    const webhook = bundle.subscribeData;

    const options = {
        url: `${bundle.authData.website}/rest/zapier.webhook/${webhook.Zapier_Webhook.WebhookID}`,
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    };

    const response = await z.request(options);

    return response.status === 200;
}

const getFallbackData = async (z, bundle) => {
    const options = {
        url: `${bundle.authData.website}/rest/${bundle.inputData.objectType}`,
        method: 'GET',
        params: {
            topN: 1,
            format: 'json',
        },
        headers: {
            'Accept': 'application/json'
        }
    };

    const response = await z.request(options);
    const json = z.JSON.parse(response.content);
    const values = Object.values(json)[0][0];
    const object = Object.values(values)[0][0];

    if(!object) return [sampleUser];

    return [object];
}

const sampleUser = {
    'UserEnabled': false,
    'UserSecurityStamp': null,
    'UserName': 'jimcarrey',
    'UserGUID': '60c61d8e-308b-4ac3-8120-b9c722305883',
    'UserStartingAliasPath': '/Blogs',
    'LastName': 'Carrey',
    'UserCreated': '2020-09-16T13:27:02-0500',
    'UserMFRequired': false,
    'FullName': 'Jim Carrey',
    'PreferredUICultureCode': null,
    'UserHasAllowedCultures': null,
    'UserIsDomain': false,
    'Email': 'jcarrey@imdb.com',
    'UserLastLogonInfo': '',
    'LastLogon': '2020-09-24T17:25:35-0500',
    'UserLastModified': '2020-09-24T13:27:02-0500',
    'FirstName': 'Jim',
    'UserMFTimestep': null,
    'UserPrivilegeLevel': 3,
    'PreferredCultureCode': 'en-US',
    'MiddleName': null,
    'UserPasswordFormat': 'PBKDF2',
    'UserPassword': '',
    'UserIsExternal': false,
    'UserID': 66,
    'UserIsHidden': null
};

module.exports = {
    key: 'catch_xperience_webhook',
    noun: triggerNoun,
    display: {
        important: true,
        label: triggerNoun,
        description: 'Triggers when your Xperience website sends a webhook to Zapier.'
    },
    operation: {
        type: 'hook',
        inputFields: [
            {
                label: 'Webhook name',
                helpText: 'Enter a webhook name which will appear in the Kentico Xperience admin UI. This cannot contain spaces!',
                key: 'name',
                type: 'string',
                required: true
            },
            getObjectTypesField({ required: true }),
            {
                key: 'eventType',
                choices: eventTypes
            }
        ],
        perform: performHook,
        performSubscribe: performSubscribe,
        performUnsubscribe: performUnsubscribe,
        performList: getFallbackData,
        sample: sampleUser
    },
};
