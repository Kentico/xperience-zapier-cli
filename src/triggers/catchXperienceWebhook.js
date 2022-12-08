const getSampleData = require('../utils/get/getSampleData');
const getObjectTypesField = require('../fields/getObjectTypesField');

const triggerNoun = 'Catch Xperience Webhook';
const eventTypes = {
  0: 'Create',
  1: 'Update',
  2: 'Delete',
};

/**
 * Executes when the Zap is triggered.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @returns {any} The data that was posted to Zapier.
 */
const performHook = async (z, bundle) => {
  const data = bundle.cleanedRequest;

  // Due to Zapier validation, all datetime fields need to be converted into ISO-8601
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const date = new Date(value);
    if (date instanceof Date && !Number.isNaN(date.valueOf())) {
      // Value is a date
      data[key] = date.toISOString();
    }
  });

  return data;
};

/**
 * Executes when the Zap is turned on. Creates the webhook in the Xperience website.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @returns {any} The response from the Xperience website containing the created webhook.
 */
const performSubscribe = async (z, bundle) => {
  const hook = {
    WebhookEventType: bundle.inputData.eventType,
    WebhookName: bundle.inputData.name,
    WebhookEnabled: true,
    WebhookObjectType: bundle.inputData.objectType,
    WebhookURL: bundle.targetUrl,
    WebhookCreatedManually: false,
  };
  const options = {
    url: `${bundle.authData.website}/rest/zapier.webhook/currentsite`,
    params: {
      format: 'json',
    },
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: hook,
  };

  const response = await z.request(options);

  return z.JSON.parse(response.content);
};

/**
 * Executes when the Zap is turned off. Deletes the webhook from the Xperience website.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @returns {any} `true` if the request to delete the webhook was successful.
 */
const performUnsubscribe = async (z, bundle) => {
  // bundle.subscribeData contains the parsed response JSON from the subscribe
  // request made initially.
  const webhook = bundle.subscribeData;

  const options = {
    url: `${bundle.authData.website}/rest/zapier.webhook/${webhook.Zapier_Webhook.WebhookID}`,
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  };

  const response = await z.request(options);

  return response.status === 200;
};

/**
 * A Zapier action which presents a drop-down list to select an Xperience object type and
 * global event. When the Zap is turned on, a global event handler is registered in the Xperience
 * website which will trigger the Zap when the selected event is performed on the object type.
 */
module.exports = {
  key: 'catch_xperience_webhook',
  noun: triggerNoun,
  display: {
    important: true,
    label: triggerNoun,
    description: 'Triggers when your Xperience website sends a webhook to Zapier.',
  },
  operation: {
    type: 'hook',
    inputFields: [
      {
        label: 'Webhook name',
        helpText: 'Enter a webhook name which will appear in the Kentico Xperience admin UI. This cannot contain spaces!',
        key: 'name',
        type: 'string',
        required: true,
      },
      getObjectTypesField({ required: true }),
      {
        key: 'eventType',
        choices: eventTypes,
      },
    ],
    perform: performHook,
    performSubscribe,
    performUnsubscribe,
    performList: async (z, bundle) => [await getSampleData(z, bundle, bundle.inputData.objectType)],
    sample: {
      UserEnabled: false,
      UserSecurityStamp: null,
      UserName: 'jimcarrey',
      UserGUID: '60c61d8e-308b-4ac3-8120-b9c722305883',
      UserStartingAliasPath: '/Blogs',
      LastName: 'Carrey',
      UserCreated: '2020-09-16T13:27:02-0500',
      UserMFRequired: false,
      FullName: 'Jim Carrey',
      PreferredUICultureCode: null,
      UserHasAllowedCultures: null,
      UserIsDomain: false,
      Email: 'jcarrey@imdb.com',
      UserLastLogonInfo: '',
      LastLogon: '2020-09-24T17:25:35-0500',
      UserLastModified: '2020-09-24T13:27:02-0500',
      FirstName: 'Jim',
      UserMFTimestep: null,
      UserPrivilegeLevel: 3,
      PreferredCultureCode: 'en-US',
      MiddleName: null,
      UserPasswordFormat: 'PBKDF2',
      UserPassword: '',
      UserIsExternal: false,
      UserID: 66,
      UserIsHidden: null,
    },
  },
};
