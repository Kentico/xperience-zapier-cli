/**
 * Converts an Xperience field defition into a Zapier input field.
 *
 * @param {any} xperienceField The Xperience field definition.
 * @param {any} extra Additional properties to add to the field.
 * @returns {any} A Zapier input field.
 */
const getField = (xperienceField, extra) => {
  const base = {
    key: xperienceField.column,
    label: `${xperienceField.column} ${(xperienceField.fieldcaption && xperienceField.fieldcaption !== xperienceField.column
      ? `(${xperienceField.fieldcaption})` : '')}`,
    required: !xperienceField.allowempty,
    helpText: xperienceField.fielddescription || xperienceField.explanationtext,
    default: xperienceField.defaultvalue && typeof xperienceField.defaultvalue === 'string' ? xperienceField.defaultvalue : '',
  };

  // Add extras
  const retVal = Object.assign(base, extra);

  // Add current datetime if is datetime field with no default value
  if (retVal.type === 'datetime' && retVal.default === '') {
    retVal.default = new Date().toLocaleString();
  }

  return retVal;
};

/**
 * Converts an Xperience field defition into a Zapier input field.
 *
 * @param {any} xperienceField The Xperience field definition.
 * @returns {any} A Zapier input field.
 */
module.exports = (xperienceField) => {
  switch (xperienceField.columntype) {
    case 'longtext':
      return getField(xperienceField, { type: 'text' });

    case 'integer':
    case 'longinteger':
      return getField(xperienceField, { type: 'integer' });

    case 'decimal':
    case 'double':
    case 'float':
      return getField(xperienceField, { type: 'number' });

    case 'datetime':
      return getField(xperienceField, { type: 'datetime' });

    case 'boolean':
      return getField(xperienceField, { type: 'boolean' });

    case 'text':
    case 'guid':
    default:
      return getField(xperienceField, { type: 'string' });
  }
};
