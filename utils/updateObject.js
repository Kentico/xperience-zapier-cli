const getClassSchema = require('../utils/getClassSchema');

async function updateObject(z, bundle) {
    // Validate JSON properties against object fields
    const json = z.JSON.parse(bundle.inputData.updateValues);
    const objectFields = await getClassSchema(z, bundle, bundle.inputData.objectType);
    for (const prop of Object.keys(json)) {
        const matches = objectFields.filter(f => f.column.toString().toLowerCase() === prop.toLowerCase());
        if (matches.length === 0) {
            throw new z.errors.HaltedError(`Field ${prop} does not exist on object ${bundle.inputData.objectType}`);
        }
    }

    const url =  
        `${bundle.authData.website}/rest/${bundle.inputData.objectType}`
        + (bundle.inputData.siteOrGlobal === 'Global' ? '/global' : '')
        + `/${bundle.inputData.identifier}`;

    const options = {
        url: url,
        method: 'PUT',
        params: {
            format: 'json'
        },
        headers: {
            'Accept': 'application/json'
        },
        body: json
    };

    const response = await z.request(options);
    if(response.status === 404) {
        throw new z.errors.HaltedError('Object not found');
    }
    return z.JSON.parse(response.content);
}

module.exports = updateObject;