function getObjectTypesField(extras) {
  return {
    label: 'Object type',
    key: 'objectType',
    type: 'string',
    dynamic: 'get_object_types.name.name',
    ...extras || {},
  };
}

module.exports = getObjectTypesField;
