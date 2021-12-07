import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { createAdminUserQuery } from "@shared/infra/typeorm/seed/querys";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const query = await createAdminUserQuery();
    await connection.query(query);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const user = {
      email: "admin@rentx.com",
      password: "password123",
    };
    const responseToken = await request(app).post("/sessions").send(user);

    const { refresh_token } = responseToken.body;

    const category = {
      name: "Category Supertest",
      description: "Description category supertest",
    };

    const response = await request(app)
      .post("/categories")
      .send(category)
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with an existing name", async () => {
    const user = {
      email: "admin@rentx.com",
      password: "password123",
    };
    const responseToken = await request(app).post("/sessions").send(user);

    const { refresh_token } = responseToken.body;

    const category = {
      name: "Category Supertest",
      description: "Description category supertest",
    };

    const response = await request(app)
      .post("/categories")
      .send(category)
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
