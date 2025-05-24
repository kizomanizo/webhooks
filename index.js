/**
 * @file server.js
 * @version 1.0.1
 * @author Kizito Mrema
 * @description Entry point for the Express server application.
 */

import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });
import bodyParser from "body-parser";

import ErrorHelper from "./helpers/error-helper.js";
import Router from "./router.js";

/**
 * @class Server
 * @description Represents the Express server.
 */
class Server {
  /**
   * @constructor
   * @description Initializes the server with middleware, error handling, and routes.
   */
  constructor() {
    this.app = express();
    this.port = process.env.NODE_PORT || 3011;
    this.initializeMiddleware();
    this.initializeErrorHandling();
    this.initializeRouteHandling();
  }

  /**
   * @private
   * @function initializeMiddleware
   * @description Configures the application-level middleware.
   * @returns {void}
   */
  initializeMiddleware() {
    this.app.disable("x-powered-by");
    // this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  /**
   * @private
   * @function initializeErrorHandling
   * @description Sets up global error handling middleware.
   * @returns {void}
   */
  initializeErrorHandling() {
    const errorHelperInstance = new ErrorHelper();
    this.app.use(errorHelperInstance.handleError);
  }

  /**
   * @private
   * @function initializeRouteHandling
   * @description Configures the API routes and health check endpoint.
   * @returns {void}
   */
  initializeRouteHandling() {
    const router = new Router();
    this.app.use("/api/v1", router.getRouter());
    this.app.use("/health", (_req, res) => res.status(200).json({ status: "ok", up: true }));
  }

  /**
   * @function start
   * @description Starts the Express server and listens on the specified port.
   * @returns {void}
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`INFO: Service ${process.env.SERVICE_NAME?.toUpperCase()} is listening on ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
