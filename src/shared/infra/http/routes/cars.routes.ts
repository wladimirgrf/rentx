import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const carsAdminRoutes = Router();
const carsPublicRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsPublicRoutes.get("/available", listAvailableCarsController.handle);

carsAdminRoutes.post(
  "/specifications/:id",
  createCarSpecificationController.handle
);

carsAdminRoutes.post(
  "/images/:id",
  upload.array("images"),
  uploadCarImagesController.handle
);

carsAdminRoutes.post("/", createCarController.handle);

export { carsAdminRoutes, carsPublicRoutes };
