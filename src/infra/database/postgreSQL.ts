import { Sequelize } from "sequelize-typescript";
import config from "../../../config/default";
import log from "../../interface/http/utils/logger";
import User from "./models/postgres/User";
import Post from "./models/postgres/Post";

export const connectPsqlDB = async (): Promise<Sequelize> => {
  const { psqlDatabaseUri } = config;

  try {
    log.info("connecting to postgresql...");
    const client: Sequelize = new Sequelize(String(psqlDatabaseUri));
    await client.authenticate();
    await client.addModels([User, Post]);
    await client.sync({ force: false, alter: true });

    log.info("connected to postgresql!");
    return client;
  } catch (error) {
    log.error("could not connect to postgresql", error);
    throw error;
  }
};
