import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

async function createAdminUserQuery(): Promise<string> {
  const id = uuidv4();
  const password = await hash("password123", 8);

  const query = `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
  values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'ABC88765', 'now()')`;

  return query;
}

export { createAdminUserQuery };
