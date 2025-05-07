import express from "express";
import thething from "../handler_models/listData.js";

const router = express.Router();

router.get("/thethings", thething.listenData);
router.get("/", (req, res) => {
  res.send("home devices");
});
export default router;
