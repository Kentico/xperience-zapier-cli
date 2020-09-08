const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');
const catchXperienceWebhook = require('./triggers/catchXperienceWebhook');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],
  
  triggers: {
    [catchXperienceWebhook.key]: catchXperienceWebhook
  },

  searches: {},

  creates: {},

  resources: {},
};
