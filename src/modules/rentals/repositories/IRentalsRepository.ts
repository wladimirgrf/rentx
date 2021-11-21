import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findActiveRentalByCar(car_id: string): Promise<Rental>;
  findActiveRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  save(rental: Rental): Promise<Rental>;
}

export { IRentalsRepository };
