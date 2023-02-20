import { describe, expect, test , it} from '@jest/globals';
const request = require("supertest");
// const expect = require("chai").expect;

const port = process.env.PORT;
//const staffRouter = require("../routers/staffs.router")
import App from "../index"


describe("Welcome Message", () => {
    it("Test/Welcome in API", async () => {
        const responseHomePath = await request(App).get("/");
        // console.log(responseHomePath.body)
        expect(responseHomePath.body).toEqual("Welcome to the Lopango Infos");
        expect(responseHomePath.statusCode).toBe(200);
    });
    // test("Racine router", async () => {
    //     const data = await App;
    //     console.log(data);
    //     //expect(data).toEqual("Welcome to the Lopango Infos")

    // })
    // test('test 3', () => console.log('test 3'));
});

