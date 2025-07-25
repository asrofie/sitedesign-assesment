import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import errorHandler from "./middlewares/error.middleware";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import { apiCallLogger } from "./middlewares/logger.middleware";
import { sentErrorLog } from "./utils/logger";
process.on("uncaughtException", (err) => {
  sentErrorLog(null, err);
});
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(apiCallLogger);
app.use("/api/v1", routes);

let swaggerDocument: any = {
  openapi: "3.0.0",
  info: {},
  paths: {},
};

const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Site Design API",
};

if (process.env.NODE_ENV == "development") {
  const swaggerYamlPath = path.join(__dirname, "../docs/swagger/swagger.yaml");
  swaggerDocument = YAML.load(swaggerYamlPath);
} else {
  try {
    const jsonFile = path.join(__dirname, "swagger.json");
    console.log("Swagger docs updated", __dirname);
    swaggerDocument = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
    swaggerDocument.servers = [{ url: process.env.API_HOST }];
  } catch (err) {
    swaggerDocument = { openapi: "3.0.0", info: {}, paths: {} };
  }
  app.use(
    "/api/v1/api-docs",
    express.static(path.join(__dirname, "swagger-ui-dist")),
  );

  app.get("/api/v1/api-docs", (req, res) => {
    res.sendFile(path.join(__dirname, "swagger-ui-dist/index.html"));
  });

  app.get("/api/v1/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
  });
}

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions),
);

app.use(errorHandler);

export default app;
