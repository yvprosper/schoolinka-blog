import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";
import { Request, Response } from "express";
import {
  Table,
  IUserController,
  IError,
  IUserQueryOptions,
  IUser,
  IAuth,
} from "../../../infra/support/interfaces";

class UserController extends BaseController {
  constructor(private options: IUserController) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload: IUser = req.body;
      const response: Promise<Table> = await this.options.createUser.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User created successfully!", HTTP_STATUS.CREATED);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.user.id;
      const response: Promise<Table> = await this.options.getUser.execute(userId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User retrieved successfully!", HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.user.id;
      const payload: IUser = req.body;
      const response: Promise<Table> = await this.options.updateUser.execute(userId, payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User updated successfully!", HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.user.id;
      const response: Promise<Table> = await this.options.deleteUser.execute(userId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User removed successfully!", HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const payload: IUserQueryOptions = req.query;
      const response: Promise<Table> = await this.options.getUsers.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Users retrieved successfully!", HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }

  async searchAndFilter(req: Request, res: Response): Promise<void> {
    try {
      const payload: IUserQueryOptions = req.query;
      const response: Promise<Table> = await this.options.searchAndFilterUsers.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Users retrieved successfully!", HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const payload: IAuth = req.body;
      const response: Promise<Table> = await this.options.signIn.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User logged in successfully!", HTTP_STATUS.OK);
    } catch (error) {
      if (error instanceof Error) {
        const e: IError = error;
        this.responseManager.getResponseHandler(res).onError(error.name, e.status!, error.message);
        throw error;
      }
      this.responseManager.getResponseHandler(res).onError();
      throw error;
    }
  }
}

export default UserController;
