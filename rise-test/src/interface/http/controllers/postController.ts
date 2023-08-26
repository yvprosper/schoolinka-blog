/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP_STATUS from "http-status-codes";
import BaseController from "./BaseController";
import { Request, Response } from "express";
import { Post, Comment } from "../validations/blog.validations.schema";
import { QueryResult } from "pg";
interface IPost extends Post {
  execute(payload?: Post | Comment | string): Promise<QueryResult[]>;
}

class PostController extends BaseController {
  createPost!: IPost;
  getUserPosts!: IPost;
  getPosts!: IPost;
  getPost!: IPost;
  createComment!: IPost;
  getPostComments!: IPost;
  constructor({
    createPost,
    getUserPosts,
    getPosts,
    getPost,
    createComment,
    getPostComments,
  }: {
    createPost: IPost;
    getUserPosts: IPost;
    getPosts: IPost;
    getPost: IPost;
    createComment: IPost;
    getPostComments: IPost;
  }) {
    super();
    this.createPost = createPost;
    this.getUserPosts = getUserPosts;
    this.getPosts = getPosts;
    this.getPost = getPost;
    this.createComment = createComment;
    this.getPostComments = getPostComments;
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { post } = req.body;
      const { id } = req.user;
      const response = await this.createPost.execute({ post, userId: id });
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post created successfully!", HTTP_STATUS.CREATED);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;
      const response = await this.getPost.execute(postId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post retrieved successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async getAllUserPosts(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const response = await this.getUserPosts.execute(userId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "User Posts retrieved successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.getPosts.execute();
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Posts retrieved successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async addComment(req: Request, res: Response): Promise<void> {
    try {
      const { comment } = req.body;
      const { postId } = req.params;
      const { id } = req.user;
      const response = await this.createComment.execute({ comment, postId, userId: id });
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Comment added to post successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }

  async getAllPostComments(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;
      const response = await this.getPostComments.execute(postId);
      // send response
      this.responseManager
        .getResponseHandler(res)
        .onSuccess(response, "Post Comments retrieved successfully!", HTTP_STATUS.OK);
    } catch (error: any) {
      this.responseManager
        .getResponseHandler(res)
        .onError(error.name, error.status, error.message, {});
      throw error;
    }
  }
}

export default PostController;
