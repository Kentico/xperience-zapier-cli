const getClassFormDefinition = require('../get/getClassFormDefinition');

/**
 * Updates an existing Xperience object.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @param {string} objectType Code name of the object type to update.
 * @param {string} identifier Code name, ID, or GUID of the object to update.
 * @param {string} siteOrGlobal "Site" or "Global" depending on whether the object to update
 * is a site object or global object.
 * @param {any} updateValues An object containing column names to update and their values.
 * @returns {any} The response from Xperience.
 */
module.exports = async (z, bundle, objectType, identifier, siteOrGlobal, updateValues) => {
  // Validate JSON properties against object fields
  const json = z.JSON.parse(updateValues);
  const objectFields = await getClassFormDefinition(z, bundle, objectType);
  Object.keys(json).forEach((propertyName) => {
    const matches = objectFields.filter((f) => f.column.toString().toLowerCase()
      === propertyName.toLowerCase());
    if (matches.length === 0) {
      throw new z.errors.HaltedError(`Field ${propertyName} does not exist on object ${objectType}`);
    }
  });

  const url = `${bundle.authData.website}/rest/${objectType}${
    siteOrGlobal === 'Global' ? '/global' : ''
  }/${identifier}`;

  const options = {
    url,
    method: 'PUT',
    params: {
      format: 'json',
    },
    headers: {
      Accept: 'application/json',
    },
    body: json,
  };

  const response = await z.request(options);
  if (response.status === 404) {
    throw new z.errors.HaltedError('Object not found');
  }

  return z.JSON.parse(response.content);
};
