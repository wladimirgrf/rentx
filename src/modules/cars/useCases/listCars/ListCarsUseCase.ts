import { IListCarsDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(data?: IListCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(data);

    return cars;
  }
}

export { ListCarsUseCase };
