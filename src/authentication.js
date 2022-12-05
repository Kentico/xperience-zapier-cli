const handleErrors = require('./utils/handleErrors');

const test = (z, bundle) => z.request({ url: `${bundle.authData.website}/rest` });

const Authentication = {
  config: {
    type: 'basic',
    test,
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

module.exports = Authentication;
