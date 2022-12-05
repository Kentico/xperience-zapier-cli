const { parseString } = require('xml2js');

async function getRESTAllowedTypes(z, bundle) {
  let retVal = [];
  const options = {
    url: `${bundle.authData.website}/rest`,
    method: 'GET',
  };

  const response = await z.request(options);

  parseString(response.content, (err, json) => {
    const arr = json.service['app:workspace'];
    const workspaces = arr.filter((w) => w['a10:title'][0]._ === 'Objects');
    if (workspaces.length > 0) {
      const objects = workspaces[0]['app:collection'];
      retVal = objects.map((obj, index) => ({
        name: obj['a10:title'][0]._,
        id: index,
      }));
    }
  });

  return retVal;
}

module.exports = getRESTAllowedTypes;
