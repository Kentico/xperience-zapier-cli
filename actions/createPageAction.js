const getPageTypesField = require('../fields/getPageTypesField');
const getPageColumnsField = require('../fields/getPageColumnsField');
const createPage = require('../utils/createPage');

async function execute(z, bundle) {

    const result = await createPage(z, bundle);
    return result;
}

const createPageAction = {
    noun: "Create New Page",
    display: {
        hidden: false,
        important: true,
        description: "Creates a new page in Xperience",
        label: "Create New Page"
    },
    key: "create_page",
    operation: {
        perform: execute,
        inputFields: [
            getPageTypesField({ required: true, altersDynamicFields: true }),
            async function (z, bundle) {
                return await getPageColumnsField(z, bundle);
            }
        ],
        sample: {
            typeName: 'DancingGoat.Article'
        },
        outputFields: [],
    },
};

module.exports = createPageAction;
