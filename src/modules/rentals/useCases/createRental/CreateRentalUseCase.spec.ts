import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const date24hFromNow = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: date24hFromNow,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental for a user with an active rental", async () => {
    const carOne = await carsRepositoryInMemory.create({
      name: "Test One",
      description: "Car Test One",
      daily_rate: 100,
      license_plate: "test-123",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const carTwo = await carsRepositoryInMemory.create({
      name: "Test Two",
      description: "Car Test Two",
      daily_rate: 100,
      license_plate: "test-456",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await rentalsRepositoryInMemory.create({
      car_id: carOne.id,
      expected_return_date: date24hFromNow,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: carTwo.id,
        expected_return_date: date24hFromNow,
      })
    ).rejects.toEqual(new AppError("There is an active rental for this user"));
  });

  it("should not be able to create a new rental for an active rental car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await rentalsRepositoryInMemory.create({
      car_id: car.id,
      expected_return_date: date24hFromNow,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "994455",
        car_id: car.id,
        expected_return_date: date24hFromNow,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with a invalid return time", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "994455",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be more than 24 hours from now")
    );
  });
});
