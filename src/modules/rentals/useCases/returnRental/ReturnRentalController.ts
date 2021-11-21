import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnRentalUseCase } from "./ReturnRentalUseCase";

class ReturnRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const returnRentalUseCase = container.resolve(ReturnRentalUseCase);

    const rental = await returnRentalUseCase.execute({ id, user_id });

    return response.json(rental);
  }
}

export { ReturnRentalController };
