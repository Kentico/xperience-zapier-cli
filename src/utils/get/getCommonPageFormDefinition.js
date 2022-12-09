const getClassFormDefinition = require('./getClassFormDefinition');

/**
 * The Xperience columns to include in the returned fields.
 */
const returnColumns = [
  'DocumentName',
  'DocumentCulture',
  'DocumentPageTemplateID',
  'NodeTemplateForAllCultures',
  'NodeInheritPageTemplate',
  'IsSecuredNode',
  'RequiresSSL',
  'NodeIsACLOwner',
  'NodeACLID',
];

/**
 * Gets the Xperience fields that all page types contain.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @returns {any[]} An array of Xperience fields which all page types contain.
 */
module.exports = async (z, bundle) => {
  const documentFormDefinition = await getClassFormDefinition(z, bundle, 'cms.document');
  const nodeFormDefiniton = await getClassFormDefinition(z, bundle, 'cms.tree');
  const merged = documentFormDefinition.concat(nodeFormDefiniton);

  // Filter list of columns to only necessary ones
  return merged.filter((f) => returnColumns.includes(f.column));
};
