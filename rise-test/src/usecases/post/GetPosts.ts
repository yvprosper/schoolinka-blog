import BaseRepository from "../../infra/repository/UserRepository";
import { PoolClient, QueryResult } from "pg";
import Config from "../../../config/default";

class GetPosts {
  baseRepository: BaseRepository;
  psqlClient: PoolClient;
  config: typeof Config;
  constructor({
    baseRepository,
    psqlClient,
    config,
  }: {
    baseRepository: BaseRepository;
    psqlClient: PoolClient;
    config: typeof Config;
  }) {
    this.baseRepository = baseRepository;
    this.psqlClient = psqlClient;
    this.config = config;
  }

  async execute(): Promise<QueryResult[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { rows }: QueryResult = await this.psqlClient.query(
          this.baseRepository.getAllValuesFrom("posts")
        );
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetPosts;
