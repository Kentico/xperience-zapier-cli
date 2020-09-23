const getRESTAllowedTypes = require('../../utils/getRESTAllowedTypes');
const excludedObjects = [
    'cms.document',
    'cms.documenttype',
    'cms.node'
];

async function execute(z, bundle) {
    let objectTypes = await getRESTAllowedTypes(z, bundle);

    // Remove cms.document- there's a separate action for that
    // Also remove unsupported types for the drop-down
    objectTypes = objectTypes.filter(t => !excludedObjects.includes(t.name));

    return objectTypes;
}

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
        perform: execute,
        sample: {
            id: 0,
            name: 'om.contact'
        },
        outputFields: [
            {
                key: 'name',
                label: 'Object type codename',
                type: 'string',
            }
        ]
    }
};
