import Service from "./service.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  async backendUpdate(req, res, next) {
    try {
      await this.service.backendUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  async frontendUpdate(req, res, next) {
    try {
      await this.service.frontendUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  async webhooksUpdate(req, res, next) {
    try {
      await this.service.webhooksUpdate(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default Controller;
