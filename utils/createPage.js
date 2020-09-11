const getClassSchema = require('./getClassSchema');
const getCommonPageSchema = require('../utils/getCommonPageSchema');

async function createPage(z, bundle) {
    const classID = bundle.inputData.classID;
    const parentPath = bundle.inputData.parentPath;
    const classSchema = await getClassSchema(z, bundle, classID);
    const commonSchema = await getCommonPageSchema(z, bundle);
    const mergedInput = classSchema.concat(commonSchema);

    // Copy bundle.inputData and only take prop if found in schema columns
    const input = JSON.parse(JSON.stringify(bundle.inputData));
    const keys = mergedInput.map(c => c.column);
    for(const prop in input) {
        if(!keys.includes(prop)) {
            delete input[prop];
        }
    }

    // Add the NodeClassID input
    input.NodeClassID = classID;

    z.console.log(bundle.inputData);
    z.console.log(input);

    const options = {
        url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${input.DocumentCulture}/document${parentPath}?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: input
    };

    const response = await z.request(options);
    return z.JSON.parse(response.content);
}

module.exports = createPage;