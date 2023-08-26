import BaseRepository from "./BaseRepository";

class CommentRepository extends BaseRepository {
  table: string;
  tableId: string;
  constructor() {
    super("comments");
    this.table = "comments";
    this.tableId = "commentId";
  }

  getCommentById(): string {
    return this.getByCol()(this.tableId);
  }

  getCommentByCol(col: string): string {
    return this.getByCol()(col);
  }

  createComment(): string {
    return `insert into ${this.table}(postId,userId,comment,created_on)
        values ($1,$2,$3,NOW()) returning *;`;
  }

  updateComment(): string {
    return `update ${this.table} set comment = $1 where ${this.tableId} = $2 returning *;`;
  }

  deleteComment(): string {
    return this.getByColThenDelete()(this.tableId);
  }
}

export default CommentRepository;
