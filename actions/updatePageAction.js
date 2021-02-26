const getPageData = require('../utils/getPageData');
const getPageColumnsField = require('../fields/getPageColumnsField');
const updatePage = require('../utils/updatePage');

async function execute(z, bundle) {

    const result = await updatePage(z, bundle);
    return result;
}

const updatePageAction = {
    noun: "Update Page",
    display: {
        hidden: false,
        important: true,
        description: "Updates an existing page in Xperience",
        label: "Update Page"
    },
    key: "update_page",
    operation: {
        perform: execute,
        inputFields: [
            {
                key: 'nodeAliasPath',
                type: 'string',
                required: true,
                label: 'Node alias path',
                helpText: 'The path of the page to update. For example, "/Blogs/Food"',
                altersDynamicFields: true
            },
            {
                key: 'culture',
                type: 'string',
                label: 'Document culture',
                helpText: 'The culture code of the page to update. Defaults to "en-US" if emtpy.',
                altersDynamicFields: true
            },
            async function (z, bundle) {
                const pageData = await getPageData(z, bundle, bundle.inputData.nodeAliasPath, bundle.inputData.culture);
                if(!pageData) throw new z.errors.HaltedError(`Page not found. Please check the Node Alias Path and Culture.` );
                else return await getPageColumnsField(z, bundle, pageData["NodeClassID"], pageData);
            }
        ],
        outputFields: [],
    },
};

module.exports = updatePageAction;
