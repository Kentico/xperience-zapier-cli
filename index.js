const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');
const catchXperienceWebhook = require('./triggers/catchXperienceWebhook');
const getObjectTypes = require('./triggers/dropdowns/getObjectTypes');
const getPageTypes = require('./triggers/dropdowns/getPageTypes');
const createObjectAction = require('./actions/createObjectAction');
const createPageAction = require('./actions/createPageAction');
const updatePageAction = require('./actions/updatePageAction');
const updateObjectAction = require('./actions/updateObjectAction');
const findPageAction = require('./actions/findPage');
const moveToNextStepAction = require('./actions/moveToNextStepAction');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {
    [catchXperienceWebhook.key]: catchXperienceWebhook,

    [getObjectTypes.key]: getObjectTypes,
    [getPageTypes.key]: getPageTypes
  },

  searches: {
    [findPageAction.key]: findPageAction
  },

  creates: {
    [createObjectAction.key]: createObjectAction,
    [createPageAction.key]: createPageAction,
    [updatePageAction.key]: updatePageAction,
    [updateObjectAction.key]: updateObjectAction,
    [moveToNextStepAction.key]: moveToNextStepAction
  },

  resources: {},
};
