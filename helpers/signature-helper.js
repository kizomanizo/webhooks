/**
 * @file signature-helper.js
 * @version 1.0.1
 * @author Kizito Mrema
 * @description Provides a class to verify GitHub webhook signatures.
 */

import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

/**
 * @class VerifySignature
 * @description Verifies the signature of a GitHub webhook request.
 */
class VerifySignature {
  /**
   * @constructor
   * @description Initializes the VerifySignature with the GitHub secret.
   */
  constructor() {
    /**
     * @private
     * @type {string | undefined}
     * @description The GitHub webhook secret retrieved from environment variables.
     */
    this.githubSecret = process.env.GITHUB_SECRET;
  }

  /**
   * @function verify
   * @description Verifies the signature of the GitHub webhook request.
   * @param {object} req - The Express request object.
   * @returns {boolean} - True if the signature is valid, false otherwise.
   */
  verify(req) {
    const signatureHeader = req.get("X-Hub-Signature-256");
    if (!signatureHeader) {
      console.error("Signature header is missing");
      return false;
    }

    const [algorithm, signature] = signatureHeader.split("=");
    if (algorithm !== "sha256") {
      console.error("Unsupported algorithm");
      return false;
    }

    const expectedSignature = crypto.createHmac("sha256", this.githubSecret).update(JSON.stringify(req.body)).digest("hex");

    // TODO: Remove console logs in production
    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", signature);
    console.log("GitHub Secret:", this.githubSecret);

    return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));
  }
}

export default VerifySignature;
