import NotFoundError from "../../interface/http/errors/NotFound";
import BadRequestError from "../../interface/http/errors/BadRequest";
import { runQueriesInTransaction } from "../../infra/libs/RunQueriesInTransaction";
import { IUserUsecase, Table } from "../../infra/support/interfaces";

class DeleteUser {
  constructor(private options: IUserUsecase) {}

  async execute(userId: string): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId) throw new BadRequestError("user id cannot be empty");
        const response: void = await runQueriesInTransaction(
          async (transaction): Promise<Table> => {
            const user: Table = await this.options.userRepository.deleteUsers(
              { id: userId },
              transaction
            );
            if (!user) throw new NotFoundError("user not found");

            return user;
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

export default DeleteUser;
