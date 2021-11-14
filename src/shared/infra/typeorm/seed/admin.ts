import createConnection from "../index";
import { createAdminUserQuery } from "./querys";

async function create() {
  const connection = await createConnection("localhost");

  const query = await createAdminUserQuery();

  await connection.query(query);

  await connection.close;
}

create().then(() => {
  console.log("User admin created");
});
