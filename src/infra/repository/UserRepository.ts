import { Table, IQueryOptions } from "../support/interfaces";
import BaseRepository from "./BaseRepository";
import { Transaction } from "sequelize";

class UserRepository extends BaseRepository {
  User: Table;
  Post: Table;
  constructor({ User, Post }: { User: Table; Post: Table }) {
    super(User);
    this.User = User;
    this.Post = Post;
  }

  async getUserById(userId: string): Promise<Table> {
    const user = await this.User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });
    return user;
  }

  async getUserByCol(clause: object): Promise<Table> {
    const user = await this.getByCol(clause);
    return user;
  }

  async createUser(payload: object, transaction: Transaction): Promise<Table> {
    const user = await this.insertItemToTable(payload, transaction);
    return user;
  }

  async getAllUsers({
    selectedColumns,
    excludedColumns,
    include,
    clause,
    page,
    limit,
  }: IQueryOptions): Promise<Table> {
    const users = await this.getAllItemsFromTable({
      selectedColumns,
      excludedColumns,
      include,
      clause,
      page,
      limit,
    });
    return users;
  }

  async deleteUsers(clause: object, transaction: Transaction): Promise<Table> {
    const users = await this.getByColAndDelete(clause, transaction);
    return users;
  }

  async updateUser(clause: object, payload: object, transaction: Transaction): Promise<Table> {
    const user = await this.updateItem(clause, payload, transaction);
    return user;
  }
}

export default UserRepository;
