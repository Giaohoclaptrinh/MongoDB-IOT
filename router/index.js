import handle from "../handler_models/handlers.js";

const main = function (app) {
  app.get("/", handle.home);
};

export default main;
