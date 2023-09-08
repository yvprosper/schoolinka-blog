import { Table, IPostUsecase, IPostQueryOptions } from "../../infra/support/interfaces";

class GetPosts {
  constructor(private options: IPostUsecase) {}

  async execute(payload: IPostQueryOptions): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit } = payload;
        const result: Table = await this.options.postRepository.getAllPosts({ page, limit });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetPosts;
