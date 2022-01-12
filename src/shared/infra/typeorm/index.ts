import { createConnection, getConnectionOptions, Connection } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const database =
    process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database;

  return createConnection(Object.assign(defaultOptions, { database }));
};
