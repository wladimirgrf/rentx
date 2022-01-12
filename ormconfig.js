module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DATABASE_NAME,
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "entities" : ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}