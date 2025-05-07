import handle from "../handler_models/handlers.js";
import router from "./controlsrouter.js";

const main = function (app) {
  app.use("/device", router);
  app.get("/", handle.home);
};

export default main;
