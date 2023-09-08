import BadRequestError from "../../interface/http/errors/BadRequest";
import { Table, IPostUsecase, IPostQueryOptions } from "../../infra/support/interfaces";

class GetUserPosts {
  constructor(private options: IPostUsecase) {}

  async execute(userId: string, payload: IPostQueryOptions): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId) throw new BadRequestError("user id cannot be empty");
        const { page, limit } = payload;
        const result: Table = await this.options.postRepository.getAllItemsFromTable({
          clause: { userId },
          page,
          limit,
        });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetUserPosts;
