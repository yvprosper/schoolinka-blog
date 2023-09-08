import { asValue, Lifetime, asClass, asFunction, InjectionMode, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import config from "config";
import router from "./interface/http/router/routes";
import restServer from "./interface/http/server";
import Logger from "./interface/http/utils/logger";
import User from "./infra/database/models/postgres/User";
import Post from "./infra/database/models/postgres/Post";
import Config from "../config/default";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
  restServer: asClass(restServer),
  User: asValue(User),
  Post: asValue(Post),
  router: asFunction(router),
  logger: asValue(Logger),
  config: asValue(config),
  appConfig: asValue(Config),
});

// load all repositories
container.loadModules(
  [
    [
      "src/infra/repository/*.ts",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    // we want all files to be registered in camelCase.
    formatName: "camelCase",
    resolverOptions: {},
    //cwd: __dirname,
  }
);

//load all usecases
container.loadModules(
  [
    [
      "./src/usecases/*/*.ts",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    // we want all files to be registered in camelCase.
    formatName: "camelCase",
    resolverOptions: {},
    //cwd: __dirname
  }
);

export default container;
