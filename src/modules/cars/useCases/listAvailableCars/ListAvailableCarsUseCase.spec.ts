import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute();

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

    const cars = await listAvailableCarsUseCase.execute({ name: "Car Jest" });

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

    const cars = await listAvailableCarsUseCase.execute({ brand: "Jest" });

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

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car]);
  });
});
