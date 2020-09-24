const triggerNoun = 'Catch Xperience Webhook'

const performHook = (z, bundle) => {
    return [bundle.cleanedRequest];
}

module.exports = {
    key: 'catch_xperience_webhook',
    noun: triggerNoun,
    display: {
        important: true,
        label: triggerNoun,
        description: 'Triggers when your Xperience website sends a webhook to Zapier.'
    },
    operation: {
        type: 'hook',
        perform: performHook
    }
};
