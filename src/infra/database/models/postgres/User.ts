import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

import Post from "./Post";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
  })
  declare gender: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => Post)
  declare posts: Post[];
}

export default User;
