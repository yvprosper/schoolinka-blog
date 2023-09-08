declare namespace Express {
  export interface Request {
    user: string | JwtPayload;
  }
}

declare module "auto-bind-inheritance";
declare module "pino-pretty";
declare module "@hapi/joi-date";
