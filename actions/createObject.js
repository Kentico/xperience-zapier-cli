const getObjectTypesField = require('../fields/getObjectTypesField');

async function execute(z, bundle) {
    const type = bundle.inputData.objectType;

    return {'type': type}
}

const createObject = {
    noun: "Create New Object",
    display: {
        hidden: false,
        important: true,
        description: "Creates a new object in Xperience",
        label: "Create New Object"
    },
    key: "create_object",
    operation: {
        perform: execute,
        inputFields: [
            getObjectTypesField({ required: true, altersDynamicFields: true })
        ],
        sample: {
            typeName: 'om.contact'
        },
        outputFields: [],
    },
};

module.exports = createObject;
