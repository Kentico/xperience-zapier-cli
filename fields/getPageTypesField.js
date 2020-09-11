function getPageTypesField(extras) {
    return Object.assign(
        {
            label: 'Page type',
            key: 'classID',
            type: 'integer',
            dynamic: 'get_page_types.id.name',
        },
        extras || {},
    );
}

module.exports = getPageTypesField;