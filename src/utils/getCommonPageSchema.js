const getClassSchema = require('./getClassSchema');

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

async function getCommonPageSchema(z, bundle) {
  const docSchema = await getClassSchema(z, bundle, 'cms.document');
  const nodeSchema = await getClassSchema(z, bundle, 'cms.tree');
  const merged = docSchema.concat(nodeSchema);

  // Filter list of columns to only necessary ones
  return merged.filter((f) => returnColumns.includes(f.column));
}

module.exports = getCommonPageSchema;
