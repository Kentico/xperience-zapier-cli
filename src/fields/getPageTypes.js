const getAllPageTypes = require('../utils/get/getAllPageTypes');

/**
 * A Zapier input field which displays Xperience page types in a drop-down list.
 * The output of the field is the page type code name.
 */
module.exports = {
  key: 'get_page_types',
  noun: 'Page type',
  display: {
    label: 'Page type',
    description: 'Gets supported page types',
    hidden: true,
  },
  operation: {
    type: 'polling',
    perform: getAllPageTypes,
    sample: {
      id: 0,
      name: 'DancingGoat.Article',
    },
    outputFields: [
      {
        key: 'name',
        label: 'Page type codename',
        type: 'string',
      },
    ],
  },
};
