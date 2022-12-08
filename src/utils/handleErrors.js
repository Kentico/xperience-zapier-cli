/**
 * Skips or throws errors for specific response statuses.
 *
 * @param {any} response The HTTP response.
 * @param {any} z Zapier context.
 * @returns {any} The response, if successful.
 */
module.exports = (response, z) => {
  switch (response.status) {
    case 200:
    case 201:
      return response;
    case 401:
      throw new z.errors.Error(
        'Please check your credentials, or the Xperience Event Log for more information',
        'AuthenticationError',
        response.status,
      );
    case 403:
      throw new z.errors.Error(
        'You are not authorized to perform this action. Please check the user\'s permissions and REST settings',
        'AuthorizationError',
        response.status,
      );
    case 404:
      response.skipThrowForStatus = true;
      return response;
    default:
      throw new z.errors.Error(
        `Response status ${response.status}. Please check the Xperience Event Log`,
        'ResponseError',
        response.status,
      );
  }
};
