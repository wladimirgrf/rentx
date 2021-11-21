import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post("/", createRentalController.handle);
rentalsRoutes.put("/return/:id", returnRentalController.handle);

export { rentalsRoutes };
