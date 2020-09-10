function getPageTypesField(extras) {
    return Object.assign(
        {
            label: 'Page type',
            key: 'pageType',
            type: 'string',
            dynamic: 'get_page_types.name.name',
        },
        extras || {},
    );
}

module.exports = getPageTypesField;