const getSimpleField = require('./getSimpleField');
const getClassFormDefinition = require('../utils/get/getClassFormDefinition');
const getCommonPageFormDefinition = require('../utils/get/getCommonPageFormDefinition');

/**
 * Zapier UI sections which contain inputs for specified columns.
 */
const sections = {
  core: {
    description: 'Core page fields',
    columns: [
      'DocumentName',
      'DocumentCulture',
    ],
  },
  security: {
    description: 'Node security',
    columns: [
      'IsSecuredNode',
      'RequiresSSL',
      'NodeACLID',
      'NodeIsACLOwner',
    ],
  },
};

/**
 * Gets a Zapier input field for the Xperience field, with an optional default value.
 *
 * @param {any} z Zapier context.
 * @param {any} field Xperience field definition.
 * @param {any} input An object containing column names and default values.
 * @returns {any} A Zapier input field.
 */
const getSimpleFieldWithInput = (z, field, input) => {
  const f = getSimpleField(field);

  if (input && f && Object.keys(input).includes(f.key)) {
    f.default = input[f.key];
  }

  return f;
};

/**
 * Gets only the input fields defined in the {@link sections} array, with the key
 * `sectionName`. Also adds a `copy` field with the description stored in the section.
 *
 * @param {any} z Zapier context.
 * @param {any[]} commonPageFormDefinition An array of Xperience fields which all pages include.
 * @param {string} sectionName The name of the section to get input fields for.
 * @param {any} input An object containing column names and default values.
 * @returns {any} A Zapier UI section containing its input fields.
 */
const getSection = (z, commonPageFormDefinition, sectionName, input) => {
  const section = sections[sectionName];
  const sectionFields = commonPageFormDefinition.filter((s) => section.columns.includes(s.column));

  return [
    {
      key: `section_${sectionName}`,
      type: 'copy',
      helpText: section.description,
    },
    ...sectionFields.map((field) => getSimpleFieldWithInput(z, field, input)),
  ];
};

/**
 * Displays input fields for a page type by combining columns from cms.document, cms.tree,
 * and the custom page type class.
 *
 * If the input parameter is provided (an anonymous object containing page columns and values),
 * the value of each page field will be set to the corresponding key in the input.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {any} input An object containing column names and the value to set for that column.
 * @returns {any[]} An array of Zapier input fields.
 */
module.exports = async (z, bundle, input = null) => {
  const pageTypeFormDefinition = await getClassFormDefinition(z, bundle, bundle.inputData.classID);
  const commonPageFormDefinition = await getCommonPageFormDefinition(z, bundle);

  // Sort custom page fields by columnn name
  pageTypeFormDefinition.sort((a, b) => a.column.localeCompare(b.column));

  // Build fields for user
  const retVal = [];
  retVal.push(...getSection(z, commonPageFormDefinition, 'core', input));

  // If input is provided, we are updating an existing page, so parentPath field is not needed
  if (!input) {
    retVal.push({
      key: 'parentPath',
      type: 'string',
      required: true,
      label: 'Parent page',
      helpText: 'The path of the page to insert this page under. For example, "/Blogs/Food"',
    });
  }

  retVal.push(...getSection(z, commonPageFormDefinition, 'security', input));
  retVal.push({
    key: 'custom_fields',
    type: 'copy',
    helpText: 'Custom page type fields',
  });
  retVal.push(...pageTypeFormDefinition.map((field) => getSimpleFieldWithInput(z, field, input)));

  return retVal;
};
