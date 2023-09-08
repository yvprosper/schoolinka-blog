import { Table, IUserUsecase, IAuth } from "../../infra/support/interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BadRequestError from "../../interface/http/errors/BadRequest";
import UnauthorizedError from "../../interface/http/errors/Unauthorized";
import { validateAuthPayload } from "../../interface/http/validations/blog.validations.schema";
import { ValidationResult } from "joi";

class SignIn {
  constructor(private options: IUserUsecase) {}

  async execute({ email, password }: IAuth): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validateAuthPayload({ email, password });
        if (error) throw new BadRequestError(` ${error.details[0].message}`);
        let user = await this.options.userRepository.getUserByCol({ email });
        if (!user.length) throw new UnauthorizedError("Invalid Credentials!");
        user = user[0].dataValues;
        // Validate password
        const validatePassword: boolean = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
          throw new UnauthorizedError("Invalid Credentials!");
        }
        // sign token
        const secret: string | undefined = this.options.config.jwtSecret;
        const token: string = await jwt.sign(
          {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
          },
          `${secret}`
        );
        delete user.password;
        user.token = token;

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default SignIn;
