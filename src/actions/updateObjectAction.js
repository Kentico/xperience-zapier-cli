const getObjectTypesField = require('../fields/getObjectTypesField');
const updateObject = require('../utils/updateObject');

async function execute(z, bundle) {
  const result = await updateObject(z, bundle);

  return result;
}

const updateObjectAction = {
  noun: 'Update Object',
  display: {
    hidden: false,
    important: false,
    description: 'Updates an object in Xperience',
    label: 'Update Object',
  },
  key: 'update_object',
  operation: {
    perform: execute,
    inputFields: [
      getObjectTypesField({ required: true }),
      {
        key: 'siteOrGlobal',
        label: 'Site or global object',
        type: 'string',
        choices: ['Site', 'Global'],
        default: 'Site',
        altersDynamicFields: true,
      },
      function f(z, bundle) {
        const helpText = bundle.inputData.siteOrGlobal === 'Site'
          ? 'Must be a __code name__ or __ID__.'
          : 'Must be a __code name__ or __GUID__.';
        return {
          key: 'identifier',
          helpText,
          type: 'string',
        };
      },
      {
        key: 'updateValues',
        label: 'Data to update',
        placeholder: `{
    "KeyValue": "Settings key updated by Zapier"
}`,
        type: 'text',
        helpText: 'JSON representing the object fields/values that you want to update.',
      },
    ],
    sample: {
      CMS_SettingsKey: {
        KeyID: 42,
        KeyName: 'MySiteCustomKey',
      },
    },
  },
};

module.exports = updateObjectAction;
