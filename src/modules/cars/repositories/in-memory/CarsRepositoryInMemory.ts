import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarsDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(data?: IListCarsDTO): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => car.available);

    const cars = data
      ? carsAvailable.filter((car) => {
          const { category_id, brand, name } = data;

          return (
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id) ||
            (name && car.name === name)
          );
        })
      : carsAvailable;

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
