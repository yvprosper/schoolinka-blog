import { Table, IUserUsecase, IUserQueryOptions } from "../../infra/support/interfaces";
import { Op } from "sequelize";
import moment from "moment";
import { ValidationResult } from "joi";
import { validateSearchUserPayload } from "../../interface/http/validations/blog.validations.schema";
import BadRequestError from "../../interface/http/errors/BadRequest";

interface IQueryOptions extends IUserQueryOptions {
  createdAt?: object;
  [Op.or]?: Array<object>;
}

class SearchAndFilterUsers {
  constructor(private options: IUserUsecase) {}

  async execute(payload: IUserQueryOptions): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validateSearchUserPayload(payload);
        if (error) throw new BadRequestError(`${error.details[0].message}`);

        const { name, gender, page, limit, startDate, endDate } = payload;
        let clause: IQueryOptions = {};
        if (name) {
          clause = {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${name}%` } },
              { lastName: { [Op.iLike]: `%${name}%` } },
            ],
          };
        }
        if (startDate && endDate) {
          clause.createdAt = {
            [Op.between]: [
              moment.utc(startDate, "YYYY-MM-DD").toDate(),
              moment.utc(endDate, "YYYY-MM-DD").endOf("day").toDate(),
            ],
          };
        }
        if (gender) {
          clause.gender = gender;
        }
        const result = await this.options.userRepository.getAllItemsFromTable({
          clause,
          page,
          limit,
          excludedColumns: ["password"],
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default SearchAndFilterUsers;
