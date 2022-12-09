const getClassFormDefinition = require('../get/getClassFormDefinition');

/**
 * Creates a new object in the Xperience website.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string} objectType The object type to create.
 * @param {any} inputData Zapier input fields and their values.
 * @returns {any} The response from the Xperience website containing the created object.
 */
module.exports = async (z, bundle, objectType, inputData) => {
  const formDefinition = await getClassFormDefinition(z, bundle, objectType);

  // Copy inputData and only take prop if found in form definition
  const input = JSON.parse(JSON.stringify(inputData));
  const keys = formDefinition.map((c) => c.column);
  Object.keys(input).forEach((prop) => {
    if (!keys.includes(prop)) {
      delete input[prop];
    }
  });

  const options = {
    url: `${bundle.authData.website}/rest/${objectType}/currentsite?format=json`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: input,
  };

  const response = await z.request(options);
  return z.JSON.parse(response.content);
};
