import { validatePostPayload } from "../../interface/http/validations/blog.validations.schema";
import { ValidationResult } from "joi";
import BadRequestError from "../../interface/http/errors/BadRequest";
import { Table, IPostUsecase, IPost } from "../../infra/support/interfaces";
import { runQueriesInTransaction } from "../../infra/libs/RunQueriesInTransaction";

class CreatePost {
  constructor(private options: IPostUsecase) {}

  async execute(userId: string, payload: IPost): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validatePostPayload(payload);
        if (error) throw new BadRequestError(`${error.details[0].message}`);

        const response: void = await runQueriesInTransaction(
          async (transaction): Promise<Table> => {
            const { post, title } = payload;

            // Store in database
            const newPost: Table = await this.options.postRepository.createPost(
              { post, userId, title },
              transaction
            );
            return newPost;
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

export default CreatePost;
