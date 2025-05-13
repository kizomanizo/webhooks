/**
 * @file command-helper.js
 * @version 1.0.1
 * @author Kizito Mrema
 * @description Provides a class to execute shell commands.
 */

import { spawn } from "child_process";
import ErrorHelper from "./error-helper.js";
import ResponseHelper from "./response-helper.js";

/**
 * @class SpawnCommand
 * @description Executes shell commands.
 */
class SpawnCommand {
  /**
   * @constructor
   * @description Initializes the SpawnCommand with an ErrorHelper instance.
   */
  constructor() {
    this.errorHelper = new ErrorHelper();
  }

  /**
   * @function run
   * @description Executes a shell command.
   * @param {string} command - The command to execute.
   * @param {string[]} args - An array of command arguments.
   * @param {string} cwd - The working directory for the command.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   * @param {function} next - The Express next middleware function.
   * @returns {void}
   */
  run(command, args, cwd, req, res, next) {
    const process = spawn(command, args, { cwd, shell: true });
    let output = "";
    let errorOutput = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();
      console.error(data.toString());
    });

    process.on("close", (code) => {
      const message = `${command} exited with code ${code}`;
      console.log(message);
      if (code === 0) {
        ResponseHelper.api(req, res, 200, true, "Command executed successfully.", null);
      } else {
        ResponseHelper.api(req, res, 500, false, "Command failed.", { output, errorOutput });
      }
    });

    process.on("error", (err) => {
      console.error(`Spawn error: ${err.message}`);
      this.errorHelper.handleError(err, req, res, next);
    });
  }
}

export default SpawnCommand;
