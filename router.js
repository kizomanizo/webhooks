import { Router } from "express";
import Controller from "./controller.js";

class MergedRouter {
  constructor() {
    this.router = Router();
    this.controller = new Controller();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Backend route
    this.router.post("/backend", (req, res, next) => this.controller.backendUpdate(req, res, next));

    // Frontend route
    this.router.post("/frontend", (req, res, next) => this.controller.frontendUpdate(req, res, next));

    // Webhooks route
    this.router.post("/webhooks", (req, res, next) => this.controller.webhooksUpdate(req, res, next));
  }

  getRouter() {
    return this.router;
  }
}

export default MergedRouter;
