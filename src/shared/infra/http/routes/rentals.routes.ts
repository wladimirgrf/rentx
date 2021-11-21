import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ReturnRentalController } from "@modules/rentals/useCases/returnRental/ReturnRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();

const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", createRentalController.handle);
rentalsRoutes.put("/return/:id", returnRentalController.handle);

rentalsRoutes.get("/user", listRentalsByUserController.handle);

export { rentalsRoutes };
