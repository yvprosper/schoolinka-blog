import NotFoundError from "../../interface/http/errors/NotFound";
import BadRequestError from "../../interface/http/errors/BadRequest";
import { IUserUsecase, Table } from "../../infra/support/interfaces";

class GetUser {
  constructor(private options: IUserUsecase) {}

  async execute(userId: string): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId) throw new BadRequestError("user id cannot be empty");
        const user: Table = await this.options.userRepository.getUserById(userId);
        if (!user) throw new NotFoundError("user not found");
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetUser;
