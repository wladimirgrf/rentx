import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findActiveRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id, end_date: null });
  }

  async findActiveRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id, end_date: null });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async save(rental: Rental): Promise<Rental> {
    return this.repository.save(rental);
  }
}

export { RentalsRepository };
