const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');
const catchXperienceWebhook = require('./triggers/catchXperienceWebhook');
const getObjectTypes = require('./triggers/dropdowns/getObjectTypes');
const createObjectAction = require('./actions/createObjectAction');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {
    [catchXperienceWebhook.key]: catchXperienceWebhook,

    [getObjectTypes.key]: getObjectTypes
  },

  searches: {},

  creates: {
    [createObjectAction.key]: createObjectAction,
  },

  resources: {},
};
