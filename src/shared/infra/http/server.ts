import express from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";

import swaggerFile from "../../../swagger.json";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log("Server running");
});