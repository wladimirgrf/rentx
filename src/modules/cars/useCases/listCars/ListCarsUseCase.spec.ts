import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Jest",
      description: "Car jest Description",
      daily_rate: 50,
      license_plate: "TST-123",
      fine_amount: 10,
      brand: "Jest",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Jest",
      description: "Car jest Description",
      daily_rate: 50,
      license_plate: "TST-123",
      fine_amount: 10,
      brand: "Jest",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car Fake",
      description: "Car fake Description",
      daily_rate: 50,
      license_plate: "FAK-123",
      fine_amount: 10,
      brand: "Fake",
      category_id: "category_id_fake",
    });

    const cars = await listCarsUseCase.execute({ name: "Car Jest" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Jest",
      description: "Car jest Description",
      daily_rate: 50,
      license_plate: "TST-123",
      fine_amount: 10,
      brand: "Jest",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car Fake",
      description: "Car fake Description",
      daily_rate: 50,
      license_plate: "FAK-123",
      fine_amount: 10,
      brand: "Fake",
      category_id: "category_id_fake",
    });

    const cars = await listCarsUseCase.execute({ brand: "Jest" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Jest",
      description: "Car jest Description",
      daily_rate: 50,
      license_plate: "TST-123",
      fine_amount: 10,
      brand: "Jest",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car Fake",
      description: "Car fake Description",
      daily_rate: 50,
      license_plate: "FAK-123",
      fine_amount: 10,
      brand: "Fake",
      category_id: "category_id_fake",
    });

    const cars = await listCarsUseCase.execute({ category_id: "category_id" });

    expect(cars).toEqual([car]);
  });
});
