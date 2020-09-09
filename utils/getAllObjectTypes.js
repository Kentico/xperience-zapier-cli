//const { transform } = require('camaro');
const parseString = require('xml2js').parseString;

async function getAllRESTObjects(z, bundle) {
    let retVal = [];
    const options = {
        url: `${bundle.authData.website}/rest`,
        method: 'GET'
    };

    const response = await z.request(options);
    
    /* Hopefully we can use camaro soon, currently appears bugged
    const selector = `./service/app:workspace[./a10:title[contains(text(), 'Objects')]]/app:collection`;
    const template = [selector, {
        codename: 'a10:title'
    }];

    const json = await transform(response.content, template);
    z.console.log(json);
    */

    parseString(response.content, function (err, json) {
        
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