/**
 * Moves a page to the next step in the workflow
 */
 async function moveToNextStep(z, bundle, nodeAliasPath, culture) {
    const options = {
        url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${culture}/movetonextstep${nodeAliasPath}`,
        method: 'PUT',
        params: {
            localize: 'en-US',
            format: 'json'
        },
        headers: {
            'Accept': 'application/json'
        }
    };

    const response = await z.request(options);
    return z.JSON.parse(response.content);
}

module.exports = moveToNextStep;