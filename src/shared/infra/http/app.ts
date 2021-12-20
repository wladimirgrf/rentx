import express from "express";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "@shared/container";

import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(errorHandler);

export { app };
