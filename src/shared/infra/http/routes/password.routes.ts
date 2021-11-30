import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordPublicRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordPublicRoutes.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordPublicRoutes };
