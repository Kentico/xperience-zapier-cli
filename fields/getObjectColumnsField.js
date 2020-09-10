const getObjectSchema = require('../utils/getObjectSchema');
const getSimpleField = require('./getSimpleField');

async function getObjectColumnsField(z, bundle, objectType) {

    const schema = await getObjectSchema(z, bundle, objectType);
    const fields = schema.map(getSimpleField);

    // Sort by columnn
    fields.sort((a,b) => a.key.localeCompare(b.key));

    return fields;
}

module.exports = getObjectColumnsField;
