const getObjectSchema = require('./getObjectSchema');

async function createObject(z, bundle, objectType) {
    const schema = await getObjectSchema(z, bundle, objectType);

    // Copy bundle.inputData and only take prop if found in schema columns
    const input = JSON.parse(JSON.stringify(bundle.inputData));
    const keys = schema.map(c => c.column);
    for(const prop in input) {
        if(!keys.includes(prop)) {
            delete input[prop];
        }
    }

    const options = {
        url: `${bundle.authData.website}/rest/${objectType}/currentsite?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: input
    };

    const response = await z.request(options);

    return z.JSON.parse(response.content);
}

module.exports = createObject;