import { expect } from "chai";
import request from "supertest";
// import { app } from "../src/start";

describe("POST /api/users", () => {
  context("when request body for user creation is ok and email has not been taken", function () {
    it("should create a new user", (done) => {
      const newUser = {
        first_name: "Ben",
        last_name: "Jerome",
        gender: "male",
        email: "benjamin1@gmail.com",
        password: "password",
      };

      request("localhost:40121")
        .post("/v1/users")
        .send(newUser)
        .expect((res) => {
          // Expect either status code 201 (Created) or 409 (Conflict)
          expect(res.statusCode).to.be.oneOf([201, 409]);
        })
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          if (res.statusCode === 201) {
            // Ensure the response body and properties match the expected values for a successful creation
            expect(res.body.data).to.have.property("id");
            expect(res.body.data).to.have.property("first_name");
            expect(res.body.data).to.have.property("last_name");
            expect(res.body.data.first_name).to.equal(newUser.first_name);
            expect(res.body.data.last_name).to.equal(newUser.last_name);
          }
          done();
        });
    });
  });

  context("when request body for user creation is ok but email is already taken", function () {
    it("should return a conflict error", (done) => {
      const newUser = {
        first_name: "Ben",
        last_name: "Jerome",
        gender: "male",
        email: "benjamin@gmail.com",
        password: "password",
      };

      request("localhost:40121")
        .post("/v1/users")
        .send(newUser)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });

  context("when request body for login is ok", function () {
    it("should login user", (done) => {
      const payload = {
        email: "benjj@gmail.com",
        password: "password",
      };

      request("localhost:40121")
        .post("/v1/users/login")
        .send(payload)
        .expect(200) // Expect HTTP status code 201 (Created)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("first_name");
          expect(res.body.data).to.have.property("last_name");
          expect(res.body.data).to.have.property("token");
          expect(res.body.data.email).to.equal(payload.email);
          done();
        });
    });
  });

  context("when request body is not ok", function () {
    it("should return an error for invalid input", (done) => {
      const invalidPost = {
        // Missing post content
      };

      request("localhost:40121")
        .post("/v1/users/login")
        .send(invalidPost)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });

  context("when login credentials are not ok", function () {
    it("should deny access", (done) => {
      const payload = {
        email: "benjj@gmail.com",
        password: "wrongpassword",
      };

      request("localhost:40121")
        .post("/v1/users/login")
        .send(payload)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("Invalid Credentials!");
          done();
        });
    });
  });
});
