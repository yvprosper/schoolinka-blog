import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";
import { Request, Response } from "express";
import {
  Table,
  IPostController,
  IError,
  IPostQueryOptions,
  IPost,
} from "../../../infra/support/interfaces";

class PostController extends BaseController {
  constructor(private options: IPostController) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payload: IPost = req.body;
      const userId: string = req.user.id;
      const response: Promise<Table> = await this.options.createPost.execute(userId, payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post created successfully!", HTTP_STATUS.CREATED);
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
      const postId: string = req.params.postId;
      const response: Promise<Table> = await this.options.getPost.execute(postId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post retrieved successfully!", HTTP_STATUS.OK);
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
      const postId: string = req.params.postId;
      const userId: string = req.user.id;
      const payload: IPost = req.body;
      const response: Promise<Table> = await this.options.updatePost.execute(
        postId,
        userId,
        payload
      );
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post updated successfully!", HTTP_STATUS.OK);
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
      const postId: string = req.params.postId;
      const userId: string = req.user.id;
      const response: Promise<Table> = await this.options.deletePost.execute(postId, userId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post deleted successfully!", HTTP_STATUS.OK);
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

  async getAllUserPosts(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const payload: IPostQueryOptions = req.query;
      const response: Promise<Table> = await this.options.getUserPosts.execute(userId, payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User Posts retrieved successfully!", HTTP_STATUS.OK);
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

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const payload: IPostQueryOptions = req.query;
      const response: Promise<Table> = await this.options.getPosts.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Posts retrieved successfully!", HTTP_STATUS.OK);
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
      const payload: IPostQueryOptions = req.query;
      const response: Promise<Table> = await this.options.searchAndFilterPosts.execute(payload);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Posts retrieved successfully!", HTTP_STATUS.OK);
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

export default PostController;
