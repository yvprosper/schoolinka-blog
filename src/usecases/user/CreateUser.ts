/* eslint-disable prefer-const */
import bcrypt from "bcrypt";
import { IUserUsecase, Table, IUser } from "../../infra/support/interfaces";
import { validateUserPayload } from "../../interface/http/validations/blog.validations.schema";
import { ValidationResult } from "joi";
import BadRequestError from "../../interface/http/errors/BadRequest";
import ConflictError from "../../interface/http/errors/Conflict";
import { runQueriesInTransaction } from "../../infra/libs/RunQueriesInTransaction";

class CreateUser {
  constructor(private options: IUserUsecase) {}

  async execute(payload: IUser): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validateUserPayload(payload);
        if (error) throw new BadRequestError(`${error.details[0].message}`);

        const response: void = await runQueriesInTransaction(
          async (transaction): Promise<Table> => {
            let { firstName, lastName, email, password, gender } = payload;
            // check for already existing user
            const isUser = await this.options.userRepository.getUserByCol({ email });
            if (isUser.length > 0) throw new ConflictError("A User with this email already exist");

            // Encrypt password
            password = await bcrypt.hash(String(password), 10);
            // Store in database
            let user = await this.options.userRepository.createUser(
              {
                firstName,
                lastName,
                email,
                password,
                gender,
              },
              transaction
            );
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

export default CreateUser;
