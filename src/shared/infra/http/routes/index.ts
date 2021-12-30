import { Router } from "express";

import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";
import { carsPublicRoutes, carsAdminRoutes } from "./cars.routes";
import { categoriesRoutes, categoriesAdminRoutes } from "./categories.routes";
import { passwordPublicRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersProtectedRoutes, usersPublicRoutes } from "./users.routes";

const routes = Router();

// PUBLIC ROUTES
routes.use(authenticateRoutes);
routes.use("/cars", carsPublicRoutes);
routes.use("/users", usersPublicRoutes);
routes.use("/password", passwordPublicRoutes);

routes.use(ensureAuthenticated);

// PROTECTED ROUTES
routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRoutes);
routes.use("/users", usersProtectedRoutes);
routes.use("/rentals", rentalsRoutes);

routes.use(ensureAdmin);

// ADMIN ROUTES
routes.use("/categories", categoriesAdminRoutes);
routes.use("/cars", carsAdminRoutes);

export { routes };
