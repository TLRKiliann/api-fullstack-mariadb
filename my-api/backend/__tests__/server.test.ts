//import request from "supertest";
//import app from "../server";
import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { createPool } from '../server';


let server: Express
beforeAll(async () => {
  server = await createPool()
})

/*
describe("User routes", () => {
  test("Get all users", async () => {
    const res = await request(app).get("/api/getAllMembers");
    expect(res.body).toEqual(["Goon", "Tsuki", "Joe"]);
  });
});
*/

describe('GET /', () => {
  it('should return 200 & valid response to authorization with fakeToken request', async => {
    request(server)
      .get(`/routes/meeting`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return (err)
        expect(res.body).toMatchObject({'message': 'Goodby'})
      })
  })
})

/*
describe("server.ts tests", () => {
  test("Math test", () => {
    expect(2 + 2).toBe(4);
  });
});
*/