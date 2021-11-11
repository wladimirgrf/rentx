import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "445577",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental for a user with an active rental", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "445577",
      expected_return_date: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "787899",
        expected_return_date: new Date(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental for an active rental car", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "445577",
      expected_return_date: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "994455",
        car_id: "445577",
        expected_return_date: new Date(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
