import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsAdminRoutes = Router();
const carsPublicRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsPublicRoutes.get("/available", listAvailableCarsController.handle);

carsAdminRoutes.post(
  "/specifications/:id",
  createCarSpecificationController.handle
);

carsAdminRoutes.post("/", createCarController.handle);

export { carsAdminRoutes, carsPublicRoutes };
