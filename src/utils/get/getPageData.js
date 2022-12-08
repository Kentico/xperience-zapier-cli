/**
 * Gets all columns and values for a specific page in the content tree.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string} nodeAliasPath The path of the page to retrieve.
 * @param {string} culture The culture of the page to retrieve.
 * @returns {any} The page columns and their values.
 */
module.exports = async (z, bundle, nodeAliasPath, culture) => {
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
};
