const getClassSchema = require('../utils/getClassSchema');
const getSimpleField = require('./getSimpleField');

async function getObjectColumnsField(z, bundle, objectType) {

    const schema = await getClassSchema(z, bundle, objectType);
    const fields = schema.map(getSimpleField);

    // Sort by columnn
    fields.sort((a,b) => a.key.localeCompare(b.key));

    return fields;
}

module.exports = getObjectColumnsField;
