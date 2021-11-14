import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { createAdminUserQuery } from "@shared/infra/typeorm/seed/querys";

let connection: Connection;

describe("List Categories Controller", () => {
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

  it("should be able to list all categories", async () => {
    const user = {
      email: "admin@rentx.com",
      password: "password123",
    };
    const responseToken = await request(app).post("/sessions").send(user);

    const { token } = responseToken.body;

    const category = {
      name: "Category Supertest",
      description: "Description category supertest",
    };

    await request(app)
      .post("/categories")
      .send(category)
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toBe(category.name);
  });
});
