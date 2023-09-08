import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";
import { Request, Response } from "express";
import {
  Table,
  IUserController,
  IUserQueryOptions,
  IUser,
  IAuth,
} from "../../../infra/support/interfaces";

class UserController extends BaseController {
  constructor(private options: IUserController) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    const payload: IUser = req.body;
    const response: Promise<Table> = await this.options.createUser.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "User created successfully!", HTTP_STATUS.CREATED);
  }

  async get(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.userId;
    const response: Promise<Table> = await this.options.getUser.execute(userId);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "User retrieved successfully!", HTTP_STATUS.OK);
  }

  async update(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.userId;
    const payload: IUser = req.body;
    const response: Promise<Table> = await this.options.updateUser.execute(userId, payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "User updated successfully!", HTTP_STATUS.OK);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.userId;
    const response: Promise<Table> = await this.options.deleteUser.execute(userId);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "User removed successfully!", HTTP_STATUS.OK);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const payload: IUserQueryOptions = req.query;
    const response: Promise<Table> = await this.options.getUsers.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Users retrieved successfully!", HTTP_STATUS.OK);
  }

  async searchAndFilter(req: Request, res: Response): Promise<void> {
    const payload: IUserQueryOptions = req.query;
    const response: Promise<Table> = await this.options.searchAndFilterUsers.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "Users retrieved successfully!", HTTP_STATUS.OK);
  }

  async login(req: Request, res: Response): Promise<void> {
    const payload: IAuth = req.body;
    const response: Promise<Table> = await this.options.signIn.execute(payload);
    // send response
    this.responseManager
      .getResponseHandler(res)
      .onSuccess(response, "User logged in successfully!", HTTP_STATUS.OK);
  }
}

export default UserController;
