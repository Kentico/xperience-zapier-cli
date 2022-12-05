function getSimpleField(field) {
  function getField(xperienceField, extra) {
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
  }

  switch (field.columntype) {
    case 'longtext':
      return getField(field, { type: 'text' });

    case 'integer':
    case 'longinteger':
      return getField(field, { type: 'integer' });

    case 'decimal':
    case 'double':
    case 'float':
      return getField(field, { type: 'number' });

    case 'datetime':
      return getField(field, { type: 'datetime' });

    case 'boolean':
      return getField(field, { type: 'boolean' });

    case 'text':
    case 'guid':
    default:
      return getField(field, { type: 'string' });
  }
}

module.exports = getSimpleField;
