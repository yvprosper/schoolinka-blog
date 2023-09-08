import { expect } from "chai";
import request from "supertest";
import { server } from "./utils";

describe("POST /api/users", () => {
  context("User Signup", function () {
    it("should allow a user to sign up with a unique email", (done) => {
      const newUser = {
        firstName: "Ben",
        lastName: "Jerome",
        gender: "male",
        email: "benjaminunique@gmail.com", // use unique email
        password: "password",
      };

      request(server)
        .post("/v1/users")
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("firstName");
          expect(res.body.data).to.have.property("lastName");
          expect(res.body.data.firstName).to.equal(newUser.firstName);
          expect(res.body.data.lastName).to.equal(newUser.lastName);

          done();
        });
    });

    it("should throw a conflict error if the email already exists", (done) => {
      const existingUser = {
        firstName: "Ben",
        lastName: "Jerome",
        gender: "male",
        email: "johndoe@gmail.com", // use already existing email
        password: "password",
      };

      request(server)
        .post("/v1/users")
        .send(existingUser)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.statusCode).to.equal(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal("A User with this email already exist");
          done();
        });
    });
  });

  context("when request body for login is ok", function () {
    it("should login user", (done) => {
      const payload = {
        email: "johndoe@gmail.com",
        password: "password",
      };

      request(server)
        .post("/v1/users/login")
        .send(payload)
        .expect(200) // Expect HTTP status code 201 (Created)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("firstName");
          expect(res.body.data).to.have.property("lastName");
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

      request(server)
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
        email: "johndoe@gmail.com",
        password: "wrongpassword",
      };

      request(server)
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
