const updatePage = require('../utils/update/updatePage');

const nodeAliasField = {
  key: 'nodeAliasPath',
  type: 'string',
  required: true,
  label: 'Node alias path',
  helpText: 'The path of the page to update. For example, "/Blogs/Food"',
};
const cultureField = {
  key: 'culture',
  type: 'string',
  label: 'Document culture',
  helpText: 'The culture code of the page to update. Defaults to "en-US" if emtpy.',
};
const jsonInputField = {
  key: 'updateValues',
  label: 'Data to update',
  placeholder: `{
"DocumentName": "The best article ever",
"ArticleSummary": "A very good article"
}`,
  type: 'text',
  helpText: 'JSON representing the page fields/values that you want to update.',
};

/**
 * A Zapier action which presents a drop-down list to select an Xperience page type.
 * The user then provide the path and culture of the page to update. The input accepts
 * JSON which contains the columns to update and their values.
 */
module.exports = {
  noun: 'Update Page',
  display: {
    hidden: false,
    important: true,
    description: 'Updates an existing page in Xperience',
    label: 'Update Page',
  },
  key: 'update_page',
  operation: {
    perform: async (z, bundle) => updatePage(
      z,
      bundle,
      bundle.inputData.culture,
      bundle.inputData.nodeAliasPath,
      bundle.inputData.objectType,
      bundle.inputData.updateValues,
    ),
    inputFields: [
      nodeAliasField,
      cultureField,
      jsonInputField,
    ],
    sample: {
      NodeAliasPath: '/Articles/Coffee-Beverages-Explained',
      ArticleTitle: 'Coffee Beverages Explained',
    },
    outputFields: [],
  },
};
