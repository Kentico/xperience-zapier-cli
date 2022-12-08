const getClassFormDefinition = require('./getClassFormDefinition');

/**
 * Gets a sample Xperience object with dummy values.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string} objectType The code name of the object type to retrieve.
 * @returns {any} An Xperience object.
 */
module.exports = async (z, bundle, objectType) => {
  const formDefinition = await getClassFormDefinition(z, bundle, objectType);
  const sampleData = {};
  formDefinition.forEach((field) => {
    let fieldValue = field.defaultvalue;
    if (!fieldValue) {
      switch (field.columntype) {
        case 'integer':
        case 'longinteger':
          fieldValue = Math.floor(Math.random() * (99 - 1 + 1) + 1);
          break;

        case 'decimal':
        case 'double':
        case 'float':
          fieldValue = (Math.random() * (9.99 - 0.1) + 0.1).toFixed(2);
          break;

        case 'datetime':
          fieldValue = '2022-01-01T01:00:00.000000-07:00';
          break;

        case 'boolean':
          fieldValue = true;
          break;

        case 'guid':
          fieldValue = '2e02c378-0f3d-45de-9b2d-b8cf2bd87b55';
          break;

        case 'text':
        case 'longtext':
        default:
          fieldValue = `Sample ${field.column}`;
          break;
      }
    }

    sampleData[field.column] = fieldValue;
  });

  return sampleData;
};
