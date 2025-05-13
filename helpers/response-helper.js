/**
 * @file response-helper.js
 * @version 1.0.1
 * @author Kizito Mrema
 * @description Provides a static method for formatting API responses.
 */

/**
 * @class ResponseHelper
 * @description Helper class for creating consistent API responses.
 */
class ResponseHelper {
  /**
   * @static
   * @async
   * @function api
   * @description Sends a formatted JSON API response.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @param {number} [status=200] - The HTTP status code to send.
   * @param {boolean} success - Indicates if the request was successful.
   * @param {string} message - A brief message describing the response.
   * @param {any} [payload=null] - The data to include in the response.
   * @returns {void}
   */
  static async api(req, res, status = 200, success, message, payload = null) {
    res.status(status).json({
      success: success,
      request: req.path,
      message: message,
      payload: payload,
    });
  }
}

export default ResponseHelper;
