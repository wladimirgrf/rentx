import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUserCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatar_file = null;

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).json();
  }
}

export { UpdateUserAvatarController };
