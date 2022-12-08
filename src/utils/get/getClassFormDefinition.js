const { parseString } = require('xml2js');

/**
 * Generates an Xperience field from the returned data.
 *
 * @param {any} fieldDefinition An Xperience field from the form definition.
 * @returns {any} An Xperience field.
 */
const makeField = (fieldDefinition) => {
  const fieldAttrs = fieldDefinition.$;
  const fieldProps = fieldDefinition.properties;
  const field = {
    column: fieldAttrs.column,
    columntype: fieldAttrs.columntype,
    columnsize: fieldAttrs.columnsize,
    isPK: fieldAttrs.isPK || false,
    allowempty: fieldAttrs.allowempty || false,
    visible: fieldAttrs.visible && fieldAttrs.visible === 'true',
  };
  if (fieldProps) {
    field.defaultvalue = fieldProps[0].defaultvalue ? fieldProps[0].defaultvalue[0] : undefined;
    field.fieldcaption = fieldProps[0].fieldcaption ? fieldProps[0].fieldcaption[0] : undefined;
    field.explanationtext = fieldProps[0].explanationtext
      ? fieldProps[0].explanationtext[0] : undefined;
    field.fielddescription = fieldProps[0].fielddescription
      ? fieldProps[0].fielddescription[0] : undefined;
  }

  return field;
};

/**
 * Gets the Xperience fields of the object type.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string|number} identifier The class name or ID of the object type.
 * @returns {any[]} An array of Xperience fields.
 */
module.exports = async (z, bundle, identifier) => {
  let retVal = [];
  if (!identifier) return retVal;

  let where;
  let identifierParam = identifier;
  if (Number.isNaN(Number.parseInt(identifierParam, 10))) {
    // "ma.automationaction" is actually "cms.workflowaction" in CMS_Class
    if (identifierParam === 'ma.automationaction') {
      identifierParam = 'cms.workflowaction';
    }

    // For some reason, /rest returns MA classes like "ma.automationstate" but they
    // actually have a ClassName of "cms.automationstate" in CMS_Class
    if (identifierParam.startsWith('ma')) {
      identifierParam = `cms.${identifierParam.split('.')[1]}`;
    }

    where = `ClassName='${identifierParam}'`;
  } else {
    where = `ClassID='${identifierParam}'`;
  }

  const options = {
    url: `${bundle.authData.website}/rest/cms.class/all`,
    method: 'GET',
    params: {
      where,
      localize: 'en-US',
      format: 'json',
      columns: 'ClassFormDefinition,ClassNodeNameSource,ClassIsDocumentType',
    },
    headers: {
      Accept: 'application/json',
    },
  };

  const response = await z.request(options);
  const classes = z.JSON.parse(response.content).cms_classes;
  if (classes.length > 1) {
    const foundClass = classes[0].CMS_Class[0];
    parseString(foundClass.ClassFormDefinition, (err, json) => {
      // Map each field's XML definition to an object
      const fields = json.form.field;
      if (fields && fields.length > 0) {
        retVal = fields.map(makeField);
      }
    });

    if (foundClass.ClassIsDocumentType && foundClass.ClassNodeNameSource) {
      // Try to find column with same name as ClassNodeNameSource
      const nameColumn = retVal.filter((f) => f.column === foundClass.ClassNodeNameSource);
      if (nameColumn.length > 0) {
        nameColumn[0].isnamecolumn = true;
      }
    }

    // Remove PK and GUID columns
    retVal = retVal.filter((f) => !f.isPK && f.columntype !== 'guid');
  }

  return retVal;
};
