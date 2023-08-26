import { expect } from "chai";
import request from "supertest";
// import { app } from "../src/start";

describe("POST /api/posts", () => {
  let token: string;
  const postId: number = 1;

  beforeEach((done) => {
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZmlyc3RfbmFtZSI6IkJlbiIsImxhc3RfbmFtZSI6Ikplcm9tZSIsImVtYWlsIjoiYmVuampAZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsImlhdCI6MTY5MzA3MjI0Mn0.w7KuTvZ4dsEndqHrLkF4HBYAVPzkbJw_jPQBRhHhuOE";
    done();
  });
  context("when post body is ok", function () {
    it("should create a new post", (done) => {
      const newPost = {
        post: "This is a test post content.",
      };

      request("localhost:40121")
        .post("/v1/posts")
        .set("Authorization", `Bearer ${token}`)
        .send(newPost)
        .expect(201) // Expect HTTP status code 201 (Created)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body and properties match the expected values
          expect(res.body.data[0]).to.have.property("postid");
          expect(res.body.data[0]).to.have.property("userid");
          expect(res.body.data[0].post).to.equal(newPost.post);
          done();
        });
    });
  });

  context("when post body is not ok", function () {
    it("should return an error for invalid input", (done) => {
      const invalidPost = {
        // Missing post content
      };

      request("localhost:40121")
        .post("/v1/posts")
        .send(invalidPost)
        .set("Authorization", `Bearer ${token}`)
        .expect(400) // Expect HTTP status code 400 (Bad Request)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body contains an error message
          expect(res.body.status).to.equal(undefined);
          done();
        });
    });
  });

  context("if the post exists", function () {
    it("should add a comment to the post", (done) => {
      const newComment = {
        comment: "this is a test comment",
      };

      request("localhost:40121")
        .post(`/v1/posts/${postId}/comment`)
        .send(newComment)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body contains an error message
          expect(res.body).have.keys(["status", "data"]);
          expect(res.body.data[0]).have.keys([
            "commentid",
            "postid",
            "userid",
            "comment",
            "created_on",
          ]);
          expect(res.body.status).to.equal("success");
          done();
        });
    });
  });

  context("if token is not provided in therequest", function () {
    it("should return an error for unauthorized access if token is not provided", (done) => {
      const newPost = {
        post: "This is a test post content.",
      };

      request("localhost:40121")
        .post("/v1/posts")
        .send(newPost)
        .expect(401) // Expect HTTP status code 401 (Unauthorized)
        .end((err, res) => {
          if (err) return done(err);
          // Ensure the response body contains an error message
          expect(res.body.status).to.equal(undefined);
          done();
        });
    });
  });
});
