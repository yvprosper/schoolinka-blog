/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";
import { Request, Response } from "express";
import { User } from "../validations/blog.validations.schema";
import { QueryResult } from "pg";
interface IUser extends User {
  execute(payload?: User | string): Promise<QueryResult[]>;
}

class UserController extends BaseController {
  createUser!: IUser;
  getUser!: IUser;
  getUsers!: IUser;
  signIn!: IUser;
  getUsersWithMostPosts: IUser;
  constructor({
    createUser,
    getUser,
    getUsers,
    signIn,
    getUsersWithMostPosts,
  }: {
    createUser: IUser;
    getUser: IUser;
    getUsers: IUser;
    signIn: IUser;
    getUsersWithMostPosts: IUser;
  }) {
    super();
    this.createUser = createUser;
    this.getUser = getUser;
    this.getUsers = getUsers;
    this.signIn = signIn;
    this.getUsersWithMostPosts = getUsersWithMostPosts;
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const response = await this.createUser.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User created successfully!", HTTP_STATUS.CREATED);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const response = await this.getUser.execute(userId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User retrieved successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.getUsers.execute();
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Users retrieved successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async getUsersPerformance(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.getUsersWithMostPosts.execute();
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(
          response,
          "Top 3 Users with the most Post retrieved successfully!",
          HTTP_STATUS.OK
        );
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const response = await this.signIn.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User logged in successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }
}

export default UserController;
