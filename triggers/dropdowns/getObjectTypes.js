const getAllObjectTypes = require('../../utils/getAllObjectTypes');

async function execute(z, bundle) {
    const objectTypes = await getAllObjectTypes(z, bundle);

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
