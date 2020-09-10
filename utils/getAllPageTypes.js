async function getAllPageTypes(z, bundle) {
    let retVal = [];
    const options = {
        url: `${bundle.authData.website}/rest/cms.documenttype?format=json&columns=ClassName`,
        method: 'GET'
    };

    const response = await z.request(options);
    
    const types = z.JSON.parse(response.content).cms_documenttypes;
    if(types.length > 1) {

        const classes = types[0].CMS_Class;
        retVal = classes.map((obj, index) => {
            return {
                id: index,
                name: obj.ClassName
            };
        });
    }
    return retVal;
}

module.exports = getAllPageTypes;