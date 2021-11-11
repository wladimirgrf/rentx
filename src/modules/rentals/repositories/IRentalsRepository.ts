import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findActiveRentalByCar(car_id: string): Promise<Rental>;
  findActiveRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
