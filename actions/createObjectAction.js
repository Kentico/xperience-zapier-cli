const getObjectTypesField = require('../fields/getObjectTypesField');
const getObjectColumnsField = require('../fields/getObjectColumnsField');
const createObject = require('../utils/createObject');

async function execute(z, bundle) {
    const result = await createObject(z, bundle, bundle.inputData.objectType);

    return result;
}

const createObjectAction = {
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
            getObjectTypesField({ required: true, altersDynamicFields: true }),
            async function (z, bundle) {
                return await getObjectColumnsField(z, bundle, bundle.inputData.objectType);
            }
        ]
    },
};

module.exports = createObjectAction;
