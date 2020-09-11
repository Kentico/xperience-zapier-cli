const getRESTAllowedTypes = require('../../utils/getRESTAllowedTypes');

async function execute(z, bundle) {
    let objectTypes = await getRESTAllowedTypes(z, bundle);

    // Remove cms.document- there's a separate action for that
    objectTypes = objectTypes.filter(t => t.name !== 'cms.document');

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
