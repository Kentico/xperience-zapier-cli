const getAllPageTypes = require('../../utils/getAllPageTypes');

async function execute(z, bundle) {
    let pageTypes = await getAllPageTypes(z, bundle);

    return pageTypes;
}

module.exports = {
    key: 'get_page_types',
    noun: 'Page type',
    display: {
        label: 'Page type',
        description: 'Gets supported page types',
        hidden: true,
    },
    operation: {
        type: 'polling',
        perform: execute,
        sample: {
            id: 0,
            name: 'DancingGoat.Article'
        },
        outputFields: [
            {
                key: 'name',
                label: 'Page type codename',
                type: 'string',
            }
        ]
    }
};
