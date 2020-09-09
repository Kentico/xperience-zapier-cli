function getObjectTypesField(extras) {
    return Object.assign(
        {
            label: 'Object type',
            key: 'objectType',
            type: 'string',
            dynamic: 'get_object_types.name.name',
        },
        extras || {},
    );
}

module.exports = getObjectTypesField;