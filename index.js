const authentication = require('./authentication');
const catchXperienceWebhook = require('./triggers/catchXperienceWebhook');

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [catchXperienceWebhook.key]: catchXperienceWebhook
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {},
};
