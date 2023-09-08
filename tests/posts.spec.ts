import { expect } from "chai";
import request from "supertest";
import { server } from "./utils";

describe("POST /api/posts", () => {
  let token: string;

  beforeEach((done) => {
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjZDM4ZmM1LTllOWMtNDQ0Zi1hNmQ5LWYwYzQ1N2Y0YjRjNSIsImVtYWlsIjoiamFuZWRvZUBnbWFpbC5jb20iLCJnZW5kZXIiOiJmZW1hbGUiLCJpYXQiOjE2OTM4NzA0MDR9.RYTZk5YM_Rd1KPtr9Ykuho2ERRV3UKgsF6BgOb-Vwtc";
    done();
  });
  context("when post body is ok", function () {
    it("should create a new post", (done) => {
      const newPost = {
        title: "This is a test post title.",
        post: "This is a test post content.",
      };

      request(server)
        .post("/v1/posts")
        .set("Authorization", `Bearer ${token}`)
        .send(newPost)
        .expect(201) // Expect HTTP status code 201 (Created)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("userId");
          expect(res.body.data).to.have.property("title");
          expect(res.body.data).to.have.property("post");
          expect(res.body.data.post).to.equal(newPost.post);
          expect(res.body.data.title).to.equal(newPost.title);
          done();
        });
    });
  });

  context("when post body is not ok", function () {
    it("should return an error for invalid input", (done) => {
      const invalidPost = {
        // Missing post content
      };

      request(server)
        .post("/v1/posts")
        .send(invalidPost)
        .set("Authorization", `Bearer ${token}`)
        .expect(400) // Expect HTTP status code 400 (Bad Request)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body contains an error message
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });

  context("if token is not provided in the request", function () {
    it("should return an error for unauthorized access", (done) => {
      const newPost = {
        title: "This is a test post title.",
        post: "This is a test post content.",
      };

      request(server)
        .post("/v1/posts")
        .send(newPost)
        .expect(401) // Expect HTTP status code 401 (Unauthorized)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body contains an error message
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });
});
