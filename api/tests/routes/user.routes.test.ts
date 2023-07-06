import request from "supertest";
import { closeDatabase } from '../utils/db-handler'

import { app } from "../../src/index";

let cookieJWT: string[]

beforeAll(async () => {

    const resp = await request(app).post("/api/auth/signup")
        .set('Content-type', 'application/json')
        .send({ "name": "myname", "email": "jwttoken@hotmail.com", "password": "123456" });
    cookieJWT = resp.get('Set-Cookie')
})


afterAll(async () => {

    await closeDatabase()
});


describe("Update user ", () => {


    test("login after update", async () => {
        const respUpdate = await request(app).post("/api/user")
            .set('Cookie', cookieJWT)
            .send({ "email": "jwttokenupdated@hotmail.com", "name": "mynameupdated" })
            expect(respUpdate.statusCode).toBe(200)
        const resp = await request(app).post("/api/auth/login")
            .send({ "email": "jwttokenupdated@hotmail.com", "password": "123456" })
            expect(resp.statusCode).toBe(200)
            expect(resp.body).toEqual(expect.objectContaining({ "name": "mynameupdated", 'email': "jwttokenupdated@hotmail.com", "password": null }))
    });

    test("login after update password ", async () => {
        const respUpdate = await request(app).post("/api/user/password")
        .set('Cookie', cookieJWT)
        .send({ "password":"password" })
      
        expect(respUpdate.statusCode).toBe(200)
        
        const resp = await request(app).post("/api/auth/login")
      .send({ "email": "jwttokenupdated@hotmail.com", "password": "password" })
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual(expect.objectContaining({ "name": "mynameupdated",'email': "jwttokenupdated@hotmail.com", "password": null }))

    });

});