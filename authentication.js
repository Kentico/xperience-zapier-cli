const ENDPOINT_PASSWORD_VALIDATE = 'cmsapi/Zapier/Authorize';

async function execute(z, bundle) {
    const result = await validatePassword(z, bundle);

    return result;
}

const validatePassword = async(z, bundle) => {
    const options = {
        url: `${bundle.authData.website}/${ENDPOINT_PASSWORD_VALIDATE}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: {
            'user': bundle.authData.user,
            'password': bundle.authData.password
        }
    };

    const response = await z.request(options);
    return response.status === 200;
}

const Authentication = {
    type: 'custom',
    test: execute,
    fields: [
        {
            label: 'Website base URL',
            key: 'website',
            type: 'string',
            required: true,
            helpText: 'The protocol and domain of your website, e.g. "https://xperience.io"'
        },
        {
            label: 'User name',
            key: 'user',
            type: 'string',
            required: true,
            helpText: 'The user name of an Xperience user with permissions to get and modify objects (ideally a Global Administrator)'
        },
        {
            label: 'Password',
            key: 'password',
            type: 'string',
            required: false,
            helpText: 'The password of the specified user'
        }
    ],
    connectionLabel: '{{bundle.authData.website}}'
};

module.exports = Authentication;
