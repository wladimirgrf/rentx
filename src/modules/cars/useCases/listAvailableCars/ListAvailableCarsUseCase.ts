import { inject, injectable } from "tsyringe";

import { IListCarsDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data?: IListCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(data);

    return cars;
  }
}

export { ListAvailableCarsUseCase };
