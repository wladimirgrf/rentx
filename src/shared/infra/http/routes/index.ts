import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";
import { carsPublicRoutes, carsAdminRoutes } from "./cars.routes";
import { categoriesRoutes, categoriesAdminRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

// PUBLIC ROUTES
routes.use(authenticateRoutes);
routes.use("/cars", carsPublicRoutes);

routes.use(ensureAuthenticated);

// PROTECTED ROUTES
routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRoutes);
routes.use("/users", usersRoutes);

routes.use(ensureAdmin);

// ADMIN ROUTES
routes.use("/categories", categoriesAdminRoutes);
routes.use("/cars", carsAdminRoutes);

export { routes };
