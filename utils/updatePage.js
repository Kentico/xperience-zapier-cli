const getPageData = require('../utils/getPageData');

async function updatePage(z, bundle) {
    let culture = bundle.inputData.culture;
    if (!culture) culture = 'en-US';

    // Validate JSON properties against page fields
    const json = z.JSON.parse(bundle.inputData.updateValues);
    const pageData = await getPageData(z, bundle, bundle.inputData.nodeAliasPath, culture);
    for (const prop of Object.keys(json)) {
        const matches = Object.keys(pageData).filter(k => k.toString().toLowerCase() === prop.toLowerCase());
        if (matches.length === 0) {
            throw new z.errors.HaltedError(`Field ${prop} does not exist on page type ${pageData['ClassName']}`);
        }
    }

    const options = {
        url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${culture}/document${bundle.inputData.nodeAliasPath}`,
        method: 'PUT',
        params: {
            format: 'json'
        },
        headers: {
            'Accept': 'application/json'
        },
        body: bundle.inputData.updateValues
    };

    const response = await z.request(options);
    return z.JSON.parse(response.content);
}

module.exports = updatePage;