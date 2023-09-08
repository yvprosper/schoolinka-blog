/* eslint-disable no-underscore-dangle */
import BadRequestError from "../../interface/http/errors/BadRequest";
import NotFoundError from "../../interface/http/errors/NotFound";
import { Table, IPostUsecase, IPost } from "../../infra/support/interfaces";
import { validateUpdatePostPayload } from "../../interface/http/validations/blog.validations.schema";
import { ValidationResult } from "joi";
import { runQueriesInTransaction } from "../../infra/libs/RunQueriesInTransaction";

class UpdatePost {
  constructor(private options: IPostUsecase) {}

  async execute(postId: string, userId: string, payload: IPost): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validateUpdatePostPayload(payload);
        if (error) throw new BadRequestError(`${error.details[0].message}`);
        if (!postId) throw new BadRequestError("post id cannot be empty");

        const response: void = await runQueriesInTransaction(
          async (transaction): Promise<Table> => {
            const { title, post } = payload;
            const _post: Table = await this.options.postRepository.updatePost(
              { id: postId, userId },
              { title, post },
              transaction
            );
            if (!_post) throw new NotFoundError("post not found");

            return _post;
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

export default UpdatePost;
