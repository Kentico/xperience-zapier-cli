function getSimpleField(field) {
    function getField(field, extra) {
        const base = {
            key: field.column,
            label: `${field.column} ${(field.fieldcaption && field.fieldcaption !== field.column ?
                '('+field.fieldcaption+')' : '')}`,
            required: !field.allowempty,
            helpText: field.fielddescription || field.explanationtext
        };

        return Object.assign(base, extra);
    }

    switch (field.columntype) {
        case 'text':
        case 'guid':
            return getField(field, {type: 'string'});

        case 'longtext':
            return getField(field, {type: 'text'});

        case 'integer':
        case 'longinteger':
            return getField(field, {type: 'integer'});

        case 'decimal':
        case 'float':
            return getField(field, {type: 'number'});

        case 'datetime':
            return getField(field, {type: 'datetime'});

        case 'boolean': 
            return getField(field, {type: 'boolean'});
    }
}

module.exports = getSimpleField;