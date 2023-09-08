import express from "express";
import { makeInvoker } from "awilix-express";
import UserController from "../../controllers/UserController";
import { verifyToken } from "../../middlewares/verifyToken";

const api = makeInvoker(UserController);
const router = express.Router();

/**
   * @api {post} /v1/users/login Login a User
   * @apiGroup Users
   * @apiDescription This endpoint logs in a user
   * @apiName loginUser
   * @apiVersion 1.0.0
   * @apiParam (Body) {String} email                  user email
   * @apiParam (Body) {String} password               user password
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully!",
    "data": {
        "id": "175825cd-660f-4822-8946-411ca18c55df",
        "firstName": "Oluwa",
        "lastName": "Jerome",
        "gender": "male",
        "email": "johndoe@gmail.com",
        "createdAt": "2023-09-04T18:27:27.660Z",
        "updatedAt": "2023-09-04T23:50:44.144Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NTgyNWNkLTY2MGYtNDgyMi04OTQ2LTQxMWNhMThjNTVkZiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJnZW5kZXIiOiJtYWxlIiwiaWF0IjoxNjk0MDExNjkwfQ.fq8sCnYGAa2tQoZl_iJf4fx7n4gKroRsM2sp-16FNZE"
    },
    "links": [],
    "name": ""
    }
   *
   * @apiParamExample Sample Request:
   *    {
   *         "email": "johndoe@gmail.com",
   *         "password": "password"
   *    }
   * 
   * 
   * @apiUse BadRequestError
   * 
   * @apiUse UnauthorizedError
   * 
   */

/* '/v1/users/login` */
router.post("/login", api("login"));

/**
   * @api {get} /v1/users/search Search Users
   * @apiGroup Users
   * @apiDescription This endpoint search and filters users, returns all users if no query is passed
   * @apiName searchUsers
   * @apiVersion 1.0.0
   * @apiParam (Query) {Number} [page = 1]                  Page to display.
   * @apiParam (Query) {Number} [limit = 20]                Number of documents to return per page.
   * @apiParam (Query) {String} [name]                      Search users by name
   * @apiParam (Query) {String} [startDate]                 Filter users by date created.
   * @apiParam (Query) {String} [endDate]                   Filter users by date created.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Users retrieved successfully!",
    "data": {
        "items": [
            {
                "id": "9eb8bb4b-f638-40e6-9e8f-4883355996dd",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1keyllyau@gmail.com",
                "createdAt": "2023-09-06T14:30:16.945Z",
                "updatedAt": "2023-09-06T14:30:16.945Z",
                "posts": []
            },
            {
                "id": "05e2aafe-317c-440a-a663-48a428780cc4",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1keyllyu@gmail.com",
                "createdAt": "2023-09-06T13:14:31.227Z",
                "updatedAt": "2023-09-06T13:14:31.227Z",
                "posts": []
            },
            {
                "id": "ef7693e8-1298-45c9-af18-9ed84a283239",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1keylly@gmail.com",
                "createdAt": "2023-09-06T13:11:59.515Z",
                "updatedAt": "2023-09-06T13:11:59.515Z",
                "posts": []
            },
            {
                "id": "e9d0d1be-8d83-45cc-ac8f-c4f4e3b4f1f0",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1kelly@gmail.com",
                "createdAt": "2023-09-06T13:10:49.335Z",
                "updatedAt": "2023-09-06T13:10:49.335Z",
                "posts": []
            },
            {
                "id": "5d561015-7888-4276-a90d-4a326dea4b24",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaonekelly@gmail.com",
                "createdAt": "2023-09-05T17:26:57.706Z",
                "updatedAt": "2023-09-05T17:26:57.706Z",
                "posts": []
            },
            {
                "id": "56496a7e-1f79-420e-ba92-fa449b9bcdba",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janekelly@gmail.com",
                "createdAt": "2023-09-05T01:48:47.265Z",
                "updatedAt": "2023-09-05T01:48:47.265Z",
                "posts": []
            },
            {
                "id": "48378d57-fcc5-495c-bbca-edbf40b12ddb",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoewyre@gmail.com",
                "createdAt": "2023-09-04T18:55:46.016Z",
                "updatedAt": "2023-09-04T18:55:46.016Z",
                "posts": []
            },
            {
                "id": "90288a58-477d-4a28-8df4-d0c8e1b08c06",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoewwre@gmail.com",
                "createdAt": "2023-09-04T18:39:33.037Z",
                "updatedAt": "2023-09-04T18:39:33.037Z",
                "posts": []
            },
            {
                "id": "af56080f-d860-4d8b-8677-a50c51e9e7cd",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoewr@gmail.com",
                "createdAt": "2023-09-04T18:35:59.723Z",
                "updatedAt": "2023-09-04T18:35:59.723Z",
                "posts": []
            },
            {
                "id": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoe@gmail.com",
                "createdAt": "2023-09-04T18:28:07.068Z",
                "updatedAt": "2023-09-04T18:28:07.068Z",
                "posts": [
                    {
                        "id": "c6e4e893-434d-47d2-9770-b52e6f5f9f0a",
                        "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                        "title": "Facebook people are funny!!!",
                        "post": "very funny posts from very funny people",
                        "createdAt": "2023-09-04T23:34:24.552Z",
                        "updatedAt": "2023-09-04T23:34:24.552Z"
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
                        "id": "c2779f7f-9922-4851-9c16-a7b283d0b768",
                        "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                        "title": "Gamers people are funny!!",
                        "post": "very funny posts from very funny people should update",
                        "createdAt": "2023-09-05T01:50:24.849Z",
                        "updatedAt": "2023-09-05T01:50:24.849Z"
                    }
                ]
            },
            {
                "id": "175825cd-660f-4822-8946-411ca18c55df",
                "firstName": "Oluwa",
                "lastName": "Jerome",
                "gender": "male",
                "email": "johndoe@gmail.com",
                "createdAt": "2023-09-04T18:27:27.660Z",
                "updatedAt": "2023-09-04T23:50:44.144Z",
                "posts": [
                    {
                        "id": "deecfb79-33c3-47c9-bdce-4b187fa46326",
                        "userId": "175825cd-660f-4822-8946-411ca18c55df",
                        "title": "Twitter people are funny!!!",
                        "post": "this is another test post",
                        "createdAt": "2023-09-04T22:51:04.369Z",
                        "updatedAt": "2023-09-04T22:51:04.369Z"
                    },
                    {
                        "id": "869b5619-0a31-4749-ac78-2191dc9c4523",
                        "userId": "175825cd-660f-4822-8946-411ca18c55df",
                        "title": "Twitter people are funny!!!",
                        "post": "very funny posts from very funny people",
                        "createdAt": "2023-09-04T23:07:06.631Z",
                        "updatedAt": "2023-09-04T23:07:06.631Z"
                    }
                ]
            },
            {
                "id": "4619c7e0-37de-4e07-8106-145206e08d7f",
                "firstName": "Jeffery",
                "lastName": "Jerome",
                "gender": "male",
                "email": "benjamin@gmail.com",
                "createdAt": "2023-09-04T18:26:34.054Z",
                "updatedAt": "2023-09-04T22:01:53.930Z",
                "posts": []
            }
        ],
        "pagination": {
            "totalDocs": 15,
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

/* '/v1/users/search` */
router.get("/search", verifyToken, api("searchAndFilter"));
/**
   * @api {post} /v1/users Create a User
   * @apiGroup Users
   * @apiDescription This endpoint creates a user
   * @apiName createUser
   * @apiVersion 1.0.0
   * @apiParam (Body) {String} firstName              first name of user
   * @apiParam (Body) {String} lastName               last name of user
   * @apiParam (Body) {String} gender                 gender of user
   * @apiParam (Body) {String} email                  user email
   * @apiParam (Body) {String} password               user password
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 201 Created
   *     {
    "success": true,
    "statusCode": 200,
    "message": "User created successfully!",
    "data": {
        "id": "175825cd-660f-4822-8946-411ca18c55df",
        "firstName": "Oluwa",
        "lastName": "Jerome",
        "gender": "male",
        "email": "johndoe@gmail.com",
        "createdAt": "2023-09-04T18:27:27.660Z",
        "updatedAt": "2023-09-04T23:50:44.144Z",
    },
    "links": [],
    "name": ""
    }
   *
   * @apiParamExample Sample Request:
   *    {
   *       "firstName": "Oluwa",
   *       "lastName": "Jerome",
   *       "gender": "male",
   *       "email": "johndoe@gmail.com",
   *       "password": "password"
   *     }
   * 
   * 
   * @apiUse BadRequestError
   * 
   * @apiUse ConflictError
   * 
   */

/* '/v1/users` */

/**
   * @api {get} /v1/users Get Users
   * @apiGroup Users
   * @apiDescription This endpoint returns all users
   * @apiName getUsers
   * @apiVersion 1.0.0
   * @apiParam (Query) {Number} [page = 1]                  Page to display.
   * @apiParam (Query) {Number} [limit = 20]                Number of documents to return per page.
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "Users retrieved successfully!",
    "data": {
        "items": [
            {
                "id": "9eb8bb4b-f638-40e6-9e8f-4883355996dd",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1keyllyau@gmail.com",
                "createdAt": "2023-09-06T14:30:16.945Z",
                "updatedAt": "2023-09-06T14:30:16.945Z",
                "posts": []
            },
            {
                "id": "05e2aafe-317c-440a-a663-48a428780cc4",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1keyllyu@gmail.com",
                "createdAt": "2023-09-06T13:14:31.227Z",
                "updatedAt": "2023-09-06T13:14:31.227Z",
                "posts": []
            },
            {
                "id": "ef7693e8-1298-45c9-af18-9ed84a283239",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1keylly@gmail.com",
                "createdAt": "2023-09-06T13:11:59.515Z",
                "updatedAt": "2023-09-06T13:11:59.515Z",
                "posts": []
            },
            {
                "id": "e9d0d1be-8d83-45cc-ac8f-c4f4e3b4f1f0",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaone1kelly@gmail.com",
                "createdAt": "2023-09-06T13:10:49.335Z",
                "updatedAt": "2023-09-06T13:10:49.335Z",
                "posts": []
            },
            {
                "id": "5d561015-7888-4276-a90d-4a326dea4b24",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "jaonekelly@gmail.com",
                "createdAt": "2023-09-05T17:26:57.706Z",
                "updatedAt": "2023-09-05T17:26:57.706Z",
                "posts": []
            },
            {
                "id": "56496a7e-1f79-420e-ba92-fa449b9bcdba",
                "firstName": "Kelly",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janekelly@gmail.com",
                "createdAt": "2023-09-05T01:48:47.265Z",
                "updatedAt": "2023-09-05T01:48:47.265Z",
                "posts": []
            },
            {
                "id": "48378d57-fcc5-495c-bbca-edbf40b12ddb",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoewyre@gmail.com",
                "createdAt": "2023-09-04T18:55:46.016Z",
                "updatedAt": "2023-09-04T18:55:46.016Z",
                "posts": []
            },
            {
                "id": "90288a58-477d-4a28-8df4-d0c8e1b08c06",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoewwre@gmail.com",
                "createdAt": "2023-09-04T18:39:33.037Z",
                "updatedAt": "2023-09-04T18:39:33.037Z",
                "posts": []
            },
            {
                "id": "af56080f-d860-4d8b-8677-a50c51e9e7cd",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoewr@gmail.com",
                "createdAt": "2023-09-04T18:35:59.723Z",
                "updatedAt": "2023-09-04T18:35:59.723Z",
                "posts": []
            },
            {
                "id": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                "firstName": "Jane",
                "lastName": "Jerome",
                "gender": "female",
                "email": "janedoe@gmail.com",
                "createdAt": "2023-09-04T18:28:07.068Z",
                "updatedAt": "2023-09-04T18:28:07.068Z",
                "posts": [
                    {
                        "id": "c6e4e893-434d-47d2-9770-b52e6f5f9f0a",
                        "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                        "title": "Facebook people are funny!!!",
                        "post": "very funny posts from very funny people",
                        "createdAt": "2023-09-04T23:34:24.552Z",
                        "updatedAt": "2023-09-04T23:34:24.552Z"
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
                        "id": "c2779f7f-9922-4851-9c16-a7b283d0b768",
                        "userId": "2cd38fc5-9e9c-444f-a6d9-f0c457f4b4c5",
                        "title": "Gamers people are funny!!",
                        "post": "very funny posts from very funny people should update",
                        "createdAt": "2023-09-05T01:50:24.849Z",
                        "updatedAt": "2023-09-05T01:50:24.849Z"
                    }
                ]
            },
            {
                "id": "175825cd-660f-4822-8946-411ca18c55df",
                "firstName": "Oluwa",
                "lastName": "Jerome",
                "gender": "male",
                "email": "johndoe@gmail.com",
                "createdAt": "2023-09-04T18:27:27.660Z",
                "updatedAt": "2023-09-04T23:50:44.144Z",
                "posts": [
                    {
                        "id": "deecfb79-33c3-47c9-bdce-4b187fa46326",
                        "userId": "175825cd-660f-4822-8946-411ca18c55df",
                        "title": "Twitter people are funny!!!",
                        "post": "this is another test post",
                        "createdAt": "2023-09-04T22:51:04.369Z",
                        "updatedAt": "2023-09-04T22:51:04.369Z"
                    },
                    {
                        "id": "869b5619-0a31-4749-ac78-2191dc9c4523",
                        "userId": "175825cd-660f-4822-8946-411ca18c55df",
                        "title": "Twitter people are funny!!!",
                        "post": "very funny posts from very funny people",
                        "createdAt": "2023-09-04T23:07:06.631Z",
                        "updatedAt": "2023-09-04T23:07:06.631Z"
                    }
                ]
            },
            {
                "id": "4619c7e0-37de-4e07-8106-145206e08d7f",
                "firstName": "Jeffery",
                "lastName": "Jerome",
                "gender": "male",
                "email": "benjamin@gmail.com",
                "createdAt": "2023-09-04T18:26:34.054Z",
                "updatedAt": "2023-09-04T22:01:53.930Z",
                "posts": []
            }
        ],
        "pagination": {
            "totalDocs": 15,
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

/* '/v1/users` */
router.route("/").get(verifyToken, api("getAll")).post(api("create"));

/**
   * @api {get} /v1/users/:userId Get a User
   * @apiGroup Users
   * @apiDescription This endpoint retrieves a user record
   * @apiName getUser
   * @apiVersion 1.0.0
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "User retrieved successfully!",
    "data": {
        "id": "175825cd-660f-4822-8946-411ca18c55df",
        "firstName": "John",
        "lastName": "Jerome",
        "gender": "male",
        "email": "johndoe@gmail.com",
        "createdAt": "2023-09-04T18:27:27.660Z",
        "updatedAt": "2023-09-04T23:50:44.144Z",
    },
    "links": [],
    "name": ""
    }
   *
   * @apiUse UnauthorizedError
   * 
   * @apiUse NotFoundError
   * 
   */

/* '/v1/users/:userId` */

/**
   * @api {put} /v1/users/:userId Update a User
   * @apiGroup Users
   * @apiDescription This endpoint updates a user record
   * @apiName updateUser
   * @apiVersion 1.0.0
   * @apiParam (Body) {String} firstName              first name of user
   * @apiParam (Body) {String} lastName               last name of user
   * @apiParam (Body) {String} gender                 gender of user
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
    "success": true,
    "statusCode": 200,
    "message": "User updated successfully!",
    "data": {
        "id": "175825cd-660f-4822-8946-411ca18c55df",
        "firstName": "John",
        "lastName": "Jerome",
        "gender": "male",
        "email": "johndoe@gmail.com",
        "createdAt": "2023-09-04T18:27:27.660Z",
        "updatedAt": "2023-09-04T23:50:44.144Z",
    },
    "links": [],
    "name": ""
    }
   *
   * @apiParamExample Sample Request:
   *    {
   *       "firstName": "John",
   *       "lastName": "Jerome",
   *       "gender": "male",
   *    }
   * 
   * @apiUse UnauthorizedError
   * 
   * @apiUse BadRequestError
   * 
   * @apiUse NotFoundError
   * 
   */

/* '/v1/users/:userId` */

/**
   * @api {delete} /v1/users/:userId Delete a User
   * @apiGroup Users
   * @apiDescription This endpoint deletes a user record
   * @apiName deleteUser
   * @apiVersion 1.0.0
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
            "success": true,
            "statusCode": 200,
            "message": "User deleted successfully!",
            "data": 1,
            "links": [],
            "name": ""
         }
   *
   * 
   * @apiUse UnauthorizedError
   * 
   * @apiUse NotFoundError
   * 
   */

/* '/v1/users/:userId` */
router
  .route("/:userId")
  .get(verifyToken, api("get"))
  .put(verifyToken, api("update"))
  .delete(verifyToken, api("delete"));

export default router;
