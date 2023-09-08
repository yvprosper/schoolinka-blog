import { Table, IPostUsecase, IPostQueryOptions } from "../../infra/support/interfaces";
import { Op } from "sequelize";
import moment from "moment";
import { ValidationResult } from "joi";
import { validateSearchPostPayload } from "../../interface/http/validations/blog.validations.schema";
import BadRequestError from "../../interface/http/errors/BadRequest";

interface IQueryOptions extends IPostQueryOptions {
  createdAt?: object;
  [Op.or]?: Array<object>;
}
class SearchAndFilterPosts {
  constructor(private options: IPostUsecase) {}

  async execute(payload: IPostQueryOptions): Promise<Table> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate input
        const { error }: ValidationResult = await validateSearchPostPayload(payload);
        if (error) throw new BadRequestError(`${error.details[0].message}`);

        const { keyword, page, limit, startDate, endDate } = payload;
        let clause: IQueryOptions = {};
        if (keyword) {
          clause = {
            [Op.or]: [
              { title: { [Op.iLike]: `%${keyword}%` } },
              { post: { [Op.iLike]: `%${keyword}%` } },
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
        const result = await this.options.postRepository.getAllItemsFromTable({
          clause,
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

export default SearchAndFilterPosts;
