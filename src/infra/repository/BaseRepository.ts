import { Table, IQueryOptions } from "../support/interfaces";
import { Transaction } from "sequelize";

class BaseRepository {
  table: Table;
  constructor(Model: Table) {
    this.table = Model;
  }

  async insertItemToTable(body: object, transaction: Transaction): Promise<Table> {
    const item = await this.table.create(body, { transaction });
    return item;
  }

  async getAllItemsFromTable({
    selectedColumns,
    excludedColumns,
    include,
    clause,
    page = 1,
    limit = 20,
  }: IQueryOptions): Promise<Table> {
    let query: object = { include, order: [["createdAt", "DESC"]] };
    if (clause) query = { ...query, where: clause };
    if (selectedColumns?.length && !excludedColumns?.length)
      query = { ...query, attributes: selectedColumns };
    if (excludedColumns?.length && !selectedColumns?.length)
      query = { ...query, attributes: { exclude: excludedColumns } };
    query = { ...query, offset: (page - 1) * limit, limit };
    const { rows: items, count } = await this.table.findAndCountAll(query);

    const hasNextPage = count > page * limit;
    const hasPrevPage = page > 1;
    const totalDocs = count;
    return {
      items,
      pagination: {
        totalDocs,
        perPage: Number(limit),
        currentPage: Number(page),
        totalPages: Math.ceil(totalDocs / limit),
        serialNo: (page - 1) * limit + 1,
        hasPrevPage,
        hasNextPage,
        prevPage: hasPrevPage ? Number(page) - 1 : null,
        nextPage: hasNextPage ? Number(page) + 1 : null,
      },
    };
  }

  async getByCol(clause: object): Promise<Table> {
    const items = await this.table.findAll({ where: clause });
    return items;
  }

  async getByColAndDelete(clause: object, transaction: Transaction): Promise<Table> {
    const items = await this.table.destroy({ where: clause }, { transaction });
    console.log({ items });
    return items;
  }

  async updateItem(clause: object, payload: object, transaction: Transaction): Promise<Table> {
    const item = await this.table.findOne({ where: clause }, { transaction });
    if (!item) return null;
    await item.update(payload);
    return item;
  }
}

export default BaseRepository;
