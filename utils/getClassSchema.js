const parseString = require('xml2js').parseString;

async function getClassSchema(z, bundle, identifier) {
    let retVal = [];
    if(!identifier) return retVal;

    function makeField(fieldDefinition) {
        const fieldAttrs = fieldDefinition['$'];
        let fieldProps = fieldDefinition.properties;
        let field = {
            column: fieldAttrs.column,
            columntype: fieldAttrs.columntype,
            columnsize: fieldAttrs.columnsize,
            isPK: fieldAttrs.isPK || false,
            allowempty: fieldAttrs.allowempty || false,
            visible: fieldAttrs.visible && fieldAttrs.visible === 'true'
        };
        if(fieldProps) {
            fieldProps = fieldProps[0];
            field.defaultvalue = fieldProps.defaultvalue ? fieldProps.defaultvalue[0] : undefined,
            field.fieldcaption = fieldProps.fieldcaption ? fieldProps.fieldcaption[0] : undefined,
            field.explanationtext = fieldProps.explanationtext ? fieldProps.explanationtext[0] : undefined,
            field.fielddescription = fieldProps.fielddescription ? fieldProps.fielddescription[0] : undefined
        }

        return field;
    }

    let where;
    if(typeof identifier === 'string') {

        // "ma.automationaction" is actually "cms.workflowaction" in CMS_Class
        if(identifier === 'ma.automationaction') {
            identifier = 'cms.workflowaction';
        }

        // For some reason, /rest returns MA classes like "ma.automationstate" but they
        // actually have a ClassName of "cms.automationstate" in CMS_Class
        if(identifier.startsWith("ma")) {
            identifier = "cms." + identifier.split('.')[1];
        }

        where = `ClassName='${identifier}'`;
    }
    else {
        where = `ClassID='${identifier}'`
    }

    const options = {
        url: `${bundle.authData.website}/rest/cms.class/all`,
        method: 'GET',
        params: {
            where: where,
            localize: 'en-US',
            format: 'json',
            columns: 'ClassFormDefinition,ClassNodeNameSource,ClassIsDocumentType'
        },
        headers: {
            'Accept': 'application/json'
        }
    };

    const response = await z.request(options);
    const classes = z.JSON.parse(response.content).cms_classes;
    if(classes.length > 1) {

        const foundClass = classes[0].CMS_Class[0];
        parseString(foundClass.ClassFormDefinition, function (err, json) {
        
            // Map each field's XML definition to an object
            const fields = json.form.field;
            retVal = fields.map(makeField);
        });
    
        if(foundClass.ClassIsDocumentType && foundClass.ClassNodeNameSource) {

            // Try to find column with same name as ClassNodeNameSource
            const nameColumn = retVal.filter(f => f.column === foundClass.ClassNodeNameSource);
            if(nameColumn.length > 0) nameColumn[0].isnamecolumn = true;
        }

        // Remove PK and GUID columns
        retVal =  retVal.filter(f => !f.isPK && f.columntype !== 'guid');
    }

    return retVal;
}

module.exports = getClassSchema;