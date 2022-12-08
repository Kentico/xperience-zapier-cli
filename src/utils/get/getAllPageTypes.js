/**
 * Gets all page types from the Xperience website.
 *
 * @param {any} z Zapier context.
 * @param {any} bundle Zapier data bundle.
 * @returns {any[]} An array of Xperience page type ClassIDs and ClassNames.
 */
module.exports = async (z, bundle) => {
  let retVal = [];
  const options = {
    url: `${bundle.authData.website}/rest/cms.documenttype`,
    method: 'GET',
    params: {
      format: 'json',
      columns: 'ClassID,ClassName',
    },
  };

  const response = await z.request(options);
  const types = z.JSON.parse(response.content).cms_documenttypes;
  if (types.length > 1) {
    const classes = types[0].CMS_Class;
    retVal = classes.map((obj) => ({
      id: obj.ClassID,
      name: obj.ClassName,
    }));
  }

  return retVal;
};
