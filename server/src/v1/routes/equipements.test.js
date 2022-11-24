const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

beforeAll(mongoConnect);

describe("GET /v1/equipements", () => {
  test("It should respond with status 200 success and return an array of equipment", async () => {
    const response = await request(app).get("/v1/equipements");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /v1/equipements/:equipementId", () => {
  test("It should respond with status 200 success and the equipment requested", async () => {
    //Create equipment to test
    const equipmentTest = await request(app).post("/v1/equipements").send({
      name: "Vélo de course",
      family: "vélo",
      condition: "bon état",
      price: 100,
      brand: "Décathlon",
      description: "Très peu servie.",
    });

    const response = await request(app).get(
      `/v1/equipements/${equipmentTest.body.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    // Delete creating equipment test
    await request(app).delete(`/v1/equipements/${equipmentTest.body.id}`);
  });
});

describe("POST /v1/equipements", () => {
  test("It should respond With status 201 and return the equipment created", async () => {
    const response = await request(app).post("/v1/equipements").send({
      name: "Vélo de course",
      family: "vélo",
      condition: "bon état",
      price: 100,
      brand: "Décathlon",
      description: "Très peu servie.",
    });
    expect(response.statusCode).toBe(201);
    expect(response.type).toBe("application/json");

    // Delete creating equipment test
    await request(app).delete(`/v1/equipements/${response.body.id}`);
  });

  test("It should respond with 400 status code", async () => {
    const response = await request(app).post("/v1/equipements").send({
      name: "Vélo de course",
      family: "vélo",
      condition: "bon état",
      price: 100,
      brand: "Décathlon",
      // Missing description property
    });
    expect(response.statusCode).toBe(400);
    expect(response.type).toBe("application/json");
    expect(response.body).toStrictEqual({ error: "Missing equipement data." });
  });
});

describe("DELETE /v1/equipements/:equipementId", () => {
  test("It should respond with status 200 success and the Equipment deleted message", async () => {
    //Create equipment to test
    const equipmentTest = await request(app).post("/v1/equipements").send({
      name: "Vélo de course",
      family: "vélo",
      condition: "bon état",
      price: 100,
      brand: "Décathlon",
      description: "Très peu servie.",
    });

    const response = await request(app).delete(
      `/v1/equipements/${equipmentTest.body.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toStrictEqual({ message: "Equipment deleted" });
  });

  test("It should respond with status 400 status code and the No equipement found. message", async () => {
    const response = await request(app).delete(`/v1/equipements/1`);
    expect(response.statusCode).toBe(400);
    expect(response.type).toBe("application/json");
    expect(response.body).toStrictEqual({ error: "No equipement found." });
  });
});

describe("PUT /v1/equipements/:equipementID", () => {
  test("It should respond with status 200 success and the Equipment successfuly updated. message", async () => {
    //Create equipment to test
    const equipmentTest = await request(app).post("/v1/equipements").send({
      name: "Vélo de course",
      family: "vélo",
      condition: "bon état",
      price: 100,
      brand: "Décathlon",
      description: "Très peu servie.",
    });

    const response = await request(app)
      .put(`/v1/equipements/${equipmentTest.body.id}`)
      .send({
        name: "Vtt",
        family: "vélo",
        condition: "bon état",
        price: 300,
        brand: "Décathlon",
        description: "Très peu servie.",
      });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toStrictEqual({
      message: "Equipment successfuly updated.",
    });

    // Delete creating equipment test
    await request(app).delete(`/v1/equipements/${equipmentTest.body.id}`);
  });

  test("It should respond with status 400 status code and the No equipement found. message", async () => {
    const response = await request(app).put(`/v1/equipements/1`).send({
      name: "Vtt",
      family: "vélo",
      condition: "bon état",
      price: 300,
      brand: "Décathlon",
      description: "Très peu servie.",
    });
    expect(response.statusCode).toBe(400);
    expect(response.type).toBe("application/json");
    expect(response.body).toStrictEqual({ error: "No equipement found." });
  });
});

afterAll(mongoDisconnect);
