const zapierPackage = require('zapier-platform-core');
const thisPackage = require('./package.json');
const catchXperienceWebhook = require('./src/triggers/catchXperienceWebhook');
const getObjectTypes = require('./src/fields/getObjectTypes');
const getPageTypes = require('./src/fields/getPageTypes');
const createObjectAction = require('./src/actions/createObjectAction');
const createPageAction = require('./src/actions/createPageAction');
const updatePageAction = require('./src/actions/updatePageAction');
const updateObjectAction = require('./src/actions/updateObjectAction');
const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./src/authentication');

/**
 * Zapier integration configuration.
 */
module.exports = {
  version: thisPackage.version,
  platformVersion: zapierPackage.version,

  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {
    [catchXperienceWebhook.key]: catchXperienceWebhook,

    [getObjectTypes.key]: getObjectTypes,
    [getPageTypes.key]: getPageTypes,
  },

  searches: {},

  creates: {
    [createObjectAction.key]: createObjectAction,
    [createPageAction.key]: createPageAction,
    [updatePageAction.key]: updatePageAction,
    [updateObjectAction.key]: updateObjectAction,
  },

  resources: {},
};
