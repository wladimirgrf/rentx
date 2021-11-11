import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findActiveRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const activeRentalForUser =
      await this.rentalsRepository.findActiveRentalByUser(user_id);

    if (activeRentalForUser) {
      throw new AppError("There is an active rental for this user");
    }
  }
}

export { CreateRentalUseCase };
