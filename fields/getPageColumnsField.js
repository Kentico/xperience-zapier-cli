const getPageTypeSchema = require('../utils/getPageTypeSchema');
const getSimpleField = require('./getSimpleField');

async function getPageColumnsField(z, bundle, pageType) {
    
    const schema = await getPageTypeSchema(z, bundle, pageType);
    // TODO: Get standard page fields and merge
    const fields = schema.map(getSimpleField);

    // Sort by columnn
    fields.sort((a,b) => a.key.localeCompare(b.key));

    return fields;
}

module.exports = getPageColumnsField;
