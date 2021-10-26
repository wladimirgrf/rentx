import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsAdminRoutes = Router();
const carsPublicRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsPublicRoutes.get("/available", listAvailableCarsController.handle);

carsAdminRoutes.post("/", createCarController.handle);

export { carsAdminRoutes, carsPublicRoutes };
