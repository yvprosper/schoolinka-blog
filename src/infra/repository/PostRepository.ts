import { Table, IQueryOptions } from "../support/interfaces";
import BaseRepository from "./BaseRepository";
import { Transaction } from "sequelize";

class PostRepository extends BaseRepository {
  Post: Table;
  constructor({ Post }: { Post: Table }) {
    super(Post);
    this.Post = Post;
  }

  async getPostById(postId: string): Promise<Table> {
    const post = await this.Post.findOne({
      where: { id: postId },
    });
    return post;
  }

  async getPostByCol(clause: object): Promise<Table> {
    const post = await this.getByCol(clause);
    return post;
  }

  async createPost(payload: object, transaction: Transaction): Promise<Table> {
    const post = await this.insertItemToTable(payload, transaction);
    return post;
  }

  async getAllPosts({
    selectedColumns,
    excludedColumns,
    include,
    clause,
    page,
    limit,
  }: IQueryOptions): Promise<Table> {
    const posts = await this.getAllItemsFromTable({
      selectedColumns,
      excludedColumns,
      include,
      clause,
      page,
      limit,
    });
    return posts;
  }

  async deletePosts(clause: object, transaction: Transaction): Promise<Table> {
    const posts = await this.getByColAndDelete(clause, transaction);
    return posts;
  }

  async updatePost(clause: object, payload: object, transaction: Transaction): Promise<Table> {
    const post = await this.updateItem(clause, payload, transaction);
    return post;
  }
}

export default PostRepository;
