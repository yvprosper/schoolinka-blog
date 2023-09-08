import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

import User from "./User";

@Table({
  timestamps: true,
  tableName: "posts",
  modelName: "Post",
})
class Post extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    onDelete: "CASCADE",
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
  })
  declare post: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default Post;
