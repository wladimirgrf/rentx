import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const date24hFromNow = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "445577",
      expected_return_date: date24hFromNow,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental for a user with an active rental", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "445577",
      expected_return_date: date24hFromNow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "787899",
        expected_return_date: date24hFromNow,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental for an active rental car", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "445577",
      expected_return_date: date24hFromNow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "994455",
        car_id: "445577",
        expected_return_date: date24hFromNow,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with a invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "994455",
        car_id: "445577",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
