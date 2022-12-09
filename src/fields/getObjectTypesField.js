/**
 * A Zapier input field which displays all Xperience object types in a
 * drop-down list and outputs the code name of the type.
 *
 * @param {any} extras Additional properties to add to the field.
 * @returns {any} A Zapier input field.
 */
module.exports = (extras) => ({
  label: 'Object type',
  key: 'objectType',
  type: 'string',
  dynamic: 'get_object_types.name.name',
  ...extras || {},
});
