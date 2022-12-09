const createPage = require('../utils/create/createPage');
const getPageTypesField = require('../fields/getPageTypesField');
const getPageTypeFields = require('../fields/getPageTypeFields');

/**
 * A Zapier action which presents a drop-down list to select an Xperience page type,
 * then dynamically displays that type's fields.
 */
module.exports = {
  noun: 'Create New Page',
  display: {
    hidden: false,
    important: true,
    description: 'Creates a new page in Xperience',
    label: 'Create New Page',
  },
  key: 'create_page',
  operation: {
    perform: async (z, bundle) => createPage(
      z,
      bundle,
      bundle.inputData.classID,
      bundle.inputData.parentPath,
      bundle.inputData,
    ),
    inputFields: [
      getPageTypesField({ required: true, altersDynamicFields: true }),
      getPageTypeFields,
    ],
    sample: {
      typeName: 'DancingGoat.Article',
    },
    outputFields: [],
  },
};
