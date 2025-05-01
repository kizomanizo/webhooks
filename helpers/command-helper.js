/**
 * @file spawn-command.js
 * @version 1.0.0
 * @name SpawnCommand
 * @description This file contains the SpawnCommand class which provides methods to execute shell commands and handle their output and errors.
 * @author Kizito Mrema
 */

import { spawn } from "child_process";

import ErrorHelper from "./error-helper.js";
import ResponseHelper from "./response-helper.js";

/**
 * Class representing a command executor.
 */
class SpawnCommand {
  /**
   * Create a SpawnCommand instance.
   */
  constructor() {
    this.errorHelper = new ErrorHelper();
  }

  /**
   * Run a command with the specified arguments and working directory.
   * @param {string} command - The command to run.
   * @param {Array<string>} args - The list of string arguments.
   * @param {string} cwd - The current working directory of the child process.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
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

      // Send response to GitHub only once, clean and structured
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
