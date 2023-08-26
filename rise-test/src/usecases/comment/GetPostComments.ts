import CommentRepository from "../../infra/repository/CommentRepository";
import { PoolClient, QueryResult } from "pg";
import Config from "../../../config/default";
import BadRequestError from "../../interface/http/errors/BadRequest";

class GetPostComments {
  commentRepository: CommentRepository;
  psqlClient: PoolClient;
  config: typeof Config;
  constructor({
    commentRepository,
    psqlClient,
    config,
  }: {
    commentRepository: CommentRepository;
    psqlClient: PoolClient;
    config: typeof Config;
  }) {
    this.commentRepository = commentRepository;
    this.psqlClient = psqlClient;
    this.config = config;
  }

  async execute(postId: string): Promise<QueryResult[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!postId) throw new BadRequestError("post id cannot be empty");
        const { rows }: QueryResult = await this.psqlClient.query(
          this.commentRepository.getCommentByCol("postId"),
          [postId]
        );

        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetPostComments;
