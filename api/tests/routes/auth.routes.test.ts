import request from "supertest";
import { closeDatabase } from '../utils/db-handler'
import { extractCookies } from "../utils/extract-cookie";
import { app } from "../../src/index";

let cookieJWT: string[]

beforeAll(async () => {

  const resp = await request(app).post("/api/auth/signup")
    .set('Content-type', 'application/json')
    .send({ "name": "testjwt", "email": "jwttoken@hotmail.com", "password": "123456" });
  cookieJWT = resp.get('Set-Cookie')
})


afterAll(async () => {

  await closeDatabase()
});


describe("Signup", () => {

  test("Good Signup", async () => {

    const resp = await request(app).post("/api/auth/signup")
      .set('Content-type', 'application/json')
      .send({ "name": "testeu458", "email": "email_test@hotmail.com", "password": "123456" })
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual(expect.objectContaining({ "name": "testeu458", 'email': "email_test@hotmail.com", "password": null }))
  });

  test("Good Signup while being connected", async () => {

    const resp = await request(app).post("/api/auth/signup")
      .set('Content-type', 'application/json')
      .set('Cookie', cookieJWT)
      .send({ "name": "test25", "email": "email_test25@hotmail.com", "password": "123456" })
    expect(resp.statusCode).toBe(404)
    console.log(resp.body)
    expect(resp.body).toMatchObject({"errors":[{ field: "error", message: "Your are  logged in" }]})
  });

  test("Signup with wrong  password ", async () => {
    const payload = { "name": "testeu458sf", "email": "email_test147@hotmail.com", "password": "12345" }
    const resp = await request(app).post("/api/auth/signup")
      .set('Content-type', 'application/json')
      .send(payload)
    expect(resp.statusCode).toBe(404)
    expect(resp.body).toMatchObject({"errors": [{"field": "password", "message": "Le mot de passe doit être au minimum de 6 caractères"}]})
  });

  test("Signup whith doublon for the email", async () => {

    const resp = await request(app).post("/api/auth/signup")
      .set('Content-type', 'application/json')
      .send({ "name": "testeu458", "email": "email_test@hotmail.com", "password": "123456" })
    expect(resp.statusCode).toBe(404)
  });
});


describe("Login", () => {

  test("login", async () => {
    const resp = await request(app).post("/api/auth/login")
      .send({ "email": "jwttoken@hotmail.com", "password": "123456" })
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual(expect.objectContaining({ "name": "testjwt",'email': "jwttoken@hotmail.com", "password": null }))
  });
  test("login while being already connected ", async () => {
    const resp = await request(app).post("/api/auth/login")
      .set('Cookie', cookieJWT)
      .send({ "email": "jwttoken@hotmail.com", "password": "123456" })
    expect(resp.statusCode).toBe(404)
    expect(resp.body).toMatchObject({"errors": [{"field": "error", "message": "Your are  logged in"}]})
  });

  test("login wrong password ", async () => {
    const resp = await request(app).post("/api/auth/login")
      .send({ "email": "jwttoken@hotmail.com", "password": "1234s56" })
    expect(resp.statusCode).toBe(404)
    expect(resp.body).toMatchObject({"errors": [{"field": "password", "message": "Mauvais identifiants"}]})
  });

});

describe("logout", () => {


  test("logout ", async () => {
    const resp = await request(app).get("/api/auth/logout")
      .set('Cookie', cookieJWT)
      .send()
    expect(resp.statusCode).toBe(200)
    expect(extractCookies(resp.headers).jwt.value).toEqual("")
  });
  test("logout without being connected  ", async () => {
    const resp = await request(app).get("/api/auth/logout")
      .send()
    expect(resp.statusCode).toBe(404)
    expect(resp.body).toMatchObject({"errors":[{ field: "error", message: "Your are not logged in" }]})
  });

});


describe("me", () => {

  test("me with valid jwt token", async () => {
    const resp = await request(app).get("/api/auth/me")
      .set('Cookie', cookieJWT)
      .send()
    
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual(expect.objectContaining({ "name": "testjwt", 'email': "jwttoken@hotmail.com", "password": null }))
  });
  test("me without valid jwt token", async () => {
    const resp = await request(app).get("/api/auth/me")
      .send()
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual(null)
  });


});

