const getClassSchema = require('./getClassSchema');
const getCommonPageSchema = require('./getCommonPageSchema');

async function createPage(z, bundle) {
  const { classID } = bundle.inputData;
  const { parentPath } = bundle.inputData;
  const classSchema = await getClassSchema(z, bundle, classID);
  const commonSchema = await getCommonPageSchema(z, bundle);
  const mergedInput = classSchema.concat(commonSchema);

  // Copy bundle.inputData and only take prop if found in schema columns
  const input = JSON.parse(JSON.stringify(bundle.inputData));
  const keys = mergedInput.map((c) => c.column);
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
}

module.exports = createPage;
