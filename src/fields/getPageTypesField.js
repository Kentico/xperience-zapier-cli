/**
 * A Zapier input field which displays Xperience page types in a drop-down list.
 * The output of the field is the page type code name.
 *
 * @param {any} extras Additional properties to add to the field.
 * @returns {any} A Zapier input field.
 */
module.exports = (extras) => ({
  label: 'Page type',
  key: 'classID',
  type: 'integer',
  dynamic: 'get_page_types.id.name',
  ...extras || {},
});
