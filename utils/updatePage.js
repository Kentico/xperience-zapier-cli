async function updatePage(z, bundle) {
    let culture = bundle.inputData.culture;
    if(!culture) culture = 'en-US';

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