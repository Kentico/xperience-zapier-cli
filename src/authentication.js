const handleErrors = require('./utils/handleErrors');

/**
 * An object representing the authentication configuration for Zapier.
 */
module.exports = {
  config: {
    type: 'basic',
    test: (z, bundle) => z.request({ url: `${bundle.authData.website}/rest` }),
    fields: [
      {
        label: 'Website base URL',
        key: 'website',
        type: 'string',
        required: true,
        helpText: 'The protocol and domain of your website, e.g. "https://xperience.io"',
      },
    ],
    connectionLabel: '{{bundle.authData.website}}',
  },
  befores: [],
  afters: [handleErrors],
};
