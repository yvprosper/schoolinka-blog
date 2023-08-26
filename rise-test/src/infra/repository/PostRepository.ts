import BaseRepository from "./BaseRepository";

class PostRepository extends BaseRepository {
  table: string;
  tableId: string;
  constructor() {
    super("posts");
    this.table = "posts";
    this.tableId = "postId";
  }

  getPostById(): string {
    return this.getByCol()(this.tableId);
  }

  getPostByCol(col: string): string {
    return this.getByCol()(col);
  }

  createPost(): string {
    return `insert into ${this.table}(userId,post,created_on,updated_on)
        values ($1,$2,NOW(),NOW()) returning *;`;
  }

  updatePost(): string[] {
    return [
      `update ${this.table} set title = $1,post = $2 ,updated_on = NOW() where ${this.tableId} = $3 returning *;`,
      `update ${this.table} set post = $1 ,updated_on = NOW() where ${this.tableId} = $2 returning *;`,
      `update ${this.table} set title = $1 ,updated_on = NOW() where ${this.tableId} = $2 returning *;`,
    ];
  }

  deleteComment(): string {
    return this.getByColThenDelete()(this.tableId);
  }
}

export default PostRepository;
