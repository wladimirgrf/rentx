import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsAdminRoutes = Router();

const createCarController = new CreateCarController();

carsAdminRoutes.post("/", createCarController.handle);

export { carsAdminRoutes };
