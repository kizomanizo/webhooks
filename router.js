import { Router } from "express";
import Controller from "./controller.js";

/**
 * @class MergedRouter
 * @description This class creates and manages a merged router for handling webhook update requests for different services (backend, frontend, webhooks).
 */
class MergedRouter {
  /**
   * @constructor
   * @description Initializes the MergedRouter by creating an Express Router instance, a Controller instance, and then initializing the routes.
   */
  constructor() {
    /**
     * @private
     * @type {Router}
     * @description The Express Router instance used to define the API endpoints.
     */
    this.router = Router();
    /**
     * @private
     * @type {Controller}
     * @description An instance of the Controller class that handles the logic for the update requests.
     */
    this.controller = new Controller();
    /**
     * @private
     * @function initializeRoutes
     * @description Sets up the API routes for backend, frontend, and webhook updates.
     * @returns {void}
     */
    this.initializeRoutes();
  }

  /**
   * @function initializeRoutes
   * @description Defines the POST routes for triggering backend, frontend, and webhooks updates. Each route is associated with a corresponding method in the Controller.
   * @returns {void}
   */
  initializeRoutes() {
    /**
     * @route POST /backend
     * @description Route for triggering a backend update. Calls the `backendUpdate` method of the Controller.
     * @param {express.Request} req - The Express request object.
     * @param {express.Response} res - The Express response object.
     * @param {express.NextFunction} next - The next middleware function.
     */
    this.router.post("/backend", (req, res, next) => this.controller.backendUpdate(req, res, next));

    /**
     * @route POST /frontend
     * @description Route for triggering a frontend update. Calls the `frontendUpdate` method of the Controller.
     * @param {express.Request} req - The Express request object.
     * @param {express.Response} res - The Express response object.
     * @param {express.NextFunction} next - The next middleware function.
     */
    this.router.post("/frontend", (req, res, next) => this.controller.frontendUpdate(req, res, next));

    /**
     * @route POST /webhooks
     * @description Route for triggering a webhooks update. Calls the `webhooksUpdate` method of the Controller.
     * @param {express.Request} req - The Express request object.
     * @param {express.Response} res - The Express response object.
     * @param {express.NextFunction} next - The next middleware function.
     */
    this.router.post("/webhooks", (req, res, next) => this.controller.webhooksUpdate(req, res, next));
  }

  /**
   * @function getRouter
   * @description Returns the configured Express Router instance.
   * @returns {Router} The Express Router.
   */
  getRouter() {
    return this.router;
  }
}

export default MergedRouter;
