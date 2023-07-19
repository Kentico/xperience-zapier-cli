/**
 * Searches for pages in the Xperience content tree based on a SQL WHERE condition
 */
 async function searchPages(z, bundle, query) {
    const options = {
        url: `${bundle.authData.website}/rest/content/currentsite`
            + `/allcultures/all?where=${query}`,
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

    const documents = z.JSON.parse(response.content).cms_documents[0].cms_document;
    if(documents && documents.length > 0) {
        return [documents[0]];
    }
    else {
        return [];
    }
}

module.exports = searchPages;