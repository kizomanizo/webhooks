import Service from "./service.js";

/**
 * Controller class to manage update operations for backend, frontend, and webhooks.
 *
 * This class encapsulates operations for asynchronously updating different parts
 * of the application. If an error occurs during any of these operations, it is passed
 * to the next middleware for centralized error handling.
 *
 * @class Controller
 * @author Kizito Mrema
 * @version 1.0.1
 */
class Controller {
  constructor() {
    this.service = new Service();
  }

  /**
   * Performs a backend update.
   *
   * Calls the service to update backend data asynchronously. Errors during processing
   * are forwarded to the next middleware.
   *
   * @async
   * @function backendUpdate
   * @param {object} req - The request object containing parameters and body data.
   * @param {object} res - The response object used to send responses.
   * @param {Function} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>}
   */
  async backendUpdate(req, res, next) {
    try {
      await this.service.backendUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Performs a frontend update.
   *
   * Calls the associated service to update frontend data asynchronously. Any errors arising
   * during the update are passed to the next middleware.
   *
   * @async
   * @function frontendUpdate
   * @param {object} req - The request object containing parameters and body data.
   * @param {object} res - The response object used to send responses.
   * @param {Function} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>}
   */
  async frontendUpdate(req, res, next) {
    try {
      await this.service.frontendUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Performs a webhooks update.
   *
   * Initiates an asynchronous update for webhooks using the underlying service layer.
   * Errors during the process are handled by delegating them to the next middleware.
   *
   * @async
   * @function webhooksUpdate
   * @param {object} req - The request object, including webhook trigger details.
   * @param {object} res - The response object used for sending back the result.
   * @param {Function} next - The next middleware function in the Express chain.
   * @returns {Promise<void>}
   */
  async webhooksUpdate(req, res, next) {
    try {
      await this.service.webhooksUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default Controller;
