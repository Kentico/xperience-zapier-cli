const moveToNextStep = require('../utils/moveToNextStep');

async function execute(z, bundle) {
    return moveToNextStep(z, bundle, bundle.inputData.nodeAliasPath, bundle.inputData.culture);
}

const findPageAction = {
    noun: "Move to Next Step",
    display: {
        hidden: false,
        important: false,
        description: "Moves an Xperience page to the next step in the workflow",
        label: "Move to Next Step"
    },
    key: "next_step",
    operation: {
        perform: execute,
        inputFields: [
            {
                key: 'nodeAliasPath',
                type: 'string',
                required: true,
                label: 'Node alias path',
                helpText: 'The path of the page to move to the next step. For example, "/Blogs/Food"'
            },
            {
                key: 'culture',
                type: 'string',
                label: 'Document culture',
                helpText: 'The culture code of the page to move to the next step. Defaults to "en-US" if emtpy.'
            },
        ],
        sample: {
            NodeAliasPath: '/Articles/Coffee-Beverages-Explained',
            ArticleTitle: 'Coffee Beverages Explained'
        },
    },
};

module.exports = findPageAction;
