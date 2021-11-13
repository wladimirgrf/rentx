import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

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

    const dateNow = this.dateProvider.dateNow();

    const compareDates = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareDates < minimumHour) {
      throw new AppError(
        "Expected return date must be more than 24 hours from now"
      );
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
