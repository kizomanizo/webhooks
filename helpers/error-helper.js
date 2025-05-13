/**
 * @file error-helper.js
 * @version 1.0.1
 * @author Kizito Mrema
 * @description Provides a class for handling and logging errors.
 */

import winston from "winston";

/**
 * @class ErrorHelper
 * @description Handles and logs application errors.
 */
class ErrorHelper {
  /**
   * @constructor
   * @description Initializes the ErrorHelper with a Winston logger.
   */
  constructor() {
    this.logger = winston.createLogger({
      level: "error",
      format: winston.format.json(),
      defaultMeta: { service: "express-app" },
      transports: [
        new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
        new winston.transports.Console({ level: "info" }),
      ],
    });
  }

  /**
   * @function handleError
   * @description Logs the error and sends an appropriate JSON response if headers have not been sent.
   * @param {Error} err - The error object.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   * @returns {void}
   */
  handleError(err, req, res, next) {
    this.logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (!res.headersSent) {
      res.status(err.statusCode || 500).json({ success: false, message: err.message, payload: null });
    } else {
      next(err);
    }
  }
}

export default ErrorHelper;
