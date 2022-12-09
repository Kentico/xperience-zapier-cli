const getPageData = require('../get/getPageData');

/**
 * Updates an existing Xperience page.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string} culture The culture of the page to update.
 * @param {string} nodeAliasPath The node alias path of the page to update.
 * @param {any} updateValues An object containing column names to update and their values.
 * @returns {any} The response from Xperience.
 */
module.exports = async (z, bundle, culture, nodeAliasPath, updateValues) => {
  let cultureParam = culture;
  if (!cultureParam) cultureParam = 'en-US';

  // Validate JSON properties against page fields
  const pageData = await getPageData(z, bundle, nodeAliasPath, cultureParam);
  Object.keys(updateValues).forEach((propertyName) => {
    const matches = Object.keys(pageData).filter((k) => k.toString().toLowerCase()
      === propertyName.toLowerCase());
    if (matches.length === 0) {
      throw new z.errors.HaltedError(`Unexpected property '${propertyName}.'`);
    }
  });

  const options = {
    url: `${bundle.authData.website}/rest/content/currentsite/${cultureParam}/document${nodeAliasPath}`,
    method: 'PUT',
    params: {
      format: 'json',
    },
    headers: {
      Accept: 'application/json',
    },
    body: updateValues,
  };

  const response = await z.request(options);
  return z.JSON.parse(response.content);
};
