import UserRepository from "../../infra/repository/UserRepository";
import { PoolClient, QueryResult } from "pg";
import Config from "../../../config/default";

class GetUsersWithMostPosts {
  userRepository: UserRepository;
  psqlClient: PoolClient;
  config: typeof Config;
  constructor({
    userRepository,
    psqlClient,
    config,
  }: {
    userRepository: UserRepository;
    psqlClient: PoolClient;
    config: typeof Config;
  }) {
    this.userRepository = userRepository;
    this.psqlClient = psqlClient;
    this.config = config;
  }

  async execute(): Promise<QueryResult[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { rows }: QueryResult = await this.psqlClient.query(
          this.userRepository.getTopUsersWithMostPosts()
        );
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GetUsersWithMostPosts;
