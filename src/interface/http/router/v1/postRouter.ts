import express from "express";
import { makeInvoker } from "awilix-express";
import PostController from "../../controllers/PostController";
import { verifyToken } from "../../middlewares/verifyToken";

const api = makeInvoker(PostController);
const router = express.Router();

/**
   * @api {post} /v1/posts Create a Post
   * @apiGroup Posts
   * @apiDescription This endpoint creates a post
   * @apiName createPost
   * @apiVersion 1.0.0
   * @apiParam (Body) {String} title                  title of the post
   * @apiParam (Body) {String} post                   content of the post
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 CREATED
   *     {
    "success": true,
    "statusCode": 201,
    "message": "Posts created successfully!",
    "data": {
                "id": "25899782-239f-48ec-9da5-6126dc04fdcd",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T21:42:23.946Z",
                "updatedAt": "2023-09-06T21:42:23.946Z"            
            },
    "links": [],
    "name": ""
    }
   *
   * @apiParamExample Sample Request:
   *    {
   *         "title": "This is a test post title.",
   *         "post": "This is a test post content."
   *    }
   * 
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiUse BadRequestError
   * @apiUse UnauthorizedError
   */

/* '/v1/posts` */

/**
   * @api {get} /v1/posts Get all Posts
   * @apiGroup Posts
   * @apiDescription This endpoint return all posts
   * @apiName getPosts
   * @apiVersion 1.0.0
   * @apiParam (Query) {Number} [page = 1]                  Page to display.
   * @apiParam (Query) {Number} [limit = 20]                Number of documents to return per page.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Posts retrieved successfully!",
    "data": {
        "items": [
            {
                "id": "25899782-239f-48ec-9da5-6126dc04fdcd",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T21:42:23.946Z",
                "updatedAt": "2023-09-06T21:42:23.946Z"
            },
            {
                "id": "9b959593-e4e7-47eb-91eb-be09dd45c44c",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T18:42:39.620Z",
                "updatedAt": "2023-09-06T18:42:39.620Z"
            },
            {
                "id": "faee0a0c-c06f-4051-9ad9-933a42b98213",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T18:42:06.558Z",
                "updatedAt": "2023-09-06T18:42:06.558Z"
            },
            {
                "id": "c6de3483-e9f7-4afd-9e59-36880ff316f8",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-06T18:18:06.959Z",
                "updatedAt": "2023-09-06T18:18:06.959Z"
            },
            {
                "id": "b362046d-5d3d-4440-8793-34ebc0fa14d8",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-06T16:58:12.886Z",
                "updatedAt": "2023-09-06T16:58:12.886Z"
            },
            {
                "id": "c2779f7f-9922-4851-9c16-a7b283d0b768",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-05T01:50:24.849Z",
                "updatedAt": "2023-09-05T01:50:24.849Z"
            },
            {
                "id": "849bfc18-7806-4cf8-997e-145868e4371e",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Tiktok people are funny!!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-05T00:13:39.889Z",
                "updatedAt": "2023-09-05T00:19:37.349Z"
            },
            {
                "id": "c6e4e893-434d-47d2-9770-b52e6f5f9f0a",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Facebook people are funny!!!",
                "post": "very funny posts from very funny people",
                "createdAt": "2023-09-04T23:34:24.552Z",
                "updatedAt": "2023-09-04T23:34:24.552Z"
            },
            {
                "id": "869b5619-0a31-4749-ac78-2191dc9c4523",
                "userId": "175825cd-660f-4822-8946-411ca18c55df",
                "title": "Twitter people are funny!!!",
                "post": "very funny posts from very funny people",
                "createdAt": "2023-09-04T23:07:06.631Z",
                "updatedAt": "2023-09-04T23:07:06.631Z"
            },
            {
                "id": "deecfb79-33c3-47c9-bdce-4b187fa46326",
                "userId": "175825cd-660f-4822-8946-411ca18c55df",
                "title": "Twitter people are funny!!!",
                "post": "this is another test post",
                "createdAt": "2023-09-04T22:51:04.369Z",
                "updatedAt": "2023-09-04T22:51:04.369Z"
            }
        ],
        "pagination": {
            "totalDocs": 10,
            "perPage": 20,
            "currentPage": 1,
            "totalPages": 1,
            "serialNo": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": null,
            "nextPage": null
        }
    },
    "links": [],
    "name": ""
    }
   *
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiUse UnauthorizedError
   * 
   */

/* '/v1/posts` */
router.route("/").get(verifyToken, api("getAllPosts")).post(verifyToken, api("create"));

/**
   * @api {get} /v1/posts/search Search Posts
   * @apiGroup Posts
   * @apiDescription This endpoint search and filters posts, returns all posts if no query is passed
   * @apiName searchPosts
   * @apiVersion 1.0.0
   * @apiParam (Query) {Number} [page = 1]                  Page to display.
   * @apiParam (Query) {Number} [limit = 20]                Number of documents to return per page.
   * @apiParam (Query) {String} [keyword]                   Search posts by title or post content
   * @apiParam (Query) {String} [startDate]                 Filter posts by date created.
   * @apiParam (Query) {String} [endDate]                   Filter posts by date created.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Posts retrieved successfully!",
    "data": {
        "items": [
            {
                "id": "25899782-239f-48ec-9da5-6126dc04fdcd",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T21:42:23.946Z",
                "updatedAt": "2023-09-06T21:42:23.946Z"
            },
            {
                "id": "9b959593-e4e7-47eb-91eb-be09dd45c44c",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T18:42:39.620Z",
                "updatedAt": "2023-09-06T18:42:39.620Z"
            },
            {
                "id": "faee0a0c-c06f-4051-9ad9-933a42b98213",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T18:42:06.558Z",
                "updatedAt": "2023-09-06T18:42:06.558Z"
            },
            {
                "id": "c6de3483-e9f7-4afd-9e59-36880ff316f8",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-06T18:18:06.959Z",
                "updatedAt": "2023-09-06T18:18:06.959Z"
            },
            {
                "id": "b362046d-5d3d-4440-8793-34ebc0fa14d8",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-06T16:58:12.886Z",
                "updatedAt": "2023-09-06T16:58:12.886Z"
            },
            {
                "id": "c2779f7f-9922-4851-9c16-a7b283d0b768",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-05T01:50:24.849Z",
                "updatedAt": "2023-09-05T01:50:24.849Z"
            },
            {
                "id": "849bfc18-7806-4cf8-997e-145868e4371e",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Tiktok people are funny!!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-05T00:13:39.889Z",
                "updatedAt": "2023-09-05T00:19:37.349Z"
            },
            {
                "id": "c6e4e893-434d-47d2-9770-b52e6f5f9f0a",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Facebook people are funny!!!",
                "post": "very funny posts from very funny people",
                "createdAt": "2023-09-04T23:34:24.552Z",
                "updatedAt": "2023-09-04T23:34:24.552Z"
            },
            {
                "id": "869b5619-0a31-4749-ac78-2191dc9c4523",
                "userId": "175825cd-660f-4822-8946-411ca18c55df",
                "title": "Twitter people are funny!!!",
                "post": "very funny posts from very funny people",
                "createdAt": "2023-09-04T23:07:06.631Z",
                "updatedAt": "2023-09-04T23:07:06.631Z"
            },
            {
                "id": "deecfb79-33c3-47c9-bdce-4b187fa46326",
                "userId": "175825cd-660f-4822-8946-411ca18c55df",
                "title": "Twitter people are funny!!!",
                "post": "this is another test post",
                "createdAt": "2023-09-04T22:51:04.369Z",
                "updatedAt": "2023-09-04T22:51:04.369Z"
            }
        ],
        "pagination": {
            "totalDocs": 10,
            "perPage": 20,
            "currentPage": 1,
            "totalPages": 1,
            "serialNo": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": null,
            "nextPage": null
        }
    },
    "links": [],
    "name": ""
    }
   *
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiUse UnauthorizedError
   * 
   */

/* '/v1/posts/search` */
router.get("/search", verifyToken, api("searchAndFilter"));

/**
   * @api {get} /v1/posts/:postId Get one Post
   * @apiGroup Posts
   * @apiDescription This endpoint return one post
   * @apiName getPost
   * @apiVersion 1.0.0
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Post retrieved successfully!",
    "data": {
                "id": "25899782-239f-48ec-9da5-6126dc04fdcd",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T21:42:23.946Z",
                "updatedAt": "2023-09-06T21:42:23.946Z"            
            },
    "links": [],
    "name": ""
    }
   *
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiUse NotFoundError
   * 
   * @apiUse UnauthorizedError
   */

/* '/v1/posts/:postId` */

/**
   * @api {put} /v1/posts/:postId Update Post
   * @apiGroup Posts
   * @apiDescription This endpoint updates a post
   * @apiName updatePost
   * @apiVersion 1.0.0
   * @apiParam (Body) {String} title                  title of the post
   * @apiParam (Body) {String} post                   content of the post
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 201,
    "message": "Posts updated successfully!",
    "data": {
                "id": "25899782-239f-48ec-9da5-6126dc04fdcd",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title update.",
                "post": "This is a test post content update.",
                "createdAt": "2023-09-06T21:42:23.946Z",
                "updatedAt": "2023-09-06T21:42:23.946Z"            
    },
    "links": [],
    "name": ""
    }
   *
   * @apiParamExample Sample Request:
   *    {
   *         "title": "This is a test post title update.",
   *         "post": "This is a test post content update."
   *    }
   * 
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiUse UnauthorizedError
   * @apiUse BadRequestError
   * @apiUse NotFoundError
   */

/* '/v1/posts/:postId` */

/**
   * @api {delete} /v1/posts/:postId Delete Post
   * @apiGroup Posts
   * @apiDescription This endpoint deletes a post
   * @apiName deletePost
   * @apiVersion 1.0.0
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Post deleted successfully!",
    "data": 1,
    "links": [],
    "name": ""
    }
   *
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiUse UnauthorizedError
   * 
   * @apiUse NotFoundError
   */

/* '/v1/posts/:postId` */

router
  .route("/:postId")
  .get(verifyToken, api("get"))
  .put(verifyToken, api("update"))
  .delete(verifyToken, api("delete"));

/**
   * @api {get} /v1/posts/user/:userId Get all User Posts
   * @apiGroup Posts
   * @apiDescription This endpoint return all User posts
   * @apiName getUserPosts
   * @apiVersion 1.0.0
   * @apiParam (Query) {Number} [page = 1]                  Page to display.
   * @apiParam (Query) {Number} [limit = 20]                Number of documents to return per page.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "User Posts retrieved successfully!",
    "data": {
        "items": [
            {
                "id": "25899782-239f-48ec-9da5-6126dc04fdcd",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T21:42:23.946Z",
                "updatedAt": "2023-09-06T21:42:23.946Z"
            },
            {
                "id": "9b959593-e4e7-47eb-91eb-be09dd45c44c",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T18:42:39.620Z",
                "updatedAt": "2023-09-06T18:42:39.620Z"
            },
            {
                "id": "faee0a0c-c06f-4051-9ad9-933a42b98213",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "This is a test post title.",
                "post": "This is a test post content.",
                "createdAt": "2023-09-06T18:42:06.558Z",
                "updatedAt": "2023-09-06T18:42:06.558Z"
            },
            {
                "id": "c6de3483-e9f7-4afd-9e59-36880ff316f8",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-06T18:18:06.959Z",
                "updatedAt": "2023-09-06T18:18:06.959Z"
            },
            {
                "id": "b362046d-5d3d-4440-8793-34ebc0fa14d8",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-06T16:58:12.886Z",
                "updatedAt": "2023-09-06T16:58:12.886Z"
            },
            {
                "id": "c2779f7f-9922-4851-9c16-a7b283d0b768",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Gamers people are funny!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-05T01:50:24.849Z",
                "updatedAt": "2023-09-05T01:50:24.849Z"
            },
            {
                "id": "849bfc18-7806-4cf8-997e-145868e4371e",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Tiktok people are funny!!!",
                "post": "very funny posts from very funny people should update",
                "createdAt": "2023-09-05T00:13:39.889Z",
                "updatedAt": "2023-09-05T00:19:37.349Z"
            },
            {
                "id": "c6e4e893-434d-47d2-9770-b52e6f5f9f0a",
                "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "title": "Facebook people are funny!!!",
                "post": "very funny posts from very funny people",
                "createdAt": "2023-09-04T23:34:24.552Z",
                "updatedAt": "2023-09-04T23:34:24.552Z"
            },
            {
                "id": "869b5619-0a31-4749-ac78-2191dc9c4523",
                "userId": "175825cd-660f-4822-8946-411ca18c55df",
                "title": "Twitter people are funny!!!",
                "post": "very funny posts from very funny people",
                "createdAt": "2023-09-04T23:07:06.631Z",
                "updatedAt": "2023-09-04T23:07:06.631Z"
            },
            {
                "id": "deecfb79-33c3-47c9-bdce-4b187fa46326",
                "userId": "175825cd-660f-4822-8946-411ca18c55df",
                "title": "Twitter people are funny!!!",
                "post": "this is another test post",
                "createdAt": "2023-09-04T22:51:04.369Z",
                "updatedAt": "2023-09-04T22:51:04.369Z"
            }
        ],
        "pagination": {
            "totalDocs": 10,
            "perPage": 20,
            "currentPage": 1,
            "totalPages": 1,
            "serialNo": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prevPage": null,
            "nextPage": null
        }
    },
    "links": [],
    "name": ""
    }
   *
   * @apiUse UnauthorizedError
   *
   * @apiHeader {String} authorization Users bearer access token.
   * 
   * @apiErrorExample Bad Request Error Response:

    HTTP/1.1 400 BadRequest
    {
      "success": false,
      "statusCode": 400,
      "message": "User id is required",
      "name": "BadRequest",
      "data": {}
    }
   *
   * @apiErrorExample Not Found Error Response:

    HTTP/1.1 404 NotFound
    {
      "success": false,
      "statusCode": 404,
      "message": "User not found",
      "name": "NotFound",
      "data": {}
    }
    *
   */

/* '/v1/posts/user/:userId` */
router.get("/user/:userId", verifyToken, api("getAllUserPosts"));

export default router;
