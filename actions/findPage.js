const searchPages = require('../utils/searchPages');

async function execute(z, bundle) {
    return searchPages(z, bundle, bundle.inputData.whereCondition);
}

const findPageAction = {
    noun: "Find Page",
    display: {
        hidden: false,
        important: false,
        description: "Finds a page in Xperience",
        label: "Find Page"
    },
    key: "find_page",
    operation: {
        perform: execute,
        inputFields: [
            {
                key: 'whereCondition',
                label: 'Where condition',
                placeholder: `DocumentCulture='en-US' AND NodeAliasPath='/Articles/Coffee-Beverages-Explained'`,
                type: 'text',
                helpText: 'A SQL WHERE condition to find the page. The first result will be returned if multiple pages are found. Make sure to use single quotes for strings!'
            }
        ],
        sample: {
            DocumentCulture: 'en-US',
            NodeAliasPath: '/Articles/Coffee-Beverages-Explained',
            ArticleTitle: 'Coffee Beverages Explained'
        },
    },
};

module.exports = findPageAction;
