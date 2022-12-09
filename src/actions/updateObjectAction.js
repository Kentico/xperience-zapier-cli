const updateObject = require('../utils/update/updateObject');
const getObjectTypesField = require('../fields/getObjectTypesField');

const siteOrGlobalField = {
  key: 'siteOrGlobal',
  label: 'Site or global object',
  type: 'string',
  choices: ['Site', 'Global'],
  default: 'Site',
  altersDynamicFields: true,
};
const jsonInputField = {
  key: 'updateValues',
  label: 'Data to update',
  placeholder: `{
"KeyValue": "Settings key updated by Zapier"
}`,
  type: 'text',
  helpText: 'JSON representing the object fields/values that you want to update.',
};
const identifierField = (z, bundle) => {
  const helpText = bundle.inputData.siteOrGlobal === 'Site'
    ? 'Must be a __code name__ or __ID__.'
    : 'Must be a __code name__ or __GUID__.';
  return {
    key: 'identifier',
    helpText,
    type: 'string',
  };
};

/**
 * A Zapier action which presents a drop-down list to select an Xperience object type.
 * The user then selects whether the object is global or site-specific, and provides a
 * code name, ID, or GUID to select the existing object. The input accepts JSON which
 * contains the columns to update and their values.
 */
module.exports = {
  noun: 'Update Object',
  display: {
    hidden: false,
    important: false,
    description: 'Updates an object in Xperience',
    label: 'Update Object',
  },
  key: 'update_object',
  operation: {
    perform: async (z, bundle) => updateObject(
      z,
      bundle,
      bundle.inputData.objectType,
      bundle.inputData.identifier,
      bundle.inputData.siteOrGlobal,
      bundle.inputData.updateValues,
    ),
    inputFields: [
      getObjectTypesField({ required: true }),
      siteOrGlobalField,
      identifierField,
      jsonInputField,
    ],
    sample: {
      CMS_SettingsKey: {
        KeyID: 42,
        KeyName: 'MySiteCustomKey',
      },
    },
  },
};
