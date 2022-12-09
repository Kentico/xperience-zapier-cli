const getSimpleField = require('./getSimpleField');
const getClassFormDefinition = require('../utils/get/getClassFormDefinition');

/**
 * Gets the field definition of an Xperience object type, and converts the
 * fields into Zapier input fields.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string} objectType The Xperience object type class name.
 * @returns {any[]} An array of Zapier inputs.
 */
module.exports = async (z, bundle, objectType) => {
  const fieldDefinition = await getClassFormDefinition(z, bundle, objectType);
  const fields = fieldDefinition.map(getSimpleField);

  // Sort by column name
  fields.sort((a, b) => a.key.localeCompare(b.key));

  return fields;
};
