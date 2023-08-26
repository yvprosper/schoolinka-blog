declare namespace Express {
  export interface Request {
    user: string | JwtPayload;
  }
}

declare module "auto-bind-inheritance";
