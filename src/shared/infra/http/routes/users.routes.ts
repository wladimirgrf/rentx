import { Router, static as expressStatic } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersProtectedRoutes = Router();
const usersPublicRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersPublicRoutes.post("/", createUserController.handle);

usersPublicRoutes.use(
  "/avatar",
  expressStatic(`${uploadConfig.tmpFolder}/avatar`)
);

usersProtectedRoutes.get("/profile", profileUserController.handle);

usersProtectedRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersProtectedRoutes, usersPublicRoutes };
