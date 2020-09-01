const triggerNoun = 'Catch Xperience Webhook'

const performHook = (z, bundle) => {
    // Enusre that the request came from the website
    // The Http-Xperience-Domain header will contain the site domain
    // and all aliases separated by semicolon
    const requestDomains = bundle.rawRequest.headers['Http-Xperience-Domain'].split(';');
    const authorizedDomain = bundle.authData.website.split('/')[2];

    if(requestDomains && !requestDomains.includes(authorizedDomain)) {
        throw new z.errors.HaltedError('Skipped, domain not matched.');
    }

    return [bundle.cleanedRequest];
}

const getHostname = (url) => {
    return new URL(url).hostname;
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
        type: 'hook',
        perform: performHook
    }
};
