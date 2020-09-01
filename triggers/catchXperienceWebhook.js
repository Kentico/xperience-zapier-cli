const triggerNoun = 'Catch Xperience Webhook'

const performHook = (z, bundle) => {
    // Enusre that the request came from the website
    const requestDomain = bundle.rawRequest.headers['Http-Xperience-Domain'];
    if(requestDomain && bundle.inputData.domain !== requestDomain) {
        throw new z.errors.HaltedError('Skipped, domain not matched.');
    }

    return [bundle.cleanedRequest];
}

module.exports = {
    key: 'catch_xperience_webhook',
    noun: triggerNoun,
    display: {
        important: true,
        label: triggerNoun,
        description: 'Triggers when your Xperience website sends a webhook to Zapier'
    },
    operation: {
        inputFields: [
            {
                label: 'Website domain',
                helpText: 'Enter your site\'s domain without protocol, e.g. xperience.io',
                required: true,
                key: 'domain',
                type: 'string',
            }
        ],
        type: 'hook',
        perform: performHook
    }
};
