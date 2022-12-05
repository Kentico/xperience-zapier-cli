const updatePage = require('../utils/updatePage');

async function execute(z, bundle) {
  const result = await updatePage(z, bundle);
  return result;
}

const updatePageAction = {
  noun: 'Update Page',
  display: {
    hidden: false,
    important: true,
    description: 'Updates an existing page in Xperience',
    label: 'Update Page',
  },
  key: 'update_page',
  operation: {
    perform: execute,
    inputFields: [
      {
        key: 'nodeAliasPath',
        type: 'string',
        required: true,
        label: 'Node alias path',
        helpText: 'The path of the page to update. For example, "/Blogs/Food"',
      },
      {
        key: 'culture',
        type: 'string',
        label: 'Document culture',
        helpText: 'The culture code of the page to update. Defaults to "en-US" if emtpy.',
      },
      {
        key: 'updateValues',
        label: 'Data to update',
        placeholder: `{
    "DocumentName": "The best article ever",
    "ArticleSummary": "A very good article"
}`,
        type: 'text',
        helpText: 'JSON representing the page fields/values that you want to update.',
      },
    ],
    sample: {
      NodeAliasPath: '/Articles/Coffee-Beverages-Explained',
      ArticleTitle: 'Coffee Beverages Explained',
    },
    outputFields: [],
  },
};

module.exports = updatePageAction;
