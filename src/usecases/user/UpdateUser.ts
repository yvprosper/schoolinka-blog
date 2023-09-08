import NotFoundError from "../../interface/http/errors/NotFound";
import BadRequestError from "../../interface/http/errors/BadRequest";
import { Table, IUserUsecase, IUser } from "../../infra/support/interfaces";
import { validateUserUpdatePayload } from "../../interface/http/validations/blog.validations.schema";
import { ValidationResult } from "joi";
import { runQueriesInTransaction } from "../../infra/libs/RunQueriesInTransaction";

class UpdateUser {
  constructor(private options: IUserUsecase) {}

  async execute(userId: string, payload: IUser): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validateUserUpdatePayload(payload);
        if (error) throw new BadRequestError(`${error.details[0].message}`);
        if (!userId) throw new BadRequestError("user id cannot be empty");

        const response: void = await runQueriesInTransaction(
          async (transaction): Promise<Table> => {
            const { firstName, lastName, gender } = payload;
            const user: Table = await this.options.userRepository.updateUser(
              { id: userId },
              {
                firstName,
                lastName,
                gender,
              },
              transaction
            );
            if (!user) throw new NotFoundError("user not found");
            delete user.dataValues.password;

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

export default UpdateUser;
