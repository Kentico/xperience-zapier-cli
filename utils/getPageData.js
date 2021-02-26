/**
 * Gets all columns and values for a page from the /rest/content endpoint
 */
async function getPageData(z, bundle, nodeAliasPath, culture) {
    let retVal = {};
    if(!nodeAliasPath) return retVal;
    if(!culture) culture = 'en-US';

    const options = {
        url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${culture}/document${nodeAliasPath}`,
        method: 'GET',
        params: {
            localize: 'en-US',
            format: 'json'
        },
        headers: {
            'Accept': 'application/json'
        }
    };

    const response = await z.request(options);
    if(response.status === 404) return null;

    const documents = z.JSON.parse(response.content).cms_documents[0];
    let page;
    for(const key in documents) {
        if(documents.hasOwnProperty(key)) {
            const firstProp = documents[key];
            page = firstProp[0];
            break;
        }
    }

    if(page) retVal = page;

    return retVal;
}

module.exports = getPageData;