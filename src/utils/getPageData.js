/**
 * Gets all columns and values for a page from the /rest/content endpoint
 */
async function getPageData(z, bundle, nodeAliasPath, culture) {
  let retVal = {};
  let cultureParam = culture;
  if (!nodeAliasPath) return retVal;
  if (!cultureParam) cultureParam = 'en-US';

  const options = {
    url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${cultureParam}/document${nodeAliasPath}`,
    method: 'GET',
    params: {
      localize: 'en-US',
      format: 'json',
    },
    headers: {
      Accept: 'application/json',
    },
  };

  const response = await z.request(options);
  if (response.status === 404) return null;

  const documents = z.JSON.parse(response.content).cms_documents[0];
  Object.keys(documents).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(document, key)) {
      const firstProp = documents[key];
      [retVal] = firstProp;
    }
  });

  return retVal;
}

module.exports = getPageData;
