import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import { createServer as createViteServer } from "vite";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/pages"));

app.use(bodyParser.urlencoded({ extended: true }));

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: "html" },
    root: path.join(__dirname, "src"),
  });

  app.use(vite.middlewares);

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

createServer();
