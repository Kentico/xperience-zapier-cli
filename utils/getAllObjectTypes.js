const parseString = require('xml2js').parseString;

async function getAllRESTObjects(z, bundle) {
    let retVal = [];
    const options = {
        url: `${bundle.authData.website}/rest`,
        method: 'GET'
    };

    const result = await z.request(options);
    
    parseString(result.content, function (err, json) {
        const arr = json.service['app:workspace'];
        const workspaces = arr.filter(w => w['a10:title'][0]._ === 'Objects');
        if(workspaces.length > 0) {

            const objects = workspaces[0]['app:collection'];
            retVal = objects.map((obj, index) => {
                return {
                    name:  obj['a10:title'][0]._,
                    id: index
                }
            });

        }
        
    });

    return retVal;
}

module.exports = getAllRESTObjects;