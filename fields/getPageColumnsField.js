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
 * @param {Array} commonSchema 
 * @param {string} sectionName 
 */
function getSection(commonSchema, sectionName) {

    const section = sections[sectionName];
    const schema = commonSchema.filter(s => section.columns.includes(s.column));

    return [
        {
            key: `section_${sectionName}`,
            type: 'copy',
            helpText: section.description
        },
        ...schema.map(getSimpleField)
    ];
}

/**
 * Loads input fields for a page type by combining columns from cms.document, cms.tree,
 * and the custom page type class.
 * 
 * @param {} z 
 * @param {*} bundle 
 * @param {integer} classID 
 */
async function getPageColumnsField(z, bundle, classID) {
    
    let classSchema = await getClassSchema(z, bundle, classID);
    const commonSchema = await getCommonPageSchema(z, bundle);

    // TODO: Is this necessary?
    // Remove custom field if it is the ClassNodeNameSource, since
    // the DocumentName will populate it
    classSchema = classSchema.filter(f => !f.isnamecolumn);

    // Sort custom page fields by columnn name
    classSchema.sort((a,b) => a.column.localeCompare(b.column));

    return [
        ...getSection(commonSchema, 'core'),
        {
            key: 'parentPath',
            type: 'string',
            required: true,
            label: 'Parent page',
            helpText: 'The path of the page to insert this page under. For example, "/Blogs/Food"'
        },
        ...getSection(commonSchema, 'security'),
        {
            key: 'custom_fields',
            type: 'copy',
            helpText: 'Custom page type fields'
        },
        ...classSchema.map(getSimpleField)
    ];
}

module.exports = getPageColumnsField;
