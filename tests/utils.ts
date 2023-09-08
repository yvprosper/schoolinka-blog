import container from "../src/container";
const { appConfig } = container.cradle;
export const server = `localhost:${appConfig.httpPort}`;
