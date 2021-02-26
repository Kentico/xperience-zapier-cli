async function updatePage(z, bundle) {
    const data = bundle.inputData;
    const nodeAliasPath = bundle.inputData.nodeAliasPath;

    // Remove nodeAliasPath from data so only page columns exist
    delete data.nodeAliasPath;

    const options = {
        url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${data.DocumentCulture}/document${nodeAliasPath}`,
        method: 'PUT',
        params: {
            format: 'json'
        },
        headers: {
            'Accept': 'application/json'
        },
        body: data
    };

    const response = await z.request(options);
    return z.JSON.parse(response.content);
}

module.exports = updatePage;