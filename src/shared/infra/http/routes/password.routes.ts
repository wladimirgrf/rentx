import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordPublicRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordPublicRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordPublicRoutes.post("/reset", resetPasswordController.handle);

export { passwordPublicRoutes };
