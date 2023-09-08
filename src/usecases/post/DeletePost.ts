import BadRequestError from "../../interface/http/errors/BadRequest";
import NotFoundError from "../../interface/http/errors/NotFound";
import { Table, IPostUsecase } from "../../infra/support/interfaces";
import { runQueriesInTransaction } from "../../infra/libs/RunQueriesInTransaction";

class DeletePost {
  constructor(private options: IPostUsecase) {}

  async execute(postId: string, userId: string): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!postId) throw new BadRequestError("post id cannot be empty");

        const response: void = await runQueriesInTransaction(
          async (transaction): Promise<Table> => {
            const post: Table = await this.options.postRepository.deletePosts(
              { id: postId, userId },
              transaction
            );
            if (!post) throw new NotFoundError("post not found");

            return post;
          },
          this.options.psqlClient!
        );

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default DeletePost;
