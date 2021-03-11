const getClassSchema = require('../utils/getClassSchema');
const getSimpleField = require('./getSimpleField');
const getCommonPageSchema = require('../utils/getCommonPageSchema');
const sections = {
    core: {
        description: 'Core page fields',
        columns: [
            'DocumentName',
            'DocumentCulture'
        ],
    },
    security: {
        description: 'Node security',
        columns: [
            'IsSecuredNode',
            'RequiresSSL',
            'NodeACLID',
            'NodeIsACLOwner'
        ]
    }
};

/**
 * Gets only the input fields defined in the `sections` array.
 * Also adds a `copy` field with the description stored in the section.
 * 
 */
function getSection(z, commonSchema, sectionName, input) {

    const section = sections[sectionName];
    const schema = commonSchema.filter(s => section.columns.includes(s.column));

    return [
        {
            key: `section_${sectionName}`,
            type: 'copy',
            helpText: section.description
        },
        ...schema.map(field => getSimpleFieldWithInput(z, field, input))
    ];
}

function getSimpleFieldWithInput(z, field, input) {
    const f = getSimpleField(field);

    if(input && f && Object.keys(input).includes(f.key)) {
        f.default = input[f.key];
    }

    return f;
}

/**
 * Loads input fields for a page type by combining columns from cms.document, cms.tree,
 * and the custom page type class.
 * 
 * If input is provided (an anonymous object containing page columns and values), the value
 * of each field will be set to the corresponding key in the input.
 * 
 */
async function getPageColumnsField(z, bundle, input = null) {
    
    let classSchema = await getClassSchema(z, bundle, bundle.inputData.classID);
    const commonSchema = await getCommonPageSchema(z, bundle);

    // Sort custom page fields by columnn name
    classSchema.sort((a,b) => a.column.localeCompare(b.column));

    // Build fields for user
    const retVal = [];
    retVal.push(...getSection(z, commonSchema, 'core', input));

    // If input is provided, we are updating an existing page, so parentPath field is not needed
    if(!input) retVal.push({
        key: 'parentPath',
        type: 'string',
        required: true,
        label: 'Parent page',
        helpText: 'The path of the page to insert this page under. For example, "/Blogs/Food"'
    });

    retVal.push(...getSection(z, commonSchema, 'security', input));
    retVal.push({
        key: 'custom_fields',
        type: 'copy',
        helpText: 'Custom page type fields'
    });
    retVal.push(...classSchema.map(field => getSimpleFieldWithInput(z, field, input)));

    return retVal;
}

module.exports = getPageColumnsField;
