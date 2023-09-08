import express from "express";
import routerV1 from "./v1";
import { Request, Response } from "express";
import cors from "cors";
import { AwilixContainer } from "awilix";
import error from "../middlewares/error";

interface AppAwilixContainer extends AwilixContainer {
  containerMiddleware: string | RegExp | Array<string | RegExp>;
}
export default ({ containerMiddleware }: AppAwilixContainer) => {
  const apiRouter = express.Router();

  apiRouter.use(express.json());
  apiRouter.use(containerMiddleware);

  // @apiError ResourceNotFoundError The <code>id</code> of the User was not found.
  /**
   * @apiDefine NotFoundError
   * 
    * @apiErrorExample Not Found Error Response:
        HTTP/1.1 404 NotFound
        {
          "success": false,
          "statusCode": 404,
          "message": "resource does not exist.",
          "name": "ResourceNotFoundError",
          "data": {}
        }
   */

  /**
   * * @apiDefine UnauthorizedError
     * * @apiErrorExample Error Response:

    HTTP/1.1 401 Unauthorized
    {
      "success": false,
      "status_code": 401,
      "message": "Authorization is required to access this API endpoint.",
      "name": "Unauthorized",
      "data": {}
    }
  */

  /**
   * * @apiDefine BadRequestError
     * * @apiErrorExample Bad Request Error Response:

    HTTP/1.1 400 BadRequest
    {
      "success": false,
      "status_code": 400,
      "message": "Payload not properly formatted",
      "name": "BadRequest",
      "data": {}
    }
  */

  /**
   * * @apiDefine ConflictError
     * * @apiErrorExample ConflictError Error Response:

    HTTP/1.1 409 Conflict
    {
      "success": false,
      "status_code": 409,
      "message": "User with Email Already Exists",
      "name": "BadRequest",
      "data": {}
    }
  */

  apiRouter.route("/").get((req: Request, res: Response) => {
    res.status(200).json({
      message: "API v1  is running",
      env: process.env.NODE_ENV,
      serviceName: process.env.SERVICE_NAME,
    });
  });

  apiRouter.use("/v1", cors(), routerV1);

  // handle errors (404 is not technically an error)
  apiRouter.use(error);

  return apiRouter;
};
