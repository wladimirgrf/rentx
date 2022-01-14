const appFolder = process.env.NODE_ENV === "server" ? "dist" : "src";
const appFileExtensions = process.env.NODE_ENV === "server" ? "js" : "ts";


module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DATABASE_NAME,
  "migrations": [`./${appFolder}/shared/infra/typeorm/migrations/*.${appFileExtensions}`],
  "entities" : [`./${appFolder}/modules/**/infra/typeorm/entities/*.${appFileExtensions}`],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}