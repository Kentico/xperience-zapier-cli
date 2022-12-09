const getClassFormDefinition = require('../get/getClassFormDefinition');
const getCommonPageFormDefinition = require('../get/getCommonPageFormDefinition');

/**
 * Creates a new page in the Xperience website.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {number} classID The ClassID of the page type to create.
 * @param {string} parentPath The node alias path to create the page under.
 * @param {any} inputData An object containing columns and their values.
 * @returns {any} The response from the Xperience website containing the created page.
 */
module.exports = async (z, bundle, classID, parentPath, inputData) => {
  const pageTypeFormDefinition = await getClassFormDefinition(z, bundle, classID);
  const commonPageFormDefinition = await getCommonPageFormDefinition(z, bundle);
  const merged = pageTypeFormDefinition.concat(commonPageFormDefinition);

  // Copy inputData and only take prop if found in schema columns
  const input = JSON.parse(JSON.stringify(inputData));
  const keys = merged.map((c) => c.column);
  Object.keys(input).forEach((prop) => {
    if (!keys.includes(prop)) {
      delete input[prop];
    }
  });

  // Add the NodeClassID input
  input.NodeClassID = classID;

  const options = {
    url: `${bundle.authData.website}/rest/content/currentsite`
            + `/${input.DocumentCulture}/document${parentPath}`,
    method: 'POST',
    params: {
      format: 'json',
    },
    headers: {
      Accept: 'application/json',
    },
    body: input,
  };

  const response = await z.request(options);
  return z.JSON.parse(response.content);
};
