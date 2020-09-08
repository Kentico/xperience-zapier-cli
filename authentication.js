const test = (z, bundle) =>
    z.request({ url: `${bundle.authData.website}/rest` });

const handleBadResponses = (response, z, bundle) => {
    if (response.status === 401) {
        throw new z.errors.Error(
        'The username and/or password you supplied is incorrect',
        'AuthenticationError',
        response.status
        );
    }

    return response;
};

const Authentication = {
    config: {
        type: 'basic',
        test,
        fields: [
            {
                label: 'Website base URL',
                key: 'website',
                type: 'string',
                required: true,
                helpText: 'The protocol and domain of your website, e.g. "https://xperience.io"'
            }
        ],
        connectionLabel: '{{bundle.authData.website}}'
    },
    befores: [],
    afters: [handleBadResponses],
};

module.exports = Authentication;
