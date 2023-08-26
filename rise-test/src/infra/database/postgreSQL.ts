import { Pool, PoolClient } from "pg";
import config from "../../../config/default";

export const connectPsqlDB = async (): Promise<PoolClient> => {
  const { psqlDatabaseName, psqlPassword, psqlUsername, psqlHost, psqlPort } = config;
  const pool = new Pool({
    user: psqlUsername,
    host: psqlHost,
    database: psqlDatabaseName,
    password: psqlPassword,
    port: Number(psqlPort),
  });

  try {
    console.log("connecting to postgresql...");
    const client = await pool.connect();
    await client.query(`
      create table if not exists users (
        id serial primary key,
        first_name varchar(50) not null,
        last_name varchar(50) not null,
        email varchar(50) unique not null,
        password varchar not null,
        gender varchar not null,
        created_on timestamp not null
      );

      create table if not exists posts (
        postId serial primary key,
        userId int references users(id) on delete cascade,
        post text not null,
        created_on timestamp not null,
        updated_on timestamp
      );

      create table if not exists comments (
        commentId serial primary key,
        postId int references posts(postId) on delete cascade,
        userId int references users(id) on delete cascade,
        comment text not null,
        created_on timestamp not null
      );

    `);

    console.log("connected to postgresql!");
    return client;
  } catch (error) {
    console.error("could not connect to postgresql", error);
    throw error;
  }
};
