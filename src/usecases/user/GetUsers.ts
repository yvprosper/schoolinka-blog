import { Table, IUserUsecase, IUserQueryOptions } from "../../infra/support/interfaces";

class GetUsers {
  constructor(private options: IUserUsecase) {}

  async execute(payload: IUserQueryOptions): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit } = payload;
        const result = await this.options.userRepository.getAllUsers({
          page,
          limit,
          include: [this.options.Post],
          excludedColumns: ["password"],
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetUsers;
