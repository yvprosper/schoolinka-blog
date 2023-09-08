import restServer from "../interface/http/server";
import { connectPsqlDB } from "../infra/database/postgreSQL";
import log from "../interface/http/utils/logger";
import container from "../container";
import { asValue } from "awilix";
import { ShutdownFunction } from "../infra/support/interfaces";

class Application {
  restServer: restServer;
  logger: typeof log;
  shutdown!: ShutdownFunction;

  constructor({ restServer, logger }: { restServer: restServer; logger: typeof log }) {
    this.restServer = restServer;
    this.logger = logger;
  }

  async start() {
    const psqlClient = await connectPsqlDB();
    container.register({
      psqlClient: asValue(psqlClient),
    });
    await this.restServer.start();
  }
}

export default Application;
