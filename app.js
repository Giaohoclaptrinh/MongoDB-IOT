import express from "express";
import main from "./router/index.js";
import path, { join } from "path";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

main(app);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
