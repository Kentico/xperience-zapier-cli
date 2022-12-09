const getRESTAllowedTypes = require('../utils/get/getRESTAllowedTypes');

/**
 * Xperience object types to exclude from the drop-down list.
 */
const excludedObjects = [
  'cms.document',
  'cms.documenttype',
  'cms.node',
];

/**
 * A Zapier input field which displays a drop-down list of Xperience object types.
 * The output of the field is the code name of the object type.
 */
module.exports = {
  key: 'get_object_types',
  noun: 'Object type',
  display: {
    label: 'Object type',
    description: 'Gets supported object types',
    hidden: true,
  },
  operation: {
    type: 'polling',
    perform: async (z, bundle) => {
      let objectTypes = await getRESTAllowedTypes(z, bundle);

      // Remove unsupported object types for this drop-down, e.g. documents.
      objectTypes = objectTypes.filter((t) => !excludedObjects.includes(t.name));

      return objectTypes;
    },
    sample: {
      id: 0,
      name: 'om.contact',
    },
    outputFields: [
      {
        key: 'name',
        label: 'Object type codename',
        type: 'string',
      },
    ],
  },
};
