const createObject = require('../utils/create/createObject');
const getObjectTypesField = require('../fields/getObjectTypesField');
const getObjectTypeFields = require('../fields/getObjectTypeFields');

/**
 * A Zapier action which presents a drop-down list to select an Xperience object type,
 * then dynamically displays that type's fields.
 */
module.exports = {
  noun: 'Create New Object',
  display: {
    hidden: false,
    important: true,
    description: 'Creates a new object in Xperience',
    label: 'Create New Object',
  },
  key: 'create_object',
  operation: {
    perform: async (z, bundle) => createObject(
      z,
      bundle,
      bundle.inputData.objectType,
      bundle.inputData,
    ),
    inputFields: [
      getObjectTypesField({ required: true, altersDynamicFields: true }),
      async (z, bundle) => getObjectTypeFields(z, bundle, bundle.inputData.objectType),
    ],
    sample: {
      CMS_User: {
        UserID: 42,
        UserGUID: 'bdf0eb12-9841-4162-b22d-fb8eb9379201',
      },
    },
  },
};
