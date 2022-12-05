function getPageTypesField(extras) {
  return {
    label: 'Page type',
    key: 'classID',
    type: 'integer',
    dynamic: 'get_page_types.id.name',
    ...extras || {},
  };
}

module.exports = getPageTypesField;
