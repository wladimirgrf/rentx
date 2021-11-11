import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findActiveRentalByCar(car_id: string): Promise<Rental>;
  findActiveRentalByUser(user_id: string): Promise<Rental>;

  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
