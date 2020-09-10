function handleErrors(response, z, bundle) {
    switch(response.status) {
        case 200:
        case 201:
            return response;
        case 401:
            throw new z.errors.Error(
                'The username and/or password you supplied is incorrect',
                'AuthenticationError',
                response.status
                );
            break;
        default: 
            throw new z.errors.Error(
                `Response status ${response.status}. Please check the Xperience Event Log`,
                'ResponseError',
                response.status
                );
    }
}

module.exports = handleErrors;
