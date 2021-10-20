import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const carData = {
      name: "Car Name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    const car = await createCarUseCase.execute(carData);

    expect(car).toHaveProperty("id");
    expect(car).toEqual(expect.objectContaining(carData));
  });

  it("should not be able to create a car with an existing license plate", async () => {
    const car1 = {
      name: "Car 1",
      description: "Car 1 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    await createCarUseCase.execute(car1);

    const car2 = {
      name: "Car 2",
      description: "Car 2 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    await expect(createCarUseCase.execute(car2)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
