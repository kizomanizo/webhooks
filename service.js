/**
 * @class Service
 * @description This class provides methods to handle updates triggered by webhook events, specifically for backend, frontend, and webhook deployments.
 * @author Kizito Mrema
 * @version 1.0.1
 */
import ErrorHelper from "./helpers/error-helper.js";
import ResponseHelper from "./helpers/response-helper.js";
import VerifySignature from "./helpers/signature-helper.js";
import SpawnCommand from "./helpers/command-helper.js";

class Service {
  /**
   * @constructor
   * @description Initializes the Service class with helper instances.
   */
  constructor() {
    /**
     * @private
     * @type {ErrorHelper}
     * @description Instance of the ErrorHelper class for handling errors.
     */
    this.errorHelper = new ErrorHelper();
    /**
     * @private
     * @type {ResponseHelper}
     * @description Instance of the ResponseHelper class for formatting API responses.
     */
    this.responseHelper = new ResponseHelper();
    /**
     * @private
     * @type {VerifySignature}
     * @description Instance of the VerifySignature class for verifying webhook signatures.
     */
    this.verifySignature = new VerifySignature();
    /**
     * @private
     * @type {SpawnCommand}
     * @description Instance of the SpawnCommand class for running shell commands.
     */
    this.spawnCommand = new SpawnCommand();
  }

  /**
   * @async
   * @function handleUpdate
   * @description Handles the update process based on the webhook request. It verifies the signature, checks the event type and target branch, and then executes the specified command.
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   * @param {function} next - The Express.js next middleware function.
   * @param {string} branchEnvVar - The name of the environment variable that holds the target branch name.
   * @param {string[]} commandArgs - An array of arguments to pass to the command.
   * @returns {Promise<void>}
   */
  async handleUpdate(req, res, next, branchEnvVar, commandArgs) {
    try {
      /**
       * Verify the signature of the webhook request.
       * @type {boolean}
       */
      if (!this.verifySignature.verify(req)) {
        return ResponseHelper.api(req, res, 401, false, "Unauthorized", null);
      }

      /**
       * The GitHub event type.
       * @type {string}
       */
      const event = req.get("X-GitHub-Event");
      console.log(`Received event for branch: ${req.body.ref}`);
      /**
       * Check if the event is a 'push' event and if the pushed branch matches the target branch from the environment variable.
       */
      if (event === "push" && req.body.ref === `refs/heads/${process.env[branchEnvVar]}`) {
        /**
         * Run the specified command.
         */
        this.spawnCommand.run("make", commandArgs, ".", req, res, next);
        console.log(`Running command: make ${commandArgs.join(" ")}`);
      } else {
        console.log(`Ignoring event: ${event} for branch: ${req.body.ref}`);
        ResponseHelper.api(req, res, 200, true, "Ignoring non-push or non-target branch event.", null);
      }
    } catch (err) {
      /**
       * Handle any errors that occur during the process.
       */
      this.errorHelper.handleError(err, req, res, next);
    }
  }

  /**
   * @async
   * @function backendUpdate
   * @description Handles updates specifically for the backend deployment. It calls the `handleUpdate` method with the backend-specific branch environment variable and command arguments.
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   * @param {function} next - The Express.js next middleware function.
   * @returns {Promise<void>}
   */
  async backendUpdate(req, res, next) {
    await this.handleUpdate(req, res, next, "BACKEND_BRANCH", ["deployBackend"]);
  }

  /**
   * @async
   * @function frontendUpdate
   * @description Handles updates specifically for the frontend deployment. It calls the `handleUpdate` method with the frontend-specific branch environment variable and command arguments.
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   * @param {function} next - The Express.js next middleware function.
   * @returns {Promise<void>}
   */
  async frontendUpdate(req, res, next) {
    await this.handleUpdate(req, res, next, "FRONTEND_BRANCH", ["deployFrontend"]);
  }

  /**
   * @async
   * @function webhooksUpdate
   * @description Handles updates specifically for the webhooks deployment. It calls the `handleUpdate` method with the webhooks-specific branch environment variable and command arguments.
   * @param {object} req - The Express.js request object.
   * @param {object} res - The Express.js response object.
   * @param {function} next - The Express.js next middleware function.
   * @returns {Promise<void>}
   */
  async webhooksUpdate(req, res, next) {
    await this.handleUpdate(req, res, next, "WEBHOOKS_BRANCH", ["deployWebhooks"]);
  }
}

export default Service;
