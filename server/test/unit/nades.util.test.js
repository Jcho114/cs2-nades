const server = require("../../server");
const request = require("supertest");
const mongoose = require("mongoose");

beforeEach(() => {
    console.log("before each test");
});

afterEach(() => {
    console.log("after each test");
});

afterAll(done => {
    console.log("tests done");
    server.close();
    mongoose.disconnect();
    done();
});

describe("GET /nades", () => {
    it("should return a list of documents and a status code 200", async () => {
        const res = await request(server).get("/nades");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(-1);
    });
});