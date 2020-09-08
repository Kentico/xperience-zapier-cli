async function getAllRESTObjects(z, bundle) {
    const options = {
        url: `${bundle.authData.website}/rest`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return await z.request(options);
}

module.exports = getAllRESTObjects;