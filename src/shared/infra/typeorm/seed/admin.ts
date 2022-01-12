import createConnection from "..";

import { createAdminUserQuery } from "./querys";

async function create() {
  const connection = await createConnection();

  const query = await createAdminUserQuery();

  await connection.query(query);

  await connection.close();
}

create()
  .then(() => {
    console.log("User admin created");
  })
  .catch((error) => {
    console.log(error);
  });
